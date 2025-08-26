
import React from "react";
import { ExerciseDialog } from "@/components/exercises/ExerciseDialog";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Exercise } from "@/types/exercise";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useExerciseData } from "@/hooks/exercises/useExerciseData";

interface ExerciseDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  selectedExercise?: Exercise;
  formData: { name: string; categoryId: number };
  setFormData: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onDelete: (ids: number[]) => void;
  selectedExerciseIds: number[];
}

const ExerciseDialogs: React.FC<ExerciseDialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  selectedExercise,
  formData,
  setFormData,
  onSave,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDelete,
  selectedExerciseIds
}) => {
  // Get categories from hook
  const { categories } = useExerciseData();

  const handleDelete = () => {
    if (selectedExerciseIds.length > 0) {
      onDelete(selectedExerciseIds);
    }
  };
  
  return (
    <>
      {/* Add/Edit Exercise Dialog */}
      <ExerciseDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        selectedExercise={selectedExercise}
        categories={categories}
        formData={formData}
        onFormChange={setFormData}
        onSave={onSave}
        isEditing={!!selectedExercise}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="حذف حرکت"
        description={
          selectedExerciseIds.length > 1
            ? `آیا از حذف ${toPersianNumbers(selectedExerciseIds.length)} حرکت انتخاب شده اطمینان دارید؟`
            : "آیا از حذف این حرکت اطمینان دارید؟"
        }
        confirmText="حذف"
        cancelText="انصراف"
        variant="destructive"
      />
    </>
  );
};

export default ExerciseDialogs;
