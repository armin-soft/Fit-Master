
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface UseExercisesTabLogicProps {
  filteredCategories: ExerciseCategory[];
  filteredExercises: Exercise[];
  onAddExercise: () => void;
  onDeleteExercises: (ids: number[]) => boolean;
}

export const useExercisesTabLogic = ({
  filteredCategories,
  filteredExercises,
  onAddExercise,
  onDeleteExercises
}: UseExercisesTabLogicProps) => {
  const { toast } = useToast();
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);

  const handleAddExercise = () => {
    if (filteredCategories.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "ابتدا باید یک دسته بندی ایجاد کنید"
      });
      return;
    }
    onAddExercise();
  };

  const handleDeleteAll = () => {
    if (filteredExercises.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "هیچ حرکتی برای حذف وجود ندارد"
      });
      return;
    }
    setIsDeleteAllDialogOpen(true);
  };

  const confirmDeleteAll = () => {
    const allExerciseIds = filteredExercises.map(ex => ex.id);
    const success = onDeleteExercises(allExerciseIds);
    
    if (success) {
      toast({
        title: "موفقیت",
        description: `${toPersianNumbers(filteredExercises.length)} حرکت با موفقیت حذف شد`
      });
    }
    
    setIsDeleteAllDialogOpen(false);
  };

  return {
    isDeleteAllDialogOpen,
    setIsDeleteAllDialogOpen,
    handleAddExercise,
    handleDeleteAll,
    confirmDeleteAll
  };
};
