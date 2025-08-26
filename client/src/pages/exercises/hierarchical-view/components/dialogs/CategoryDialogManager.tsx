
import React, { useState, useEffect } from "react";
import { CategoryDialog } from "@/components/exercises/CategoryDialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { ExerciseCategory } from "@/types/exercise";

interface CategoryDialogManagerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingCategory: ExerciseCategory | null;
  selectedTypeId: string | null;
  onComplete: () => void;
}

export const CategoryDialogManager: React.FC<CategoryDialogManagerProps> = ({
  isOpen,
  onOpenChange,
  editingCategory,
  selectedTypeId,
  onComplete
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { exerciseTypes, categories } = useExerciseData();
  const [formData, setFormData] = useState({ name: "", type: selectedTypeId || "" });
  
  // Update form data when editing category or selected type changes
  useEffect(() => {
    if (!isOpen) return; // Only update when dialog is open
    
    if (editingCategory) {
      setFormData({ 
        name: editingCategory.name, 
        type: editingCategory.type 
      });
    } else {
      // If selectedTypeId is provided, find the corresponding type name
      let selectedTypeName = "";
      if (selectedTypeId && exerciseTypes && exerciseTypes.length > 0) {
        const selectedTypeObj = exerciseTypes.find(t => 
          (typeof t === 'object' ? t.id.toString() : t) === selectedTypeId.toString()
        );
        selectedTypeName = selectedTypeObj ? (typeof selectedTypeObj === 'object' ? selectedTypeObj.name : selectedTypeObj) : "";
      }
      
      setFormData({ 
        name: "", 
        type: selectedTypeName
      });
    }
  }, [editingCategory, selectedTypeId, isOpen]);

  // Handle save category
  const handleSaveCategory = async (data?: { name: string; type: string }) => {
    try {
      const formToSave = data || formData;
      
      if (!formToSave.name.trim() || !formToSave.type) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "لطفاً نام دسته‌بندی و نوع تمرین را وارد کنید"
        });
        return;
      }

      // استفاده از API برای ذخیره در دیتابیس
      const selectedTypeObj = exerciseTypes.find(t => 
        (typeof t === 'object' ? t.name : t) === formToSave.type
      );
      const typeId = selectedTypeObj ? (typeof selectedTypeObj === 'object' ? selectedTypeObj.id : null) : null;
      
      if (!typeId) {
        console.log("Debug - formToSave.type:", formToSave.type);
        console.log("Debug - exerciseTypes:", exerciseTypes);
        console.log("Debug - selectedTypeObj:", selectedTypeObj);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "نوع تمرین معتبر نیست"
        });
        return;
      }
      
      const url = editingCategory ? `/api/exercise-categories/${editingCategory.id}` : '/api/exercise-categories';
      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formToSave.name,
          type: formToSave.type,
          typeId: typeId,
          description: '',
          color: '#3B82F6'
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        toast({
          variant: "destructive",
          title: "خطا",
          description: `خطا در ${editingCategory ? 'ویرایش' : 'ایجاد'} دسته‌بندی: ${errorData}`
        });
        return;
      }

      await response.json();

      // Invalidate and refetch categories
      await queryClient.invalidateQueries({ queryKey: ["/api/exercise-categories"] });
      
      toast({
        title: "موفقیت",
        description: `دسته‌بندی با موفقیت ${editingCategory ? 'ویرایش شد' : 'اضافه شد'}`
      });

      onOpenChange(false);
      onComplete();
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: `خطا در ${editingCategory ? 'ویرایش' : 'ایجاد'} دسته‌بندی`
      });
    }
  };

  // Handle old code for reference
  const handleSaveCategoryOld = async (data?: { name: string; type: string }) => {
    try {
      const formToSave = data || formData;
      
      if (!formToSave.name.trim() || !formToSave.type) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "لطفاً نام دسته‌بندی و نوع تمرین را وارد کنید"
        });
        return;
      }
      
      let updatedCategories;
      const existingCategories = categories || [];
      
      if (editingCategory) {
        // Check for duplicate names except the editing one
        if (existingCategories.some(c => 
          c.id !== editingCategory.id && 
          c.name.toLowerCase() === formToSave.name.toLowerCase() && 
          c.type === formToSave.type
        )) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این دسته‌بندی قبلاً برای این نوع تمرین اضافه شده است"
          });
          return;
        }
        
        updatedCategories = existingCategories.map(c => 
          c.id === editingCategory.id 
            ? { ...c, name: formToSave.name, type: formToSave.type } 
            : c
        );
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ویرایش شد"
        });
      } else {
        // Check for duplicate names
        if (existingCategories.some(c => 
          c.name.toLowerCase() === formToSave.name.toLowerCase() && 
          c.type === formToSave.type
        )) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این دسته‌بندی قبلاً برای این نوع تمرین اضافه شده است"
          });
          return;
        }
        
        const newCategoryId = Date.now(); // Use timestamp as ID
        const newCategory: ExerciseCategory = {
          id: newCategoryId,
          name: formToSave.name,
          type: formToSave.type,
          trainerId: 0, // Will be set by backend from session
          createdAt: new Date().toISOString()
        };
        
        updatedCategories = [...existingCategories, newCategory];
        
        toast({
          title: "موفقیت",
          description: "دسته‌بندی جدید با موفقیت اضافه شد"
        });
      }
      
      const { setStorageItem } = await import('@/utils/databaseStorage');
      await setStorageItem("exerciseCategories", updatedCategories);
      queryClient.setQueryData(["/api/exercise-categories"], updatedCategories);
      
      onOpenChange(false);
      onComplete();
    } catch (error) {
      console.error("Error saving category:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی دسته‌بندی"
      });
    }
  };

  return (
    <CategoryDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      exerciseTypes={exerciseTypes as any}
      selectedType={formData.type}
      formData={formData}
      onFormDataChange={setFormData}
      onTypeChange={(type) => setFormData(prev => ({ ...prev, type }))}
      onSave={handleSaveCategory}
      isEditMode={!!editingCategory}
    />
  );
};
