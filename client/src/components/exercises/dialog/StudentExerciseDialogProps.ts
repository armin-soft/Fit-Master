
import { ExerciseWithSets } from "@/hooks/exercise-selection";

export interface StudentExerciseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExerciseSets?: Record<number, number>; 
  initialExerciseReps?: Record<number, string>; 
  initialExercisesDay1?: number[];
  initialExerciseSetsDay1?: Record<number, number>;
  initialExerciseRepsDay1?: Record<number, string>;
  initialExercisesDay2?: number[];
  initialExerciseSetsDay2?: Record<number, number>;
  initialExerciseRepsDay2?: Record<number, string>;
  initialExercisesDay3?: number[];
  initialExerciseSetsDay3?: Record<number, number>;
  initialExerciseRepsDay3?: Record<number, string>;
  initialExercisesDay4?: number[];
  initialExerciseSetsDay4?: Record<number, number>;
  initialExerciseRepsDay4?: Record<number, string>;
  initialExercisesDay5?: number[];
  initialExerciseSetsDay5?: Record<number, number>;
  initialExerciseRepsDay5?: Record<number, string>;
}
