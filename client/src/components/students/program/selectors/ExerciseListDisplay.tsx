
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface ExerciseListDisplayProps {
  filteredExercises: any[];
  selectedExercises: any[];
  selectedType: string | null;
  selectedCategoryId: number | null;
  toggleExercise: (exerciseId: number) => void;
  viewMode: "grid" | "list";
}

const ExerciseListDisplay: React.FC<ExerciseListDisplayProps> = ({
  filteredExercises,
  selectedExercises,
  selectedType,
  selectedCategoryId,
  toggleExercise,
  viewMode
}) => {
  if (!selectedType && !selectedCategoryId) {
    return (
      <div className="text-center p-8 border border-dashed rounded-md border-emerald-200 dark:border-emerald-800">
        <p className="text-muted-foreground">لطفاً ابتدا یک نوع تمرین انتخاب کنید</p>
      </div>
    );
  }
  
  if (selectedType && !selectedCategoryId) {
    return (
      <div className="text-center p-8 border border-dashed rounded-md border-emerald-200 dark:border-emerald-800">
        <p className="text-muted-foreground">لطفاً یک دسته‌بندی انتخاب کنید</p>
      </div>
    );
  }
  
  if (filteredExercises.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-md border-emerald-200 dark:border-emerald-800">
        <p className="text-muted-foreground">هیچ تمرینی برای این دسته‌بندی یافت نشد</p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[300px]">
      <div className={viewMode === "grid" ? "grid grid-cols-2 gap-2 pr-2" : "space-y-2 pr-2"}>
        {filteredExercises.map(exercise => (
          <div 
            key={exercise.id} 
            className={`border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 ${
              selectedExercises.some(ex => ex.id === exercise.id) ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : ''
            }`}
            onClick={() => toggleExercise(exercise.id)}
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={selectedExercises.some(ex => ex.id === exercise.id)}
                className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
              />
              <div className="text-right">
                <div className="font-medium">{exercise.name}</div>
                {exercise.category && (
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700 mt-1">
                    {exercise.category}
                  </Badge>
                )}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-emerald-600 dark:text-emerald-400"
              onClick={(e) => {
                e.stopPropagation();
                toggleExercise(exercise.id);
              }}
            >
              {selectedExercises.some(ex => ex.id === exercise.id) ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ExerciseListDisplay;
