
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ExerciseFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  isDisabled?: boolean;
}

export const ExerciseFormActions: React.FC<ExerciseFormActionsProps> = ({
  onCancel,
  onSave,
  isSaving,
  isDisabled = false,
}) => {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSaving && !isDisabled) {
      onSave();
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  return (
    <div className="flex justify-end gap-3 mt-4">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button 
          type="button"
          variant="outline" 
          onClick={handleCancel}
          className="hover:bg-muted/50 transition-colors border-gray-200 dark:border-gray-700"
        >
          انصراف
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button 
          type="button"
          onClick={handleSave}
          disabled={isSaving || isDisabled}
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 transition-all min-w-24 shadow-md hover:shadow-lg"
        >
          {isSaving ? "در حال ذخیره..." : "ذخیره"}
        </Button>
      </motion.div>
    </div>
  );
};

export default ExerciseFormActions;
