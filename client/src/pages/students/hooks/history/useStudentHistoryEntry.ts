
import { useState, useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { StudentEventsProps } from "./types";

/**
 * Hook for creating and adding history entries for student events
 */
export const useStudentHistoryEntry = (
  addHistoryEntry: (entry: HistoryEntry) => void,
  students: Student[]
) => {
  /**
   * Creates a history entry with student information
   */
  const createStudentHistoryEntry = useCallback(
    (
      id: number,
      action: string,
      type: 'edit' | 'exercise' | 'diet' | 'supplement' | 'delete',
      description: string,
      details: string
    ): HistoryEntry => {
      const timestamp = Date.now();
      const student = students.find(s => s.id === id);

      return {
        id: Date.now(),
        timestamp,
        studentId: id,
        studentName: student?.name || "نامشخص",
        studentImage: student?.image,
        action,
        type,
        description,
        details
      };
    },
    [students]
  );

  /**
   * Creates a history entry for adding/editing a student
   */
  const createStudentUpdateEntry = useCallback(
    (
      data: any,
      selectedStudent?: Student
    ): HistoryEntry => {
      const timestamp = Date.now();
      const actionType = selectedStudent ? 'edit' : 'add';
      const studentName = selectedStudent ? selectedStudent.name : data.name;
      
      // Use image property instead of picture
      const studentImage = selectedStudent ? 
        selectedStudent.image : 
        data.image;
      
      const description = selectedStudent 
        ? `اطلاعات ${studentName} ویرایش شد` 
        : `شاگرد جدید ${studentName} اضافه شد`;
      
      return {
        id: Date.now(),
        timestamp,
        studentId: selectedStudent ? selectedStudent.id : null,
        studentName,
        studentImage,
        action: actionType,
        type: 'edit',
        description,
        details: JSON.stringify({ 
          before: selectedStudent ? { name: selectedStudent.name, phone: selectedStudent.phone } : {},
          after: { name: data.name, phone: data.phone }
        })
      };
    },
    []
  );

  return {
    createStudentHistoryEntry,
    createStudentUpdateEntry
  };
};
