
import { useState, useEffect } from "react";

/**
 * Hook to manage exercise type selection
 */
export const useExerciseTypeSelection = (exerciseTypes: string[]) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // Set initial selected type when data loads
  useEffect(() => {
    if (exerciseTypes.length > 0 && !selectedType) {

      setSelectedType(exerciseTypes[0]);
    }
  }, [exerciseTypes, selectedType]);

  const handleSelectType = (type: string | null) => {
    console.log("Selecting exercise type:", type);
    // بروزرسانی فوری
    setSelectedType(type);
  };

  return {
    selectedType,
    setSelectedType: handleSelectType
  };
};
