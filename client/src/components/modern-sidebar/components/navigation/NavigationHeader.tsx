
import React from "react";
import { motion } from "framer-motion";
import { useAppName } from "@/contexts/AppNameContext";

interface NavigationHeaderProps {}

export const NavigationHeader: React.FC<NavigationHeaderProps> = () => {
  const { appName } = useAppName();
  const displayName = appName || 'فیت مستر';
  return (
    <motion.div
      className="mb-4 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h4 className="text-sm font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent mb-1">
        {displayName}
      </h4>
      
      <motion.div
        className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full mx-auto mt-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
    </motion.div>
  );
};
