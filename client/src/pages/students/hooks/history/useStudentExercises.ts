
import { useCallback } from "react";
import { StudentEventsProps, SaveExercisesFunction } from "./types";
import { ExerciseWithSets } from "@/types/exercise";
import { useStudentHistoryEntry } from "./useStudentHistoryEntry";

/**
 * Hook for handling student exercise operations with history tracking
 */
export const useStudentExercises = ({
  handleSaveExercises,
  addHistoryEntry,
  triggerRefresh,
  students
}: Pick<StudentEventsProps, 'handleSaveExercises' | 'addHistoryEntry' | 'triggerRefresh' | 'students'>) => {
  const { createStudentHistoryEntry } = useStudentHistoryEntry(addHistoryEntry, students);

  /**
   * Saves exercise data and adds an entry to history
   */
  const handleSaveExercisesWithHistory = useCallback((exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => {
    const isSuccess = handleSaveExercises(exercisesWithSets, studentId, dayNumber);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const description = `برنامه تمرینی روز ${dayNumber || 1} برای ${student.name} با ${exercisesWithSets.length} حرکت ثبت شد`;
        
        const historyEntry = createStudentHistoryEntry(
          studentId,
          'exercise',
          'exercise',
          description,
          JSON.stringify({
            day: dayNumber || 1,
            count: exercisesWithSets.length
          })
        );
        
        addHistoryEntry(historyEntry);
      }
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSaveExercises, addHistoryEntry, createStudentHistoryEntry, students, triggerRefresh]);

  return {
    handleSaveExercisesWithHistory
  };
};
