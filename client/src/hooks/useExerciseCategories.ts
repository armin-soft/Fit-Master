
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseCategory } from "@/types/exercise";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useExerciseCategories = (selectedType: string | null) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({ name: "", type: selectedType || "" });

  // بارگذاری اطلاعات از دیتابیس آنلاین با استفاده از React Query
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["/api/exercise-categories"],
    queryFn: async () => {
      try {
        console.log("Loading categories from database API");
        const response = await fetch("/api/exercise-categories", {
          credentials: 'include' // اضافه کردن credentials
        });
        if (!response.ok) {
          throw new Error("Failed to fetch exercise categories");
        }
        const savedCategories = await response.json();
        console.log("Loaded categories from API:", savedCategories);
        return savedCategories;
      } catch (error) {
        console.error("Error loading categories from database:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری دسته‌بندی‌ها"
        });
        return [];
      }
    }
  });

  // به‌روزرسانی فرم با نوع انتخاب شده
  useEffect(() => {
    setCategoryFormData(prev => ({ ...prev, type: selectedType || "" }));
  }, [selectedType]);

  // ذخیره یا ویرایش دسته‌بندی
  const handleSaveCategory = useCallback(async (data: { name: string; type: string }) => {
    console.log('handleSaveCategory called with data:', data);
    
    if (!data.name.trim() || !data.type) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام و نوع دسته‌بندی را وارد کنید"
      });
      return Promise.reject("اطلاعات ناقص");
    }

    try {
      // ابتدا exercise types را بگیریم تا typeId مناسب را پیدا کنیم
      const typesResponse = await fetch('/api/exercise-types', {
        credentials: 'include' // اضافه کردن credentials برای session cookie
      });
      let selectedTypeId = 18; // پیش‌فرض
      
      if (typesResponse.ok) {
        const exerciseTypes = await typesResponse.json();
        const matchingType = exerciseTypes.find((type: any) => type.name === data.type);
        if (matchingType) {
          selectedTypeId = matchingType.id;
        }
        console.log('Found matching exercise type:', matchingType, 'for type:', data.type);
      }

      // ذخیره در دیتابیس آنلاین
      if (selectedCategory) {
        // ویرایش دسته‌بندی
        console.log('Updating category:', selectedCategory.id, 'with data:', data);
        const response = await fetch(`/api/exercise-categories/${selectedCategory.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // اضافه کردن credentials برای session cookie
          body: JSON.stringify({
            name: data.name,
            type: data.type,
            typeId: selectedTypeId,
            description: `دسته‌بندی ${data.name} برای نوع تمرین ${data.type}`,
            color: '#3B82F6' // رنگ آبی پیش‌فرض
          })
        });
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Update failed:', errorData);
          throw new Error(`Failed to update category: ${errorData}`);
        }
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ویرایش شد"
        });
      } else {
        // افزودن دسته‌بندی جدید
        console.log('Creating new category with data:', data, 'typeId:', selectedTypeId);
        const response = await fetch('/api/exercise-categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // اضافه کردن credentials برای session cookie
          body: JSON.stringify({
            name: data.name,
            type: data.type,
            typeId: selectedTypeId,
            description: `دسته‌بندی ${data.name} برای نوع تمرین ${data.type}`,
            color: '#3B82F6' // رنگ آبی پیش‌فرض
          })
        });
        
        console.log('API Response status:', response.status);
        console.log('API Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error('Create failed:', errorData);
          toast({
            variant: "destructive",
            title: "خطا",
            description: `خطا در ایجاد دسته‌بندی: ${errorData}`
          });
          throw new Error(`Failed to create category: ${errorData}`);
        }

        const createdCategory = await response.json();
        console.log('Category created successfully:', createdCategory);
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی جدید با موفقیت اضافه شد"
        });
      }

      // به‌روزرسانی کش react-query
      queryClient.invalidateQueries({ queryKey: ["/api/exercise-categories"] });
      
      setIsCategoryDialogOpen(false);
      setSelectedCategory(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: `خطا در ذخیره‌سازی دسته‌بندی: ${error instanceof Error ? error.message : 'نامشخص'}`
      });
      return Promise.reject(error);
    }
  }, [categories, selectedCategory, queryClient, toast]);

  // حذف دسته‌بندی
  const handleDeleteCategory = useCallback(async (category: ExerciseCategory, exercises: any[] = []) => {
    try {
      const exercisesInCategory = exercises.filter(ex => ex.categoryId === category.id);
      
      if (exercisesInCategory.length > 0) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "ابتدا باید حرکات موجود در این دسته‌بندی را حذف کنید"
        });
        return;
      }
      
      const updatedCategories = categories.filter((cat: any) => cat.id !== category.id);
      
      // حذف از دیتابیس آنلاین
      const response = await fetch(`/api/exercise-categories/${category.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category from database');
      }
      
      // به‌روزرسانی کش react-query
      queryClient.invalidateQueries({ queryKey: ["/api/exercise-categories"] });
      
      toast({
        title: "موفقیت",
        description: "دسته‌بندی با موفقیت حذف شد"
      });
      
      console.log("Updated categories after deletion:", updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف دسته‌بندی"
      });
    }
  }, [categories, queryClient, toast]);

  return {
    categories,
    setCategories: async (newCategories: ExerciseCategory[]) => {
      queryClient.invalidateQueries({ queryKey: ["/api/exercise-categories"] });
    },
    selectedCategory,
    setSelectedCategory,
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
    categoryFormData,
    setCategoryFormData,
    handleSaveCategory,
    handleDeleteCategory,
    isLoading
  };
};

export default useExerciseCategories;
