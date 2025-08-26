
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Meal } from "@/types/meal";

interface MealTypeGroupProps {
  typeName: string;
  meals: Meal[];
  selectedMeals: number[];
  toggleMeal: (mealId: number) => void;
  currentDayName?: string;
}

const MealTypeGroup: React.FC<MealTypeGroupProps> = ({
  typeName,
  meals,
  selectedMeals,
  toggleMeal,
  currentDayName
}) => {
  if (meals.length === 0) return null;
  
  return (
    <div className="mb-4">
      <h5 className="text-sm font-medium mb-2 text-slate-600">{typeName}</h5>
      <div className="space-y-2">
        {meals.map(meal => {
          const isCurrentDayMeal = meal.day === currentDayName;
          
          return (
            <div 
              key={meal.id} 
              className={cn(
                "border rounded-md p-2 flex items-center justify-between cursor-pointer hover:bg-slate-50",
                selectedMeals.includes(meal.id) ? 'border-green-500 bg-green-50' : '',
                isCurrentDayMeal ? 'border-blue-200' : ''
              )}
              onClick={() => toggleMeal(meal.id)}
            >
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={selectedMeals.includes(meal.id)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <div>
                  <div className="font-medium">
                    {meal.name}
                    {isCurrentDayMeal && (
                      <span className="text-xs text-blue-700 mr-2 bg-blue-50 px-1.5 py-0.5 rounded-full">
                        {meal.day}
                      </span>
                    )}
                  </div>
                  {meal.day && meal.day !== currentDayName && (
                    <span className="text-xs bg-blue-50 text-blue-700 border-blue-200 mt-1 px-1.5 py-0.5 rounded-full inline-block">
                      {meal.day}
                    </span>
                  )}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMeal(meal.id);
                }}
              >
                {selectedMeals.includes(meal.id) ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealTypeGroup;
