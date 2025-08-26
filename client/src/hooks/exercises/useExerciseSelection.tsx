
import { useState, useEffect } from "react";
import { ExerciseWithSets } from "@/types/exercise";

interface UseExerciseSelectionProps {
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  initialExercisesDay5?: number[];
}

/**
 * هوک برای مدیریت انتخاب تمرین‌ها در روزهای مختلف
 */
export const useExerciseSelection = ({
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = []
}: UseExerciseSelectionProps = {}) => {
  // Day 1
  const [selectedExercisesDay1, setSelectedExercisesDay1] = useState<number[]>(initialExercisesDay1);
  const [exerciseSetsDay1, setExerciseSetsDay1] = useState<Record<number, number>>({});
  const [exerciseRepsDay1, setExerciseRepsDay1] = useState<Record<number, string>>({});

  // Day 2
  const [selectedExercisesDay2, setSelectedExercisesDay2] = useState<number[]>(initialExercisesDay2);
  const [exerciseSetsDay2, setExerciseSetsDay2] = useState<Record<number, number>>({});
  const [exerciseRepsDay2, setExerciseRepsDay2] = useState<Record<number, string>>({});

  // Day 3
  const [selectedExercisesDay3, setSelectedExercisesDay3] = useState<number[]>(initialExercisesDay3);
  const [exerciseSetsDay3, setExerciseSetsDay3] = useState<Record<number, number>>({});
  const [exerciseRepsDay3, setExerciseRepsDay3] = useState<Record<number, string>>({});

  // Day 4
  const [selectedExercisesDay4, setSelectedExercisesDay4] = useState<number[]>(initialExercisesDay4);
  const [exerciseSetsDay4, setExerciseSetsDay4] = useState<Record<number, number>>({});
  const [exerciseRepsDay4, setExerciseRepsDay4] = useState<Record<number, string>>({});

  // Day 5
  const [selectedExercisesDay5, setSelectedExercisesDay5] = useState<number[]>(initialExercisesDay5);
  const [exerciseSetsDay5, setExerciseSetsDay5] = useState<Record<number, number>>({});
  const [exerciseRepsDay5, setExerciseRepsDay5] = useState<Record<number, string>>({});

  // Initialize sets and reps for each day
  useEffect(() => {
    // Initialize Day 1
    const setsDay1: Record<number, number> = {};
    const repsDay1: Record<number, string> = {};
    selectedExercisesDay1.forEach(id => {
      setsDay1[id] = 3; // Default: 3 sets
      repsDay1[id] = "12"; // Default: 12 reps
    });
    setExerciseSetsDay1(setsDay1);
    setExerciseRepsDay1(repsDay1);

    // Initialize Day 2
    const setsDay2: Record<number, number> = {};
    const repsDay2: Record<number, string> = {};
    selectedExercisesDay2.forEach(id => {
      setsDay2[id] = 3;
      repsDay2[id] = "12";
    });
    setExerciseSetsDay2(setsDay2);
    setExerciseRepsDay2(repsDay2);

    // Initialize Day 3
    const setsDay3: Record<number, number> = {};
    const repsDay3: Record<number, string> = {};
    selectedExercisesDay3.forEach(id => {
      setsDay3[id] = 3;
      repsDay3[id] = "12";
    });
    setExerciseSetsDay3(setsDay3);
    setExerciseRepsDay3(repsDay3);

    // Initialize Day 4
    const setsDay4: Record<number, number> = {};
    const repsDay4: Record<number, string> = {};
    selectedExercisesDay4.forEach(id => {
      setsDay4[id] = 3;
      repsDay4[id] = "12";
    });
    setExerciseSetsDay4(setsDay4);
    setExerciseRepsDay4(repsDay4);

    // Initialize Day 5
    const setsDay5: Record<number, number> = {};
    const repsDay5: Record<number, string> = {};
    selectedExercisesDay5.forEach(id => {
      setsDay5[id] = 3;
      repsDay5[id] = "12";
    });
    setExerciseSetsDay5(setsDay5);
    setExerciseRepsDay5(repsDay5);
  }, []);

  // Toggle exercise selection for Day 1
  const toggleExerciseDay1 = (exerciseId: number) => {
    setSelectedExercisesDay1(prev => {
      if (prev.includes(exerciseId)) {
        // Remove exercise
        const newSelected = prev.filter(id => id !== exerciseId);
        // Remove sets and reps
        const newSets = { ...exerciseSetsDay1 };
        delete newSets[exerciseId];
        setExerciseSetsDay1(newSets);
        
        const newReps = { ...exerciseRepsDay1 };
        delete newReps[exerciseId];
        setExerciseRepsDay1(newReps);
        
        return newSelected;
      } else {
        // Add exercise with default values
        setExerciseSetsDay1(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay1(prev => ({ ...prev, [exerciseId]: "12" }));
        return [...prev, exerciseId];
      }
    });
  };

  // Toggle exercise selection for Day 2
  const toggleExerciseDay2 = (exerciseId: number) => {
    setSelectedExercisesDay2(prev => {
      if (prev.includes(exerciseId)) {
        const newSelected = prev.filter(id => id !== exerciseId);
        const newSets = { ...exerciseSetsDay2 };
        delete newSets[exerciseId];
        setExerciseSetsDay2(newSets);
        
        const newReps = { ...exerciseRepsDay2 };
        delete newReps[exerciseId];
        setExerciseRepsDay2(newReps);
        
        return newSelected;
      } else {
        setExerciseSetsDay2(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay2(prev => ({ ...prev, [exerciseId]: "12" }));
        return [...prev, exerciseId];
      }
    });
  };

  // Toggle exercise selection for Day 3
  const toggleExerciseDay3 = (exerciseId: number) => {
    setSelectedExercisesDay3(prev => {
      if (prev.includes(exerciseId)) {
        const newSelected = prev.filter(id => id !== exerciseId);
        const newSets = { ...exerciseSetsDay3 };
        delete newSets[exerciseId];
        setExerciseSetsDay3(newSets);
        
        const newReps = { ...exerciseRepsDay3 };
        delete newReps[exerciseId];
        setExerciseRepsDay3(newReps);
        
        return newSelected;
      } else {
        setExerciseSetsDay3(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay3(prev => ({ ...prev, [exerciseId]: "12" }));
        return [...prev, exerciseId];
      }
    });
  };

  // Toggle exercise selection for Day 4
  const toggleExerciseDay4 = (exerciseId: number) => {
    setSelectedExercisesDay4(prev => {
      if (prev.includes(exerciseId)) {
        const newSelected = prev.filter(id => id !== exerciseId);
        const newSets = { ...exerciseSetsDay4 };
        delete newSets[exerciseId];
        setExerciseSetsDay4(newSets);
        
        const newReps = { ...exerciseRepsDay4 };
        delete newReps[exerciseId];
        setExerciseRepsDay4(newReps);
        
        return newSelected;
      } else {
        setExerciseSetsDay4(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay4(prev => ({ ...prev, [exerciseId]: "12" }));
        return [...prev, exerciseId];
      }
    });
  };

  // Toggle exercise selection for Day 5
  const toggleExerciseDay5 = (exerciseId: number) => {
    setSelectedExercisesDay5(prev => {
      if (prev.includes(exerciseId)) {
        const newSelected = prev.filter(id => id !== exerciseId);
        const newSets = { ...exerciseSetsDay5 };
        delete newSets[exerciseId];
        setExerciseSetsDay5(newSets);
        
        const newReps = { ...exerciseRepsDay5 };
        delete newReps[exerciseId];
        setExerciseRepsDay5(newReps);
        
        return newSelected;
      } else {
        setExerciseSetsDay5(prev => ({ ...prev, [exerciseId]: 3 }));
        setExerciseRepsDay5(prev => ({ ...prev, [exerciseId]: "12" }));
        return [...prev, exerciseId];
      }
    });
  };

  // Handle sets change for Day 1
  const handleSetsChangeDay1 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay1(prev => ({ ...prev, [exerciseId]: sets }));
  };

  // Handle sets change for Day 2
  const handleSetsChangeDay2 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay2(prev => ({ ...prev, [exerciseId]: sets }));
  };

  // Handle sets change for Day 3
  const handleSetsChangeDay3 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay3(prev => ({ ...prev, [exerciseId]: sets }));
  };

  // Handle sets change for Day 4
  const handleSetsChangeDay4 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay4(prev => ({ ...prev, [exerciseId]: sets }));
  };

  // Handle sets change for Day 5
  const handleSetsChangeDay5 = (exerciseId: number, sets: number) => {
    setExerciseSetsDay5(prev => ({ ...prev, [exerciseId]: sets }));
  };

  // Handle reps change for Day 1
  const handleRepsChangeDay1 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay1(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Handle reps change for Day 2
  const handleRepsChangeDay2 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay2(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Handle reps change for Day 3
  const handleRepsChangeDay3 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay3(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Handle reps change for Day 4
  const handleRepsChangeDay4 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay4(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Handle reps change for Day 5
  const handleRepsChangeDay5 = (exerciseId: number, reps: string) => {
    setExerciseRepsDay5(prev => ({ ...prev, [exerciseId]: reps }));
  };

  // Get selected exercises with sets and reps for Day 1
  const getSelectedExercisesWithSetsDay1 = (): ExerciseWithSets[] => {
    return selectedExercisesDay1.map(id => ({
      id,
      day: 1,
      sets: exerciseSetsDay1[id] || 3,
      reps: exerciseRepsDay1[id] || "12"
    }));
  };

  // Get selected exercises with sets and reps for Day 2
  const getSelectedExercisesWithSetsDay2 = (): ExerciseWithSets[] => {
    return selectedExercisesDay2.map(id => ({
      id,
      day: 2,
      sets: exerciseSetsDay2[id] || 3,
      reps: exerciseRepsDay2[id] || "12"
    }));
  };

  // Get selected exercises with sets and reps for Day 3
  const getSelectedExercisesWithSetsDay3 = (): ExerciseWithSets[] => {
    return selectedExercisesDay3.map(id => ({
      id,
      day: 3,
      sets: exerciseSetsDay3[id] || 3,
      reps: exerciseRepsDay3[id] || "12"
    }));
  };

  // Get selected exercises with sets and reps for Day 4
  const getSelectedExercisesWithSetsDay4 = (): ExerciseWithSets[] => {
    return selectedExercisesDay4.map(id => ({
      id,
      day: 4,
      sets: exerciseSetsDay4[id] || 3,
      reps: exerciseRepsDay4[id] || "12"
    }));
  };

  // Get selected exercises with sets and reps for Day 5
  const getSelectedExercisesWithSetsDay5 = (): ExerciseWithSets[] => {
    return selectedExercisesDay5.map(id => ({
      id,
      day: 5,
      sets: exerciseSetsDay5[id] || 3,
      reps: exerciseRepsDay5[id] || "12"
    }));
  };

  return {
    // Day 1
    selectedExercisesDay1,
    toggleExerciseDay1,
    exerciseSetsDay1,
    handleSetsChangeDay1,
    exerciseRepsDay1,
    handleRepsChangeDay1,
    
    // Day 2
    selectedExercisesDay2,
    toggleExerciseDay2,
    exerciseSetsDay2,
    handleSetsChangeDay2,
    exerciseRepsDay2,
    handleRepsChangeDay2,
    
    // Day 3
    selectedExercisesDay3,
    toggleExerciseDay3,
    exerciseSetsDay3,
    handleSetsChangeDay3,
    exerciseRepsDay3,
    handleRepsChangeDay3,
    
    // Day 4
    selectedExercisesDay4,
    toggleExerciseDay4,
    exerciseSetsDay4,
    handleSetsChangeDay4,
    exerciseRepsDay4,
    handleRepsChangeDay4,
    
    // Day 5
    selectedExercisesDay5,
    toggleExerciseDay5,
    exerciseSetsDay5,
    handleSetsChangeDay5,
    exerciseRepsDay5,
    handleRepsChangeDay5,
    
    // Helpers
    getSelectedExercisesWithSetsDay1,
    getSelectedExercisesWithSetsDay2,
    getSelectedExercisesWithSetsDay3,
    getSelectedExercisesWithSetsDay4,
    getSelectedExercisesWithSetsDay5
  };
};

export default useExerciseSelection;
