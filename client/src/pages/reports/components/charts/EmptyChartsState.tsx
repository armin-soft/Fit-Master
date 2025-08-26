
import React from "react";
import { motion } from "framer-motion";
import { BarChart } from "lucide-react";

export const EmptyChartsState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-12"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-12 shadow-xl text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center">
            <BarChart className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
            هنوز داده‌ای موجود نیست
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            پس از افزودن شاگردان و تعریف برنامه‌ها، نمودارهای تحلیلی در اینجا نمایش داده خواهند شد
          </p>
        </div>
      </div>
    </motion.div>
  );
};
