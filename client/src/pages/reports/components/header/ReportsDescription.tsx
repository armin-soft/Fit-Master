
import React from "react";
import { motion } from "framer-motion";

export const ReportsDescription = () => {
  return (
    <motion.p
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="text-slate-500 dark:text-slate-400 max-w-md"
    >
      آنالیز جامع عملکرد، آمار دقیق و گزارشات تخصصی سیستم مدیریت باشگاه
    </motion.p>
  );
};
