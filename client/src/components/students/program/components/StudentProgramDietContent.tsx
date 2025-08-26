
import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import StudentDietSelector from "../StudentDietSelector";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramDietContentProps {
  selectedMeals: number[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<number[]>>;
  meals: any[];
  currentDietDay?: number;
  setCurrentDietDay?: React.Dispatch<React.SetStateAction<number>>;
}

const weekDays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنج شنبه" },
  { id: 7, name: "جمعه" },
];

const mealTypes = [
  { id: 1, name: "صبحانه" },
  { id: 2, name: "میان وعده صبح" },
  { id: 3, name: "ناهار" },
  { id: 4, name: "میان وعده عصر" },
  { id: 5, name: "شام" },
  { id: 6, name: "میان وعده شام" },
];

const StudentProgramDietContent: React.FC<StudentProgramDietContentProps> = ({
  selectedMeals,
  setSelectedMeals,
  meals,
  currentDietDay = 1,
  setCurrentDietDay = () => {}
}) => {
  const [currentMealType, setCurrentMealType] = useState<string>("all");

  // Reset meal type when day changes
  useEffect(() => {
    setCurrentMealType("all");
  }, [currentDietDay]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <TabsContent value="diet" className="m-0 h-full text-right" dir="rtl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4 h-full flex flex-col text-right"
        dir="rtl"
      >
        <motion.div variants={itemVariants} className="text-right" dir="rtl">
          <h3 className="font-semibold text-lg mb-4 text-center">
            برنامه غذایی روز {toPersianNumbers(currentDietDay)}
          </h3>
        </motion.div>
        
        {/* Day selector - Centered */}
        <motion.div variants={itemVariants} className="mb-4 text-right" dir="rtl">
          <div className="flex items-center justify-center pb-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {weekDays.map((day) => (
                <motion.button
                  key={day.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentDietDay(day.id)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-lg transition-all text-center",
                    currentDietDay === day.id 
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md" 
                      : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                  )}
                >
                  {day.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Meal type selector - Centered */}
        <motion.div variants={itemVariants} className="mb-6 text-right" dir="rtl">
          <div className="flex items-center justify-center pb-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentMealType("all")}
                className={cn(
                  "h-10 px-4 py-2 rounded-lg transition-all flex items-center gap-2",
                  currentMealType === "all"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"
                    : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                )}
              >
                همه وعده‌ها
              </motion.button>
              
              {mealTypes.map((mealType) => (
                <motion.button
                  key={mealType.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMealType(mealType.name)}
                  className={cn(
                    "h-10 px-4 py-2 rounded-lg transition-all",
                    currentMealType === mealType.name
                      ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-white/80 text-gray-700 border border-gray-200/80 hover:bg-gray-50"
                  )}
                >
                  {mealType.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Diet Content */}
        <motion.div variants={itemVariants} className="flex-1 overflow-auto text-right" dir="rtl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentDietDay}-${currentMealType}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full text-right"
              dir="rtl"
            >
              <StudentDietSelector
                selectedMeals={selectedMeals}
                setSelectedMeals={setSelectedMeals}
                meals={meals.filter(meal => {
                  // Filter meals by current day
                  const currentDayName = weekDays.find(d => d.id === currentDietDay)?.name;
                  // Check both snake_case and camelCase field names
                  return meal.day_of_week === currentDayName || meal.dayOfWeek === currentDayName || meal.day === currentDayName;
                })}
                currentDay={currentDietDay}
                currentMealType={currentMealType}
                dayLabel={weekDays.find(d => d.id === currentDietDay)?.name}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default StudentProgramDietContent;
