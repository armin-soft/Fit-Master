
import { useState } from "react";
import { Exercise } from "@/types/exercise";

export const useExerciseState = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const [exerciseFormData, setExerciseFormData] = useState({ name: "", categoryId: 0 });
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false);

  return {
    selectedExercise,
    setSelectedExercise,
    exerciseFormData,
    setExerciseFormData,
    isExerciseDialogOpen,
    setIsExerciseDialogOpen
  };
};
