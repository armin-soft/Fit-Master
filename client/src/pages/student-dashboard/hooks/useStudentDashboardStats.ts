import { useQuery } from "@tanstack/react-query";

interface StudentDashboardStats {
  weeklyProgress: number;
  completedExercises: number;
  totalExercises: number;
  completedMeals: number;
  totalMeals: number;
  supplementsCompleted: number;
  totalSupplements: number;
  overallProgress: number;
}

export const useStudentDashboardStats = (): StudentDashboardStats & { isLoading: boolean } => {
  // Get current student ID first
  const { data: currentStudent } = useQuery<any>({
    queryKey: ['/api/current-student'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get real data from API - using dynamic student ID
  const { data: studentExercises = [], isLoading: exerciseLoading } = useQuery<any[]>({
    queryKey: [`/api/students/${currentStudent?.id}/exercise-programs`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const { data: studentMeals = [], isLoading: mealsLoading } = useQuery<any[]>({
    queryKey: [`/api/students/${currentStudent?.id}/meal-plans`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000,
  });

  const { data: studentSupplements = [], isLoading: supplementsLoading } = useQuery<any[]>({
    queryKey: [`/api/students/${currentStudent?.id}/supplements`],
    enabled: !!currentStudent?.id,
    staleTime: 2 * 60 * 1000,
  });



  const isLoading = exerciseLoading || mealsLoading || supplementsLoading;

  // Calculate real stats from database data (no fake data fallback)
  const totalExercises = Array.isArray(studentExercises) ? studentExercises.length : 0;
  const completedExercises = Array.isArray(studentExercises) 
    ? studentExercises.filter((ex: any) => ex.isCompleted || ex.completed).length 
    : 0;
  
  const totalMeals = Array.isArray(studentMeals) ? studentMeals.length : 0;
  const completedMeals = Array.isArray(studentMeals) 
    ? studentMeals.filter((meal: any) => meal.isCompleted || meal.completed).length 
    : 0;
  
  const totalSupplements = Array.isArray(studentSupplements) ? studentSupplements.length : 0;
  const supplementsCompleted = Array.isArray(studentSupplements) 
    ? studentSupplements.filter((supp: any) => supp.isActive || supp.active).length 
    : 0;
  
  const totalItems = totalExercises + totalMeals + totalSupplements;
  const completedItems = completedExercises + completedMeals + supplementsCompleted;
  
  const overallProgress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const weeklyProgress = overallProgress; // Use real progress, no artificial adjustment

  const stats: StudentDashboardStats = {
    weeklyProgress,
    completedExercises,
    totalExercises,
    completedMeals,
    totalMeals,
    supplementsCompleted,
    totalSupplements,
    overallProgress
  };

  return { ...stats, isLoading };
};