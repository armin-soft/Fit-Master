
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import ExerciseDialogFooter from "./ExerciseDialogFooter";
import ExerciseDialogHeader from "./ExerciseDialogHeader";
import ExerciseDialogLoading from "./dialog/ExerciseDialogLoading";
import { StudentExerciseDialogState } from "./dialog/StudentExerciseDialogState";
import StudentExerciseDialogContent from "./dialog/StudentExerciseDialogContent";
import { StudentExerciseDialogProps } from "./dialog/StudentExerciseDialogProps";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentExerciseDialog: React.FC<StudentExerciseDialogProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = [],
}) => {
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-[100vw] p-0 m-0 h-[100vh] w-[100vw] rounded-none border-none overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex flex-col"
        aria-describedby="student-exercise-dialog-description"
      >
        <DialogTitle className="sr-only">
          انتخاب تمرین برای {studentName}
        </DialogTitle>
        <DialogDescription id="student-exercise-dialog-description" className="sr-only">
          در این صفحه شما می‌توانید تمرین‌های مورد نظر را برای دانش‌آموز انتخاب کنید
        </DialogDescription>
        <ExerciseDialogHeader studentName={studentName} />

        <StudentExerciseDialogState
          open={open}
          onOpenChange={onOpenChange}
          studentName={studentName}
          onSave={onSave}
          initialExercises={initialExercises}
          initialExercisesDay1={initialExercisesDay1}
          initialExercisesDay2={initialExercisesDay2}
          initialExercisesDay3={initialExercisesDay3}
          initialExercisesDay4={initialExercisesDay4}
          initialExercisesDay5={initialExercisesDay5}
        >
          {({ 
            isLoading,
            activeTab,
            getActiveTabSelectedExercises,
            getActiveTabSelectedExercisesWithSets,
            handleSave,
            handleSaveDay,
            handleSaveAndContinue,
            selectedExercisesDay5,
            toggleExerciseDay5,
            exerciseSetsDay5,
            handleSetsChangeDay5,
            exerciseRepsDay5,
            handleRepsChangeDay5,
            ...contentProps
          }) => (
            <>
              {isLoading ? (
                <ExerciseDialogLoading />
              ) : (
                <>
                  {/* افزودن دکمه ذخیره روز فعلی در بالای صفحه */}
                  <div className="flex items-center justify-end gap-2 p-2 bg-white dark:bg-gray-800 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                      onClick={() => {
                        const exercises = getActiveTabSelectedExercisesWithSets();
                        const success = handleSaveDay(
                          exercises,
                          onSave,
                          parseInt(activeTab.replace("day", ""))
                        );
                        if (success) {
                          toast({
                            title: "ذخیره موفق",
                            description: `تمرین‌های روز ${parseInt(activeTab.replace("day", ""))} با موفقیت ذخیره شدند.`
                          });
                        }
                      }}
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>ذخیره روز فعلی</span>
                    </Button>
                  </div>
                  
                  <StudentExerciseDialogContent 
                    isLoading={isLoading}
                    activeTab={activeTab}
                    selectedExercisesDay5={selectedExercisesDay5}
                    toggleExerciseDay5={toggleExerciseDay5}
                    exerciseSetsDay5={exerciseSetsDay5}
                    handleSetsChangeDay5={handleSetsChangeDay5}
                    exerciseRepsDay5={exerciseRepsDay5}
                    handleRepsChangeDay5={handleRepsChangeDay5}
                    handleSaveExercises={(exercisesWithSets, dayNumber) => {
                      return handleSaveDay(
                        exercisesWithSets, 
                        onSave, 
                        dayNumber || parseInt(activeTab.replace("day", ""))
                      );
                    }}
                    {...contentProps} 
                  />
                </>
              )}

              <ExerciseDialogFooter
                activeTab={activeTab}
                selectedExercisesCount={getActiveTabSelectedExercises().length}
                onCancel={() => onOpenChange(false)}
                onSave={handleSave}
                onSaveAndContinue={handleSaveAndContinue}
              />
            </>
          )}
        </StudentExerciseDialogState>
      </DialogContent>
    </Dialog>
  );
};

export default StudentExerciseDialog;
