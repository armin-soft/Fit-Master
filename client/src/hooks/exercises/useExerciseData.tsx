
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Exercise, ExerciseCategory, ExerciseType } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook to fetch exercises data from PostgreSQL database via API
 */
export const useExerciseData = () => {
  const { toast } = useToast();

  // Get exercises data from API
  const { data: exercises = [], isLoading: exercisesLoading, error: exercisesError } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Get main exercise types from API
  const { data: exerciseTypes = [], isLoading: typesLoading, error: typesError } = useQuery<ExerciseType[]>({
    queryKey: ["/api/exercise-types"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Get subcategories data from API  
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<ExerciseCategory[]>({
    queryKey: ["/api/exercise-categories"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Handle errors using useEffect to avoid render-time updates
  useEffect(() => {
    if (exercisesError) {
      console.error("Error loading exercises:", exercisesError);
      toast({
        variant: "destructive", 
        title: "خطا در بارگیری", 
        description: "اطلاعات تمرین‌ها بارگیری نشد"
      });
    }
  }, [exercisesError, toast]);

  useEffect(() => {
    if (typesError) {
      console.error("Error loading exercise types:", typesError);
      toast({
        variant: "destructive", 
        title: "خطا در بارگیری", 
        description: "انواع تمرین‌ها بارگیری نشد"
      });
    }
  }, [typesError, toast]);

  const isLoading = exercisesLoading || categoriesLoading || typesLoading;

  return {
    exercises,
    categories,
    exerciseTypes,
    isLoading,
    exercisesError
  };
};
