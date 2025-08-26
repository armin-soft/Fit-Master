
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dumbbell, Minus } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ExerciseWithSets } from "@/types/exercise";
import { ExerciseSetsInput } from "@/components/exercises/ExerciseSetsInput";
import { ExerciseRepsInput } from "@/components/exercises/ExerciseRepsInput";

interface SelectedExercisesListProps {
  selectedExercises: ExerciseWithSets[];
  exercises: any[];
  dayLabel: string;
  toggleExercise: (exerciseId: number) => void;
  handleSetsChange: (exerciseId: number, sets: number) => void;
  handleRepsChange: (exerciseId: number, reps: string) => void;
}

const SelectedExercisesList: React.FC<SelectedExercisesListProps> = ({
  selectedExercises,
  exercises,
  dayLabel,
  toggleExercise,
  handleSetsChange,
  handleRepsChange
}) => {
  return (
    <div className="text-right" dir="rtl">
      <ScrollArea className="h-[300px] pr-4">
        {selectedExercises.length === 0 ? (
          <div className="text-center p-6 text-muted-foreground">
            هنوز تمرینی برای {dayLabel} انتخاب نشده است.
          </div>
        ) : (
          <div className="space-y-3">
            {selectedExercises.map((exercise, index) => {
              const exerciseInfo = exercises.find(e => e.id === exercise.id);
              return (
                <div key={exercise.id} className="border rounded-md p-3 border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/20" dir="rtl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {toPersianNumbers(index + 1)}.
                      </span>
                      <div className="font-medium text-right">{exerciseInfo?.name || `تمرین ${toPersianNumbers(exercise.id)}`}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-900/30"
                      onClick={() => toggleExercise(exercise.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2" dir="rtl">
                    <div className="text-right">
                      <Label htmlFor={`sets-${exercise.id}`} className="text-xs">تعداد ست</Label>
                      <ExerciseSetsInput
                        exerciseId={exercise.id}
                        sets={exercise.sets}
                        onSetsChange={handleSetsChange}
                        className="mt-1 w-full text-right border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 dark:focus:border-emerald-400"
                        isPersian={true}
                      />
                    </div>
                    <div className="text-right">
                      <Label htmlFor={`reps-${exercise.id}`} className="text-xs">تکرار</Label>
                      <ExerciseRepsInput
                        exerciseId={exercise.id}
                        reps={exercise.reps}
                        onRepsChange={handleRepsChange}
                        className="mt-1 w-full text-right border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 dark:focus:border-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SelectedExercisesList;
