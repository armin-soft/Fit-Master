
import { useCallback } from "react";
import { StudentEventsProps, DeleteFunction } from "./types";
import { useStudentHistoryEntry } from "./useStudentHistoryEntry";

/**
 * Hook for handling student delete operations with history tracking
 */
export const useStudentDelete = ({
  handleDelete,
  addHistoryEntry,
  triggerRefresh,
  students
}: Pick<StudentEventsProps, 'handleDelete' | 'addHistoryEntry' | 'triggerRefresh' | 'students'>) => {
  const { createStudentHistoryEntry } = useStudentHistoryEntry(addHistoryEntry, students);

  /**
   * Deletes a student and adds an entry to history
   */
  const handleDeleteWithHistory = useCallback(async (id: number) => {
    const student = students.find(s => s.id === id);
    
    // First, add history entry while student still exists
    if (student) {
      const description = `شاگرد ${student.name} حذف شد`;
      
      const historyEntry = createStudentHistoryEntry(
        id,
        'delete',
        'delete',
        description,
        JSON.stringify({
          name: student.name,
          phone: student.phone
        })
      );
      
      try {
        // Add history entry BEFORE deletion while student still exists
        await addHistoryEntry(historyEntry);
      } catch (error) {
        console.error('خطا در ثبت تاریخچه حذف:', error);
        // Continue with deletion even if history fails
      }
    }
    
    // Then delete the student
    try {
      await handleDelete(id);
    } catch (error) {
      console.error('خطا در حذف شاگرد:', error);
    }
    
    // بروزرسانی داده‌ها
    triggerRefresh();
  }, [handleDelete, addHistoryEntry, createStudentHistoryEntry, students, triggerRefresh]);

  return {
    handleDeleteWithHistory
  };
};
