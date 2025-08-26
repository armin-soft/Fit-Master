
import { useState } from "react";
import { useExerciseData } from "./useExerciseData";
import { useExerciseTypeSelection } from "./useExerciseTypeSelection";
import { useExerciseFilters } from "./useExerciseFilters";
import { useExerciseSelection } from "./useExerciseSelection";

/**
 * Hook to fetch and manage exercise data for the exercise dialog with enhanced UI/UX
 * Supports hierarchical selection: Exercise Type → Category → Exercises
 */
export const useExerciseDialogData = () => {
  // Fetch exercises, categories, and types
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseData();
  
  // Manage type selection
  const { selectedType, setSelectedType } = useExerciseTypeSelection(
    Array.isArray(exerciseTypes) ? exerciseTypes.map(type => typeof type === 'string' ? type : type.name || type.type || '') : []
  );
  
  // Manage category selection
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  
  // Manage search, filters, and sorting
  const { 
    searchQuery, 
    setSearchQuery, 
    sortOrder, 
    toggleSortOrder,
    filteredCategories,
    filteredExercises,
    handleClearSearch
  } = useExerciseFilters(exercises, categories, selectedType, selectedCategoryId);
  
  // Manage view mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Manage exercise selection
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  
  // Function to toggle exercise selection
  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExerciseIds(prev => 
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  return {
    // Data
    exercises,
    categories,
    exerciseTypes,
    isLoading,
    
    // Type selection
    selectedType,
    setSelectedType,
    
    // Category selection
    selectedCategoryId,
    setSelectedCategoryId,
    
    // Filtered data
    filteredCategories,
    filteredExercises,
    
    // Search
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    
    // Sorting
    sortOrder,
    toggleSortOrder,
    
    // View mode
    viewMode,
    setViewMode,
    
    // Exercise selection
    selectedExerciseIds,
    setSelectedExerciseIds,
    toggleExerciseSelection
  };
};

export default useExerciseDialogData;
