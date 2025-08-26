
import React from "react";
import { motion } from "framer-motion";
import StudentExerciseSelector from "@/components/students/program/StudentExerciseSelector";
import { ExerciseWithSets } from "@/types/exercise";

interface ExerciseContentProps {
  currentDay: number;
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  exercises: any[];
}

const ExerciseContent: React.FC<ExerciseContentProps> = ({
  currentDay,
  selectedExercises,
  setSelectedExercises,
  exercises,
}) => {
  return (
    <motion.div 
      className="h-full"
      key={`day-${currentDay}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <StudentExerciseSelector 
        exercises={exercises}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        dayNumber={currentDay}
        noScroll={true}
      />
    </motion.div>
  );
};

export default ExerciseContent;
