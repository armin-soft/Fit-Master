
import React from "react";
import { motion } from "framer-motion";

interface ChartContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  children,
  delay = 0.5
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
      
      {children}
    </motion.div>
  );
};
