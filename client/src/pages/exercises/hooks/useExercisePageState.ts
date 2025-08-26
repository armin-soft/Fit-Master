
import { useState, useMemo } from "react";
import useExerciseTypes from "@/hooks/useExerciseTypes";
import useExerciseCategories from "@/hooks/useExerciseCategories";
import useExerciseManagement from "@/hooks/useExerciseManagement";
import useExerciseFiltering from "@/hooks/useExerciseFiltering";

export const useExercisePageState = () => {
  const [activeTab, setActiveTab] = useState<string>("types");
  
  // استفاده از هوک‌های جدا شده
  const { 
    exerciseTypes, 
    selectedType,
    setSelectedType, 
    isTypeDialogOpen, 
    setIsTypeDialogOpen,
    newTypeName,
    setNewTypeName,
    editingType,
    handleAddType,
    handleEditType,
    handleSaveType,
    handleDeleteType 
  } = useExerciseTypes();

  const { 
    categories,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory
  } = useExerciseCategories(selectedType);

  const {
    exercises,
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen,
    isAscending,
    handleSort,
    handleExerciseSave,
    handleDeleteExercises
  } = useExerciseManagement();

  // فیلتر کردن دسته‌بندی‌ها براساس نوع انتخاب شده
  // در ساختار دیتابیس جدید، دسته‌بندی‌ها همان انواع هستند
  const filteredCategories = useMemo(() => {
    if (!selectedType) return categories;
    return (categories as any[]).filter((cat: any) => cat.name === selectedType);
  }, [categories, selectedType]);

  // استفاده از هوک فیلترینگ حرکات
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
  } = useExerciseFiltering(
    exercises.filter((ex: any) => filteredCategories.some((cat: any) => cat.id === ex.categoryId)),
    categories
  );

  return {
    activeTab,
    setActiveTab,
    exerciseTypes,
    selectedType,
    setSelectedType,
    isTypeDialogOpen,
    setIsTypeDialogOpen,
    newTypeName,
    setNewTypeName,
    editingType,
    handleAddType,
    handleEditType,
    handleSaveType,
    handleDeleteType,
    categories,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory,
    exercises,
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
    filteredCategories,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises
  };
};
