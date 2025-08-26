
import React from "react";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useStudentExerciseDialogState } from "@/hooks/exercises/useStudentExerciseDialogState";

interface StudentExerciseDialogStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  initialExercisesDay5?: number[]; // Added day 5 here
  children: (props: {
    isLoading: boolean;
    exercises: any[];
    categories: any[];
    exerciseTypes: any[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategoryId: number | null;
    setSelectedCategoryId: (id: number | null) => void;
    selectedExerciseType: string | null;
    setSelectedExerciseType: (type: string | null) => void;
    sortOrder: "asc" | "desc";
    toggleSortOrder: () => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    filteredExercises: any[];
    filteredCategories: any[];
    handleClearSearch: () => void;
    selectedExercisesDay1: number[];
    selectedExercisesDay2: number[];
    selectedExercisesDay3: number[];
    selectedExercisesDay4: number[];
    selectedExercisesDay5: number[]; // Added day 5 here
    toggleExerciseDay1: (id: number) => void;
    toggleExerciseDay2: (id: number) => void;
    toggleExerciseDay3: (id: number) => void;
    toggleExerciseDay4: (id: number) => void;
    toggleExerciseDay5: (id: number) => void; // Added day 5 here
    exerciseSetsDay1: Record<number, number>;
    exerciseSetsDay2: Record<number, number>;
    exerciseSetsDay3: Record<number, number>;
    exerciseSetsDay4: Record<number, number>;
    exerciseSetsDay5: Record<number, number>; // Added day 5 here
    handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
    handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
    handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
    handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
    handleSetsChangeDay5: (exerciseId: number, sets: number) => void; // Added day 5 here
    exerciseRepsDay1: Record<number, string>;
    exerciseRepsDay2: Record<number, string>;
    exerciseRepsDay3: Record<number, string>;
    exerciseRepsDay4: Record<number, string>;
    exerciseRepsDay5: Record<number, string>; // Added day 5 here
    handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
    handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
    handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
    handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
    handleRepsChangeDay5: (exerciseId: number, reps: string) => void; // Added day 5 here
    getActiveTabSelectedExercises: () => number[];
    getActiveTabSelectedExercisesWithSets: () => ExerciseWithSets[];
    handleSave: () => boolean;
    handleSaveAndContinue: () => boolean;
    handleSaveDay: (exercisesWithSets: ExerciseWithSets[], onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean, dayNumber: number) => boolean;
  }) => React.ReactNode;
}

export const StudentExerciseDialogState: React.FC<StudentExerciseDialogStateProps> = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = [], // Added day 5 here
  children
}) => {
  // Use the custom hook to manage all state
  const stateProps = useStudentExerciseDialogState({
    open,
    onOpenChange,
    studentName,
    onSave,
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4,
    initialExercisesDay5 // Added day 5 here
  });

  // Render the children function with all the state props
  return children(stateProps);
};

export default StudentExerciseDialogState;
