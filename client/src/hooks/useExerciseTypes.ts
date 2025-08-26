
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useExerciseTypes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [editingType, setEditingType] = useState<string | null>(null);

  // بارگذاری اطلاعات از دیتابیس آنلاین با استفاده از React Query
  const { data: exerciseTypes = [], isLoading } = useQuery({
    queryKey: ["/api/exercise-types"],
    queryFn: async () => {
      try {
        console.log("Loading exercise types from database API");
        // Get exercise categories and use their names as types
        const response = await fetch('/api/exercise-categories');
        if (!response.ok) {
          throw new Error("Failed to fetch exercise categories");
        }
        const categories = await response.json();
        const types = categories.map((cat: any) => cat.name);
        console.log("Loaded exercise types from categories:", types);
        return types;
      } catch (error) {
        console.error("Error loading exercise types from database:", error);
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بارگذاری انواع تمرین‌ها"
        });
        return [];
      }
    }
  });

  // افزودن نوع جدید
  const handleAddType = useCallback(() => {
    setEditingType(null);
    setNewTypeName("");
    setIsTypeDialogOpen(true);
  }, []);

  // ویرایش نوع موجود
  const handleEditType = useCallback((type: string) => {
    setEditingType(type);
    setNewTypeName(type);
    setIsTypeDialogOpen(true);
  }, []);

  // ذخیره نوع جدید یا ویرایش شده
  const handleSaveType = useCallback(async () => {
    if (!newTypeName.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام نوع را وارد کنید"
      });
      return;
    }

    try {
      let updatedTypes;
      
      if (editingType) {
        // ویرایش نوع موجود
        if ((exerciseTypes as string[]).includes(newTypeName) && newTypeName !== editingType) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این نوع قبلاً اضافه شده است"
          });
          return;
        }

        updatedTypes = [...(exerciseTypes as string[])];
        const index = updatedTypes.indexOf(editingType);
        if (index !== -1) {
          updatedTypes[index] = newTypeName;
        }

        if (selectedType === editingType) {
          setSelectedType(newTypeName);
        }

        toast({
          title: "موفقیت",
          description: "نوع حرکت با موفقیت ویرایش شد"
        });
      } else {
        // افزودن نوع جدید
        if ((exerciseTypes as string[]).includes(newTypeName)) {
          toast({
            variant: "destructive",
            title: "خطا",
            description: "این نوع قبلاً اضافه شده است"
          });
          return;
        }

        updatedTypes = [...exerciseTypes, newTypeName];
        
        // اگر هیچ نوعی انتخاب نشده باشد، نوع جدید را انتخاب کن
        if (selectedType === null) {
          setSelectedType(newTypeName);
        }
        
        toast({
          title: "موفقیت",
          description: "نوع جدید با موفقیت اضافه شد"
        });
      }

      // به‌روزرسانی کش react-query
      queryClient.invalidateQueries({ queryKey: ["/api/exercise-types"] });
      
      setIsTypeDialogOpen(false);
      setEditingType(null);
      setNewTypeName("");
      
      console.log("Updated exercise types:", updatedTypes);
    } catch (error) {
      console.error("Error saving exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی نوع حرکت"
      });
    }
  }, [editingType, exerciseTypes, newTypeName, selectedType, queryClient, toast]);

  // حذف نوع
  const handleDeleteType = useCallback(async (type: string) => {
    try {
      const updatedTypes = (exerciseTypes as string[]).filter(t => t !== type);
      
      // اگر نوع حذف شده، انتخاب شده بود، نوع انتخاب شده را به اولین نوع موجود تغییر بده
      if (selectedType === type) {
        if (updatedTypes.length > 0) {
          setSelectedType(updatedTypes[0]);
        } else {
          setSelectedType(null);
        }
      }
      
      // به‌روزرسانی کش react-query
      queryClient.invalidateQueries({ queryKey: ["/api/exercise-types"] });
      
      toast({
        title: "موفقیت",
        description: "نوع حرکت با موفقیت حذف شد"
      });
      
      console.log("Updated exercise types after deletion:", updatedTypes);
    } catch (error) {
      console.error("Error deleting exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف نوع حرکت"
      });
    }
  }, [exerciseTypes, selectedType, queryClient, toast]);

  return {
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
    isLoading
  };
};

export default useExerciseTypes;
