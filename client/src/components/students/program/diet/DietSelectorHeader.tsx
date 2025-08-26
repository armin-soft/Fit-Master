
import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DietSelectorHeaderProps {
  currentDay: number;
  currentMealType?: string;
  selectedMealsCount: number;
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

const DietSelectorHeader: React.FC<DietSelectorHeaderProps> = ({
  currentDay,
  currentMealType,
  selectedMealsCount
}) => {
  const getDayName = () => {
    const day = weekDays.find(d => d.id === currentDay);
    return day ? day.name : `روز ${toPersianNumbers(currentDay)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        برنامه غذایی {getDayName()}
        {currentMealType && currentMealType !== "all" && (
          <span className="text-sm text-muted-foreground mr-2">
            - {currentMealType}
          </span>
        )}
      </h3>
      <p className="text-sm text-muted-foreground mt-1">
        {toPersianNumbers(selectedMealsCount)} غذا انتخاب شده
      </p>
    </motion.div>
  );
};

export default DietSelectorHeader;
