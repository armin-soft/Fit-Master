
import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCardStatsProps {
  height: string | number;
  weight: string | number;
  trainingLevel?: "beginner" | "intermediate" | "advanced";
  goalType?: string;
}

export const StudentCardStats: React.FC<StudentCardStatsProps> = ({ height, weight, trainingLevel, goalType }) => {
  // Function to get Persian translation of training level
  const getTrainingLevelLabel = (trainingLevel?: "beginner" | "intermediate" | "advanced"): string => {
    switch (trainingLevel) {
      case 'beginner':
        return 'مبتدی';
      case 'intermediate':
        return 'متوسط';
      case 'advanced':
        return 'پیشرفته';
      default:
        return '-';
    }
  };

  // Function to get Persian translation of goal type
  const getGoalTypeLabel = (goalType?: string): string => {
    switch (goalType) {
      case 'weight_loss':
        return 'کاهش وزن';
      case 'muscle_gain':
        return 'افزایش عضله';
      case 'fitness':
        return 'تناسب اندام';
      case 'strength':
        return 'افزایش قدرت';
      case 'endurance':
        return 'افزایش استقامت';
      default:
        return 'تناسب اندام';
    }
  };

  // Function to get appropriate styling for training level
  const getTrainingLevelClassName = (trainingLevel?: "beginner" | "intermediate" | "advanced"): string => {
    switch (trainingLevel) {
      case 'beginner':
        return "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 text-orange-700 dark:text-orange-400";
      case 'intermediate':
        return "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-400";
      case 'advanced':
        return "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-700 dark:text-purple-400";
      default:
        return "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 text-gray-700 dark:text-gray-400";
    }
  };

  // Function to get appropriate styling for goal type
  const getGoalTypeClassName = (goalType?: string): string => {
    switch (goalType) {
      case 'weight_loss':
        return "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-700 dark:text-red-400";
      case 'muscle_gain':
        return "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-400";
      case 'fitness':
        return "from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 text-sky-700 dark:text-sky-400";
      case 'strength':
        return "from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 text-amber-700 dark:text-amber-400";
      case 'endurance':
        return "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 text-indigo-700 dark:text-indigo-400";
      default:
        return "from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 text-sky-700 dark:text-sky-400";
    }
  };

  return (
    <div className="space-y-3 my-3">
      <div className="flex items-center justify-center gap-3">
        <StatItem 
          label="قد" 
          value={toPersianNumbers(height)} 
          unit="سانتی‌متر" 
          className="from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 text-emerald-700 dark:text-emerald-400"
        />
        
        <StatItem 
          label="وزن" 
          value={toPersianNumbers(weight)} 
          unit="کیلوگرم" 
          className="from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 text-teal-700 dark:text-teal-400" 
        />
      </div>
      
      <div className="flex items-center justify-center gap-3">
        <StatItem 
          label="سطح تمرینی" 
          value={getTrainingLevelLabel(trainingLevel)} 
          className={getTrainingLevelClassName(trainingLevel)}
        />
        
        <StatItem 
          label="هدف تمرینی" 
          value={getGoalTypeLabel(goalType)} 
          className={getGoalTypeClassName(goalType)}
        />
      </div>
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, unit, className }) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`flex-1 backdrop-blur-sm bg-gradient-to-br ${className} rounded-xl px-3 py-2 text-center shadow-sm border border-white/10 dark:border-white/5`}
    >
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1 opacity-80">{label}</p>
      <div className="font-bold text-base">
        {value} {unit && <span className="text-xs font-normal opacity-70">{unit}</span>}
      </div>
    </motion.div>
  );
};
