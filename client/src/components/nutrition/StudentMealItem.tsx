
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { getMealTypeColor, getMealTypeIcon } from "./StudentMealFilters";
import { Meal } from "@/types/meal";

interface StudentMealItemProps {
  meal: Meal;
  isSelected: boolean;
  onSelect: (meal: Meal) => void;
  onToggle?: (id: number) => void; // Add this to make it compatible with both implementations
}

const StudentMealItem: React.FC<StudentMealItemProps> = ({
  meal,
  isSelected,
  onSelect,
  onToggle
}) => {
  const handleClick = () => {
    if (onToggle) {
      onToggle(meal.id);
    } else {
      onSelect(meal);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className={cn(
        "relative p-3 rounded-lg cursor-pointer transition-all border border-transparent hover:border-indigo-200 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10",
        isSelected && "border-indigo-200 bg-indigo-50/50 dark:border-indigo-800/60 dark:bg-indigo-950/20"
      )}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-base text-gray-900 dark:text-white mb-1">
            {meal.name}
          </h3>
          
          {meal.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {meal.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {meal.type && (
              <div className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border flex items-center",
                getMealTypeColor(meal.type)
              )}>
                {getMealTypeIcon(meal.type)}
                <span>{meal.type}</span>
              </div>
            )}
            
            {meal.category && (
              <div className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 border border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
                {meal.category}
              </div>
            )}

            {meal.day && (
              <div className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 border border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300">
                {meal.day}
              </div>
            )}
          </div>
        </div>
        
        {isSelected && (
          <div className="absolute top-3 left-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StudentMealItem;
