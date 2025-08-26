
import { useState, useMemo } from "react";
import { Meal } from "@/types/meal";

interface UseStudentDietSelectorProps {
  meals: Meal[];
  currentMealType?: string;
  currentDay?: number;
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
}

export const useStudentDietSelector = ({
  meals,
  currentMealType,
  currentDay,
  selectedMeals,
  setSelectedMeals
}: UseStudentDietSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Convert currentDay number to day name mapping
  const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'];
  const currentDayName = currentDay ? dayNames[currentDay - 1] : undefined;

  // Filter meals based on search, current meal type, and current day
  const filteredMeals = useMemo(() => {
    const filtered = meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Show all meals when "همه وعده‌ها" is selected, or when meal type matches
      const matchesMealType = !currentMealType || currentMealType === "all" || 
                             (meal.mealType && meal.mealType === currentMealType) ||
                             (meal.meal_type && meal.meal_type === currentMealType) ||
                             (meal.type && meal.type === currentMealType);
      
      // Filter by current day (day_of_week field)
      const matchesDay = !currentDayName || 
                        (meal.dayOfWeek && meal.dayOfWeek === currentDayName) ||
                        (meal.day_of_week && meal.day_of_week === currentDayName) ||
                        (meal.day && meal.day === currentDayName);
      
      return matchesSearch && matchesMealType && matchesDay;
    });
    
    // Remove duplicates by filtering unique meal IDs
    const uniqueMeals = filtered.filter((meal, index, self) => 
      self.findIndex(m => m.id === meal.id) === index
    );
    
    return uniqueMeals;
  }, [meals, searchQuery, currentMealType, currentDayName]);

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredMeals,
    toggleMeal
  };
};
