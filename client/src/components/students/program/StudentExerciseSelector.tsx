
import React from "react";
import { ExerciseWithSets } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import ExerciseTypeCategory from "./selectors/ExerciseTypeCategory";
import { useExerciseSelector } from "./hooks/useExerciseSelector";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ExerciseStatsHeader from "./selectors/ExerciseStatsHeader";
import ExerciseGridSection from "./selectors/ExerciseGridSection";

interface StudentExerciseSelectorProps {
  selectedExercises: ExerciseWithSets[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  dayNumber: number;
  exercises: any[]; 
  dayLabel?: string;
  noScroll?: boolean;
  isDayMandatory?: boolean;
  isDayOptional?: boolean;
}

const StudentExerciseSelector: React.FC<StudentExerciseSelectorProps> = ({
  selectedExercises,
  setSelectedExercises,
  dayNumber,
  exercises,
  dayLabel,
  noScroll = false,
  isDayMandatory,
  isDayOptional,
}) => {
  // جلوگیری از استفاده از toast در حین رندر
  const { toast } = useToast();
  const { categories, exerciseTypes, isLoading } = useExerciseData();
  
  const {
    selectedType,
    setSelectedType,
    selectedCategoryId,
    setSelectedCategoryId,
    viewMode,
    setViewMode,
    filteredCategories,
    filteredExercises,
    toggleExercise,
    handleSetsChange,
    handleRepsChange,
    clearFilters
  } = useExerciseSelector({
    exercises,
    categories: Array.isArray(categories) ? categories : [],
    exerciseTypes: Array.isArray(exerciseTypes) ? exerciseTypes.map(type => typeof type === 'string' ? type : type.name || type.type || '') : [],
    selectedExercises,
    setSelectedExercises,
    dayNumber
  });

  const getDayLabel = () => {
    if (dayLabel) return dayLabel;
    
    switch (dayNumber) {
      case 1: return "روز اول";
      case 2: return "روز دوم";
      case 3: return "روز سوم";
      case 4: return "روز چهارم";
      case 5: return "روز پنجم";
      case 6: return "روز ششم";
      default: return `روز ${toPersianNumbers(dayNumber)}`;
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-right" dir="rtl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse"></div>
          <p className="text-gray-500 dark:text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-6 text-right p-6",
      noScroll ? "h-full flex flex-col" : ""
    )} dir="rtl">
      {/* Header Stats */}
      <ExerciseStatsHeader 
        selectedExercises={selectedExercises}
        exercises={exercises}
        dayLabel={getDayLabel()}
      />

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-right"
        dir="rtl"
      >
        <ExerciseTypeCategory
          selectedType={selectedType}
          setSelectedType={(value) => typeof value === 'function' ? setSelectedType(value(selectedType)) : setSelectedType(value)}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={(value) => typeof value === 'function' ? setSelectedCategoryId(value(selectedCategoryId)) : setSelectedCategoryId(value)}
          exerciseTypes={exerciseTypes || []}
          filteredCategories={filteredCategories || []}
          filteredExercises={filteredExercises || []}
          clearFilters={clearFilters}
        />
      </motion.div>
      
      {/* Exercise Grid Section */}
      <ExerciseGridSection
        selectedExercises={selectedExercises}
        exercises={exercises}
        dayLabel={getDayLabel()}
        toggleExercise={toggleExercise}
        handleSetsChange={handleSetsChange}
        handleRepsChange={handleRepsChange}
        filteredExercises={filteredExercises}
        selectedType={selectedType}
        selectedCategoryId={selectedCategoryId}
        viewMode={viewMode}
        noScroll={noScroll}
      />
    </div>
  );
};

export default StudentExerciseSelector;
