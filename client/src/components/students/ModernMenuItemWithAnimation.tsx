
import React from "react";
import { motion } from "framer-motion";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ModernMenuItemWithAnimationProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
  index: number;
  disabled?: boolean;
  bgHoverClass?: string;
}

export const ModernMenuItemWithAnimation: React.FC<ModernMenuItemWithAnimationProps> = ({ 
  icon, 
  label, 
  description,
  onClick, 
  index,
  disabled = false,
  bgHoverClass = "hover:bg-slate-50 dark:hover:bg-slate-800/60" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { delay: index * 0.08, duration: 0.3, ease: "easeOut" } 
      }}
      whileHover={{ x: 4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropdownMenuItem 
        onClick={disabled ? undefined : onClick} 
        disabled={disabled}
        className={`flex items-center gap-3 py-3 px-3 cursor-pointer rounded-xl text-slate-700 dark:text-slate-200 transition-all duration-300 group ${bgHoverClass} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="flex-shrink-0 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-sm border border-slate-200/50 dark:border-slate-700/50 group-hover:shadow-md transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-0.5">
            {label}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
            {description}
          </div>
        </div>
      </DropdownMenuItem>
    </motion.div>
  );
};
