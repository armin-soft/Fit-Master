
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";
import StudentDietSelector from "@/components/students/program/StudentDietSelector";
import { DayItem } from "./DaySelector";
import { MealType } from "@/types/meal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface DayContentProps {
  currentDay: number;
  weekDays: DayItem[];
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  centered?: boolean;
}

const mealTypes = [
  { id: 1, name: "صبحانه" },
  { id: 2, name: "میان وعده صبح" },
  { id: 3, name: "ناهار" },
  { id: 4, name: "میان وعده عصر" },
  { id: 5, name: "شام" },
  { id: 6, name: "میان وعده شب" },
];

const DayContent: React.FC<DayContentProps> = ({
  currentDay,
  weekDays,
  selectedMeals,
  setSelectedMeals,
  meals,
  centered = false
}) => {
  const [currentMealType, setCurrentMealType] = useState<number>(0); // 0 means all meal types
  
  // Get the current day name
  const currentDayName = weekDays.find(d => d.id === currentDay)?.name;
  
  // Reset meal type when day changes
  useEffect(() => {
    setCurrentMealType(0);
  }, [currentDay]);
  
  // Filter meals by selected type if a specific type is selected
  const filteredMeals = currentMealType === 0 
    ? meals 
    : meals.filter(meal => {
        const typeName = mealTypes.find(t => t.id === currentMealType)?.name;
        return meal.type === typeName;
      });
  
  // Filter meals for the current day type
  useEffect(() => {
    const daySpecificMeals = meals.filter(meal => {
      return meal.day === currentDayName;
    });
    
    // If there are day specific meals and no selection yet, auto-select them
    if (daySpecificMeals.length > 0 && selectedMeals.length === 0) {
      const dayMealIds = daySpecificMeals.map(meal => meal.id);
      setSelectedMeals(dayMealIds);
    }
  }, [currentDay, currentDayName, meals, selectedMeals.length, setSelectedMeals]);

  return (
    <motion.div
      key={`day-${currentDay}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <div className="bg-gray-50 p-3 rounded-md mb-4">
        <h4 className={cn(
          "font-medium text-green-700",
          centered ? "text-center" : "text-right"
        )}>
          وعده‌های غذایی روز {weekDays.find(d => d.id === currentDay)?.name}
        </h4>
        <p className={cn(
          "text-sm text-gray-500",
          centered ? "text-center" : "text-right"
        )}>
          {toPersianNumbers(selectedMeals.length)} وعده انتخاب شده
        </p>
      </div>
      
      {/* Meal type selector */}
      <div className="flex items-center justify-center mb-4">
        <ScrollArea className="w-full">
          <div className={cn(
            "flex items-center space-x-1 space-x-reverse",
            centered ? "justify-center" : "justify-start"
          )}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentMealType(0)}
              className={cn(
                "h-10 px-4 py-2 rounded-md border text-sm transition-all",
                currentMealType === 0
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              )}
            >
              همه وعده‌ها
            </motion.button>
            {mealTypes.map((type) => (
              <motion.button
                key={type.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentMealType(type.id)}
                className={cn(
                  "h-10 px-4 py-2 rounded-md border text-sm transition-all",
                  currentMealType === type.id 
                    ? "bg-blue-500 text-white border-blue-500" 
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                )}
              >
                {type.name}
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <StudentDietSelector 
        meals={filteredMeals}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
        currentDay={currentDay}
        currentMealType={currentMealType > 0 ? mealTypes.find(t => t.id === currentMealType)?.name as MealType : undefined}
      />
    </motion.div>
  );
};

export default DayContent;
