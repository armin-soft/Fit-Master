
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Meal, MealType, WeekDay } from "@/types/meal";

export const mealTypeOrder: Record<MealType, number> = {
  "صبحانه": 1,
  "میان وعده صبح": 2,
  "ناهار": 3,
  "میان وعده عصر": 4,
  "شام": 5,
  "میان وعده شام": 6
};

export const dayOrder: Record<WeekDay, number> = {
  "شنبه": 0,
  "یکشنبه": 1,
  "دوشنبه": 2,
  "سه شنبه": 3,
  "چهارشنبه": 4,
  "پنج شنبه": 5,
  "جمعه": 6
};

interface UseMealSortingParams {
  meals: Meal[];
  searchQuery: string;
  activeDay: WeekDay | "all";
  activeMealType: MealType | "all";
  sortOrder: "asc" | "desc";
}

export const useMealSorting = ({
  meals,
  searchQuery,
  activeDay,
  activeMealType,
  sortOrder
}: UseMealSortingParams) => {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);

  // Optimize sorting logic with memoization
  const processedMeals = useMemo(() => {
    // Apply search filter - with memoized dependency on searchQuery
    const searchLower = searchQuery.trim().toLowerCase();
    const filtered = searchLower === "" 
      ? meals 
      : meals.filter(meal => 
          meal.name.toLowerCase().includes(searchLower) || 
          (meal.description && meal.description.toLowerCase().includes(searchLower))
        );
    
    // Apply day filter
    const dayFiltered = activeDay === "all" 
      ? filtered 
      : filtered.filter(meal => meal.day === activeDay);
    
    // Apply meal type filter
    const typeFiltered = activeMealType === "all" 
      ? dayFiltered 
      : dayFiltered.filter(meal => meal.type === activeMealType);
    
    // Pre-compute sorting keys for better performance
    const mealsWithSortKey = typeFiltered.map(meal => ({
      ...meal,
      // Create a composite sort key
      sortKey: `${meal.day ? String(dayOrder[meal.day]).padStart(2, '0') : '99'}${
        String(mealTypeOrder[meal.type]).padStart(2, '0')
      }${sortOrder === "asc" ? meal.name : String.fromCharCode(65535 - meal.name.charCodeAt(0))}`
    }));
    
    // Sort using the pre-computed key
    return mealsWithSortKey.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
    
  }, [meals, searchQuery, activeDay, activeMealType, sortOrder]);
  
  // Update state with memoized result
  useEffect(() => {
    setFilteredMeals(processedMeals.map(({sortKey, ...meal}) => meal));
  }, [processedMeals]);

  return filteredMeals;
};
