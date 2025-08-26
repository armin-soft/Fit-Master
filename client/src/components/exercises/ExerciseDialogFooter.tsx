
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, X } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseDialogFooterProps {
  activeTab: string;
  selectedExercisesCount: number;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndContinue?: () => void;
}

const ExerciseDialogFooter: React.FC<ExerciseDialogFooterProps> = ({
  activeTab,
  selectedExercisesCount,
  onCancel,
  onSave,
  onSaveAndContinue
}) => {
  const currentDay = parseInt(activeTab.replace("day", ""));
  const dayText = toPersianNumbers(currentDay);
  const countText = toPersianNumbers(selectedExercisesCount);
  
  return (
    <div className="flex items-center justify-between p-3 border-t bg-gradient-to-r from-emerald-50/50 to-sky-50/50 dark:from-emerald-900/20 dark:to-sky-900/20">
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {countText}
        </span> تمرین برای روز {dayText} انتخاب شده
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="gap-1 text-sky-600 hover:text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:text-sky-300 dark:hover:bg-sky-900/20"
        >
          <X className="h-3.5 w-3.5" />
          <span>انصراف</span>
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          className="gap-1 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white border-0"
        >
          <Save className="h-3.5 w-3.5" />
          <span>ذخیره</span>
        </Button>
        
        {onSaveAndContinue && currentDay < 4 && (
          <Button
            variant="default"
            size="sm"
            onClick={onSaveAndContinue}
            className="gap-1 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white border-0"
          >
            <span>ذخیره و روز بعدی</span>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExerciseDialogFooter;
