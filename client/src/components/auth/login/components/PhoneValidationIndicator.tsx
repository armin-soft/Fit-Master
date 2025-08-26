
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface PhoneValidationIndicatorProps {
  isValid: boolean;
  phone: string;
}

export const PhoneValidationIndicator = ({ isValid, phone }: PhoneValidationIndicatorProps) => {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2">
      <motion.div
        className={`w-3 h-3 rounded-full ${
          isValid 
            ? 'bg-green-500' 
            : 'bg-slate-300 dark:bg-slate-600'
        }`}
        animate={{ 
          scale: isValid ? [1, 1.2, 1] : 1,
          opacity: phone ? [0.6, 1, 0.6] : 0.6
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {isValid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-green-600 dark:text-green-400 whitespace-nowrap"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-semibold">تأیید شد</span>
        </motion.div>
      )}
    </div>
  );
};
