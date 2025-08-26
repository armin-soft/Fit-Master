
import React from "react";
import { motion } from "framer-motion";
import { useAppName } from "@/contexts/AppNameContext";

export const HeaderTitle = () => {
  const { appName, isLoading } = useAppName();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="space-y-4 sm:space-y-6"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
        <span className="bg-gradient-to-l from-emerald-700 via-sky-700 to-emerald-800 bg-clip-text text-transparent">
          {isLoading ? 'سیستم مدیریت برنامه' : `سیستم مدیریت ${appName}`}
        </span>
      </h1>
      
      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
        انتخاب نوع دسترسی و ورود به پلتفرم مدیریت پیشرفته
      </p>
    </motion.div>
  );
};
