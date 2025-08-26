
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import DayTabContent from "./DayTabContent";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { motion } from "framer-motion";

interface TabContentWrapperProps {
  activeTab: string;
  filteredExercises: Exercise[];
  categories: ExerciseCategory[];
  viewMode: "grid" | "list";
  handleClearSearch: () => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  selectedExercisesDay5: number[]; // Added day 5
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  toggleExerciseDay5: (id: number) => void; // Added day 5
  exerciseSetsDay1?: Record<number, number>;
  exerciseSetsDay2?: Record<number, number>;
  exerciseSetsDay3?: Record<number, number>;
  exerciseSetsDay4?: Record<number, number>;
  exerciseSetsDay5?: Record<number, number>; // Added day 5
  handleSetsChangeDay1?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay5?: (exerciseId: number, sets: number) => void; // Added day 5
  exerciseRepsDay1?: Record<number, string>;  
  exerciseRepsDay2?: Record<number, string>;
  exerciseRepsDay3?: Record<number, string>;
  exerciseRepsDay4?: Record<number, string>;
  exerciseRepsDay5?: Record<number, string>; // Added day 5
  handleRepsChangeDay1?: (exerciseId: number, reps: string) => void;  
  handleRepsChangeDay2?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay5?: (exerciseId: number, reps: string) => void; // Added day 5
}

const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
  activeTab,
  filteredExercises,
  categories,
  viewMode,
  handleClearSearch,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  selectedExercisesDay5, // Added day 5
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  toggleExerciseDay5, // Added day 5
  exerciseSetsDay1,
  exerciseSetsDay2,
  exerciseSetsDay3,
  exerciseSetsDay4,
  exerciseSetsDay5, // Added day 5
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  handleSetsChangeDay5, // Added day 5
  exerciseRepsDay1,
  exerciseRepsDay2,
  exerciseRepsDay3,
  exerciseRepsDay4,
  exerciseRepsDay5, // Added day 5
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4,
  handleRepsChangeDay5, // Added day 5
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full overflow-hidden"
    >
      <DayTabContent
        day="day1"
        dayNumber={1}
        filteredExercises={filteredExercises}
        categories={categories}
        viewMode={viewMode}
        handleClearSearch={handleClearSearch}
        selectedExercises={selectedExercisesDay1}
        toggleExercise={toggleExerciseDay1}
        exerciseSets={exerciseSetsDay1}
        onSetsChange={handleSetsChangeDay1}
        repsInfo={exerciseRepsDay1}
        onRepsChange={handleRepsChangeDay1}
      />

      <DayTabContent
        day="day2"
        dayNumber={2}
        filteredExercises={filteredExercises}
        categories={categories}
        viewMode={viewMode}
        handleClearSearch={handleClearSearch}
        selectedExercises={selectedExercisesDay2}
        toggleExercise={toggleExerciseDay2}
        exerciseSets={exerciseSetsDay2}
        onSetsChange={handleSetsChangeDay2}
        repsInfo={exerciseRepsDay2}
        onRepsChange={handleRepsChangeDay2}
      />

      <DayTabContent
        day="day3"
        dayNumber={3}
        filteredExercises={filteredExercises}
        categories={categories}
        viewMode={viewMode}
        handleClearSearch={handleClearSearch}
        selectedExercises={selectedExercisesDay3}
        toggleExercise={toggleExerciseDay3}
        exerciseSets={exerciseSetsDay3}
        onSetsChange={handleSetsChangeDay3}
        repsInfo={exerciseRepsDay3}
        onRepsChange={handleRepsChangeDay3}
      />

      <DayTabContent
        day="day4"
        dayNumber={4}
        filteredExercises={filteredExercises}
        categories={categories}
        viewMode={viewMode}
        handleClearSearch={handleClearSearch}
        selectedExercises={selectedExercisesDay4}
        toggleExercise={toggleExerciseDay4}
        exerciseSets={exerciseSetsDay4}
        onSetsChange={handleSetsChangeDay4}
        repsInfo={exerciseRepsDay4}
        onRepsChange={handleRepsChangeDay4}
      />
      
      <DayTabContent
        day="day5"
        dayNumber={5}
        filteredExercises={filteredExercises}
        categories={categories}
        viewMode={viewMode}
        handleClearSearch={handleClearSearch}
        selectedExercises={selectedExercisesDay5}
        toggleExercise={toggleExerciseDay5}
        exerciseSets={exerciseSetsDay5}
        onSetsChange={handleSetsChangeDay5}
        repsInfo={exerciseRepsDay5}
        onRepsChange={handleRepsChangeDay5}
      />
    </motion.div>
  );
};

export default TabContentWrapper;
