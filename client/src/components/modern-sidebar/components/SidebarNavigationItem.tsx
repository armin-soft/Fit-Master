
import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { SidebarItem } from "../types";
import { NavigationItemIcon } from "./navigation-item/NavigationItemIcon";
import { NavigationItemContent } from "./navigation-item/NavigationItemContent";
import { useSidebarDimensions } from "../utils/deviceUtils";
import { cn } from "@/lib/utils";

interface SidebarNavigationItemProps {
  item: SidebarItem;
  onClose?: () => void;
}

export const SidebarNavigationItem: React.FC<SidebarNavigationItemProps> = ({ 
  item, 
  onClose 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const { deviceInfo } = useSidebarDimensions();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Navigation item clicked:', item.href);
    
    try {
      // ابتدا navigate کن
      navigate(item.href);
      
      // فوراً sidebar را ببند
      if (onClose) {
        console.log('Closing sidebar after navigation');
        onClose();
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <button
        onClick={handleClick}
        className={cn(
          "w-full p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
          "hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
          isActive 
            ? "bg-gradient-to-br from-emerald-600 to-sky-600 shadow-xl shadow-emerald-200/30 border border-emerald-300/20" 
            : "bg-white/30 hover:bg-white/50 border border-white/10"
        )}
      >
        {/* Background gradient effect */}
        <div 
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            `bg-gradient-to-br ${item.gradient}`,
            isActive ? "opacity-20" : "group-hover:opacity-10"
          )}
        />
        
        <div className="relative z-10 flex items-center gap-4">
          <NavigationItemIcon 
            item={item}
            isActive={isActive}
            iconSize={deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6"}
            iconContainer={deviceInfo.isMobile ? "w-10 h-10" : "w-12 h-12"}
          />
          
          <NavigationItemContent 
            item={item}
            isActive={isActive}
            deviceInfo={deviceInfo}
          />
          
          <div className="flex items-center gap-2 mr-auto">
            {item.badge && (
              <Badge 
                variant={isActive ? "default" : "secondary"}
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  isActive 
                    ? "bg-white/20 text-white border border-white/30 shadow-sm" 
                    : "bg-white/20 text-slate-700"
                )}
              >
                {item.badge}
              </Badge>
            )}
            
            {item.isNew && (
              <div className="w-2 h-2 bg-gradient-to-r from-destructive to-primary rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
};
