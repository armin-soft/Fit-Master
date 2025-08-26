
import { useState, useEffect } from "react";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface UseExercisesStageProps {
  categoryId: string | null;
  typeId: string | null;
}

export const useExercisesStage = ({ categoryId, typeId }: UseExercisesStageProps) => {
  // Guard clauses for null/undefined parameters
  if (!categoryId || !typeId) {
    return {
      isLoading: false,
      filteredExercises: [],
      selectedCategory: null,
      selectedExerciseIds: [],
      setSelectedExerciseIds: () => {},
      viewMode: "grid" as const,
      setViewMode: () => {},
      handleEditExercise: () => {},
      handleDeleteExercise: async () => {},
      isAddDialogOpen: false,
      setIsAddDialogOpen: () => {},
      isDeleteDialogOpen: false,
      setIsDeleteDialogOpen: () => {},
      selectedExercise: undefined,
      formData: { name: "", categoryId: 0 },
      setFormData: () => {},
      handleSubmit: async () => {},
      quickSpeechText: "",
      setQuickSpeechText: () => {},
      handleQuickAdd: async () => {},
      showQuickSpeech: false,
      setShowQuickSpeech: () => {}
    };
  }
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseData();
  const [showQuickSpeech, setShowQuickSpeech] = useState(false);
  
  // State for managing dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  
  // تنظیم دسته‌بندی پیش‌فرض برای حرکت جدید
  const [formData, setFormData] = useState({ 
    name: "", 
    categoryId: parseInt(categoryId) || 0 
  });
  
  const [quickSpeechText, setQuickSpeechText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Update form data when category changes - تنظیم خودکار دسته‌بندی
  useEffect(() => {
    const newCategoryId = parseInt(categoryId) || 0;
    setFormData(prev => ({ 
      ...prev, 
      categoryId: newCategoryId 
    }));

  }, [categoryId]);

  // Clear selected exercises when category changes
  useEffect(() => {
    setSelectedExerciseIds([]);
  }, [categoryId]);
  
  // Filter exercises based on selected category
  const filteredExercises = exercises
    .filter(ex => ex.categoryId && ex.categoryId.toString() === categoryId)
    .filter(ex => ex.name && ex.name.toLowerCase().includes(searchQuery.toLowerCase()));
  

  
  // Find selected category and type
  const selectedCategory = categories.find(cat => cat.id && cat.id.toString() === categoryId);
  
  // Delete exercises (single or bulk)
  const handleDeleteExercise = async (ids?: number | number[]) => {
    try {
      let idsToDelete: number[];
      
      if (typeof ids === 'number') {
        idsToDelete = [ids];
      } else if (Array.isArray(ids)) {
        idsToDelete = ids;
      } else {
        idsToDelete = selectedExerciseIds;
      }
      
      if (idsToDelete.length === 0) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "هیچ حرکتی برای حذف انتخاب نشده"
        });
        return;
      }

      // Use bulk delete API
      const response = await fetch('/api/exercises', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ ids: idsToDelete })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Delete failed:', errorData);
        toast({
          variant: "destructive",
          title: "خطا",
          description: `خطا در حذف حرکت: ${errorData}`
        });
        return;
      }

      // Invalidate and refetch exercises
      await queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
      
      toast({
        title: "موفقیت",
        description: idsToDelete.length === 1 ? "حرکت با موفقیت حذف شد" : `${idsToDelete.length} حرکت با موفقیت حذف شد`,
        variant: "success",
      });
      
      setSelectedExerciseIds([]);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting exercise:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف حرکت"
      });
    }
  };

  // Edit exercise
  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setFormData({
      name: exercise.name,
      categoryId: exercise.categoryId
    });
    setIsAddDialogOpen(true);
  };

  // Save new or edited exercise
  const handleSubmit = async (data: { name: string; categoryId: number }) => {
    try {

      
      // Check for duplicate exercise name
      const exerciseExists = exercises.some(ex => 
        ex.name.toLowerCase() === data.name.toLowerCase() && 
        (selectedExercise ? ex.id !== selectedExercise.id : true)
      );
      
      if (exerciseExists) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این حرکت قبلاً اضافه شده است"
        });
        return Promise.reject("نام تکراری");
      }

      const url = selectedExercise ? `/api/exercises/${selectedExercise.id}` : '/api/exercises';
      const method = selectedExercise ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: data.name,
          categoryId: data.categoryId
          // trainerId will be extracted from session by backend
        })
      });


      
      if (!response.ok) {
        const errorData = await response.text();
        console.error(`${method} failed:`, errorData);
        toast({
          variant: "destructive",
          title: "خطا",
          description: `خطا در ${selectedExercise ? 'ویرایش' : 'ایجاد'} حرکت: ${errorData}`
        });
        return Promise.reject(errorData);
      }

      const result = await response.json();


      // Invalidate and refetch exercises
      await queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
      
      toast({
        title: "موفقیت",
        description: selectedExercise ? "حرکت با موفقیت ویرایش شد" : "حرکت جدید با موفقیت اضافه شد",
        variant: "success",
      });
      
      setIsAddDialogOpen(false);
      setSelectedExercise(undefined);
      
      // ریست کردن فرم با حفظ دسته‌بندی فعلی
      setFormData({ 
        name: "", 
        categoryId: parseInt(categoryId) || 0 
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving exercise:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره سازی حرکت"
      });
      return Promise.reject(error);
    }
  };

  // Quick add with speech
  const handleQuickAdd = () => {
    if (!quickSpeechText.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام حرکت را وارد کنید"
      });
      return;
    }

    handleSubmit({
      name: quickSpeechText.trim(),
      categoryId: parseInt(categoryId) || 0
    }).then(() => {
      setQuickSpeechText("");
      setShowQuickSpeech(false);
    });
  };

  return {
    // Data
    isLoading,
    filteredExercises,
    selectedCategory,
    
    // State
    selectedExerciseIds,
    setSelectedExerciseIds,
    viewMode,
    setViewMode,
    showQuickSpeech,
    setShowQuickSpeech,
    
    // Dialog state
    isAddDialogOpen,
    setIsAddDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedExercise,
    formData,
    setFormData,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Quick speech
    quickSpeechText,
    setQuickSpeechText,
    
    // Handlers
    handleDeleteExercise,
    handleSubmit,
    handleEditExercise,
    handleQuickAdd
  };
};

export default useExercisesStage;
