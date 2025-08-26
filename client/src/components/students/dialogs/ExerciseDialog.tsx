
import React from "react";
import { Student } from "../StudentTypes";
import StudentExerciseDialog from "@/components/exercises/StudentExerciseDialog";
import { ExerciseWithSets } from "@/types/exercise";

interface ExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  onSaveExercises?: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
}

export const ExerciseDialog: React.FC<ExerciseDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  onSaveExercises,
}) => {
  if (!selectedStudent || !onSaveExercises) return null;

  // Use the exercises array directly as number[]
  const initialExercises = selectedStudent.exercises || [];

  return (
    <StudentExerciseDialog
      open={open}
      onOpenChange={onOpenChange}
      studentName={selectedStudent.name}
      onSave={(exercisesWithSets, dayNumber) => {
        return onSaveExercises(exercisesWithSets, selectedStudent.id, dayNumber);
      }}
      initialExercises={initialExercises}
      initialExerciseSets={selectedStudent.exerciseSets}
      initialExerciseReps={selectedStudent.exerciseReps}
      initialExercisesDay1={selectedStudent.exercisesDay1}
      initialExerciseSetsDay1={selectedStudent.exerciseSetsDay1}
      initialExerciseRepsDay1={selectedStudent.exerciseRepsDay1}
      initialExercisesDay2={selectedStudent.exercisesDay2}
      initialExerciseSetsDay2={selectedStudent.exerciseSetsDay2}
      initialExerciseRepsDay2={selectedStudent.exerciseRepsDay2}
      initialExercisesDay3={selectedStudent.exercisesDay3}
      initialExerciseSetsDay3={selectedStudent.exerciseSetsDay3}
      initialExerciseRepsDay3={selectedStudent.exerciseRepsDay3}
      initialExercisesDay4={selectedStudent.exercisesDay4}
      initialExerciseSetsDay4={selectedStudent.exerciseSetsDay4}
      initialExerciseRepsDay4={selectedStudent.exerciseRepsDay4}
      initialExercisesDay5={selectedStudent.exercisesDay5}
      initialExerciseSetsDay5={selectedStudent.exerciseSetsDay5}
      initialExerciseRepsDay5={selectedStudent.exerciseRepsDay5}
    />
  );
};
