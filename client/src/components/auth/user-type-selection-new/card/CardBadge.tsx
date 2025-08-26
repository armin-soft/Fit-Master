
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface CardBadgeProps {
  badge: string;
  gradient: string;
  isSelected: boolean;
}

export const CardBadge: React.FC<CardBadgeProps> = ({ badge, gradient, isSelected }) => {
  return (
    <motion.div
      className={`absolute -top-3 right-8 px-4 py-2 bg-gradient-to-l ${gradient} text-white text-sm font-bold rounded-full shadow-lg`}
      animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 fill-current" />
        <span>{badge}</span>
      </div>
    </motion.div>
  );
};
