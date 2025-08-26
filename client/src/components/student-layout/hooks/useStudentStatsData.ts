import { useState, useCallback } from "react";
import { SidebarStats } from "@/components/modern-sidebar/types";

export const useStudentStatsData = () => {
  const [stats, setStats] = useState<SidebarStats>({
    totalStudents: 0,
    activePrograms: 0,
    completedSessions: 0,
    rating: 0
  });

  const loadStats = useCallback(async () => {
    try {
      // دریافت ID شاگرد جاری
      const studentIdResponse = await fetch('/api/current-student', {
        credentials: 'include'
      });
      
      if (!studentIdResponse.ok) {
        throw new Error('Student not found');
      }
      
      const currentStudent = await studentIdResponse.json();
      const studentId = currentStudent.id;

      // دریافت آمار برنامه‌های تمرینی
      const exerciseResponse = await fetch(`/api/students/${studentId}/exercise-programs`, {
        credentials: 'include'
      });
      const exercisePrograms = exerciseResponse.ok ? await exerciseResponse.json() : [];

      // دریافت آمار برنامه‌های غذایی
      const mealResponse = await fetch(`/api/students/${studentId}/meal-plans`, {
        credentials: 'include'
      });
      const mealPlans = mealResponse.ok ? await mealResponse.json() : [];

      // دریافت آمار مکمل‌ها
      const supplementResponse = await fetch(`/api/students/${studentId}/supplements`, {
        credentials: 'include'
      });
      const supplements = supplementResponse.ok ? await supplementResponse.json() : [];

      // محاسبه آمار واقعی
      const totalExercises = exercisePrograms.length;
      const totalMeals = mealPlans.length;
      const totalSupplements = supplements.length;
      
      // محاسبه تعداد روزهای فعال (روزهایی که برنامه تمرینی دارند)
      const activeDays = new Set(exercisePrograms.map((p: any) => p.dayOfWeek)).size;

      setStats({
        totalStudents: totalExercises, // تعداد کل تمرینات
        activePrograms: totalMeals, // تعداد وعده‌های غذایی
        completedSessions: totalSupplements, // تعداد مکمل‌ها
        rating: activeDays // تعداد روزهای فعال تمرین
      });
      
      console.log('Student stats loaded from database:', {
        exercises: totalExercises,
        meals: totalMeals,
        supplements: totalSupplements,
        activeDays: activeDays
      });
    } catch (error) {
      console.error('خطا در بارگذاری آمار شاگرد:', error);
      // در صورت خطا، آمار پیش‌فرض نمایش داده شود
      setStats({
        totalStudents: 0,
        activePrograms: 0,
        completedSessions: 0,
        rating: 0
      });
    }
  }, []);

  return { stats, loadStats };
};