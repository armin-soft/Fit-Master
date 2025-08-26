
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabHeader from "./day-tabs/TabHeader";
import { Exercise } from "@/types/exercise";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import TabContentWrapper from "./day-tabs/TabContentWrapper";
import { ExerciseCountBadge } from "./day-tabs/ExerciseCountBadge";
import { cn } from "@/lib/utils";

interface ExerciseDayTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedExercisesDay1: number[];
  selectedExercisesDay2: number[];
  selectedExercisesDay3: number[];
  selectedExercisesDay4: number[];
  selectedExercisesDay5: number[];
  toggleExerciseDay1: (id: number) => void;
  toggleExerciseDay2: (id: number) => void;
  toggleExerciseDay3: (id: number) => void;
  toggleExerciseDay4: (id: number) => void;
  toggleExerciseDay5: (id: number) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  filteredExercises: Exercise[];
  categories: any[];
  handleClearSearch: () => void;
  handleSaveExercises: (exercisesWithSets: any[], dayNumber?: number) => boolean;
  selectedCategoryId: number | null;
  toggleSortOrder: () => void;
  sortOrder: "asc" | "desc";
  exerciseSetsDay1?: Record<number, number>;
  exerciseSetsDay2?: Record<number, number>;
  exerciseSetsDay3?: Record<number, number>;
  exerciseSetsDay4?: Record<number, number>;
  exerciseSetsDay5?: Record<number, number>;
  handleSetsChangeDay1?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay2?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay3?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay4?: (exerciseId: number, sets: number) => void;
  handleSetsChangeDay5?: (exerciseId: number, sets: number) => void;
  exerciseRepsDay1?: Record<number, string>;  
  exerciseRepsDay2?: Record<number, string>;
  exerciseRepsDay3?: Record<number, string>;
  exerciseRepsDay4?: Record<number, string>;
  exerciseRepsDay5?: Record<number, string>;
  handleRepsChangeDay1?: (exerciseId: number, reps: string) => void;  
  handleRepsChangeDay2?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay3?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay4?: (exerciseId: number, reps: string) => void;
  handleRepsChangeDay5?: (exerciseId: number, reps: string) => void;
}

const ExerciseDayTabs: React.FC<ExerciseDayTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedExercisesDay1,
  selectedExercisesDay2,
  selectedExercisesDay3,
  selectedExercisesDay4,
  selectedExercisesDay5,
  toggleExerciseDay1,
  toggleExerciseDay2,
  toggleExerciseDay3,
  toggleExerciseDay4,
  toggleExerciseDay5,
  viewMode,
  setViewMode,
  filteredExercises,
  categories,
  handleClearSearch,
  selectedCategoryId,
  toggleSortOrder,
  sortOrder,
  exerciseSetsDay1 = {},
  exerciseSetsDay2 = {},
  exerciseSetsDay3 = {},
  exerciseSetsDay4 = {},
  exerciseSetsDay5 = {},
  handleSetsChangeDay1,
  handleSetsChangeDay2,
  handleSetsChangeDay3,
  handleSetsChangeDay4,
  handleSetsChangeDay5,
  exerciseRepsDay1 = {},
  exerciseRepsDay2 = {},
  exerciseRepsDay3 = {},
  exerciseRepsDay4 = {},
  exerciseRepsDay5 = {},
  handleRepsChangeDay1,
  handleRepsChangeDay2,
  handleRepsChangeDay3,
  handleRepsChangeDay4,
  handleRepsChangeDay5,
  handleSaveExercises
}) => {
  // Available day tabs - updated to 5 fixed days
  const dayTabs = ["day1", "day2", "day3", "day4", "day5"];
  
  // State for the fullscreen dialog
  const [showFullDialog, setShowFullDialog] = useState(false);
  
  // Get selected exercises for current tab
  const getSelectedExercisesCount = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1.length;
      case "day2": return selectedExercisesDay2.length;
      case "day3": return selectedExercisesDay3.length;
      case "day4": return selectedExercisesDay4.length;
      case "day5": return selectedExercisesDay5.length;
      default: return 0;
    }
  };
  
  // Get day name in Persian
  const getDayName = () => {
    switch(activeTab) {
      case "day1": return "روز اول";
      case "day2": return "روز دوم";
      case "day3": return "روز سوم";
      case "day4": return "روز چهارم";
      case "day5": return "روز پنجم";
      default: return "";
    }
  };
  
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden px-4 pb-2"
      >
        <TabHeader 
          activeTab={activeTab}
          dayTabs={dayTabs}
          selectedExercisesDay1={selectedExercisesDay1}
          selectedExercisesDay2={selectedExercisesDay2}
          selectedExercisesDay3={selectedExercisesDay3}
          selectedExercisesDay4={selectedExercisesDay4}
          selectedExercisesDay5={selectedExercisesDay5}
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder}
        />
        
        <div className="flex items-center justify-between mb-4 mt-2">
          <ExerciseCountBadge count={getSelectedExercisesCount()} />
          
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 border-indigo-200 dark:border-indigo-800 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => setShowFullDialog(true)}
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            نمایش تمرین‌ها
          </Button>
        </div>
      </Tabs>
      
      {/* Full Screen Dialog for better visibility */}
      <AnimatePresence>
        {showFullDialog && (
          <Dialog open={showFullDialog} onOpenChange={setShowFullDialog}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-0 pt-4" aria-describedby="exercise-day-dialog-description">
              <DialogHeader className="px-6 pb-2 border-b border-gray-100 dark:border-gray-800">
                <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  نمایش تمرین‌های {getDayName()}
                </DialogTitle>
                <DialogDescription id="exercise-day-dialog-description" className="sr-only">
                  نمایش تفصیلی تمرین‌های انتخاب شده برای {getDayName()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-auto px-6 py-4">
                {/* Important: Wrapping TabContentWrapper in Tabs context */}
                <Tabs value={activeTab}>
                  <TabContentWrapper
                    activeTab={activeTab}
                    filteredExercises={filteredExercises}
                    categories={categories}
                    viewMode={viewMode}
                    handleClearSearch={handleClearSearch}
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
                  />
                </Tabs>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {getSelectedExercisesCount()} تمرین انتخاب شده
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullDialog(false)}
                    className="border-gray-200 dark:border-gray-800"
                  >
                    بستن
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleSaveExercises([], parseInt(activeTab.replace("day", "")))}
                    className={cn(
                      "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700",
                      getSelectedExercisesCount() === 0 && "opacity-50 pointer-events-none"
                    )}
                  >
                    ذخیره تمرین‌ها
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExerciseDayTabs;
