
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DayButtonProps {
  day: number;
  currentDay: number;
  onClick: (day: number) => void;
}

const DayButton: React.FC<DayButtonProps> = ({ day, currentDay, onClick }) => {
  // Convert day numbers to Persian ordinal text
  const getDayText = (dayNumber: number): string => {
    switch (dayNumber) {
      case 1: return "روز اول";
      case 2: return "روز دوم"; 
      case 3: return "روز سوم";
      case 4: return "روز چهارم";
      case 5: return "روز پنجم";
      case 6: return "روز ششم";
      case 7: return "روز هفتم";
      default: return `روز ${toPersianNumbers(dayNumber)}`;
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(day)}
      className={cn(
        "h-10 px-6 rounded-none border-0",
        currentDay === day 
          ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white" 
          : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      {getDayText(day)}
    </motion.button>
  );
};

export default DayButton;
