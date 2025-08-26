
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useExerciseTypesMutations } from "@/hooks/exercises/useExerciseTypesMutations";
import { useToast } from "@/hooks/use-toast";
import { ExerciseType } from "@/types/exercise";

interface TypeDialogManagerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingType: ExerciseType | null;
  onComplete: () => void;
}

export const TypeDialogManager: React.FC<TypeDialogManagerProps> = ({
  isOpen,
  onOpenChange,
  editingType,
  onComplete
}) => {
  const { createExerciseType, updateExerciseType, deleteExerciseType } = useExerciseTypesMutations();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    color: "#6366f1"
  });
  
  // Set initial form data when editing
  React.useEffect(() => {
    if (editingType) {
      setFormData({
        name: editingType.name,
        color: editingType.color || "#6366f1"
      });
    } else {
      setFormData({
        name: "",
        color: "#6366f1"
      });
    }
  }, [editingType, isOpen]);

  // Handle save type
  const handleSaveType = async () => {
    if (!formData.name.trim()) {
      return;
    }
    
    try {
      if (editingType) {
        await updateExerciseType.mutateAsync({
          id: editingType.id,
          data: formData
        });
      } else {
        await createExerciseType.mutateAsync(formData);
      }
      
      onOpenChange(false);
      onComplete();
    } catch (error) {
      console.error("Error saving exercise type:", error);
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ذخیره‌سازی نوع تمرین"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingType ? "ویرایش نوع تمرین" : "افزودن نوع تمرین جدید"}
          </DialogTitle>
          <DialogDescription id="type-dialog-description" className="sr-only">
            فرم برای {editingType ? "ویرایش" : "افزودن"} نوع تمرین جدید
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">نام نوع تمرین</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="مثال: تمرینات قدرتی"
              className="text-right"
              dir="rtl"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            لغو
          </Button>
          <Button onClick={handleSaveType} disabled={!formData.name.trim()}>
            {editingType ? "ویرایش" : "افزودن"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
