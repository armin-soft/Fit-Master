
import React from "react";
import { Student } from "@/components/students/StudentTypes";
import { ExerciseWithSets } from "@/types/exercise";
import { DaySelector, ExerciseContent, ExerciseHeader } from "./exercise";
import { useExerciseTabState } from "./exercise/useExerciseTabState";

interface ProgramExerciseTabProps {
  student: Student;
  exercises: any[];
  onSaveExercises: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
}

export const ProgramExerciseTab: React.FC<ProgramExerciseTabProps> = ({
  student,
  exercises,
  onSaveExercises
}) => {
  const {
    currentDay,
    setCurrentDay,
    selectedExercises,
    setSelectedExercises,
    handleSave,
    isLoading,
    saveStatus
  } = useExerciseTabState(student, onSaveExercises);

  return (
    <div className="space-y-4 p-1">
      <ExerciseHeader 
        currentDay={currentDay} 
        onSave={handleSave} 
        isLoading={isLoading}
        saveStatus={saveStatus}
      />
      
      <DaySelector 
        currentDay={currentDay}
        onDayChange={setCurrentDay}
      />
      
      <ExerciseContent
        currentDay={currentDay}
        exercises={exercises}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />
    </div>
  );
};

export default ProgramExerciseTab;
