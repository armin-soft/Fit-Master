
import { useState, useEffect } from "react";
import { Exercise, ExerciseCategory } from "@/types/exercise";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExerciseData } from "./useExerciseData";

interface UseExerciseDialogLogicProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedExercise?: Exercise;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: (data: { name: string; categoryId: number }) => Promise<void>;
}

export const useExerciseDialogLogic = ({
  isOpen,
  onOpenChange,
  selectedExercise,
  categories,
  formData,
  onFormDataChange,
  onSave
}: UseExerciseDialogLogicProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { exercises } = useExerciseData();
  
  const [groupText, setGroupText] = useState("");
  const [activeTab, setActiveTab] = useState("single");
  const [isSaving, setIsSaving] = useState(false);
  const [currentSaveIndex, setCurrentSaveIndex] = useState(0);
  const [totalToSave, setTotalToSave] = useState(0);
  const [skippedExercises, setSkippedExercises] = useState<string[]>([]);

  // Reset states when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setGroupText("");
      setActiveTab("single");
      setIsSaving(false);
      setCurrentSaveIndex(0);
      setTotalToSave(0);
      setSkippedExercises([]);
    }
  }, [isOpen]);

  const saveGroupExercises = async () => {
    if (!groupText.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام حرکت‌ها را وارد کنید"
      });
      return;
    }

    // Split by lines and clean up
    const exerciseNames = groupText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (exerciseNames.length === 0) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفاً نام حرکت‌ها را وارد کنید"
      });
      return;
    }

    setIsSaving(true);
    setTotalToSave(exerciseNames.length);
    setCurrentSaveIndex(0);
    setSkippedExercises([]);

    const skipped: string[] = [];
    let savedCount = 0;

    try {
      // Get current exercises list
      const currentExercises = [...exercises];
      const newExercises: Exercise[] = [];

      for (let i = 0; i < exerciseNames.length; i++) {
        const exerciseName = exerciseNames[i];
        setCurrentSaveIndex(i);

        console.log(`Processing exercise ${i + 1}/${exerciseNames.length}: "${exerciseName}"`);

        // Check for duplicates (case insensitive)
        const isDuplicate = currentExercises.some(ex => 
          ex.name.toLowerCase().trim() === exerciseName.toLowerCase().trim()
        );

        if (isDuplicate) {
          console.log(`Skipping duplicate exercise: "${exerciseName}"`);
          skipped.push(exerciseName);
          continue;
        }

        // Create new exercise via API
        const response = await fetch('/api/exercises', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name: exerciseName,
            categoryId: formData.categoryId
            // trainerId will be extracted from session by backend
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Create exercise failed:', errorData);
          toast({
            variant: "destructive",
            title: "خطا",
            description: `خطا در ایجاد حرکت "${exerciseName}": ${errorData}`
          });
          continue; // Skip this exercise and continue with the next one
        }

        const newExercise = await response.json();
        newExercises.push(newExercise);
        savedCount++;

        console.log(`Created exercise: "${exerciseName}" with ID: ${newExercise.id}`);
      }

      // Invalidate cache to refresh data from server
      if (newExercises.length > 0) {
        await queryClient.invalidateQueries({ queryKey: ["/api/exercises"] });
        console.log(`Successfully saved ${newExercises.length} new exercises`);
      }

      setSkippedExercises(skipped);

      // Show success message
      if (savedCount > 0) {
        toast({
          title: "موفقیت",
          description: `${savedCount} حرکت جدید با موفقیت اضافه شد` + 
            (skipped.length > 0 ? ` (${skipped.length} حرکت تکراری رد شد)` : ""),
          variant: "success",
        });
      } else if (skipped.length > 0) {
        toast({
          title: "اطلاع",
          description: "تمام حرکت‌ها قبلاً موجود بودند",
          variant: "default",
        });
      }

      // Close dialog if all successful or some saved
      if (savedCount > 0) {
        onOpenChange(false);
      }

    } catch (error) {
      console.error('Error saving group exercises:', error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی حرکت‌ها"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (activeTab === "group") {
      await saveGroupExercises();
    } else {
      // Single exercise save
      try {
        await onSave(formData);
      } catch (error) {
        console.error('Error saving single exercise:', error);
      }
    }
  };

  return {
    groupText,
    setGroupText,
    activeTab,
    setActiveTab,
    isSaving,
    currentSaveIndex,
    totalToSave,
    skippedExercises,
    handleSave
  };
};

export default useExerciseDialogLogic;
