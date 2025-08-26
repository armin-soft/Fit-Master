import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Heart } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";

interface SupplementStatsSectionProps {
  supplementsCount: number;
  vitaminsCount: number;
}

export const SupplementStatsSection = ({
  supplementsCount,
  vitaminsCount
}: SupplementStatsSectionProps) => {
  const deviceInfo = useDeviceInfo();

  // Responsive grid classes - more compact
  const getGridClasses = () => {
    if (deviceInfo.isMobile) {
      return "grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2";
    } else if (deviceInfo.isTablet) {
      return "grid grid-cols-2 gap-2";
    } else {
      return "grid grid-cols-2 gap-3";
    }
  };

  // Responsive padding - more compact
  const getCardPadding = () => {
    if (deviceInfo.isMobile) {
      return "p-2 sm:p-3";
    } else if (deviceInfo.isTablet) {
      return "p-3";
    } else {
      return "p-3 lg:p-4";
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
      title: "مکمل‌های غذایی",
      value: supplementsCount,
      icon: Pill,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "ویتامین‌ها",
      value: vitaminsCount,
      icon: Heart,
      gradient: "from-sky-500 to-sky-600"
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