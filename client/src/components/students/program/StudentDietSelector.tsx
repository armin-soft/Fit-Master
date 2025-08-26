
import React from "react";
import { Meal, MealType } from "@/types/meal";
import { useStudentDietSelector } from "./hooks/useStudentDietSelector";
import DietSelectorHeader from "./diet/DietSelectorHeader";
import DietSearch from "./diet/DietSearch";
import SelectedMealsList from "./diet/SelectedMealsList";
import AvailableMealsList from "./diet/AvailableMealsList";

interface StudentDietSelectorProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: Meal[];
  currentDay: number;
  currentMealType?: string;
  dayLabel?: string;
}

const StudentDietSelector: React.FC<StudentDietSelectorProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDay,
  currentMealType,
  dayLabel
}) => {
  console.log('StudentDietSelector: Received meals count:', meals?.length || 0);
  console.log('StudentDietSelector: Sample meal:', meals?.[0]);
  const {
    searchQuery,
    setSearchQuery,
    filteredMeals,
    toggleMeal
  } = useStudentDietSelector({
    meals,
    currentMealType,
    currentDay,
    selectedMeals,
    setSelectedMeals
  });

  return (
    <div className="space-y-6 text-right p-6" dir="rtl">
      <DietSelectorHeader 
        currentDay={currentDay}
        currentMealType={currentMealType}
        selectedMealsCount={selectedMeals.length}
      />

      <DietSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SelectedMealsList 
          selectedMeals={selectedMeals}
          meals={meals}
          toggleMeal={toggleMeal}
        />
        
        <AvailableMealsList 
          filteredMeals={filteredMeals}
          selectedMeals={selectedMeals}
          toggleMeal={toggleMeal}
        />
      </div>
    </div>
  );
};

export default StudentDietSelector;
