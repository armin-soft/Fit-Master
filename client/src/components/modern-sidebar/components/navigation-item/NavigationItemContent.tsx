
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SidebarItem } from "../../types";

interface NavigationItemContentProps {
  item: SidebarItem;
  isActive: boolean;
  deviceInfo: any;
}

export const NavigationItemContent: React.FC<NavigationItemContentProps> = ({
  item,
  isActive,
  deviceInfo
}) => {
  return (
    <div className="flex-1 min-w-0" dir="rtl">
      <div className="flex items-center justify-between mb-0.5" dir="rtl">
        <motion.h3 
          className={cn(
            "font-bold text-right",
            deviceInfo.isMobile ? "text-sm" : "text-sm",
            isActive ? "text-white drop-shadow-sm" : "text-emerald-800 dark:text-emerald-200"
          )}
          layoutId={`title-${item.href}`}
        >
          {item.title}
        </motion.h3>
        
        <div className="flex items-center gap-1">
          {item.badge && (
            <Badge 
              variant="secondary" 
              className={cn(
                "text-3xs px-1.5 py-0.5 shadow-sm",
                item.badgeColor || "bg-amber-500",
                isActive ? "bg-white/20 text-white border border-white/30" : "text-white"
              )}
            >
              {item.badge}
            </Badge>
          )}
          
          {item.isNew && (
            <Badge variant="secondary" className={cn(
              "text-3xs px-1.5 py-0.5 shadow-sm",
              isActive ? "bg-white/20 text-white border border-white/30" : "bg-green-500 text-white"
            )}>
              جدید
            </Badge>
          )}
        </div>
      </div>
      
      <motion.p 
        className={cn(
          "text-right leading-relaxed",
          deviceInfo.isMobile ? "text-2xs" : "text-xs",
          isActive ? "text-white/90 drop-shadow-sm" : "text-emerald-600 dark:text-emerald-400"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {item.subtitle}
      </motion.p>
    </div>
  );
};
