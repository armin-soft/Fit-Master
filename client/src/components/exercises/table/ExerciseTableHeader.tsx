
import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, Trash2, ArrowUpDown } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseTableHeaderProps {
  selectedCount: number;
  onAdd: () => void;
  onSort: () => void;
  onDelete: () => void;
  isAscending: boolean;
}

export const ExerciseTableHeader: React.FC<ExerciseTableHeaderProps> = ({
  selectedCount,
  onAdd,
  onSort,
  onDelete,
  isAscending
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Dumbbell className="w-5 h-5 text-brand-500" />
        حرکات تمرینی
      </h3>
      <div className="flex items-center gap-2 flex-wrap">
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="gap-1 text-xs sm:text-sm"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            حذف {selectedCount > 1 
              ? `${toPersianNumbers(selectedCount)} حرکت` 
              : "حرکت منتخب"}
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onSort}
          className="hover:bg-brand-500/10 text-brand-600 transition-all duration-300"
        >
          <ArrowUpDown className={`h-4 w-4 transition-transform duration-300 ${isAscending ? 'rotate-0' : 'rotate-180'}`} />
        </Button>
        <Button 
          onClick={onAdd}
          className="bg-gradient-to-r from-brand-500 to-info-500 hover:from-brand-600 hover:to-info-600 text-white shadow-lg transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          افزودن حرکت
        </Button>
      </div>
    </div>
  );
};

export default ExerciseTableHeader;
