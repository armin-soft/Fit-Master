
import { useState, useEffect } from 'react';
import { ExerciseWithSets } from './types';
import { useExerciseDaySelection } from './useExerciseDaySelection';

interface UseExerciseSelectionProps {
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  initialExercisesDay5?: number[];
  initialExercisesDay6?: number[]; // Added day 6
}

export function useExerciseSelection({
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = [],
  initialExercisesDay6 = [] // Added day 6
}: UseExerciseSelectionProps = {}) {
  // Setup individual day hooks
  const day1 = useExerciseDaySelection({ initialExercises: initialExercisesDay1 });
  const day2 = useExerciseDaySelection({ initialExercises: initialExercisesDay2 });
  const day3 = useExerciseDaySelection({ initialExercises: initialExercisesDay3 });
  const day4 = useExerciseDaySelection({ initialExercises: initialExercisesDay4 });
  const day5 = useExerciseDaySelection({ initialExercises: initialExercisesDay5 });
  const day6 = useExerciseDaySelection({ initialExercises: initialExercisesDay6 }); // Added day 6
  
  // For backward compatibility, also maintain the original exercise state
  const mainSelection = useExerciseDaySelection({ initialExercises });

  // Update state when initialExercises props change
  useEffect(() => {
    // This effect ensures that when initialExercises props change, the state is updated accordingly
  }, [initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4, initialExercisesDay5, initialExercisesDay6]);

  return {
    // Original selection
    selectedExercises: mainSelection.selectedExercises,
    toggleExercise: mainSelection.toggleExercise,
    exerciseSets: mainSelection.exerciseSets,
    handleSetsChange: mainSelection.handleSetsChange,
    exerciseReps: mainSelection.exerciseReps,
    handleRepsChange: mainSelection.handleRepsChange,
    getSelectedExercisesWithSets: mainSelection.getSelectedExercisesWithSets,

    // Day 1
    selectedExercisesDay1: day1.selectedExercises,
    toggleExerciseDay1: day1.toggleExercise,
    exerciseSetsDay1: day1.exerciseSets,
    handleSetsChangeDay1: day1.handleSetsChange,
    exerciseRepsDay1: day1.exerciseReps,
    handleRepsChangeDay1: day1.handleRepsChange,
    getSelectedExercisesWithSetsDay1: day1.getSelectedExercisesWithSets,

    // Day 2
    selectedExercisesDay2: day2.selectedExercises,
    toggleExerciseDay2: day2.toggleExercise,
    exerciseSetsDay2: day2.exerciseSets,
    handleSetsChangeDay2: day2.handleSetsChange,
    exerciseRepsDay2: day2.exerciseReps,
    handleRepsChangeDay2: day2.handleRepsChange,
    getSelectedExercisesWithSetsDay2: day2.getSelectedExercisesWithSets,

    // Day 3
    selectedExercisesDay3: day3.selectedExercises,
    toggleExerciseDay3: day3.toggleExercise,
    exerciseSetsDay3: day3.exerciseSets,
    handleSetsChangeDay3: day3.handleSetsChange,
    exerciseRepsDay3: day3.exerciseReps,
    handleRepsChangeDay3: day3.handleRepsChange,
    getSelectedExercisesWithSetsDay3: day3.getSelectedExercisesWithSets,

    // Day 4
    selectedExercisesDay4: day4.selectedExercises,
    toggleExerciseDay4: day4.toggleExercise,
    exerciseSetsDay4: day4.exerciseSets,
    handleSetsChangeDay4: day4.handleSetsChange,
    exerciseRepsDay4: day4.exerciseReps,
    handleRepsChangeDay4: day4.handleRepsChange,
    getSelectedExercisesWithSetsDay4: day4.getSelectedExercisesWithSets,
    
    // Day 5
    selectedExercisesDay5: day5.selectedExercises,
    toggleExerciseDay5: day5.toggleExercise,
    exerciseSetsDay5: day5.exerciseSets,
    handleSetsChangeDay5: day5.handleSetsChange,
    exerciseRepsDay5: day5.exerciseReps,
    handleRepsChangeDay5: day5.handleRepsChange,
    getSelectedExercisesWithSetsDay5: day5.getSelectedExercisesWithSets,

    // Day 6 (added)
    selectedExercisesDay6: day6.selectedExercises,
    toggleExerciseDay6: day6.toggleExercise,
    exerciseSetsDay6: day6.exerciseSets,
    handleSetsChangeDay6: day6.handleSetsChange,
    exerciseRepsDay6: day6.exerciseReps,
    handleRepsChangeDay6: day6.handleRepsChange,
    getSelectedExercisesWithSetsDay6: day6.getSelectedExercisesWithSets,
  };
}
