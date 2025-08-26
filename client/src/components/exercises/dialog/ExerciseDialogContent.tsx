
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExerciseSearchFilters } from "../search-filters";
import ExerciseDayTabs from "../ExerciseDayTabs";

interface ExerciseDialogContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExerciseType: string | null;
  setSelectedExerciseType: (type: string | null) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  exerciseTypes: any[];
  categories: any[];
  filteredCategories: any[];
  handleClearSearch: () => void;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: any[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
  exerciseSetsDay1: Record<number, number>;
  exerciseSetsDay2: Record<number, number>;
  exerciseSetsDay3: Record<number, number>;
  exerciseSetsDay4: Record<number, number>;
  exerciseSetsDay5: Record<number, number>; // Added day 5
  handleSetsChangeDay1: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay5: (exerciseId: number, sets: number) => void; // Added day 5
  exerciseRepsDay1: Record<number, string>;
  exerciseRepsDay2: Record<number, string>;
  exerciseRepsDay3: Record<number, string>;
  exerciseRepsDay4: Record<number, string>;
  exerciseRepsDay5: Record<number, string>; // Added day 5
  handleRepsChangeDay1: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay2: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay5: (exerciseId: number, reps: string) => void; // Added day 5
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
}

const ExerciseDialogContent: React.FC<ExerciseDialogContentProps> = ({
  searchQuery,
  setSearchQuery,
  selectedExerciseType,
  setSelectedExerciseType,
  selectedCategoryId,
  setSelectedCategoryId,
  exerciseTypes,
  categories,
  filteredCategories,
  handleClearSearch,
  toggleSortOrder,
  sortOrder,
  viewMode,
  setViewMode,
  filteredExercises,
  activeTab,
  setActiveTab,
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
  handleSaveExercises
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0.5, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0.5, y: 10 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col flex-1 overflow-hidden bg-gradient-to-br from-brand-400/5 to-info-500/5 dark:from-brand-500/10 dark:to-info-500/10"
      >
        <ExerciseSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedExerciseType={selectedExerciseType}
          setSelectedExerciseType={setSelectedExerciseType}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          exerciseTypes={exerciseTypes}
          categories={categories}
          filteredCategories={filteredCategories}
          handleClearSearch={handleClearSearch}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />

        <ExerciseDayTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedExercisesDay1={selectedExercisesDay1}
          selectedExercisesDay2={selectedExercisesDay2}
          selectedExercisesDay3={selectedExercisesDay3}
          selectedExercisesDay4={selectedExercisesDay4}
          selectedExercisesDay5={selectedExercisesDay5}
          toggleExerciseDay1={toggleExerciseDay1}
          toggleExerciseDay2={toggleExerciseDay2}
          toggleExerciseDay3={toggleExerciseDay3}
          toggleExerciseDay4={toggleExerciseDay4}
          toggleExerciseDay5={toggleExerciseDay5}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filteredExercises={filteredExercises}
          categories={categories}
          handleClearSearch={handleClearSearch}
          selectedCategoryId={selectedCategoryId}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
          exerciseSetsDay1={exerciseSetsDay1}
          exerciseSetsDay2={exerciseSetsDay2}
          exerciseSetsDay3={exerciseSetsDay3}
          exerciseSetsDay4={exerciseSetsDay4}
          exerciseSetsDay5={exerciseSetsDay5}
          handleSetsChangeDay1={handleSetsChangeDay1}
          handleSetsChangeDay2={handleSetsChangeDay2}
          handleSetsChangeDay3={handleSetsChangeDay3}
          handleSetsChangeDay4={handleSetsChangeDay4}
          handleSetsChangeDay5={handleSetsChangeDay5}
          exerciseRepsDay1={exerciseRepsDay1}
          exerciseRepsDay2={exerciseRepsDay2}
          exerciseRepsDay3={exerciseRepsDay3}
          exerciseRepsDay4={exerciseRepsDay4}
          exerciseRepsDay5={exerciseRepsDay5}
          handleRepsChangeDay1={handleRepsChangeDay1}
          handleRepsChangeDay2={handleRepsChangeDay2}
          handleRepsChangeDay3={handleRepsChangeDay3}
          handleRepsChangeDay4={handleRepsChangeDay4}
          handleRepsChangeDay5={handleRepsChangeDay5}
          handleSaveExercises={handleSaveExercises}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ExerciseDialogContent;
