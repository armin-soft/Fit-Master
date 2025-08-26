
import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentLoginStatsProps {
  variants?: any;
}

export const StudentLoginStats = ({ variants }: StudentLoginStatsProps) => {
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = variants || defaultVariants;

  return (
    <motion.div
      variants={containerVariants}
      className="mt-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-sm sm:text-base text-slate-500 dark:text-slate-400"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-500/30 rounded-full animate-ping"></div>
          </div>
          <span className="font-medium">سیستم آنلاین</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>پنل شاگرد</span>
        </div>
        
        <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span>امنیت بالا</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
