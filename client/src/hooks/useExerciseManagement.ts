
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useExerciseCRUD } from "@/hooks/exercises/useExerciseCRUD";
import { useExerciseSort } from "@/hooks/exercises/useExerciseSort";
import { useExerciseState } from "@/hooks/exercises/useExerciseState";

export const useExerciseManagement = () => {
  // Get exercises data
  const { exercises, isLoading } = useExerciseData();
  
  // Exercise state management
  const {
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen
  } = useExerciseState();
  
  // CRUD operations
  const {
    handleExerciseSave: baseSave,
    handleDeleteExercises,
    updateExercises
  } = useExerciseCRUD({ exercises });
  
  // Sorting functionality
  const { isAscending, handleSort } = useExerciseSort();

  // Wrapper for save function to match existing API
  const handleExerciseSave = (formData: { name: string; categoryId: number }) => {
    return baseSave(formData, selectedExercise);
  };

  return {
    exercises,
    setExercises: updateExercises,
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    isAscending,
    handleSort,
    handleExerciseSave,
    handleDeleteExercises,
    isLoading
  };
};

export default useExerciseManagement;
