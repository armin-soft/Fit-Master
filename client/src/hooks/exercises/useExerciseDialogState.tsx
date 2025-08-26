
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseWithSets } from "@/types/exercise";

interface UseExerciseDialogStateProps {
  open: boolean;
  initialExercises?: number[];
  initialExercisesDay1?: number[];
  initialExercisesDay2?: number[];
  initialExercisesDay3?: number[];
  initialExercisesDay4?: number[];
  initialExercisesDay5?: number[]; // Added day 5
  categories: any[];
  exercises: any[];
}

/**
 * Hook to manage exercise dialog state and logic
 */
export const useExerciseDialogState = ({
  open,
  initialExercises = [],
  initialExercisesDay1 = [],
  initialExercisesDay2 = [],
  initialExercisesDay3 = [],
  initialExercisesDay4 = [],
  initialExercisesDay5 = [], // Added day 5
  categories,
  exercises
}: UseExerciseDialogStateProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("day1");
  
  // Track if exercises have been saved for each day
  const [savedState, setSavedState] = useState({
    day1: false,
    day2: false,
    day3: false,
    day4: false,
    day5: false // Added day 5
  });

  // Reset saved state when dialog opens
  useEffect(() => {
    if (open) {
      setSavedState({
        day1: false,
        day2: false,
        day3: false,
        day4: false,
        day5: false // Added day 5
      });
    }
  }, [open]);
  
  // Auto-select category based on saved exercises
  useEffect(() => {
    if (open && categories.length > 0 && exercises.length > 0) {
      // Get the active tab's selected exercises
      let selectedExercises: number[] = [];
      switch(activeTab) {
        case "day1": selectedExercises = initialExercisesDay1; break;
        case "day2": selectedExercises = initialExercisesDay2; break;
        case "day3": selectedExercises = initialExercisesDay3; break;
        case "day4": selectedExercises = initialExercisesDay4; break;
        case "day5": selectedExercises = initialExercisesDay5; break; // Added day 5
        default: selectedExercises = initialExercises;
      }
      
      // Find category of first selected exercise if there are any
      if (selectedExercises.length > 0) {
        const firstExerciseId = selectedExercises[0];
        const firstExercise = exercises.find(ex => ex.id === firstExerciseId);
        
        if (firstExercise && firstExercise.categoryId) {
          console.log("Auto-selecting category:", firstExercise.categoryId);
          setSelectedCategoryId(firstExercise.categoryId);
          
          // Get exercise type for this category
          const category = categories.find(cat => cat.id === firstExercise.categoryId);
          if (category && category.type) {
            console.log("Auto-selecting exercise type:", category.type);
            setSelectedExerciseType(category.type);
          }
        }
      }
    }
  }, [open, activeTab, categories, exercises, initialExercises, initialExercisesDay1, initialExercisesDay2, initialExercisesDay3, initialExercisesDay4, initialExercisesDay5]);

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedExerciseType, setSelectedExerciseType] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleSortOrder = () => setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategoryId(null);
    setSelectedExerciseType("");
    setSortOrder("asc");
  };

  // Filter categories based on selected exercise type
  const filteredCategories = categories.filter(category => 
    !selectedExerciseType || category.type === selectedExerciseType
  );

  // Filter exercises based on search, category, and type
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = !searchQuery || 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (exercise.description && exercise.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategoryId || exercise.categoryId === selectedCategoryId;
    
    const matchesType = !selectedExerciseType || 
      categories.find(c => c.id === exercise.categoryId)?.type === selectedExerciseType;

    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const handleSaveDay = (
    exercisesWithSets: ExerciseWithSets[],
    onSave: (exercisesWithSets: ExerciseWithSets[], dayNumber?: number) => boolean,
    dayNumber: number
  ) => {
    try {
      const success = onSave(exercisesWithSets, dayNumber);
      
      if (success) {
        // Update saved state for the current tab
        setSavedState(prev => ({
          ...prev,
          [`day${dayNumber}`]: true
        }));
        
        toast({
          title: "ذخیره موفق",
          description: `تمرین‌های ${dayNumber === 1 ? 'روز اول' : 
                        dayNumber === 2 ? 'روز دوم' : 
                        dayNumber === 3 ? 'روز سوم' : 
                        dayNumber === 4 ? 'روز چهارم' : 'روز پنجم'} با موفقیت ذخیره شدند`,
          variant: "default",
        });
        
        // Automatically switch to the next day if not on day5
        if (dayNumber !== 5) {
          const nextTab = `day${dayNumber + 1}`;
          setActiveTab(nextTab);
        } else {
          // If all days have been saved, return true to potentially close the dialog
          const allSaved = savedState.day1 && savedState.day2 && savedState.day3 && savedState.day4 && true; // day5 is saved now
          if (allSaved) {
            return true;
          }
        }
      }
      return success;
    } catch (error) {
      console.error("Error saving exercises:", error);
      toast({
        variant: "destructive",
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی تمرین‌ها پیش آمد. لطفا مجدد تلاش کنید."
      });
      return false;
    }
  };

  return {
    activeTab,
    setActiveTab,
    savedState,
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
  };
};
