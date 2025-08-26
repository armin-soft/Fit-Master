
import { useCallback } from "react";
import { StudentEventsProps, SaveStudentFunction } from "./types";
import { useStudentHistoryEntry } from "./useStudentHistoryEntry";

/**
 * Hook for handling student save operations with history tracking
 */
export const useStudentSave = ({
  handleSave,
  addHistoryEntry,
  triggerRefresh,
  students
}: Pick<StudentEventsProps, 'handleSave' | 'addHistoryEntry' | 'triggerRefresh' | 'students'>) => {
  const { createStudentUpdateEntry } = useStudentHistoryEntry(addHistoryEntry, students);

  /**
   * Saves student data and adds an entry to history
   */
  const handleSaveWithHistory = useCallback((data: any, selectedStudent?: any) => {
    // Here's the fix: explicitly pass selectedStudent to handleSave
    const isSuccess = handleSave(data, selectedStudent);
    
    if (isSuccess) {
      const historyEntry = createStudentUpdateEntry(data, selectedStudent);
      addHistoryEntry(historyEntry);
      
      // بروزرسانی داده‌ها
      triggerRefresh();
    }
    
    return isSuccess;
  }, [handleSave, addHistoryEntry, createStudentUpdateEntry, triggerRefresh]);

  return {
    handleSaveWithHistory
  };
};
