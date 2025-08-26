
import React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import DayTabIcon from "./DayTabIcon";

interface DayTabTriggerProps {
  value: string;
  active: boolean;
  count: number;
  dayNumber: number;
}

const DayTabTrigger: React.FC<DayTabTriggerProps> = ({
  value,
  active,
  count,
  dayNumber
}) => {
  const getDayName = () => {
    switch (dayNumber) {
      case 1: return "روز اول";
      case 2: return "روز دوم";
      case 3: return "روز سوم";
      case 4: return "روز چهارم";
      default: return "";
    }
  };

  return (
    <TabsTrigger 
      value={value}
      className={cn(
        "relative h-9 px-3 sm:px-4 text-xs sm:text-sm transition-all duration-300",
        active ? "bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-400 shadow-sm" : 
        "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50"
      )}
    >
      <div className="flex items-center gap-1.5">
        <DayTabIcon active={active} />
        <span>{getDayName()}</span>
      </div>
      
      {count > 0 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-indigo-600 dark:bg-indigo-500 text-white"
        >
          {count}
        </motion.div>
      )}
    </TabsTrigger>
  );
};

export default DayTabTrigger;
