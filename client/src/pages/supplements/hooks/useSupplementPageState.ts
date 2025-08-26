import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useSupplementPageState = () => {
  const [activeTab, setActiveTab] = useState('supplements');
  const [isSupplementDialogOpen, setIsSupplementDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  
  // Additional state for form management
  const [categoryFormData, setCategoryFormData] = useState({});
  const [supplementFormData, setSupplementFormData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [selectedCategoryIdForSupplement, setSelectedCategoryIdForSupplement] = useState<number | null>(null);
  const [selectedCategoryIdForVitamin, setSelectedCategoryIdForVitamin] = useState<number | null>(null);
  
  // Fetch data using React Query
  const { data: supplements = [], isLoading: supplementsLoading } = useQuery({
    queryKey: ['/api/supplements'],
    queryFn: async () => {
      const response = await fetch('/api/supplements', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supplements');
      }
      return response.json();
    },
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/supplement-categories'],
    queryFn: async () => {
      const response = await fetch('/api/supplement-categories', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supplement categories');
      }
      return response.json();
    },
  });

  const isLoading = supplementsLoading || categoriesLoading;

  // Filter data based on active tab
  const filteredSupplements = useMemo(() => {
    if (activeTab === 'vitamins') {
      return supplements.filter((s: any) => s.type === 'vitamin');
    }
    return supplements.filter((s: any) => s.type === 'supplement');
  }, [supplements, activeTab]);

  const relevantCategories = useMemo(() => {
    if (activeTab === 'vitamins') {
      return categories.filter((c: any) => c.type === 'vitamin');
    }
    return categories.filter((c: any) => c.type === 'supplement');
  }, [categories, activeTab]);

  return {
    activeTab,
    setActiveTab,
    isSupplementDialogOpen,
    setIsSupplementDialogOpen,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    editingSupplement,
    setEditingSupplement,
    editingCategory,
    setEditingCategory,
    categoryFormData,
    setCategoryFormData,
    supplementFormData,
    setSupplementFormData,
    selectedType,
    setSelectedType,
    selectedSupplement,
    setSelectedSupplement,
    selectedCategoryIdForSupplement,
    setSelectedCategoryIdForSupplement,
    selectedCategoryIdForVitamin,
    setSelectedCategoryIdForVitamin,
    supplements,
    categories,
    filteredSupplements,
    relevantCategories,
    filteredCategories: relevantCategories,
    isLoading
  };
};