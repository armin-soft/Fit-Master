
import { useCallback } from "react";

export const useExercisePageHandlers = (state: any) => {
  const handleAddCategory = useCallback(() => {
    // اطمینان از انتخاب نوع تمرین فعلی
    const currentType = state.selectedType || 
      (state.exerciseTypes && state.exerciseTypes.length > 0 ? 
        (typeof state.exerciseTypes[0] === 'object' ? state.exerciseTypes[0].name : state.exerciseTypes[0]) : 
        "");
    

    state.setCategoryFormData({ name: "", type: currentType });
    state.setIsCategoryDialogOpen(true);
  }, [state]);

  const handleEditCategory = useCallback((category: any) => {
    state.setCategoryFormData({ name: category.name, type: category.type });
    state.setIsCategoryDialogOpen(true);
  }, [state]);

  const handleAddExercise = useCallback(() => {
    state.setSelectedExercise(undefined);
    state.setExerciseFormData({ name: "", categoryId: state.filteredCategories[0].id });
    state.setIsExerciseDialogOpen(true);
  }, [state]);

  const handleEditExercise = useCallback((exercise: any) => {
    state.setSelectedExercise(exercise);
    state.setExerciseFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
    state.setIsExerciseDialogOpen(true);
  }, [state]);

  return {
    handleAddType: state.handleAddType,
    handleEditType: state.handleEditType,
    handleSaveType: state.handleSaveType,
    handleDeleteType: state.handleDeleteType,
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory: state.handleSaveCategory,
    handleDeleteCategory: state.handleDeleteCategory,
    handleAddExercise,
    handleEditExercise,
    handleSort: state.handleSort,
    handleExerciseSave: state.handleExerciseSave,
    handleDeleteExercises: state.handleDeleteExercises
  };
};
