
import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export const ReportsTitle = () => {
  return (
    <div className="flex items-center gap-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <div className="p-4 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-2xl shadow-lg">
          <BarChart3 className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
      </motion.div>
      
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-800 bg-clip-text text-transparent"
        >
          گزارشات تحلیلی پیشرفته
        </motion.h1>
      </div>
    </div>
  );
};
