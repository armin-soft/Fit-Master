
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useExerciseDialogLogic } from "@/hooks/exercises/useExerciseDialogLogic";
import { EditExerciseDialog } from "./EditExerciseDialog";
import { AddExerciseDialog } from "./AddExerciseDialog";

interface ExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
  deviceInfo?: any;
  fullScreen?: boolean;
}

export function ExerciseDialogMain({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormDataChange,
  onSave,
  deviceInfo,
  fullScreen,
}: ExerciseDialogProps) {
  const {
    groupText,
    setGroupText,
    activeTab,
    setActiveTab,
    isSaving,
    currentSaveIndex,
    totalToSave,
    skippedExercises,
    handleSave
  } = useExerciseDialogLogic({
    isOpen,
    onOpenChange,
    selectedExercise,
    categories,
    formData,
    onFormDataChange,
    onSave
  });

  // نمایش دیالوگ ویرایش برای حرکت انتخاب شده
  if (selectedExercise) {
    return (
      <EditExerciseDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        exercise={selectedExercise}
        categories={categories}
        formData={formData}
        onFormDataChange={onFormDataChange}
        onSave={handleSave}
        isSaving={isSaving}
      />
    );
  }

  // نمایش دیالوگ افزودن حرکت جدید
  return (
    <AddExerciseDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      categories={categories}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onSave={handleSave}
      isSaving={isSaving}
      groupText={groupText}
      setGroupText={setGroupText}
      currentSaveIndex={currentSaveIndex}
      totalToSave={totalToSave}
      skippedExercises={skippedExercises}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

export default ExerciseDialogMain;
