
import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CountdownTimerProps {
  countdown: number;
}

export const CountdownTimer = ({ countdown }: CountdownTimerProps) => {
  if (countdown <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-2"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Clock className="h-4 w-4 text-brand-600 dark:text-brand-400" />
      </motion.div>
      
      <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
        ارسال مجدد کد تا {toPersianNumbers(Math.floor(countdown / 60))}:{toPersianNumbers((countdown % 60).toString().padStart(2, '0'))} دیگر
      </p>
    </motion.div>
  );
};
