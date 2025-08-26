
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Exercise } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface UseExerciseCRUDProps {
  exercises: Exercise[];
}

export const useExerciseCRUD = ({ exercises }: UseExerciseCRUDProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add/Update exercise mutation
  const saveExerciseMutation = useMutation({
    mutationFn: async ({ formData, selectedExercise }: { 
      formData: { name: string; categoryId: number },
      selectedExercise: Exercise | null 
    }) => {
      if (selectedExercise) {
        // Update existing exercise
        const response = await apiRequest(`/exercises/${selectedExercise.id}`, {
          method: "PUT",
          body: {
            name: formData.name,
            categoryId: formData.categoryId,
            description: "",
            difficulty: "beginner",
            equipment: ""
          },
        });
        return response;
      } else {
        // Add new exercise
        const response = await apiRequest("/exercises", {
          method: "POST",
          body: {
            name: formData.name,
            categoryId: formData.categoryId,
            description: "",
            difficulty: "beginner", 
            equipment: ""
          },
        });
        return response;
      }
    },
    onSuccess: (result, { selectedExercise }) => {
      // Invalidate and refetch exercises
      queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
      
      toast({
        title: selectedExercise ? "تمرین به‌روزرسانی شد" : "تمرین جدید اضافه شد",
        description: selectedExercise 
          ? "تغییرات با موفقیت ذخیره شد"
          : "تمرین جدید به لیست اضافه شد"
      });
    },
    onError: (error) => {
      console.error("Error saving exercise:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین پیش آمد"
      });
    }
  });

  // Delete exercises mutation
  const deleteExercisesMutation = useMutation({
    mutationFn: async (exerciseIds: number[]) => {
      // Use bulk delete API endpoint
      const response = await apiRequest('/exercises', { 
        method: "DELETE",
        body: { ids: exerciseIds }
      });
      return exerciseIds;
    },
    onSuccess: (exerciseIds) => {
      // Invalidate and refetch exercises
      queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
      
      toast({
        title: "تمرین‌ها حذف شدند",
        description: `${exerciseIds.length} تمرین با موفقیت حذف شد`
      });
    },
    onError: (error) => {
      console.error("Error deleting exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در حذف",
        description: "مشکلی در حذف تمرین‌ها پیش آمد"
      });
    }
  });

  const handleExerciseSave = (
    formData: { name: string; categoryId: number },
    selectedExercise: Exercise | null = null
  ) => {
    saveExerciseMutation.mutate({ formData, selectedExercise });
    return !saveExerciseMutation.isError;
  };

  const handleDeleteExercises = (exerciseIds: number[]) => {
    deleteExercisesMutation.mutate(exerciseIds);
    return !deleteExercisesMutation.isError;
  };

  const updateExercises = async (newExercises: Exercise[]) => {
    // Just invalidate the cache to refetch from API
    queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
  };

  return {
    handleExerciseSave,
    handleDeleteExercises,
    updateExercises,
    isLoading: saveExerciseMutation.isPending || deleteExercisesMutation.isPending
  };
};
