
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Layers, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface ExerciseStatsSectionProps {
  exerciseTypesCount: number;
  categoriesCount: number;
  exercisesCount: number;
}

export const ExerciseStatsSection = ({
  exerciseTypesCount,
  categoriesCount,
  exercisesCount
}: ExerciseStatsSectionProps) => {
  const deviceInfo = useDeviceInfo();

  // Responsive grid classes
  const getGridClasses = () => {
    if (deviceInfo.isMobile) {
      return "grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3";
    } else if (deviceInfo.isTablet) {
      return "grid grid-cols-3 gap-3 md:gap-4";
    } else {
      return "grid grid-cols-3 gap-4 lg:gap-6";
    }
  };

  // Responsive padding
  const getCardPadding = () => {
    if (deviceInfo.isMobile) {
      return "p-3 sm:p-4";
    } else if (deviceInfo.isTablet) {
      return "p-4 md:p-5";
    } else {
      return "p-5 lg:p-6";
    }
  };

  // Responsive icon size
  const getIconSize = () => {
    if (deviceInfo.isMobile) {
      return "h-5 w-5 sm:h-6 sm:w-6";
    } else if (deviceInfo.isTablet) {
      return "h-6 w-6 md:h-7 md:w-7";
    } else {
      return "h-7 w-7 lg:h-8 lg:w-8";
    }
  };

  // Responsive text sizes
  const getNumberSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xl sm:text-2xl";
    } else if (deviceInfo.isTablet) {
      return "text-2xl md:text-3xl";
    } else {
      return "text-3xl lg:text-4xl";
    }
  };

  const getLabelSize = () => {
    if (deviceInfo.isMobile) {
      return "text-xs sm:text-sm";
    } else if (deviceInfo.isTablet) {
      return "text-sm md:text-base";
    } else {
      return "text-base lg:text-lg";
    }
  };

  const stats = [
    {
      title: "انواع تمرین",
      value: exerciseTypesCount,
      icon: Layers,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "دسته‌بندی‌ها",
      value: categoriesCount,
      icon: Activity,
      gradient: "from-sky-500 to-sky-600"
    },
    {
      title: "حرکات تمرینی",
      value: exercisesCount,
      icon: Dumbbell,
      gradient: "from-emerald-600 to-sky-600"
    }
  ];

  return (
    <motion.div
      className={getGridClasses()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
        >
          <Card className="border-0 shadow-md bg-gradient-to-br from-white/90 to-emerald-50/90 dark:from-gray-800/90 dark:to-emerald-900/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className={getCardPadding()}>
              <div className="flex items-center justify-between h-full">
                <div className="flex-1">
                  <div className={`${getNumberSize()} font-bold text-gray-800 dark:text-gray-100 mb-1`}>
                    {toPersianNumbers(stat.value)}
                  </div>
                  <div className={`${getLabelSize()} text-gray-600 dark:text-gray-400 font-medium`}>
                    {stat.title}
                  </div>
                </div>
                <div className={`bg-gradient-to-r ${stat.gradient} rounded-xl ${deviceInfo.isMobile ? 'p-2' : 'p-3'} shadow-lg flex-shrink-0`}>
                  <stat.icon className={`${getIconSize()} text-white`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
