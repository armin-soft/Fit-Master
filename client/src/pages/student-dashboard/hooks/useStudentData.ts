import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

interface StudentData {
  name: string;
  totalWorkouts: number;
  completedDays: number;
  weeklyProgress: number;
  todayWorkouts: number;
  calories: number;
  weeklyGoal: number;
  weightProgress: number;
  nextWorkout: string;
  currentWeight: number;
  targetWeight: number;
  totalMeals: number;
  totalSupplements: number;
  exerciseStreak: number;
  mealCompletionRate: number;
  supplementCompletionRate: number;
  recentActivities: Array<{
    id: string;
    type: 'workout' | 'meal' | 'supplement' | 'progress';
    title: string;
    description: string;
    time: string;
    status: 'completed' | 'pending' | 'missed';
    value?: number;
  }>;
}

export const useStudentData = () => {
  // Fetch current student data from API
  const { data: rawData, isLoading: loading } = useQuery({
    queryKey: ['/api/current-student'],
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Process data with useMemo for optimization
  const studentData = useMemo((): StudentData => {
    if (!rawData) {
      return {
        name: '',
        totalWorkouts: 0,
        completedDays: 0,
        weeklyProgress: 0,
        todayWorkouts: 0,
        calories: 0,
        weeklyGoal: 0,
        weightProgress: 0,
        nextWorkout: '',
        currentWeight: 0,
        targetWeight: 0,
        totalMeals: 0,
        totalSupplements: 0,
        exerciseStreak: 0,
        mealCompletionRate: 0,
        supplementCompletionRate: 0,
        recentActivities: []
      };
    }

    // Use real data from the student object - no complex calculations on assumed structure
    const currentWeight = (rawData as any).weight || 0;
    const name = (rawData as any).name || '';
    
    // Simple data extraction from actual student record
    const totalWorkouts = 0; // This should come from separate API calls for exercise programs
    const totalMeals = 0; // This should come from separate API calls for meal plans  
    const totalSupplements = 0; // This should come from separate API calls for supplements
    
    const weightProgress = 0; // Calculate from actual weight history data
    const weeklyProgress = 0; // Calculate from actual completion data
    const calories = 0; // Should come from actual meal plan data

    // Simple completion rates based on real data
    const mealCompletionRate = 0; // Calculate from actual completion data
    const supplementCompletionRate = 0; // Calculate from actual completion data
    const exerciseStreak = 0; // Calculate from actual exercise completion data

    // Recent activities should come from actual activity log, not fabricated
    const recentActivities: StudentData['recentActivities'] = [];

    return {
      name,
      totalWorkouts,
      completedDays: 0,
      weeklyProgress,
      todayWorkouts: 0,
      calories,
      weeklyGoal: 0,
      weightProgress,
      nextWorkout: '',
      currentWeight,
      targetWeight: 0,
      totalMeals,
      totalSupplements,
      exerciseStreak,
      mealCompletionRate,
      supplementCompletionRate,
      recentActivities
    };
  }, [rawData]);

  return { studentData, loading };
};