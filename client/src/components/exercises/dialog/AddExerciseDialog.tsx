
import React, { useEffect } from "react";
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose,
  VisuallyHidden
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SingleExerciseForm } from "./SingleExerciseForm";
import { GroupExerciseForm } from "./GroupExerciseForm";
import { ExerciseFormActions } from "./ExerciseFormActions";
import { motion, AnimatePresence } from "framer-motion";
import { ExerciseCategory } from "@/types/exercise";

interface AddExerciseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: ExerciseCategory[];
  formData: { name: string; categoryId: number };
  onFormDataChange: (data: { name: string; categoryId: number }) => void;
  onSave: () => void;
  isSaving: boolean;
  groupText: string;
  setGroupText: (text: string) => void;
  currentSaveIndex: number;
  totalToSave: number;
  skippedExercises: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AddExerciseDialog({
  isOpen,
  onOpenChange,
  categories,
  formData,
  onFormDataChange,
  onSave,
  isSaving,
  groupText,
  setGroupText,
  currentSaveIndex,
  totalToSave,
  skippedExercises,
  activeTab,
  setActiveTab,
}: AddExerciseDialogProps) {
  
  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      // فقط نام را ریست کن، دسته‌بندی را حفظ کن
      onFormDataChange({ 
        name: "", 
        categoryId: formData.categoryId || (categories.length > 0 ? categories[0].id : 0)
      });
      setGroupText("");
    }
  }, [isOpen, categories, onFormDataChange, setGroupText, formData.categoryId]);

  const handleClose = () => {
    if (!isSaving) {
      onOpenChange(false);
    }
  };

  // پیدا کردن دسته‌بندی انتخاب شده
  const selectedCategory = categories.find(c => c.id === formData.categoryId);
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-w-[calc(100%-2rem)] mx-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-emerald-100/50 dark:border-emerald-900/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            افزودن حرکت جدید
          </DialogTitle>
          <DialogDescription id="add-exercise-dialog-description" className="sr-only">
            فرم افزودن حرکت جدید به لیست حرکات ورزشی
          </DialogDescription>
          {selectedCategory && (
            <div className="text-center mt-2">
              <span className="text-sm text-muted-foreground">
                دسته‌بندی: 
              </span>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mr-1">
                {selectedCategory.name}
              </span>
            </div>
          )}
          <DialogClose className="absolute top-2 right-2" />
        </DialogHeader>
        
        <div className="space-y-6 py-4 text-right">
          <Tabs 
            defaultValue="single" 
            className="w-full" 
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger 
                value="single"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                افزودن تکی
              </TabsTrigger>
              <TabsTrigger 
                value="group"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
              >
                افزودن گروهی
              </TabsTrigger>
            </TabsList>
            
            <TabsContent 
              value="single" 
              className="mt-0 border-0 p-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SingleExerciseForm
                  value={formData.name}
                  onChange={(value) => onFormDataChange({ ...formData, name: value })}
                />
              </motion.div>
            </TabsContent>
            
            <TabsContent 
              value="group" 
              className="mt-0 border-0 p-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                  <div className="mb-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm text-muted-foreground">
                        دسته‌بندی انتخاب شده: <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {selectedCategory?.name || 'نامشخص'}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        تمام حرکات به این دسته‌بندی اضافه خواهند شد
                      </p>
                    </div>
                  </div>
                  
                  <GroupExerciseForm
                    value={groupText}
                    onChange={setGroupText}
                    isSaving={isSaving}
                    currentSaveIndex={currentSaveIndex}
                    totalToSave={totalToSave}
                    skippedExercises={skippedExercises}
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          
          <ExerciseFormActions
            onCancel={handleClose}
            onSave={onSave}
            isSaving={isSaving}
            isDisabled={
              activeTab === "single" 
                ? formData.name.trim() === "" 
                : groupText.trim() === ""
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddExerciseDialog;
