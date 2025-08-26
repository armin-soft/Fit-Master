import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ExerciseType } from "@/types/exercise";
import { InsertExerciseType } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export const useExerciseTypesMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Create exercise type
  const createExerciseType = useMutation({
    mutationFn: async (data: Omit<InsertExerciseType, 'trainerId'>) => {
      return await apiRequest('/exercise-types', {
        method: 'POST',
        body: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercise-types'] });
      toast({
        title: "موفقیت",
        description: "نوع تمرین جدید با موفقیت ایجاد شد"
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ایجاد نوع تمرین"
      });
    }
  });

  // Update exercise type
  const updateExerciseType = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertExerciseType> }) => {
      return await apiRequest(`/exercise-types/${id}`, {
        method: 'PUT',
        body: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercise-types'] });
      toast({
        title: "موفقیت",
        description: "نوع تمرین با موفقیت ویرایش شد"
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ویرایش نوع تمرین"
      });
    }
  });

  // Delete exercise type
  const deleteExerciseType = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/exercise-types/${id}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercise-types'] });
      queryClient.invalidateQueries({ queryKey: ['/api/exercise-categories'] });
      toast({
        title: "موفقیت",
        description: "نوع تمرین با موفقیت حذف شد"
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف نوع تمرین"
      });
    }
  });

  return {
    createExerciseType,
    updateExerciseType,
    deleteExerciseType
  };
};