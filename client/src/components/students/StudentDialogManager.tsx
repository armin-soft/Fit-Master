
import React, { useImperativeHandle, forwardRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useDialogState } from "./hooks/useDialogState";
import {
  FormDialog,
  ExerciseDialog,
  DietDialog,
  SupplementDialog
} from "./dialogs";

export interface StudentDialogManagerRef {
  handleAdd: () => void;
  handleEdit: (student: Student) => void;
  handleAddExercise?: (student: Student) => void;
  handleAddDiet?: (student: Student) => void;
  handleAddSupplement?: (student: Student) => void;
}

interface StudentDialogManagerProps {
  onSave: (student: Student, selectedStudent?: Student | null) => void;
  onSaveExercises?: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean;
  onSaveDiet?: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
  onSaveSupplements?: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean;
  exercises?: any[];
  meals?: any[];
  supplements?: any[];
}

export const StudentDialogManager = forwardRef<StudentDialogManagerRef, StudentDialogManagerProps>(
  ({ 
    onSave, 
    onSaveExercises, 
    onSaveDiet, 
    onSaveSupplements, 
    exercises, 
    meals, 
    supplements 
  }, ref) => {
    const {
      state,
      setFormDialogOpen,
      setExerciseDialogOpen,
      setDietDialogOpen,
      setSupplementDialogOpen,
      setSelectedStudent,
      setIsEditing
    } = useDialogState();

    useImperativeHandle(ref, () => ({
      handleAdd: () => {
        console.log("StudentDialogManager: handleAdd called");
        setSelectedStudent(null);
        setIsEditing(false);
        setFormDialogOpen(true);
        console.log("StudentDialogManager: Form dialog should now be open for add");
      },
      handleEdit: (student) => {
        console.log("StudentDialogManager: handleEdit called with student:", student);
        setSelectedStudent(student);
        setIsEditing(true);
        setFormDialogOpen(true);
        console.log("StudentDialogManager: Form dialog should now be open");
      },
      handleAddExercise: onSaveExercises ? (student) => {
        console.log("Opening exercise dialog for student:", student);
        setSelectedStudent(student);
        setExerciseDialogOpen(true);
      } : undefined,
      handleAddDiet: onSaveDiet ? (student) => {
        console.log("Opening diet dialog for student:", student);
        setSelectedStudent(student);
        setDietDialogOpen(true);
      } : undefined,
      handleAddSupplement: onSaveSupplements ? (student) => {
        console.log("Opening supplement dialog for student:", student);
        setSelectedStudent(student);
        setSupplementDialogOpen(true);
      } : undefined
    }));

    return (
      <>
        <FormDialog
          open={state.formDialog}
          onOpenChange={setFormDialogOpen}
          selectedStudent={state.selectedStudent}
          isEditing={state.isEditing}
          onSave={onSave}
        />

        <ExerciseDialog
          open={state.exerciseDialog}
          onOpenChange={setExerciseDialogOpen}
          selectedStudent={state.selectedStudent}
          onSaveExercises={onSaveExercises}
        />

        <DietDialog
          open={state.dietDialog}
          onOpenChange={setDietDialogOpen}
          selectedStudent={state.selectedStudent}
          meals={meals}
          onSaveDiet={onSaveDiet}
        />

        <SupplementDialog
          open={state.supplementDialog}
          onOpenChange={setSupplementDialogOpen}
          selectedStudent={state.selectedStudent}
          supplements={supplements}
          onSaveSupplements={onSaveSupplements}
        />
      </>
    );
  }
);

StudentDialogManager.displayName = "StudentDialogManager";
