
import { useState, useCallback } from "react";

export const useExerciseSort = () => {
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = useCallback(() => {
    setIsAscending(!isAscending);
  }, [isAscending]);

  return {
    isAscending,
    handleSort
  };
};
