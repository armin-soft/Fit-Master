
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { HistoryEntry } from "@/hooks/useStudentHistory";

export type SaveStudentFunction = (
  data: Omit<Student, "id" | "exercises" | "exercisesDay1" | "exercisesDay2" | "exercisesDay3" | "exercisesDay4" | "meals" | "supplements" | "vitamins">, 
  selectedStudent?: Student
) => boolean;

export type SaveExercisesFunction = (
  exercisesWithSets: ExerciseWithSets[], 
  studentId: number, 
  dayNumber?: number
) => boolean;

export type SaveDietFunction = (
  mealIds: number[], 
  studentId: number, 
  dayNumber?: number
) => boolean;

export type SaveSupplementsFunction = (
  data: {supplements: number[], vitamins: number[], day?: number}, 
  studentId: number
) => boolean;

export type DeleteFunction = (id: number) => void;
export type AddHistoryFunction = (entry: HistoryEntry) => void;
export type TriggerRefreshFunction = () => void;

export interface StudentEventsProps {
  handleSave: SaveStudentFunction;
  handleSaveExercises: SaveExercisesFunction;
  handleSaveDiet: SaveDietFunction;
  handleSaveSupplements: SaveSupplementsFunction;
  handleDelete: DeleteFunction;
  addHistoryEntry: AddHistoryFunction;
  triggerRefresh: TriggerRefreshFunction;
  students: Student[];
  selectedStudentForProgram: Student | null;
}
