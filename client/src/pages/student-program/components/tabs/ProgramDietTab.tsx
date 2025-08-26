
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { DaySelector, DayContent, ProgramDietHeader } from "./diet";
import { useDietTabState } from "./diet/useDietTabState";

interface ProgramDietTabProps {
  student: Student;
  meals: any[];
  onSaveDiet: (mealIds: number[]) => boolean;
}

export const ProgramDietTab: React.FC<ProgramDietTabProps> = ({
  student,
  meals,
  onSaveDiet
}) => {
  console.log('ProgramDietTab: Received meals count:', meals?.length || 0);
  console.log('ProgramDietTab: Sample meal:', meals?.[0]);
  const {
    currentDay,
    setCurrentDay,
    selectedMeals,
    setSelectedMeals,
    handleSave,
    isLoading
  } = useDietTabState(student, onSaveDiet);

  // Define the week days
  const weekDays = [
    { id: 1, name: "شنبه" },
    { id: 2, name: "یکشنبه" },
    { id: 3, name: "دوشنبه" },
    { id: 4, name: "سه شنبه" },
    { id: 5, name: "چهارشنبه" },
    { id: 6, name: "پنج شنبه" },
    { id: 7, name: "جمعه" }
  ];

  return (
    <div className="space-y-4 p-1">
      <ProgramDietHeader 
        onSave={handleSave} 
        isLoading={isLoading}
      />
      
      <DaySelector 
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
      
      <DayContent
        currentDay={currentDay}
        weekDays={weekDays}
        meals={meals}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
      />
    </div>
  );
};

export default ProgramDietTab;
