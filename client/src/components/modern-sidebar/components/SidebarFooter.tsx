
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarDimensions } from "../utils/deviceUtils";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useAppVersionContext } from "@/contexts/AppVersionContext";
import { useAppName } from "@/contexts/AppNameContext";

interface SidebarFooterProps {
  gymName?: string;
  onLogout?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ 
  gymName,
  onLogout 
}) => {
  const { getFooterPadding, deviceInfo } = useSidebarDimensions();
  const { version: appVersion, isLoading } = useAppVersionContext();
  const { appName } = useAppName();

  const getButtonSize = () => {
    if (deviceInfo.isMobile) return "text-xs";
    if (deviceInfo.isTablet) return "text-sm";
    return "text-sm";
  };

  return (
    <motion.div 
      className={cn(
        "border-t border-emerald-200/40 dark:border-emerald-700/40 bg-gradient-to-r from-white/70 via-emerald-50/60 to-sky-50/50 dark:from-slate-800/70 dark:via-emerald-900/60 dark:to-sky-900/50 backdrop-blur-sm",
        getFooterPadding()
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="space-y-4">
        {/* Logout Button */}
        {onLogout && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onLogout}
              variant="outline"
              className={cn(
                "w-full bg-destructive/10 hover:bg-destructive/20 border-destructive/30 hover:border-destructive/40 text-destructive hover:text-destructive/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200",
                getButtonSize()
              )}
            >
              <LogOut className="h-4 w-4" />
              خروج از حساب
            </Button>
          </motion.div>
        )}

        {/* Gym Name */}
        {gymName && (
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span className={cn(
                "font-medium text-emerald-700 dark:text-emerald-300",
                deviceInfo.isMobile ? "text-xs" : "text-sm"
              )}>
                {appName || "فیت مستر"}
              </span>
            </div>
          </motion.div>
        )}

        {/* App Version */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className={cn(
            "text-gray-500 dark:text-gray-400",
            deviceInfo.isMobile ? "text-xs" : "text-sm"
          )}>
            نسخه {toPersianNumbers(appVersion || '1.40.0')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
