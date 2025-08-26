
import React from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";
import { useExerciseTypesMutations } from "@/hooks/exercises/useExerciseTypesMutations";
import { ExerciseType } from "@/types/exercise";

interface DeleteTypeConfirmationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  typeToDelete: ExerciseType | null;
  onComplete: () => void;
}

export const DeleteTypeConfirmation: React.FC<DeleteTypeConfirmationProps> = ({
  isOpen,
  onOpenChange,
  typeToDelete,
  onComplete
}) => {
  const { toast } = useToast();
  const { categories } = useExerciseData();
  const { deleteExerciseType } = useExerciseTypesMutations();

  // Confirm delete type
  const confirmDeleteType = async () => {
    if (!typeToDelete) return;
    
    try {
      // Check if type is used in any category
      const typeInUse = categories.some(c => c.typeId === typeToDelete.id);
      if (typeInUse) {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "این نوع تمرین در دسته‌بندی‌ها استفاده شده است و قابل حذف نیست"
        });
        onOpenChange(false);
        return;
      }
      
      await deleteExerciseType.mutateAsync(typeToDelete.id);
      
      onOpenChange(false);
      onComplete();
    } catch (error) {
      console.error("Error deleting exercise type:", error);
      // Don't show toast here as the mutation handles it
      onOpenChange(false);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={() => onOpenChange(false)}
      onConfirm={confirmDeleteType}
      title="حذف نوع تمرین"
      description={`آیا مطمئن هستید که می‌خواهید نوع تمرین «${typeToDelete?.name || ''}» را حذف کنید؟ این عمل قابل بازگشت نیست.`}
      confirmText="حذف"
      cancelText="انصراف"
      variant="destructive"
    />
  );
};
