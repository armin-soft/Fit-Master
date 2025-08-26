
import React from "react";
import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ProgressStatusProps {
  currentStep: number;
  totalSteps: number;
  stepDescription: string;
  selectedType?: 'management' | 'student' | null;
}

export const ProgressStatus: React.FC<ProgressStatusProps> = ({
  currentStep,
  totalSteps,
  stepDescription,
  selectedType
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  const getTypeGradient = () => {
    return selectedType === 'management' 
      ? 'from-emerald-600 to-sky-600' 
      : 'from-sky-600 to-emerald-600';
  };

  return (
    <div className="text-center">
      {/* نوار پیشرفت */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
        <motion.div
          className={`bg-gradient-to-l ${getTypeGradient()} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* درصد پیشرفت */}
      <motion.p
        className="text-sm text-slate-600 dark:text-slate-300 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {toPersianNumbers(Math.round(progressPercentage))}% تکمیل شده
      </motion.p>

      {/* توضیحات مرحله فعلی */}
      <motion.p
        className="text-xs text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {stepDescription}
      </motion.p>
    </div>
  );
};
