
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MealType } from "@/types/meal";

interface MealsListProps {
  meals: any[];
  selectedMeals: number[];
  toggleMeal: (mealId: number) => void;
  currentDayName?: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  currentMealType?: MealType;
}

const MealsList: React.FC<MealsListProps> = ({
  meals,
  selectedMeals,
  toggleMeal,
  currentDayName,
  searchQuery,
  setSearchQuery,
  currentMealType
}) => {
  // Filter meals by search query
  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Further filter by current meal type if specified
  const displayMeals = currentMealType 
    ? filteredMeals.filter(meal => meal.type === currentMealType) 
    : filteredMeals;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="جستجو در غذاها..."
          className="pr-10"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      {displayMeals.length > 0 ? (
        <ScrollArea className="h-64 pr-3">
          <div className="space-y-2">
            {displayMeals.map(meal => {
              const isSelected = selectedMeals.includes(meal.id);
              const isForCurrentDay = currentDayName && meal.day === currentDayName;
              
              return (
                <div 
                  key={meal.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                    isSelected ? "bg-primary/5 border-primary/30" : "border-gray-200",
                    isForCurrentDay && !isSelected ? "bg-green-50 border-green-200" : ""
                  )}
                  onClick={() => toggleMeal(meal.id)}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center border-2",
                        isSelected ? "bg-primary border-primary" : "border-gray-300"
                      )}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                    </div>
                    
                    <div>
                      <div className="font-medium">{meal.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {meal.type}
                        {meal.day && ` - ${meal.day}`}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={cn(
                      "h-8 w-8 p-0 rounded-full",
                      isSelected && "text-primary"
                    )}
                  >
                    {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-400">هیچ غذایی یافت نشد</p>
        </div>
      )}
    </div>
  );
};

export default MealsList;
