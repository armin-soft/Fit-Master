import { useStudentManagement } from './useStudentManagement';
import { useStudentExercises } from './useStudentExercises';
import { useStudentDiet } from './useStudentDiet';
import { useStudentSupplements } from './useStudentSupplements';
import { useStudentHistory } from '@/hooks/useStudentHistory';
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';

export const useStudents = () => {
  console.log('hooks/students/index.ts: useStudents called');
  
  // بارگذاری مستقیم از دیتابیس آنلاین
  const [students, setStudents] = useState<Student[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  
  // بارگذاری اولیه شاگردان از دیتابیس آنلاین
  useEffect(() => {
    const loadStudentsFromStorage = async () => {
      try {
        console.log('hooks/students/index.ts: Loading students directly from database...');
        
        // Use proper database API endpoint
        const response = await fetch('/api/students');
        const savedStudents = await response.json();
        console.log('hooks/students/index.ts: Database data for "students":', savedStudents);
        
        if (Array.isArray(savedStudents)) {
          setStudents(savedStudents);
          console.log('hooks/students/index.ts: Students loaded successfully:', savedStudents.length);
        } else {
          console.warn('hooks/students/index.ts: Database data is not an array, setting empty array');
          setStudents([]);
        }
      } catch (error) {
        console.error('hooks/students/index.ts: Error loading students from database:', error);
        setStudents([]);
      } finally {
        setIsStudentsLoaded(true);
      }
    };

    loadStudentsFromStorage();

    // گوش دادن به تغییرات دیتابیس
    const handleStorageChange = () => {
      console.log('hooks/students/index.ts: Database change detected, reloading students...');
      loadStudentsFromStorage();
    };

    const handleCustomStudentsUpdate = () => {
      console.log('hooks/students/index.ts: Custom students update event detected');
      loadStudentsFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleCustomStudentsUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleCustomStudentsUpdate);
    };
  }, []);
  
  // History tracking
  const { addHistoryEntry } = useStudentHistory();
  
  const { 
    exercises, 
    meals, 
    supplements, 
    setSupplements,
    handleDelete: originalHandleDelete, 
    handleSave: originalHandleSave,
    refreshData
  } = useStudentManagement();

  const { handleSaveExercises } = useStudentExercises(students, setStudents);
  const { handleSaveDiet } = useStudentDiet(students, setStudents);
  const { handleSaveSupplements } = useStudentSupplements(students, setStudents);

  console.log('hooks/students/index.ts: Final students count:', students.length);

  // Helper function to trigger stats update
  const triggerStatsUpdate = () => {
    window.dispatchEvent(new CustomEvent('studentsUpdated'));
  };

  // Wrap the original functions to trigger stats updates and update local state
  const enhancedHandleDelete = async (id: number) => {
    const result = await originalHandleDelete(id);
    // originalHandleDelete قبلاً state محلی و دیتابیس را بروزرسانی کرده، فقط stats را trigger می‌کنیم
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSave = async (studentData: any, existingStudent?: Student) => {
    const result = await originalHandleSave(studentData, existingStudent);
    // originalHandleSave قبلاً state محلی و دیتابیس را بروزرسانی کرده، فقط stats را trigger می‌کنیم
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedSetStudents = (newStudents: Student[]) => {
    console.log('hooks/students/index.ts: Setting students:', newStudents.length);
    setStudents(newStudents);
    triggerStatsUpdate();
  };

  return {
    students,
    exercises,
    meals,
    supplements,
    setStudents: enhancedSetStudents,
    setSupplements,
    handleDelete: enhancedHandleDelete,
    handleSave: enhancedHandleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    refreshData
  };
};

export * from './useStudentManagement';
export * from './useStudentExercises';
export * from './useStudentDiet';
export * from './useStudentSupplements';
export * from './core';
