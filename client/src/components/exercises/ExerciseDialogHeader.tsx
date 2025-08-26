
import React from "react";
import { Activity, X } from "lucide-react";
import { DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ExerciseDialogHeaderProps {
  studentName: string;
}

const ExerciseDialogHeader: React.FC<ExerciseDialogHeaderProps> = ({ studentName }) => {
  const deviceInfo = useDeviceInfo();

  // Responsive classes
  const getHeaderClasses = () => {
    const baseClasses = "relative border-b border-b-emerald-200 dark:border-b-emerald-800 shadow-sm bg-gradient-to-b from-white to-emerald-50/30 dark:from-gray-900 dark:to-emerald-950/30";
    
    if (deviceInfo.isMobile) {
      return `${baseClasses} pt-3 pb-2 px-3`;
    } else if (deviceInfo.isTablet) {
      return `${baseClasses} pt-4 pb-3 px-4`;
    } else {
      return `${baseClasses} pt-6 pb-4 px-6`;
    }
  };

  const getIconSize = () => {
    if (deviceInfo.isMobile) {
      return "h-4 w-4 sm:h-5 sm:w-5";
    } else if (deviceInfo.isTablet) {
      return "h-5 w-5 md:h-6 md:w-6";
    } else {
      return "h-6 w-6 lg:h-7 lg:w-7";
    }
  };

  const getTitleSize = () => {
    if (deviceInfo.isMobile) {
      return "text-base sm:text-lg";
    } else if (deviceInfo.isTablet) {
      return "text-lg md:text-xl";
    } else {
      return "text-xl lg:text-2xl";
    }
  };

  const getDescriptionSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xs sm:text-sm";
    } else if (deviceInfo.isTablet) {
      return "text-sm";
    } else {
      return "text-sm lg:text-base";
    }
  };

  const getIconContainerSize = () => {
    if (deviceInfo.isMobile) {
      return "p-2";
    } else if (deviceInfo.isTablet) {
      return "p-2.5 md:p-3";
    } else {
      return "p-3 lg:p-4";
    }
  };

  const getTopOffset = () => {
    if (deviceInfo.isMobile) {
      return "-top-5";
    } else if (deviceInfo.isTablet) {
      return "-top-6";
    } else {
      return "-top-8";
    }
  };

  return (
    <DialogHeader className={getHeaderClasses()}>
      <motion.div 
        className={`absolute ${getTopOffset()} left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-full ${getIconContainerSize()} shadow-lg`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <Activity className={getIconSize() + " text-white"} />
      </motion.div>
      <DialogTitle className={`text-center mt-4 ${getTitleSize()} font-bold bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent pb-1`}>
        مدیریت تمرین‌های {studentName}
      </DialogTitle>
      <DialogDescription className={`text-center text-muted-foreground max-w-md mx-auto ${getDescriptionSize()}`}>
        در این قسمت می‌توانید تمرین‌های روزهای مختلف را مدیریت کنید. لطفاً برای هر روز، تمرین‌ها را انتخاب کرده و تعداد ست و تکرار را مشخص نمایید.
      </DialogDescription>
    </DialogHeader>
  );
};

export default ExerciseDialogHeader;
