
import { useState, useEffect } from "react";
import { Student } from "@/components/students/StudentTypes";

export const useDietTabState = (
  student: Student,
  onSaveDiet: (mealIds: number[]) => boolean
) => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Initialize selected meals from student data
  useEffect(() => {
    if (student.meals) {
      setSelectedMeals(student.meals);
    } else {
      setSelectedMeals([]);
    }
  }, [student]);

  const handleSave = () => {
    setIsLoading(true);
    const success = onSaveDiet(selectedMeals);
    setIsLoading(false);
    return success;
  };

  return {
    currentDay,
    setCurrentDay,
    selectedMeals,
    setSelectedMeals,
    handleSave,
    isLoading
  };
};

export default useDietTabState;
