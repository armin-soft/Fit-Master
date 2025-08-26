
import { useCallback } from "react";
import { StudentEventsProps, SaveSupplementsFunction } from "./types";
import { useStudentHistoryEntry } from "./useStudentHistoryEntry";

/**
 * Hook for handling student supplement operations with history tracking
 */
export const useStudentSupplements = ({
  handleSaveSupplements,
  addHistoryEntry,
  triggerRefresh,
  students
}: Pick<StudentEventsProps, 'handleSaveSupplements' | 'addHistoryEntry' | 'triggerRefresh' | 'students'>) => {
  const { createStudentHistoryEntry } = useStudentHistoryEntry(addHistoryEntry, students);

  /**
   * Saves supplement data and adds an entry to history
   */
  const handleSaveSupplementsWithHistory = useCallback((data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => {
    const isSuccess = handleSaveSupplements(data, studentId);
    
    if (isSuccess) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        const totalItems = data.supplements.length + data.vitamins.length;
        const description = `برنامه مکمل روز ${data.day || 1} برای ${student.name} با ${totalItems} آیتم ثبت شد`;
        
        const historyEntry = createStudentHistoryEntry(
          studentId,
          'supplements',
          'supplement',
          description,
          JSON.stringify({
            day: data.day || 1,
            supplements: data.supplements.length,
            vitamins: data.vitamins.length
          })
        );
        
        addHistoryEntry(historyEntry);
      }
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSaveSupplements, addHistoryEntry, createStudentHistoryEntry, students, triggerRefresh]);

  return {
    handleSaveSupplementsWithHistory
  };
};
