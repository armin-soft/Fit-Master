
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";

export const ExercisePageHeader = () => {
  const deviceInfo = useDeviceInfo();

  // Responsive text sizes
  const getTitleSize = () => {
    if (deviceInfo.isMobile) {
      return "text-lg sm:text-xl";
    } else if (deviceInfo.isTablet) {
      return "text-xl md:text-2xl";
    } else {
      return "text-2xl lg:text-3xl xl:text-4xl";
    }
  };

  const getDescriptionSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xs sm:text-sm";
    } else if (deviceInfo.isTablet) {
      return "text-sm md:text-base";
    } else {
      return "text-base lg:text-lg";
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-2 sm:gap-3 lg:gap-4 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1 w-full">
          <h2 className={`${getTitleSize()} font-bold tracking-tight bg-gradient-to-r from-brand-600 to-info-600 bg-clip-text text-transparent`}>
            مدیریت حرکات تمرینی
          </h2>
          <p className={`text-muted-foreground ${getDescriptionSize()}`}>
            مدیریت انواع، دسته بندی ها و حرکات تمرینی
          </p>
        </div>
      </div>
    </motion.div>
  );
};
