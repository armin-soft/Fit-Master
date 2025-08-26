
import { useState, useMemo, useEffect, useCallback } from "react";
import { ExerciseWithSets } from "@/types/exercise";

interface UseExerciseSelectorProps {
  exercises: any[];
  categories: any[];
  exerciseTypes: string[];
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
}

export const useExerciseSelector = ({
  exercises,
  categories,
  exerciseTypes,
  selectedExercises,
  setSelectedExercises,
  dayNumber
}: UseExerciseSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [hasUserMadeSelection, setHasUserMadeSelection] = useState(false);
  
  // Only auto-select type and category if user hasn't made a manual selection
  useEffect(() => {
    if (selectedExercises.length > 0 && !hasUserMadeSelection) {
      const firstExercise = selectedExercises[0];
      const exercise = exercises.find(ex => ex.id === firstExercise.id);
      
      if (exercise) {
        const category = categories.find(cat => cat.id === exercise.categoryId);
        if (category) {
          setSelectedType(category.type);
          setSelectedCategoryId(exercise.categoryId);
        }
      }
    }
  }, [selectedExercises, exercises, categories, dayNumber, hasUserMadeSelection]);

  // Custom setters that mark user selection
  const handleSetSelectedType = useCallback((type: string | null) => {
    setSelectedType(type);
    setHasUserMadeSelection(true);
    if (type !== selectedType) {
      setSelectedCategoryId(null); // Reset category when type changes
    }
  }, [selectedType]);

  const handleSetSelectedCategoryId = useCallback((categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setHasUserMadeSelection(true);
  }, []);

  // Filter categories by type
  const filteredCategories = useMemo(() => {
    if (!selectedType) return [];
    
    return categories.filter(cat => cat.type === selectedType);
  }, [categories, selectedType]);
  
  // Filter exercises by type and category
  const filteredExercises = useMemo(() => {
    if (!selectedType || !selectedCategoryId) return [];
    
    return exercises.filter(exercise => {
      const category = categories.find(cat => cat.id === exercise.categoryId);
      return category?.type === selectedType && exercise.categoryId === selectedCategoryId;
    });
  }, [exercises, categories, selectedType, selectedCategoryId]);

  const toggleExercise = (exerciseId: number) => {
    if (selectedExercises.some(ex => ex.id === exerciseId)) {
      setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    } else {
      setSelectedExercises(prev => [
        ...prev, 
        { 
          id: exerciseId, 
          sets: 3, 
          reps: "12", 
          day: dayNumber
        }
      ]);
    }
  };

  const updateExerciseDetails = (exerciseId: number, field: keyof ExerciseWithSets, value: any) => {
    console.log(`Updating exercise ${exerciseId} field ${field} with value ${value}`);
    setSelectedExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    );
  };
  
  const handleSetsChange = (exerciseId: number, sets: number) => {
    console.log(`Sets changing for exercise ${exerciseId} to ${sets}`);
    updateExerciseDetails(exerciseId, 'sets', sets);
  };

  const handleRepsChange = (exerciseId: number, reps: string) => {
    updateExerciseDetails(exerciseId, 'reps', reps);
  };

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCategoryId(null);
    setHasUserMadeSelection(false); // Reset user selection flag
  };

  return {
    selectedType,
    setSelectedType: handleSetSelectedType,
    selectedCategoryId,
    setSelectedCategoryId: handleSetSelectedCategoryId,
    viewMode,
    setViewMode,
    filteredCategories,
    filteredExercises,
    toggleExercise,
    handleSetsChange,
    handleRepsChange,
    clearFilters
  };
};
