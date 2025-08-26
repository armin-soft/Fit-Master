
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  VisuallyHidden
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { ExerciseType } from "@/types/exercise";

interface CategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseTypes: (string | ExerciseType)[];
  selectedType: string;
  formData: { name: string; type?: string };
  onFormDataChange: (data: { name: string; type: string }) => void;
  onTypeChange: (type: string) => void;
  onSave: (data?: { name: string; type: string }) => Promise<void> | void;
  isEditMode?: boolean;
}

export function CategoryDialog({
  isOpen,
  onOpenChange,
  exerciseTypes,
  selectedType,
  formData,
  onFormDataChange,
  onTypeChange,
  onSave,
  isEditMode = false
}: CategoryDialogProps) {
  // اضافه کردن قابلیت Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isOpen && formData.name.trim() && selectedType) {
        onSave({ name: formData.name, type: selectedType });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, formData.name, selectedType, onSave]);



  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-right" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isEditMode ? "ویرایش دسته بندی" : "افزودن دسته بندی جدید"}
          </DialogTitle>
          <DialogDescription id="category-dialog-description" className="sr-only">
            {isEditMode ? "فرم ویرایش دسته‌بندی حرکات ورزشی" : "فرم افزودن دسته‌بندی جدید برای حرکات ورزشی"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-base">نوع حرکت</Label>
            {selectedType && (
              <div className="text-xs text-muted-foreground mb-2 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded">
                نوع حرکت خودکار انتخاب شده و قابل تغییر نیست
              </div>
            )}
            <select
              className={`flex h-11 w-full rounded-lg border border-input px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 transition-shadow text-right ${
                selectedType ? 'bg-muted cursor-not-allowed opacity-70' : 'bg-background'
              }`}
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              disabled={!!selectedType}
              dir="rtl"
            >
              <option value="">انتخاب نوع حرکت</option>
              {exerciseTypes.map((type) => (
                <option key={typeof type === 'object' ? type.id : type} value={typeof type === 'object' ? type.name : type}>
                  {typeof type === 'object' ? type.name : type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">نام دسته بندی</Label>
            <Input
              value={formData.name}
              onChange={(e) => onFormDataChange({ name: e.target.value, type: selectedType })}
              placeholder="نام دسته بندی را وارد کنید"
              className="h-11 text-base focus-visible:ring-emerald-400 text-right"
              autoFocus
              dir="rtl"
            />
          </div>
        </div>
        <div className="flex justify-start gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="hover:bg-muted/50 transition-colors"
          >
            <X className="ml-2 h-4 w-4" />
            انصراف
          </Button>
          <Button 
            onClick={() => onSave({ name: formData.name, type: selectedType })}
            disabled={!formData.name.trim() || !selectedType}
            className="bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-600 hover:to-sky-700 transition-all min-w-24"
          >
            <Check className="ml-2 h-4 w-4" />
            ذخیره
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
