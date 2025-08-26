
import { useStudents as useStudentsImpl } from './students';
import { useStudentFiltering } from './useStudentFiltering';
import { Student } from '@/components/students/StudentTypes';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { safeJSONParse } from '@/utils/database/index';
import { ExerciseWithSets } from '@/types/exercise';

// Helper function to trigger stats update
const triggerStatsUpdate = () => {
  window.dispatchEvent(new CustomEvent('studentsUpdated'));
};

export const useStudents = () => {
  console.log('useStudents: Hook called');
  
  // بارگذاری مستقیم از دیتابیس آنلاین
  const [students, setStudents] = useState<Student[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  
  // بارگذاری اولیه شاگردان از دیتابیس آنلاین
  useEffect(() => {
    const loadStudentsFromStorage = async () => {
      try {
        console.log('useStudents: Loading students from online database...');
        
        // Use proper API endpoint instead of preferences
        const response = await fetch('/api/students', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch students');
        const savedStudents = await response.json();
        console.log('useStudents: Retrieved students from database:', savedStudents);
        console.log('useStudents: Students count:', Array.isArray(savedStudents) ? savedStudents.length : 'Not an array');
        
        if (Array.isArray(savedStudents)) {
          setStudents(savedStudents);
          console.log('useStudents: Students loaded successfully:', savedStudents.length);
        } else {
          console.warn('useStudents: Data is not an array, setting empty array');
          setStudents([]);
        }
      } catch (error) {
        console.error('useStudents: Error loading students from database:', error);
        setStudents([]);
      } finally {
        setIsStudentsLoaded(true);
      }
    };

    loadStudentsFromStorage();

    // گوش دادن به تغییرات دیتابیس
    const handleStorageChange = () => {
      console.log('useStudents: Database change detected, reloading students...');
      loadStudentsFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentsUpdated', handleStorageChange);
    window.addEventListener('database-updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentsUpdated', handleStorageChange);
      window.removeEventListener('database-updated', handleStorageChange);
    };
  }, []);
  
  const { 
    exercises, 
    meals, 
    supplements, 
    setSupplements, 
    handleDelete: originalHandleDelete, 
    handleSave: originalHandleSave,
    handleSaveExercises: originalHandleSaveExercises,
    handleSaveDiet: originalHandleSaveDiet,
    handleSaveSupplements: originalHandleSaveSupplements
  } = useStudentsImpl();
  
  console.log('useStudents: Final students count:', students.length);
  console.log('useStudents: Final students data:', students);
  
  const { toast } = useToast();
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await fetch('/api/trainer/profile', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          const savedProfile = await response.json();
          if (savedProfile) {
            setIsProfileComplete(Boolean(savedProfile.name && savedProfile.gymName && savedProfile.phone));
          }
        }
      } catch (error) {
        console.error('Error checking profile completeness:', error);
      }
      setLoading(false);
    };
    checkProfile();
  }, []);
  
  const { 
    searchQuery, 
    setSearchQuery, 
    sortField, 
    sortOrder, 
    toggleSort, 
    sortedAndFilteredStudents,
    handleClearSearch
  } = useStudentFiltering(students);
  
  // Wrap the original functions to trigger stats updates and update local state - make them synchronous
  const enhancedHandleDelete = async (id: number) => {
    const result = await originalHandleDelete(id);
    if (result) {
      setStudents(prev => prev.filter(student => student.id !== id));
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSave = async (studentData: any, existingStudent?: Student) => {
    const result = await originalHandleSave(studentData, existingStudent);
    if (result) {
      setStudents(prev => {
        const existingIndex = prev.findIndex(s => s.id === (existingStudent?.id || studentData.id));
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...existingStudent, ...studentData };
          return updated;
        } else {
          const newId = Math.max(...prev.map(s => s.id), 0) + 1;
          return [...prev, { ...studentData, id: newId, createdAt: new Date().toISOString() }];
        }
      });
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveExercises = async (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    const result = await originalHandleSaveExercises(exercisesWithSets, studentId, dayNumber);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveDiet = async (mealIds: number[], studentId: number, dayNumber?: number) => {
    const result = await originalHandleSaveDiet(mealIds, studentId, dayNumber);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedHandleSaveSupplements = async (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    const result = await originalHandleSaveSupplements(data, studentId);
    if (result) {
      triggerStatsUpdate();
    }
    return result;
  };

  const enhancedSetStudents = (newStudents: Student[]) => {
    setStudents(newStudents);
    triggerStatsUpdate();
  };
  
  return {
    // Students data
    students,
    sortedAndFilteredStudents,
    exercises,
    meals,
    supplements,
    
    // State management
    loading: loading || !isStudentsLoaded,
    isProfileComplete,
    
    // Search & sort
    searchQuery,
    setSearchQuery,
    sortField,
    sortOrder,
    toggleSort,
    handleClearSearch,
    
    // CRUD operations with stats update triggers
    handleDelete: enhancedHandleDelete,
    handleSave: enhancedHandleSave,
    handleSaveExercises: enhancedHandleSaveExercises,
    handleSaveDiet: enhancedHandleSaveDiet,
    handleSaveSupplements: enhancedHandleSaveSupplements,
    setStudents: enhancedSetStudents,
    setSupplements
  };
};

export * from './students';
