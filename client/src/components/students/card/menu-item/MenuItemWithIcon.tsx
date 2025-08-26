
import React from "react";
import { motion } from "framer-motion";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { menuItemVariants } from "../context-menu/menuAnimations";

export interface MenuItemWithIconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  subtitle: string;
  iconClassName?: string;
  menuItemClassName?: string;
  hoverClassName?: string;
  subtitleClassName?: string;
  custom: number;
}

export const MenuItemWithIcon: React.FC<MenuItemWithIconProps> = ({
  icon,
  onClick,
  disabled = false,
  title,
  subtitle,
  iconClassName = "",
  menuItemClassName = "",
  hoverClassName = "",
  subtitleClassName = "",
  custom
}) => {
  return (
    <motion.div
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={custom}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
    >
      <DropdownMenuItem 
        onClick={onClick} 
        disabled={disabled} 
        className={`flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/50 focus:bg-slate-100/80 dark:focus:bg-slate-800/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed group/item ${menuItemClassName}`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-200 ${iconClassName}`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className={`transition-colors duration-200 ${hoverClassName}`}>{title}</span>
          <span className={`text-xs text-slate-500 dark:text-slate-400 ${subtitleClassName}`}>{subtitle}</span>
        </div>
      </DropdownMenuItem>
    </motion.div>
  );
};

export default MenuItemWithIcon;
