
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ExerciseWithSets } from "@/types/exercise";
import SelectedExercisesList from "./SelectedExercisesList";
import ExerciseListDisplay from "./ExerciseListDisplay";

interface ExerciseGridSectionProps {
  selectedExercises: ExerciseWithSets[];
  exercises: any[];
  dayLabel: string;
  toggleExercise: (exerciseId: number) => void;
  handleSetsChange: (exerciseId: number, sets: number) => void;
  handleRepsChange: (exerciseId: number, reps: string) => void;
  filteredExercises: any[];
  selectedType: string | null;
  selectedCategoryId: number | null;
  viewMode: "grid" | "list";
  noScroll?: boolean;
}

const ExerciseGridSection: React.FC<ExerciseGridSectionProps> = ({
  selectedExercises,
  exercises,
  dayLabel,
  toggleExercise,
  handleSetsChange,
  handleRepsChange,
  filteredExercises,
  selectedType,
  selectedCategoryId,
  viewMode,
  noScroll = false
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 lg:grid-cols-2 gap-6 text-right",
      noScroll ? "flex-1 overflow-hidden" : ""
    )} dir="rtl">
      {/* Selected Exercises */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-emerald-50/90 dark:from-gray-800/90 dark:to-emerald-900/90 backdrop-blur-sm h-full border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  تمرین‌های انتخاب شده
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  برای {dayLabel} • {toPersianNumbers(selectedExercises.length)} تمرین
                </p>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              {selectedExercises.length > 0 ? (
                <SelectedExercisesList
                  selectedExercises={selectedExercises}
                  exercises={exercises}
                  dayLabel={dayLabel}
                  toggleExercise={toggleExercise}
                  handleSetsChange={handleSetsChange}
                  handleRepsChange={handleRepsChange}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-200 to-sky-300 dark:from-emerald-600 dark:to-sky-700 rounded-2xl flex items-center justify-center mb-4">
                    <Dumbbell className="w-8 h-8 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ تمرینی انتخاب نشده</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">از لیست سمت راست تمرین انتخاب کنید</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Exercise List */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-sky-50/90 dark:from-gray-800/90 dark:to-sky-900/90 backdrop-blur-sm h-full border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  لیست تمرین‌ها
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {toPersianNumbers(filteredExercises.length)} تمرین موجود
                </p>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              {filteredExercises.length > 0 ? (
                <ExerciseListDisplay
                  filteredExercises={filteredExercises}
                  selectedExercises={selectedExercises}
                  selectedType={selectedType}
                  selectedCategoryId={selectedCategoryId}
                  toggleExercise={toggleExercise}
                  viewMode={viewMode}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-200 to-emerald-300 dark:from-sky-600 dark:to-emerald-700 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-sky-600 dark:text-sky-300" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ تمرینی یافت نشد</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">لطفا دسته‌بندی انتخاب کنید</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExerciseGridSection;
