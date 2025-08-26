
import { useState } from 'react';
import { ExerciseSets, ExerciseReps, ExerciseWithSets } from './types';
import { initializeSets, initializeReps, removeExerciseFromRecords, validateSetsValue } from './utils';

interface ExerciseDaySelectionOptions {
  initialExercises: number[];
}

export function useExerciseDaySelection({ initialExercises }: ExerciseDaySelectionOptions) {
  const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
  const [exerciseSets, setExerciseSets] = useState<ExerciseSets>({});
  const [exerciseReps, setExerciseReps] = useState<ExerciseReps>({});

  // Initialize the state with initial values
  useState(() => {
    setSelectedExercises(initialExercises);
    setExerciseSets(initializeSets(initialExercises));
    setExerciseReps(initializeReps(initialExercises));
  });

  // Toggle exercise selection
  const toggleExercise = (exerciseId: number) => {
    setSelectedExercises((prev) => {
      const isSelected = prev.includes(exerciseId);
      if (isSelected) {
        const { newSets, newReps } = removeExerciseFromRecords(exerciseId, exerciseSets, exerciseReps);
        setExerciseSets(newSets);
        setExerciseReps(newReps);
        return prev.filter(id => id !== exerciseId);
      } else {
        setExerciseSets(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseReps(prev => ({ ...prev, [exerciseId]: '8' }));
        return [...prev, exerciseId];
      }
    });
  };

  // Handle sets change
  const handleSetsChange = (exerciseId: number, sets: number) => {
    const validSets = validateSetsValue(sets);
    setExerciseSets(prev => ({ ...prev, [exerciseId]: validSets }));
  };

  // Handle reps change
  const handleRepsChange = (exerciseId: number, reps: string) => {
    setExerciseReps(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Get selected exercises with their sets and reps
  const getSelectedExercisesWithSets = (): ExerciseWithSets[] => {
    return selectedExercises.map(id => ({
      id,
      sets: exerciseSets[id] || 3,
      reps: exerciseReps[id] || '8'
    }));
  };

  return {
    selectedExercises,
    exerciseSets,
    exerciseReps,
    toggleExercise,
    handleSetsChange,
    handleRepsChange,
    getSelectedExercisesWithSets
  };
}
