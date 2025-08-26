
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CardFeaturesProps {
  features: string[];
}

export const CardFeatures: React.FC<CardFeaturesProps> = ({ features }) => {
  return (
    <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 md:mb-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * index + 0.3 }}
          className="flex items-center justify-between p-2 sm:p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-xl"
        >
          <span className="text-xs sm:text-sm md:text-base text-slate-700 dark:text-slate-200 font-medium">
            {feature}
          </span>
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
        </motion.div>
      ))}
    </div>
  );
};
