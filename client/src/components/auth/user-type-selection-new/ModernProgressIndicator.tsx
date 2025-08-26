
import React from "react";
import { motion } from "framer-motion";
import { ProgressHeader } from "./progress/ProgressHeader";
import { ProgressSteps } from "./progress/ProgressSteps";
import { ProgressStatus } from "./progress/ProgressStatus";

interface ModernProgressIndicatorProps {
  currentStep: number;
  selectedType: 'management' | 'student' | null;
}

export const ModernProgressIndicator: React.FC<ModernProgressIndicatorProps> = ({
  currentStep,
  selectedType
}) => {
  const steps = [
    { id: 1, title: "ثبت انتخاب", description: "ذخیره اطلاعات کاربر" },
    { id: 2, title: "آماده‌سازی", description: "بارگذاری محیط کاربری" },
    { id: 3, title: "هدایت", description: "انتقال به پنل اختصاصی" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
      dir="rtl"
    >
      <ProgressHeader selectedType={selectedType} />
      <ProgressSteps 
        steps={steps} 
        currentStep={currentStep}
        selectedType={selectedType}
      />
      <ProgressStatus 
        currentStep={currentStep}
        totalSteps={steps.length}
        stepDescription={steps[currentStep - 1]?.description || ""}
      />
    </motion.div>
  );
};
