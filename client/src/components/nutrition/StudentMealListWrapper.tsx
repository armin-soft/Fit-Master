
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface StudentMealListWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxHeight?: string;
  toggleSortOrder?: () => void;
  sortOrder?: "asc" | "desc";
  showControls?: boolean;
}

const StudentMealListWrapper: React.FC<StudentMealListWrapperProps> = ({
  children,
  className = "",
  maxHeight = "calc(100vh - 280px)",
  toggleSortOrder,
  sortOrder = "asc",
  showControls = false
}) => {
  const deviceInfo = useDeviceInfo();
  
  // بهینه‌سازی حداکثر ارتفاع برای دستگاه‌های مختلف
  const getResponsiveMaxHeight = () => {
    if (deviceInfo.isMobile) {
      return "calc(100vh - 240px)";
    } else if (deviceInfo.isTablet) {
      return "calc(100vh - 260px)";
    } else if (deviceInfo.isSmallLaptop) {
      return "calc(100vh - 270px)";
    } else {
      return maxHeight;
    }
  };
  
  // بهینه‌سازی پدینگ برای دستگاه‌های مختلف
  const getResponsivePadding = () => {
    if (deviceInfo.isMobile) {
      return "p-1.5";
    } else if (deviceInfo.isTablet) {
      return "p-2";
    } else if (deviceInfo.isSmallLaptop) {
      return "p-3";
    } else {
      return "p-4";
    }
  };

  return (
    <div className={cn(
      "border-0 rounded-none bg-white/95 backdrop-blur-sm transition-all text-gray-900 dark:text-white h-full w-full overflow-x-hidden", 
      className
    )}>
      {showControls && (
        <div className="flex items-center justify-end gap-2 p-2 sm:p-3 bg-muted/20 border-b">
          {/* دکمه‌های کنترل */}
        </div>
      )}
      <ScrollArea 
        className="w-full h-full" 
        style={{ maxHeight: getResponsiveMaxHeight() }}
        orientation="vertical"
      >
        <motion.div 
          layout 
          className={cn(
            "w-full flex flex-col space-y-1.5 sm:space-y-2 md:space-y-3 overflow-x-hidden",
            getResponsivePadding()
          )}
        >
          {children}
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default StudentMealListWrapper;
