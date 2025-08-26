
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarItem } from "../../types";

interface NavigationItemIconProps {
  item: SidebarItem;
  isActive: boolean;
  iconSize: string;
  iconContainer: string;
}

export const NavigationItemIcon: React.FC<NavigationItemIconProps> = ({
  item,
  isActive,
  iconSize,
  iconContainer
}) => {
  return (
    <motion.div 
      className={cn(
        "flex-shrink-0 rounded-lg flex items-center justify-center relative overflow-hidden",
        iconContainer,
        isActive 
          ? "bg-white/20 border border-white/30 text-white shadow-lg backdrop-blur-sm" 
          : `bg-gradient-to-br ${item.gradient} text-white shadow-sm`
      )}
      whileHover={{ scale: 1.05, rotate: isActive ? 0 : 3 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {!isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      )}
      <item.icon className={cn(iconSize, "relative z-10 drop-shadow-sm")} />
      
      {item.isNew && (
        <motion.div
          className="absolute -top-0.5 -right-0.5"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-2.5 h-2.5 text-yellow-400 drop-shadow-sm" />
        </motion.div>
      )}
    </motion.div>
  );
};
