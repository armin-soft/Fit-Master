
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { MealType } from "./types";

interface MealTypeSelectorProps {
  mealType: MealType;
  meals: any[];
  children: React.ReactNode;
}

export const MealTypeSelector: React.FC<MealTypeSelectorProps> = ({
  mealType,
  meals,
  children
}) => {
  if (meals.length === 0) return null;

  const IconComponent = mealType.icon;

  return (
    <div className={cn("rounded-lg p-3 border-2", mealType.color)}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
          <IconComponent className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">
            {mealType.name}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {toPersianNumbers(meals.length)} وعده
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {children}
      </div>
    </div>
  );
};
