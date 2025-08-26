
import { useState, useMemo } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";

/**
 * Hook to manage exercise filters
 */
export const useExerciseFilters = (
  exercises: Exercise[], 
  categories: ExerciseCategory[],
  selectedType: string | null,
  selectedCategoryId: number | null
) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  // Get filtered categories based on exercise type
  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      selectedType ? category.type === selectedType : true
    );
  }, [categories, selectedType]);

  // Filter exercises based on type and category
  const filteredExercises = useMemo(() => {
    // Must have an exercise type selected to proceed
    if (!selectedType) {
      return [];
    }

    // Must have a category selected if categories are available for the selected type
    if (filteredCategories.length > 0 && !selectedCategoryId) {
      return [];
    }

    return exercises.filter(exercise => {
      const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
      return matchesCategory;
    });
  }, [exercises, selectedCategoryId, selectedType, filteredCategories]);

  const handleClearSearch = () => {
    // Only clear categories and type, no search to clear
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  return {
    searchQuery: "", // Empty string since we removed search
    setSearchQuery: () => {}, // No-op function
    filteredCategories,
    filteredExercises,
    handleClearSearch,
    sortOrder,
    toggleSortOrder
  };
};

export default useExerciseFilters;
