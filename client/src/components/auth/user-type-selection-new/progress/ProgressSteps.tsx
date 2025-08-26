
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  selectedType?: 'management' | 'student' | null;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  steps, 
  currentStep,
  selectedType 
}) => {
  const getTypeColors = () => {
    if (selectedType === 'management') {
      return {
        activeColor: 'text-emerald-600',
        activeBg: 'bg-emerald-600',
        completedColor: 'text-emerald-600',
        completedBg: 'bg-emerald-600'
      };
    } else {
      return {
        activeColor: 'text-sky-600',
        activeBg: 'bg-sky-600',
        completedColor: 'text-sky-600',
        completedBg: 'bg-sky-600'
      };
    }
  };

  const colors = getTypeColors();

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* خط اتصال */}
              {index > 0 && (
                <div className="absolute right-0 top-4 h-px bg-slate-200 dark:bg-slate-700 w-full -z-10" />
              )}
              
              {/* دایره مرحله */}
              <motion.div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  isCompleted 
                    ? `${colors.completedBg} text-white` 
                    : isActive 
                    ? `${colors.activeBg} text-white`
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isActive ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </motion.div>

              {/* عنوان */}
              <motion.h4
                className={`text-sm font-semibold mb-1 ${
                  isCompleted || isActive 
                    ? colors.activeColor 
                    : 'text-slate-400 dark:text-slate-500'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {step.title}
              </motion.h4>

              {/* توضیحات */}
              <motion.p
                className="text-xs text-slate-500 dark:text-slate-400 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {step.description}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
