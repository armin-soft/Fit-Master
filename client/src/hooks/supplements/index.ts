import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import type { Supplement, SupplementCategory } from '@/types/supplement';

export const useSupplementsManager = () => {
  const [activeTab, setActiveTab] = useState<'supplement' | 'vitamin'>('supplement');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch data from API using React Query
  const { data: supplementsData = [], isLoading: supplementsLoading } = useQuery<Supplement[]>({
    queryKey: ["/api/supplements"],
    queryFn: async () => {
      const response = await fetch('/api/supplements', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supplements');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: categoriesData = [], isLoading: categoriesLoading } = useQuery<SupplementCategory[]>({
    queryKey: ["/api/supplement-categories"],
    queryFn: async () => {
      const response = await fetch('/api/supplement-categories', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supplement categories');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const isLoading = supplementsLoading || categoriesLoading;

  // Mutations for categories
  const createCategoryMutation = useMutation({
    mutationFn: async (data: { name: string, type: string, description?: string }) => {
      const response = await fetch('/api/supplement-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supplement-categories"] });
      toast({
        title: "افزودن موفق",
        description: "دسته‌بندی جدید با موفقیت اضافه شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در افزودن دسته‌بندی پیش آمد"
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: { name: string, description?: string } }) => {
      const response = await fetch(`/api/supplement-categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supplement-categories"] });
      toast({
        title: "ویرایش موفق",
        description: "دسته‌بندی با موفقیت ویرایش شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ویرایش دسته‌بندی پیش آمد"
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/supplement-categories/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supplement-categories"] });
      toast({
        title: "حذف موفق",
        description: "دسته‌بندی با موفقیت حذف شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در حذف دسته‌بندی پیش آمد"
      });
    },
  });

  // Mutations for supplements
  const createSupplementMutation = useMutation({
    mutationFn: async (data: { name: string, categoryId?: number, description?: string, dosage?: string, type: string }) => {
      const response = await fetch('/api/supplements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create supplement');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supplements"] });
      toast({
        title: "افزودن موفق",
        description: "مکمل/ویتامین جدید با موفقیت اضافه شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در افزودن مکمل/ویتامین پیش آمد"
      });
    },
  });

  const updateSupplementMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: { name: string, categoryId?: number, description?: string, dosage?: string } }) => {
      const response = await fetch(`/api/supplements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update supplement');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supplements"] });
      toast({
        title: "ویرایش موفق",
        description: "مکمل/ویتامین با موفقیت ویرایش شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ویرایش مکمل/ویتامین پیش آمد"
      });
    },
  });

  const deleteSupplementMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/supplements/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete supplement');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/supplements"] });
      toast({
        title: "حذف موفق",
        description: "مکمل/ویتامین با موفقیت حذف شد"
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در حذف مکمل/ویتامین پیش آمد"
      });
    },
  });

  // Helper functions
  const addCategory = (name: string) => {
    createCategoryMutation.mutate({
      name,
      type: activeTab,
      description: ''
    });
  };

  const updateCategory = (id: number, name: string) => {
    updateCategoryMutation.mutate({
      id,
      data: { name }
    });
  };

  const deleteCategory = (categoryToDelete: SupplementCategory) => {
    deleteCategoryMutation.mutate(categoryToDelete.id);
    
    if (selectedCategory === categoryToDelete.name) {
      setSelectedCategory(null);
    }
  };

  const addSupplement = (data: Omit<Supplement, 'id'>) => {
    createSupplementMutation.mutate({
      name: data.name,
      categoryId: data.categoryId || undefined,
      description: data.description,
      dosage: data.dosage,
      type: activeTab,
    });
  };

  const updateSupplement = (id: number, data: Omit<Supplement, 'id'>) => {
    updateSupplementMutation.mutate({
      id,
      data: {
        name: data.name,
        categoryId: data.categoryId || undefined,
        description: data.description,
        dosage: data.dosage,
      }
    });
  };

  const deleteSupplement = (id: number) => {
    deleteSupplementMutation.mutate(id);
  };

  const filteredSupplements = useMemo(() => {
    const filtered = supplementsData.filter(supplement => {
      const matchesType = supplement.type === activeTab;
      // If no category is selected, show all supplements of the current type
      if (!selectedCategory) {
        return matchesType;
      }
      // If a category is selected, match by category name
      const matchesCategory = supplement.categoryId && 
        categoriesData.find(cat => cat.id === supplement.categoryId)?.name === selectedCategory;
      return matchesType && matchesCategory;
    });
    return filtered;
  }, [supplementsData, activeTab, selectedCategory, categoriesData]);

  const relevantCategories = useMemo(() => {
    const savedCategories = categoriesData.filter(category => 
      !category.type || category.type === activeTab
    );
    return savedCategories;
  }, [categoriesData, activeTab]);

  return {
    supplements: supplementsData,
    categories: categoriesData,
    filteredSupplements,
    relevantCategories,
    activeTab,
    selectedCategory,
    isLoading,
    
    setActiveTab,
    setSelectedCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    addSupplement,
    updateSupplement,
    deleteSupplement
  };
};