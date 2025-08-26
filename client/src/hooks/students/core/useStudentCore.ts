
import { useState, useEffect } from 'react';
import { Student } from '@/components/students/StudentTypes';
import { ExerciseWithSets } from '@/types/exercise';
import { Meal } from '@/components/diet/types';
import { Supplement, SupplementCategory } from '@/types/supplement';
import { safeJSONParse } from '@/utils/database/index';

export const useStudentCore = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [supplementCategories, setSupplementCategories] = useState<SupplementCategory[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      console.log('Loading student data from database...');
      
      try {
        // Load students
        const savedStudents = await safeJSONParse('students', []);
        console.log('Found', savedStudents.length, 'students in database');
        setStudents(Array.isArray(savedStudents) ? savedStudents : []);

        // Load exercises
        const savedExercises = await safeJSONParse('exercises', []);
        console.log('Found', savedExercises.length, 'exercises in database');
        setExercises(Array.isArray(savedExercises) ? savedExercises : []);

        // Load meals from API
        try {
          const mealsResponse = await fetch('/api/data/meals');
          const savedMeals = await mealsResponse.json();
          console.log('Found', savedMeals.length, 'meals in database');
          setMeals(Array.isArray(savedMeals) ? savedMeals : []);
        } catch (error) {
          console.error('Error loading meals from API:', error);
          setMeals([]);
        }

        // Load supplements from API
        try {
          const supplementsResponse = await fetch('/api/data/supplements');
          const savedSupplements = await supplementsResponse.json();
          console.log('Found', savedSupplements.length, 'supplements in database');
          setSupplements(Array.isArray(savedSupplements) ? savedSupplements : []);
        } catch (error) {
          console.error('Error loading supplements from API:', error);
          setSupplements([]);
        }

        // Load supplement categories - with proper fallback
        const savedSupplementCategories = await safeJSONParse('supplementCategories', []);
        if (Array.isArray(savedSupplementCategories) && savedSupplementCategories.length > 0) {
          console.log('Found', savedSupplementCategories.length, 'supplement categories in database');
          setSupplementCategories(savedSupplementCategories);
        } else {
          // Create default categories if none exist
          const defaultCategories: SupplementCategory[] = [
            { id: 1, name: 'پروتئینی', description: 'مکمل‌های پروتئینی و آمینو اسیدی' },
            { id: 2, name: 'ویتامین‌ها', description: 'ویتامین‌های محلول در آب و چربی' },
            { id: 3, name: 'کربوهیدراتی', description: 'مکمل‌های انرژی‌زا' },
            { id: 4, name: 'سلامت مفاصل', description: 'مکمل‌های مفید برای مفاصل' }
          ];
          console.log('No supplement categories found, creating default categories');
          setSupplementCategories(defaultCategories);
          await safeJSONParse('supplementCategories', defaultCategories);
        }

        setIsInitialized(true);
        console.log('Student data initialization complete');
      } catch (error) {
        console.error('Error loading data from database:', error);
        setIsInitialized(true);
      }
    };

    loadData();
  }, []);

  return {
    students,
    setStudents,
    exercises,
    setExercises,
    meals,
    setMeals,
    supplements,
    setSupplements,
    supplementCategories,
    setSupplementCategories,
    isInitialized
  };
};
