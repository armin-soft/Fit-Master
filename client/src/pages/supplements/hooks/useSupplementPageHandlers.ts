import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export const useSupplementPageHandlers = (state: any) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddCategory = () => {
    state.setEditingCategory(null);
    state.setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    state.setEditingCategory(category);
    state.setIsCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    deleteCategoryMutation.mutate(categoryId);
  };

  const handleSaveCategory = (categoryData: any) => {
    const dataWithId = {
      ...categoryData,
      id: state.editingCategory?.id || undefined
    };
    saveCategoryMutation.mutate(dataWithId);
  };

  // Mutations
  const saveCategoryMutation = useMutation({
    mutationFn: async (categoryData: any) => {
      const url = categoryData.id ? `/supplement-categories/${categoryData.id}` : '/supplement-categories';
      const method = categoryData.id ? 'PUT' : 'POST';
      return apiRequest(url, { method, body: categoryData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/supplement-categories'] });
      toast({ title: "موفق", description: "دسته‌بندی با موفقیت ذخیره شد" });
      state.setIsCategoryDialogOpen(false);
      state.setEditingCategory(null);
    },
    onError: () => {
      toast({ title: "خطا", description: "خطا در ذخیره دسته‌بندی", variant: "destructive" });
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: number) => apiRequest(`/supplement-categories/${categoryId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/supplement-categories'] });
      toast({ title: "موفق", description: "دسته‌بندی حذف شد" });
    },
    onError: () => {
      toast({ title: "خطا", description: "خطا در حذف دسته‌بندی", variant: "destructive" });
    }
  });

  const handleAddSupplement = (selectedCategoryId?: number) => {
    if (state.relevantCategories.length === 0) {
      toast({
        title: "خطا در افزودن مکمل",
        description: "لطفاً ابتدا یک دسته‌بندی ایجاد کنید",
        variant: "destructive",
      });
      return;
    }
    
    // اگر دسته‌بندی انتخاب شده وجود دارد، آن را تنظیم کن
    if (selectedCategoryId) {
      state.setSelectedCategoryIdForSupplement(selectedCategoryId);
    } else {
      state.setSelectedCategoryIdForSupplement(null);
    }
    
    state.setEditingSupplement(null);
    state.setIsSupplementDialogOpen(true);
  };

  const handleEditSupplement = (supplement: any) => {
    state.setEditingSupplement(supplement);
    state.setIsSupplementDialogOpen(true);
  };

  const handleDeleteSupplement = (supplementId: number) => {
    deleteSupplementMutation.mutate(supplementId);
  };

  const handleSaveSupplementOrVitamin = (supplementData: any) => {
    const dataWithId = {
      ...supplementData,
      id: state.editingSupplement?.id || undefined
    };
    saveSupplementMutation.mutate(dataWithId);
  };

  const saveSupplementMutation = useMutation({
    mutationFn: async (supplementData: any) => {
      const url = supplementData.id ? `/supplements/${supplementData.id}` : '/supplements';
      const method = supplementData.id ? 'PUT' : 'POST';
      return apiRequest(url, { method, body: supplementData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/supplements'] });
      toast({ title: "موفق", description: "مکمل با موفقیت ذخیره شد" });
      state.setIsSupplementDialogOpen(false);
      state.setEditingSupplement(null);
      // Reset selected category IDs after successful save
      state.setSelectedCategoryIdForSupplement(null);
      state.setSelectedCategoryIdForVitamin(null);
    },
    onError: () => {
      toast({ title: "خطا", description: "خطا در ذخیره مکمل", variant: "destructive" });
    }
  });

  const deleteSupplementMutation = useMutation({
    mutationFn: (supplementId: number) => apiRequest(`/supplements/${supplementId}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/supplements'] });
      toast({ title: "موفق", description: "مکمل حذف شد" });
    },
    onError: () => {
      toast({ title: "خطا", description: "خطا در حذف مکمل", variant: "destructive" });
    }
  });

  const handleAddVitamin = (selectedCategoryId?: number) => {
    if (state.relevantCategories.length === 0) {
      toast({
        title: "خطا در افزودن ویتامین",
        description: "لطفاً ابتدا یک دسته‌بندی ایجاد کنید",
        variant: "destructive",
      });
      return;
    }
    
    // اگر دسته‌بندی انتخاب شده وجود دارد، آن را تنظیم کن
    if (selectedCategoryId) {
      state.setSelectedCategoryIdForVitamin(selectedCategoryId);
    } else {
      state.setSelectedCategoryIdForVitamin(null);
    }
    
    state.setEditingSupplement(null);
    state.setIsSupplementDialogOpen(true);
  };

  const handleEditVitamin = (vitamin: any) => {
    state.setEditingSupplement(vitamin);
    state.setIsSupplementDialogOpen(true);
  };

  const handleDeleteVitamin = (vitaminId: number) => {
    deleteSupplementMutation.mutate(vitaminId);
  };

  return {
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleSaveCategory,
    handleAddSupplement,
    handleEditSupplement,
    handleDeleteSupplement,
    handleSaveSupplementOrVitamin,
    handleAddVitamin,
    handleEditVitamin,
    handleDeleteVitamin
  };
};