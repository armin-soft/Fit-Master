
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";

interface MealDialogActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export const MealDialogActions: React.FC<MealDialogActionsProps> = ({
  isEditing,
  isSubmitting,
  onCancel,
  onSubmit
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="w-full sm:w-auto px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 h-auto font-bold border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs sm:text-sm md:text-base"
        disabled={isSubmitting}
      >
        <X className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        انصراف
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        className="w-full sm:w-auto px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 md:py-3 h-auto font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm md:text-base"
        disabled={isSubmitting}
      >
        <Save className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        {isSubmitting 
          ? "در حال ذخیره..." 
          : isEditing 
            ? "ذخیره تغییرات" 
            : "افزودن وعده غذایی"
        }
      </Button>
    </div>
  );
};
