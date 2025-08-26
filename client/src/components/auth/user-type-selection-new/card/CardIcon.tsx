
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, CheckCircle } from "lucide-react";

interface CardIconProps {
  Icon: LucideIcon;
  gradient: string;
  isSelected: boolean;
}

export const CardIcon: React.FC<CardIconProps> = ({ Icon, gradient, isSelected }) => {
  return (
    <motion.div
      className="flex justify-center mb-3 sm:mb-4 md:mb-6"
      animate={isSelected ? { rotate: [0, 5, -5, 0] } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br ${gradient} rounded-2xl shadow-xl flex items-center justify-center`}>
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
        
        {/* نشان انتخاب */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-2 -left-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
