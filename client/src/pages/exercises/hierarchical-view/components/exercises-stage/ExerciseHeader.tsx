
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid3X3, ListOrdered, Plus, Trash2, ArrowLeft } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseHeaderProps {
  exerciseCount: number;
  selectedExerciseIds: number[];
  onDeleteClick: () => void;
  onAddExercise: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  exerciseCount,
  selectedExerciseIds,
  onDeleteClick,
  onAddExercise,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">
          حرکات تمرینی ({toPersianNumbers(exerciseCount)})
        </h3>
        
        {selectedExerciseIds.length > 0 && (
          <Button
            size="sm"
            variant="destructive"
            onClick={onDeleteClick}
            className="mr-2"
          >
            <Trash2 className="h-4 w-4 ml-2" />
            حذف ({toPersianNumbers(selectedExerciseIds.length)})
          </Button>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onAddExercise}
          className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 text-white group relative"
        >
          <Plus className="h-4 w-4 ml-2" />
          افزودن حرکت
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-xs text-white p-1 rounded whitespace-nowrap">
            <div className="flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> برای خط جدید
            </div>
          </div>
        </Button>
        
        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as "grid" | "list")}
        >
          <TabsList className="bg-muted/30">
            <TabsTrigger value="grid" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-600 data-[state=active]:text-white">
              <Grid3X3 className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="list" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-sky-600 data-[state=active]:text-white">
              <ListOrdered className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ExerciseHeader;
