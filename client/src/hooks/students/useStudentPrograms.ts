import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// Hook for fetching student's exercise programs
export const useStudentExercisePrograms = (studentId: number) => {
  return useQuery({
    queryKey: ['/api/students', studentId, 'exercise-programs'],
    queryFn: async () => {
      const response = await fetch(`/api/students/${studentId}/exercise-programs`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch student exercise programs');
      }
      return response.json();
    },
    enabled: !!studentId,
  });
};

// Hook for fetching student's meal plans
export const useStudentMealPlans = (studentId: number) => {
  return useQuery({
    queryKey: ['/api/students', studentId, 'meal-plans'],
    queryFn: async () => {
      const response = await fetch(`/api/students/${studentId}/meal-plans`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch student meal plans');
      }
      return response.json();
    },
    enabled: !!studentId,
  });
};

// Hook for fetching student's supplements
export const useStudentSupplements = (studentId: number) => {
  return useQuery({
    queryKey: ['/api/students', studentId, 'supplements'],
    queryFn: async () => {
      const response = await fetch(`/api/students/${studentId}/supplements`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch student supplements');
      }
      return response.json();
    },
    enabled: !!studentId,
  });
};

// Combined hook for fetching all student programs
export const useStudentAllPrograms = (studentId: number) => {
  const queryClient = useQueryClient();
  
  const exercisePrograms = useStudentExercisePrograms(studentId);
  const mealPlans = useStudentMealPlans(studentId);
  const supplements = useStudentSupplements(studentId);

  // Listen for programs update events and invalidate queries
  useEffect(() => {
    const handleProgramsUpdate = (event: CustomEvent) => {
      if (event.detail?.studentId === studentId) {
        queryClient.invalidateQueries({ queryKey: ['/api/students', studentId, 'exercise-programs'] });
        queryClient.invalidateQueries({ queryKey: ['/api/students', studentId, 'meal-plans'] });
        queryClient.invalidateQueries({ queryKey: ['/api/students', studentId, 'supplements'] });
      }
    };

    window.addEventListener('programsUpdated', handleProgramsUpdate as EventListener);
    return () => window.removeEventListener('programsUpdated', handleProgramsUpdate as EventListener);
  }, [studentId, queryClient]);

  return {
    exercisePrograms,
    mealPlans,
    supplements,
    isLoading: exercisePrograms.isLoading || mealPlans.isLoading || supplements.isLoading,
    isError: exercisePrograms.isError || mealPlans.isError || supplements.isError,
  };
};