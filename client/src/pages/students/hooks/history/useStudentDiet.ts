
import { useCallback } from "react";
import { StudentEventsProps, SaveDietFunction } from "./types";
import { useStudentHistoryEntry } from "./useStudentHistoryEntry";

/**
 * Hook for handling student diet operations with history tracking
 */
export const useStudentDiet = ({
  handleSaveDiet,
  addHistoryEntry,
  triggerRefresh,
  students
}: Pick<StudentEventsProps, 'handleSaveDiet' | 'addHistoryEntry' | 'triggerRefresh' | 'students'>) => {
  const { createStudentHistoryEntry } = useStudentHistoryEntry(addHistoryEntry, students);

  /**
   * Saves diet data and adds an entry to history
   */
  const handleSaveDietWithHistory = useCallback((mealIds: number[], studentId: number, dayNumber?: number) => {
    const isSuccess = handleSaveDiet(mealIds, studentId, dayNumber);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const description = `رژیم غذایی روز ${dayNumber || 1} برای ${student.name} با ${mealIds.length} وعده ثبت شد`;
        
        const historyEntry = createStudentHistoryEntry(
          studentId,
          'diet',
          'diet',
          description,
          JSON.stringify({
            day: dayNumber || 1,
            count: mealIds.length
          })
        );
        
        addHistoryEntry(historyEntry);
      }
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSaveDiet, addHistoryEntry, createStudentHistoryEntry, students, triggerRefresh]);

  return {
    handleSaveDietWithHistory
  };
};
