
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileSection } from "./header/ProfileSection";
import { StatsGrid } from "./header/StatsGrid";
import { useSidebarDimensions } from "../utils/deviceUtils";
import { TrainerProfile, SidebarStats } from "../types";

interface SidebarHeaderProps {
  profile: TrainerProfile;
  stats: SidebarStats;
  onClose: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  profile,
  stats,
  onClose
}) => {
  const { getHeaderPadding, deviceInfo } = useSidebarDimensions();
  
  const getCloseButtonSize = () => {
    if (deviceInfo.isMobile) return "h-8 w-8";
    if (deviceInfo.isTablet) return "h-9 w-9";
    return "h-10 w-10";
  };

  return (
    <motion.div 
      className={cn(
        "border-b border-emerald-200/40 dark:border-emerald-700/40 bg-gradient-to-br from-white/60 via-emerald-50/80 to-sky-50/60 dark:from-slate-800/60 dark:via-emerald-900/80 dark:to-sky-900/60 backdrop-blur-sm relative overflow-hidden",
        getHeaderPadding()
      )}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-sky-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-sky-400/10 to-emerald-400/5 rounded-full blur-2xl" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <ProfileSection profile={profile} />
          </div>
          
          <motion.button
            onClick={onClose}
            className={cn(
              "flex-shrink-0 rounded-xl bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-600/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 hover:bg-white/90 dark:hover:bg-slate-600/90 hover:scale-105 transition-all duration-200 shadow-lg",
              getCloseButtonSize()
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>
        
        <StatsGrid stats={stats} />
      </div>
    </motion.div>
  );
};
