
/**
 * Types related to exercise selection functionality
 */
export interface ExerciseWithSets {
  id: number;
  sets: number;
  reps: string; // Changed from optional to required to match the type in src/types/exercise.ts
}

export type ExerciseSets = Record<number, number>;
export type ExerciseReps = Record<number, string>;
