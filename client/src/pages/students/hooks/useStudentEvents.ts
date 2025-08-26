
import { useCallback } from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { HistoryEntry } from "@/hooks/useStudentHistory";
import { 
  useStudentSave,
  useStudentExercises,
  useStudentDiet,
  useStudentSupplements,
  useStudentDelete,
  StudentEventsProps
} from './history';

/**
 * هوک برای مدیریت رویدادهای شاگردان با پشتیبانی از تاریخچه و بروزرسانی
 * این هوک تمام عملیات‌های بروزرسانی را در تاریخچه ذخیره می‌کند 
 * و اعلان‌های مناسب را نمایش می‌دهد
 */
export function useStudentEvents(
  handleSave: (data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, selectedStudent?: Student) => boolean,
  handleSaveExercises: (exercisesWithSets: ExerciseWithSets[], studentId: number, dayNumber?: number) => boolean,
  handleSaveDiet: (mealIds: number[], studentId: number, dayNumber?: number) => boolean,
  handleSaveSupplements: (data: {supplements: number[], vitamins: number[], day?: number}, studentId: number) => boolean,
  handleDelete: (id: number) => void,
  addHistoryEntry: (entry: HistoryEntry) => void,
  triggerRefresh: () => void,
  students: Student[],
  selectedStudentForProgram: Student | null
) {
  const props: StudentEventsProps = {
    handleSave,
    handleSaveExercises,
    handleSaveDiet,
    handleSaveSupplements,
    handleDelete,
    addHistoryEntry,
    triggerRefresh,
    students,
    selectedStudentForProgram
  };

  // Use our modular hooks to handle different aspects of student events
  const { handleSaveWithHistory } = useStudentSave(props);
  const { handleSaveExercisesWithHistory } = useStudentExercises(props);
  const { handleSaveDietWithHistory } = useStudentDiet(props);
  const { handleSaveSupplementsWithHistory } = useStudentSupplements(props);
  const { handleDeleteWithHistory } = useStudentDelete(props);
  
  return {
    handleSaveWithHistory,
    handleSaveExercisesWithHistory,
    handleSaveDietWithHistory,
    handleSaveSupplementsWithHistory,
    handleDeleteWithHistory
  };
}
