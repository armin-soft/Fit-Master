
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, VisuallyHidden } from "@/components/ui/dialog";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { SingleExerciseForm } from "./SingleExerciseForm";
import { ExerciseFormActions } from "./ExerciseFormActions";

interface EditExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: Exercise;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function EditExerciseDialog({
  isOpen,
  onOpenChange,
  exercise,
  categories,
  formData,
  onFormDataChange,
  onSave,
  isSaving,
}: EditExerciseDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[calc(100%-2rem)] mx-auto bg-gradient-to-br from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-900/10 border-emerald-200 dark:border-emerald-800">
        <DialogHeader className="border-b border-emerald-100 dark:border-emerald-800 pb-4">
          <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-brand-600 to-info-600 bg-clip-text text-transparent">
            ویرایش حرکت
          </DialogTitle>
          <DialogDescription id="edit-exercise-dialog-description" className="sr-only">
            فرم ویرایش اطلاعات حرکت ورزشی
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 text-right">
          <SingleExerciseForm
            value={formData.name}
            onChange={(value) => onFormDataChange({ ...formData, name: value })}
          />
        </div>
        <ExerciseFormActions
          onCancel={() => onOpenChange(false)}
          onSave={onSave}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
