
import React from "react";
import { motion } from "framer-motion";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ExerciseCountBadgeProps {
  count: number;
  className?: string;
}

export const ExerciseCountBadge: React.FC<ExerciseCountBadgeProps> = ({ count, className }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      className={cn(
        "bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-lg py-1.5 px-3 flex items-center gap-1.5 shadow-sm",
        className
      )}
    >
      <ListFilter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
      <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
        {toPersianNumbers(count)} تمرین انتخاب شده
      </span>
    </motion.div>
  );
};
