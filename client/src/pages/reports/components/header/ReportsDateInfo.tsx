
import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { usePersianDate } from "@/hooks/usePersianDate";

export const ReportsDateInfo = () => {
  const persianDate = usePersianDate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex items-center gap-3 text-slate-600 dark:text-slate-300"
    >
      <Calendar className="h-5 w-5 text-blue-500" />
      <span className="text-lg font-medium">{persianDate}</span>
    </motion.div>
  );
};
