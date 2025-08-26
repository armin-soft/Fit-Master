
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { StudentDialogManager } from "@/components/students/StudentDialogManager";
import { ExerciseWithSets } from "@/types/exercise";

interface StudentsDialogSectionProps {
  dialogRef: React.RefObject<any>;
  onSave: (data: any, selectedStudent?: Student | null) => void;
  onSaveExercises: (exercisesData: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  exercises: any[];
  meals: any[];
  supplements: any[];
  students: Student[];
}

export const StudentsDialogSection: React.FC<StudentsDialogSectionProps> = ({
  dialogRef,
  onSave,
  onSaveExercises,
  onSaveDiet,
  onSaveSupplements,
  exercises,
  meals,
  supplements,
  students
}) => {
  return (
    <StudentDialogManager
      ref={dialogRef}
      onSave={onSave}
      onSaveExercises={onSaveExercises}
      onSaveDiet={onSaveDiet}
      onSaveSupplements={onSaveSupplements}
      exercises={exercises}
      meals={meals}
      supplements={supplements}
    />
  );
};
