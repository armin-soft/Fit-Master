
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Meal } from "@/types/meal";

interface AvailableMealsListProps {
  filteredMeals: Meal[];
  selectedMeals: number[];
  toggleMeal: (mealId: number) => void;
}

const AvailableMealsList: React.FC<AvailableMealsListProps> = ({
  filteredMeals,
  selectedMeals,
  toggleMeal
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-700/90 backdrop-blur-sm h-full">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div className="text-right">
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                لیست غذاها
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {toPersianNumbers(filteredMeals.length)} غذا موجود
              </p>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {filteredMeals.map(meal => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                      selectedMeals.includes(meal.id)
                        ? "bg-primary/10 border-primary/30"
                        : "bg-background hover:bg-muted/50 border-border hover:border-primary/20"
                    )}
                    onClick={() => toggleMeal(meal.id)}
                  >
                    <div className="flex-1 text-right">
                      <p className="font-medium">{meal.name}</p>
                      {meal.description && (
                        <p className="text-sm text-muted-foreground">{meal.description}</p>
                      )}
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {meal.type}
                        </Badge>
                        {meal.day && (
                          <Badge variant="outline" className="text-xs">
                            {meal.day}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0",
                        selectedMeals.includes(meal.id)
                          ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                          : "text-green-600 hover:text-green-700 hover:bg-green-50"
                      )}
                    >
                      {selectedMeals.includes(meal.id) ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AvailableMealsList;
