
import { useState, useCallback, useEffect } from "react";
import { SidebarStats } from "../../modern-sidebar/types";

export const useStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 5
  });

  const loadStats = useCallback(async () => {
    try {
      console.log('Loading sidebar stats...');
      
      // دریافت اطلاعات شاگردان از API
      const studentsRes = await fetch('/api/students', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const students = studentsRes.ok ? await studentsRes.json() : [];
      
      let studentsCount = 0;
      let activeProgramsCount = 0;
      let totalSessions = 0;
      
      if (Array.isArray(students)) {
        studentsCount = students.length;
        console.log('Students count for sidebar:', studentsCount);
        
        // محاسبه برنامه‌های فعال از API جداگانه
        for (const student of students) {
          let hasActiveProgram = false;
          let studentSessions = 0;
          
          try {
            // بررسی برنامه‌های تمرینی
            const exerciseRes = await fetch(`/api/students/${student.id}/exercise-programs`, {
              credentials: 'include'
            });
            if (exerciseRes.ok) {
              const exercises = await exerciseRes.json();
              if (Array.isArray(exercises) && exercises.length > 0) {
                hasActiveProgram = true;
                studentSessions += exercises.length;
              }
            }
            
            // بررسی برنامه‌های غذایی
            const mealRes = await fetch(`/api/students/${student.id}/meal-plans`, {
              credentials: 'include'
            });
            if (mealRes.ok) {
              const meals = await mealRes.json();
              if (Array.isArray(meals) && meals.length > 0) {
                hasActiveProgram = true;
                studentSessions += Math.ceil(meals.length / 3); // تقسیم بر وعده‌ها
              }
            }
            
            // بررسی مکمل‌ها
            const supplementRes = await fetch(`/api/students/${student.id}/supplements`, {
              credentials: 'include'
            });
            if (supplementRes.ok) {
              const supplements = await supplementRes.json();
              if (Array.isArray(supplements) && supplements.length > 0) {
                hasActiveProgram = true;
                studentSessions += supplements.length;
              }
            }
            
            if (hasActiveProgram) {
              activeProgramsCount++;
              totalSessions += studentSessions;
            }
          } catch (error) {
            console.error(`Error fetching programs for student ${student.id}:`, error);
          }
        }
      }

      const newStats = {
        totalStudents: studentsCount,
        activePrograms: activeProgramsCount,
        completedSessions: totalSessions,
        rating: 5
      };

      console.log('New sidebar stats:', newStats);
      setStats(newStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  // Load stats on mount and listen for changes
  useEffect(() => {
    loadStats();

    const handleStorageChange = (e?: StorageEvent) => {
      console.log('Stats data: Storage change detected', e?.key);
      loadStats();
    };

    const handleCustomEvent = (e: CustomEvent) => {
      console.log('Stats data: Custom event detected', e.type);
      loadStats();
    };

    // Listen for various events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleCustomEvent as EventListener);
    window.addEventListener('profileUpdated', handleCustomEvent as EventListener);
    window.addEventListener('database-updated', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleCustomEvent as EventListener);
      window.removeEventListener('profileUpdated', handleCustomEvent as EventListener);
      window.removeEventListener('database-updated', handleCustomEvent as EventListener);
    };
  }, [loadStats]);

  return {
    stats,
    loadStats
  };
};
