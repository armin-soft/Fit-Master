
import React from "react";
import { motion } from "framer-motion";
import DayButton from "./DayButton";

interface DaySelectorProps {
  currentDay: number;
  onDayChange: (day: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  currentDay, 
  onDayChange 
}) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <motion.div 
        className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {[1, 2, 3, 4].map(day => (
          <DayButton 
            key={day} 
            day={day} 
            currentDay={currentDay}
            onClick={onDayChange}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DaySelector;
