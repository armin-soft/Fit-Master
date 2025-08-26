
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Utensils, Minus } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Meal } from "@/types/meal";

interface SelectedMealsListProps {
  selectedMeals: number[];
  meals: Meal[];
  toggleMeal: (mealId: number) => void;
}

const SelectedMealsList: React.FC<SelectedMealsListProps> = ({
  selectedMeals,
  meals,
  toggleMeal
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                غذاهای انتخاب شده
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {toPersianNumbers(selectedMeals.length)} غذا
              </p>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            {selectedMeals.length > 0 ? (
              <div className="space-y-2">
                {selectedMeals.map(mealId => {
                  const meal = meals.find(m => m.id === mealId);
                  if (!meal) return null;
                  
                  return (
                    <div
                      key={mealId}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
                    >
                      <div className="flex-1 text-right">
                        <p className="font-medium">{meal.name}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {meal.type}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMeal(mealId)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-4">
                  <Utensils className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">هیچ غذایی انتخاب نشده</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">از لیست سمت راست غذا انتخاب کنید</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SelectedMealsList;
