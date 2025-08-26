
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardButtonProps {
  gradient: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const CardButton: React.FC<CardButtonProps> = ({ 
  gradient, 
  isSelected, 
  isDisabled, 
  onClick 
}) => {
  return (
    <Button
      className={`w-full h-10 sm:h-12 md:h-14 bg-gradient-to-l ${gradient} text-white font-bold text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isSelected ? (
        <div className="flex items-center gap-3">
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>در حال پردازش...</span>
        </div>
      ) : isDisabled ? (
        <span>لطفاً صبر کنید...</span>
      ) : (
        <div className="flex items-center gap-3">
          <span>انتخاب و ورود</span>
          <ArrowLeft className="w-5 h-5" />
        </div>
      )}
    </Button>
  );
};
