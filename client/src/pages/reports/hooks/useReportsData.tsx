
import { useStudents } from "@/hooks/useStudents";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const useReportsData = () => {
  const { students } = useStudents();
  
  // Calculate real statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.name && s.phone).length;
  // محاسبه شاگردان با برنامه از API واقعی
  const [studentsWithPrograms, setStudentsWithPrograms] = useState(0);
  
  useEffect(() => {
    const calculateRealPrograms = async () => {
      let count = 0;
      
      for (const student of students) {
        let hasProgram = false;
        
        try {
          // بررسی برنامه تمرینی
          const exerciseRes = await fetch(`/api/students/${student.id}/exercise-programs`, {
            credentials: 'include'
          });
          if (exerciseRes.ok) {
            const exercises = await exerciseRes.json();
            if (Array.isArray(exercises) && exercises.length > 0) {
              hasProgram = true;
            }
          }
          
          // بررسی برنامه غذایی
          const mealRes = await fetch(`/api/students/${student.id}/meal-plans`, {
            credentials: 'include'
          });
          if (mealRes.ok) {
            const meals = await mealRes.json();
            if (Array.isArray(meals) && meals.length > 0) {
              hasProgram = true;
            }
          }
          
          // بررسی مکمل‌ها
          const supplementRes = await fetch(`/api/students/${student.id}/supplements`, {
            credentials: 'include'
          });
          if (supplementRes.ok) {
            const supplements = await supplementRes.json();
            if (Array.isArray(supplements) && supplements.length > 0) {
              hasProgram = true;
            }
          }
          
          if (hasProgram) {
            count++;
          }
        } catch (error) {
          console.error(`Error fetching programs for student ${student.id}:`, error);
        }
      }
      
      setStudentsWithPrograms(count);
    };
    
    if (students.length > 0) {
      calculateRealPrograms();
    }
  }, [students]);
  
  const completionRate = totalStudents > 0 ? Math.round((studentsWithPrograms / totalStudents) * 100) : 0;
  const averageProgress = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;

  // Gender distribution
  const maleStudents = students.filter(s => s.gender === 'male').length;
  const femaleStudents = students.filter(s => s.gender === 'female').length;

  return {
    totalStudents,
    activeStudents,
    studentsWithPrograms,
    completionRate,
    averageProgress,
    maleStudents,
    femaleStudents,
    students
  };
};

// Hook for weekly statistics from real database
export const useWeeklyStats = () => {
  return useQuery({
    queryKey: ['/api/reports/weekly-stats'],
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

// Hook for activity statistics from real database
export const useActivityStats = () => {
  return useQuery({
    queryKey: ['/api/reports/activity-stats'],
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
