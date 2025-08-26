
import { useState, useEffect } from "react";
import { ExerciseWithSets } from "@/hooks/exercise-selection";
import { useExerciseDialogData } from "./useExerciseDialogData";
import { useExerciseSelection } from "@/hooks/exercise-selection";
import { useExerciseDialogState } from "./useExerciseDialogState";
import { useToast } from "@/hooks/use-toast";

interface UseStudentExerciseDialogStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  initialExercisesDay5?: number[];
}

/**
 * Custom hook that manages all state for the student exercise dialog
 */
export const useStudentExerciseDialogState = ({
  open,
  onOpenChange,
  studentName,
  onSave,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = []
}: UseStudentExerciseDialogStateProps) => {
  // For notifications
  const { toast } = useToast();
  
  // Current tab state and changes - manage saving on each tab change
  const [previousTab, setPreviousTab] = useState<string>("");
  const [shouldAutoSave, setShouldAutoSave] = useState<boolean>(true);
  
  // Fetch exercises data
  const { exercises, categories, exerciseTypes, isLoading } = useExerciseDialogData();
  
  // Exercise selection state with day 5
  const {
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
    exerciseSetsDay1,
    exerciseSetsDay2,
    exerciseSetsDay3,
    exerciseSetsDay4,
    exerciseSetsDay5,
    handleSetsChangeDay1,
    handleSetsChangeDay2,
    handleSetsChangeDay3,
    handleSetsChangeDay4,
    handleSetsChangeDay5,
    exerciseRepsDay1,
    exerciseRepsDay2,
    exerciseRepsDay3,
    exerciseRepsDay4,
    exerciseRepsDay5,
    handleRepsChangeDay1,
    handleRepsChangeDay2,
    handleRepsChangeDay3,
    handleRepsChangeDay4,
    handleRepsChangeDay5,
    getSelectedExercisesWithSetsDay1,
    getSelectedExercisesWithSetsDay2,
    getSelectedExercisesWithSetsDay3,
    getSelectedExercisesWithSetsDay4,
    getSelectedExercisesWithSetsDay5
  } = useExerciseSelection({
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4,
    initialExercisesDay5
  });

  // Dialog state management
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
    handleSaveDay
  } = useExerciseDialogState({
    open,
    initialExercises,
    initialExercisesDay1,
    initialExercisesDay2,
    initialExercisesDay3,
    initialExercisesDay4,
    initialExercisesDay5,
    categories,
    exercises
  });
  
  // Auto-save when changing tabs
  useEffect(() => {
    if (previousTab && activeTab !== previousTab && shouldAutoSave) {
      const prevDayNumber = parseInt(previousTab.replace("day", ""));
      let exercisesWithSets: ExerciseWithSets[] = [];
      
      switch(previousTab) {
        case "day1":
          exercisesWithSets = getSelectedExercisesWithSetsDay1();
          break;
        case "day2":
          exercisesWithSets = getSelectedExercisesWithSetsDay2();
          break;
        case "day3":
          exercisesWithSets = getSelectedExercisesWithSetsDay3();
          break;
        case "day4":
          exercisesWithSets = getSelectedExercisesWithSetsDay4();
          break;
        case "day5":
          exercisesWithSets = getSelectedExercisesWithSetsDay5();
          break;
      }
      
      if (exercisesWithSets.length > 0) {
        const success = handleSaveDay(exercisesWithSets, onSave, prevDayNumber);
        if (success) {
          console.log(`Auto-saved exercises for day ${prevDayNumber}`);
        }
      }
    }
    
    // Save current tab for next auto-save
    setPreviousTab(activeTab);
  }, [activeTab]);

  // Update getActiveTabSelectedExercises to support day 5
  const getActiveTabSelectedExercises = () => {
    switch(activeTab) {
      case "day1": return selectedExercisesDay1;
      case "day2": return selectedExercisesDay2;
      case "day3": return selectedExercisesDay3;
      case "day4": return selectedExercisesDay4;
      case "day5": return selectedExercisesDay5;
      default: return [];
    }
  };

  // Update getActiveTabSelectedExercisesWithSets to support day 5
  const getActiveTabSelectedExercisesWithSets = () => {
    switch(activeTab) {
      case "day1": return getSelectedExercisesWithSetsDay1();
      case "day2": return getSelectedExercisesWithSetsDay2();
      case "day3": return getSelectedExercisesWithSetsDay3();
      case "day4": return getSelectedExercisesWithSetsDay4();
      case "day5": return getSelectedExercisesWithSetsDay5();
      default: return [];
    }
  };

  // Update handleSaveAndContinue to support 5 days
  const handleSaveAndContinue = () => {
    const selectedExercisesWithSets = getActiveTabSelectedExercisesWithSets();
    const currentDayNumber = parseInt(activeTab.replace("day", ""));
    
    const success = handleSaveDay(selectedExercisesWithSets, onSave, currentDayNumber);
    if (success) {
      // Move to the next day - updated for 5 days
      if (currentDayNumber < 5) {
        // Disable auto-save for this tab change
        setShouldAutoSave(false);
        setActiveTab(`day${currentDayNumber + 1}`);
        setShouldAutoSave(true);
        
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های روز ${currentDayNumber} ذخیره شد. اکنون روز ${currentDayNumber + 1} را تنظیم کنید.`
        });
      } else {
        // If we're on the last day, close the dialog
        toast({
          title: "تکمیل برنامه",
          description: "تمام روزهای تمرینی با موفقیت ذخیره شدند."
        });
        onOpenChange(false);
      }
    }
    return success;
  };

  const handleSave = () => {
    const selectedExercisesWithSets = getActiveTabSelectedExercisesWithSets();
    const dayNumber = parseInt(activeTab.replace("day", ""));
    
    const success = handleSaveDay(selectedExercisesWithSets, onSave, dayNumber);
    if (success) {
      toast({
        title: "ذخیره موفق",
        description: `تمرین‌های روز ${dayNumber} با موفقیت ذخیره شدند.`
      });
      
      // If we're on the last day, close the dialog
      if (dayNumber === 5) {
        onOpenChange(false);
      }
    }
    return success;
  };

  return {
    // Data
    isLoading,
    exercises,
    categories,
    exerciseTypes,
    
    // Tab state
    activeTab,
    setActiveTab,
    
    // Search and filter state
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedExerciseType,
    setSelectedExerciseType,
    sortOrder,
    toggleSortOrder,
    viewMode,
    setViewMode,
    filteredExercises,
    filteredCategories,
    handleClearSearch,
    
    // Day 1 state
    selectedExercisesDay1,
    toggleExerciseDay1,
    exerciseSetsDay1,
    handleSetsChangeDay1,
    exerciseRepsDay1,
    handleRepsChangeDay1,
    
    // Day 2 state
    selectedExercisesDay2,
    toggleExerciseDay2,
    exerciseSetsDay2,
    handleSetsChangeDay2,
    exerciseRepsDay2,
    handleRepsChangeDay2,
    
    // Day 3 state
    selectedExercisesDay3,
    toggleExerciseDay3,
    exerciseSetsDay3,
    handleSetsChangeDay3,
    exerciseRepsDay3,
    handleRepsChangeDay3,
    
    // Day 4 state
    selectedExercisesDay4,
    toggleExerciseDay4,
    exerciseSetsDay4,
    handleSetsChangeDay4,
    exerciseRepsDay4,
    handleRepsChangeDay4,
    
    // Day 5 state
    selectedExercisesDay5,
    toggleExerciseDay5,
    exerciseSetsDay5,
    handleSetsChangeDay5,
    exerciseRepsDay5,
    handleRepsChangeDay5,
    
    // Helper functions
    getActiveTabSelectedExercises,
    getActiveTabSelectedExercisesWithSets,
    handleSave,
    handleSaveDay,
    handleSaveAndContinue
  };
};

export default useStudentExerciseDialogState;
