
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Coffee, Utensils } from "lucide-react";
import { MealType } from "@/types/meal";
import { cn } from "@/lib/utils";

interface StudentMealFiltersProps {
  selectedType: MealType | null;
  onSelectType: (type: MealType | null) => void;
}

// Helper functions that need to be exported
export const getMealTypeColor = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return "bg-brand-400/10 border-brand-500/30 text-brand-700 dark:bg-brand-500/20 dark:border-brand-400/50 dark:text-brand-400";
    case "میان وعده صبح":
      return "bg-warning-500/10 border-warning-500/30 text-warning-700 dark:bg-warning-500/20 dark:border-warning-500/50 dark:text-warning-500";
    case "ناهار":
      return "bg-brand-500/10 border-brand-500/30 text-brand-700 dark:bg-brand-500/20 dark:border-brand-500/50 dark:text-brand-500";
    case "میان وعده عصر":
      return "bg-info-500/10 border-info-500/30 text-info-700 dark:bg-info-500/20 dark:border-info-500/50 dark:text-info-500";
    case "شام":
      return "bg-info-500/10 border-info-500/30 text-info-700 dark:bg-info-500/20 dark:border-info-500/50 dark:text-info-500";
    case "میان وعده شام":
      return "bg-brand-600/10 border-brand-600/30 text-brand-700 dark:bg-brand-600/20 dark:border-brand-600/50 dark:text-brand-600";
    default:
      return "bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800/40 dark:border-gray-700 dark:text-gray-400";
  }
};

export const getMealTypeIcon = (type: MealType) => {
  switch (type) {
    case "صبحانه":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    case "میان وعده صبح":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    case "ناهار":
      return <Utensils className="h-4 w-4 mr-1.5" />;
    case "میان وعده عصر":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    case "شام":
      return <Utensils className="h-4 w-4 mr-1.5" />;
    case "میان وعده شام":
      return <Coffee className="h-4 w-4 mr-1.5" />;
    default:
      return <Coffee className="h-4 w-4 mr-1.5" />;
  }
};

export const StudentMealFilters: React.FC<StudentMealFiltersProps> = ({
  selectedType,
  onSelectType,
}) => {
  const mealTypes: MealType[] = ["صبحانه", "میان وعده صبح", "ناهار", "میان وعده عصر", "شام", "میان وعده شام"];

  return (
    <div className="flex flex-wrap gap-1.5 pb-3">
      {mealTypes.map((type) => (
        <Button
          key={type}
          variant="outline"
          size="sm"
          className={cn(
            "h-9 border px-3 text-xs font-medium rounded-full transition-all",
            selectedType === type
              ? getMealTypeColor(type)
              : "hover:bg-gray-50 dark:hover:bg-gray-800/60"
          )}
          onClick={() => onSelectType(selectedType === type ? null : type)}
        >
          <span className="flex items-center">
            {getMealTypeIcon(type)}
            <span>{type}</span>
            {selectedType === type && (
              <Check className="ml-1.5 h-3.5 w-3.5" />
            )}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default StudentMealFilters;
