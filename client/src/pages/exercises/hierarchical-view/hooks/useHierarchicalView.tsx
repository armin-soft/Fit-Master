
import { useState, useCallback } from "react";

export type ViewStage = 'types' | 'categories' | 'exercises';

export const useHierarchicalView = () => {
  // تغییر مرحله اول به انواع تمرین
  const [currentStage, setCurrentStage] = useState<ViewStage>('types');
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  const handleTypeSelect = useCallback((typeId: string) => {
    setSelectedTypeId(typeId);
    setCurrentStage('categories');
  }, []);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentStage('exercises');
  }, []);
  
  const handleBackToTypes = useCallback(() => {
    setSelectedTypeId(null);
    setSelectedCategoryId(null);
    setCurrentStage('types');
  }, []);
  
  const handleBackToCategories = useCallback(() => {
    setSelectedCategoryId(null);
    setCurrentStage('categories');
  }, []);
  
  const handleExerciseSelect = useCallback((exerciseId: string) => {

    // Additional handling can be added here
  }, []);
  
  return {
    currentStage,
    selectedTypeId,
    selectedCategoryId,
    handleTypeSelect,
    handleCategorySelect,
    handleBackToTypes,
    handleBackToCategories,
    handleExerciseSelect
  };
};

export default useHierarchicalView;
