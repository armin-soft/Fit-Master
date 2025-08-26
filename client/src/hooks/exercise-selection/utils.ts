
import { ExerciseSets, ExerciseReps } from './types';

/**
 * Initialize sets for a list of exercise IDs with default values
 */
export const initializeSets = (ids: number[]): ExerciseSets => {
  return ids.reduce((acc, id) => {
    // Default value of 3 with constraint between 1 and 10
    acc[id] = 3;
    return acc;
  }, {} as ExerciseSets);
};

/**
 * Initialize reps for a list of exercise IDs with default values
 */
export const initializeReps = (ids: number[]): ExerciseReps => {
  return ids.reduce((acc, id) => {
    // Default value of '8'
    acc[id] = '8';
    return acc;
  }, {} as ExerciseReps);
};

/**
 * Remove an exercise from sets and reps records
 */
export const removeExerciseFromRecords = (
  exerciseId: number, 
  sets: ExerciseSets, 
  reps: ExerciseReps
): { newSets: ExerciseSets; newReps: ExerciseReps } => {
  const newSets = { ...sets };
  const newReps = { ...reps };
  delete newSets[exerciseId];
  delete newReps[exerciseId];
  return { newSets, newReps };
};

/**
 * Validate sets value to be between 1 and 10
 */
export const validateSetsValue = (sets: number): number => {
  return Math.min(Math.max(1, sets), 10);
};
