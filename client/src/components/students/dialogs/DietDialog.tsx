
import React from "react";
import { Student } from "../StudentTypes";
import StudentDietDialog from "../diet/StudentDietDialog";

interface DietDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  meals?: any[];
  onSaveDiet?: (mealIds: number[], studentId: number, dayNumber?: number) => boolean;
}

export const DietDialog: React.FC<DietDialogProps> = ({
  open,
  onOpenChange,
  selectedStudent,
  meals = [],
  onSaveDiet,
}) => {
  if (!selectedStudent || !onSaveDiet) return null;

  return (
    <StudentDietDialog
      open={open}
      onOpenChange={onOpenChange}
      studentName={selectedStudent.name}
      onSave={(mealIds, dayNumber) => {
        return onSaveDiet(mealIds, selectedStudent.id, dayNumber);
      }}
      meals={meals}
      initialMeals={selectedStudent.meals}
      initialMealsDay1={selectedStudent.mealsDay1}
      initialMealsDay2={selectedStudent.mealsDay2}
      initialMealsDay3={selectedStudent.mealsDay3}
      initialMealsDay4={selectedStudent.mealsDay4}
    />
  );
};
