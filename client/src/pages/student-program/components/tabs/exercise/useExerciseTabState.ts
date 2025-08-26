
import { useState, useEffect, useRef } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useExerciseTabState = (
  student: Student,
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean
) => {
  const { toast } = useToast();
  const [selectedExercises, setSelectedExercises] = useState<ExerciseWithSets[]>([]);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Exercise cache for day switching - updated for 6 days
  const exerciseCacheRef = useRef<Record<number, ExerciseWithSets[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [] // Added day 6
  });
  
  // Helper function to convert exercise IDs to ExerciseWithSets
  const convertToExerciseWithSets = (exerciseIds: number[], sets: Record<number, number> = {}, reps: Record<number, string> = {}, day: number): ExerciseWithSets[] => {
    return exerciseIds.map(id => ({
      id,
      sets: sets[id] || 3,
      reps: reps[id] || "12",
      day
    }));
  };
  
  // Initializing cache once on load - updated for 6 days
  useEffect(() => {
    const cachedExercises = { ...exerciseCacheRef.current };
    
    // Day 1
    if (student.exercisesDay1) {
      cachedExercises[1] = convertToExerciseWithSets(
        student.exercisesDay1,
        student.exerciseSetsDay1,
        student.exerciseRepsDay1,
        1
      );
    }
    
    // Day 2
    if (student.exercisesDay2) {
      cachedExercises[2] = convertToExerciseWithSets(
        student.exercisesDay2,
        student.exerciseSetsDay2,
        student.exerciseRepsDay2,
        2
      );
    }
    
    // Day 3
    if (student.exercisesDay3) {
      cachedExercises[3] = convertToExerciseWithSets(
        student.exercisesDay3,
        student.exerciseSetsDay3,
        student.exerciseRepsDay3,
        3
      );
    }
    
    // Day 4
    if (student.exercisesDay4) {
      cachedExercises[4] = convertToExerciseWithSets(
        student.exercisesDay4,
        student.exerciseSetsDay4,
        student.exerciseRepsDay4,
        4
      );
    }
    
    // Day 5
    if (student.exercisesDay5) {
      cachedExercises[5] = convertToExerciseWithSets(
        student.exercisesDay5,
        student.exerciseSetsDay5,
        student.exerciseRepsDay5,
        5
      );
    }
    
    // Day 6 (added)
    if (student.exercisesDay6) {
      cachedExercises[6] = convertToExerciseWithSets(
        student.exercisesDay6,
        student.exerciseSetsDay6,
        student.exerciseRepsDay6,
        6
      );
    }
    
    exerciseCacheRef.current = cachedExercises;
    
    // Set first day exercises initially
    setSelectedExercises(cachedExercises[currentDay]);
  }, [student, currentDay]);

  // Side effect for managing day changes - save to and load from cache
  useEffect(() => {
    // Save current day exercises to cache before changing
    const currentExercises = [...selectedExercises];
    exerciseCacheRef.current = {
      ...exerciseCacheRef.current,
      [currentDay]: currentExercises
    };
    
    // Load exercises from cache for the new day
    setSelectedExercises(exerciseCacheRef.current[currentDay] || []);
  }, [currentDay]);

  const handleSave = async () => {
    if (!onSaveExercises) return;
    
    setIsLoading(true);
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Save to cache before sending to server
      const updatedCache = {
        ...exerciseCacheRef.current,
        [currentDay]: [...selectedExercises]
      };
      exerciseCacheRef.current = updatedCache;
      
      // Set day in each exercise
      const exercisesWithDay = selectedExercises.map(ex => ({
        ...ex,
        day: currentDay
      }));
      
      const success = onSaveExercises(exercisesWithDay, currentDay);
      
      if (success) {
        setSaveStatus('success');
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های روز ${toPersianNumbers(currentDay)} با موفقیت ذخیره شدند`
        });
      } else {
        setSaveStatus('error');
        toast({
          variant: "destructive",
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی برنامه تمرینی پیش آمد."
        });
      }
    } catch (error) {
      setSaveStatus('error');
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطای سیستمی",
        description: "خطایی در هنگام ذخیره‌سازی رخ داد. لطفا مجدد تلاش کنید."
      });
    } finally {
      setIsSaving(false);
      setIsLoading(false);
      
      // Reset save status after a delay
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }
  };

  return {
    selectedExercises,
    setSelectedExercises,
    currentDay,
    setCurrentDay,
    isSaving,
    handleSave,
    exerciseCacheRef,
    isLoading,
    saveStatus
  };
};

export default useExerciseTabState;
