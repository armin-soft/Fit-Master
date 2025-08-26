
import { Card } from "@/components/ui/card";
import { Tag, FolderTree, Activity } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ExerciseStatsCardsProps {
  exerciseTypesCount: number;
  categoriesCount: number;
  exercisesCount: number;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const ExerciseStatsCards = ({ 
  exerciseTypesCount, 
  categoriesCount, 
  exercisesCount 
}: ExerciseStatsCardsProps) => {
  const deviceInfo = useDeviceInfo();

  const getCardSpacing = () => {
    if (deviceInfo.isMobile) {
      return "p-2 gap-2";
    } else if (deviceInfo.isTablet) {
      return "p-3 gap-3";
    } else {
      return "p-4 gap-4";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
      <motion.div variants={itemVariants} className="col-span-1">
        <Card className={`${getCardSpacing()} bg-gradient-to-br from-info-50 to-white dark:from-info-950 dark:to-gray-900 border-info-100 dark:border-info-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-info-100 dark:bg-info-900 p-2 sm:p-3 rounded-xl">
              <Tag className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-info-600 dark:text-info-400`} />
            </div>
            <div className="space-y-0.5">
              <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>انواع حرکات</p>
              <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-info-600 dark:text-info-400`}>
                {toPersianNumbers(exerciseTypesCount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1">
        <Card className={`${getCardSpacing()} bg-gradient-to-br from-warning-50 to-white dark:from-warning-950 dark:to-gray-900 border-warning-100 dark:border-warning-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-warning-100 dark:bg-warning-900 p-2 sm:p-3 rounded-xl">
              <FolderTree className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-warning-600 dark:text-warning-400`} />
            </div>
            <div className="space-y-0.5">
              <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>دسته بندی ها</p>
              <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-warning-600 dark:text-warning-400`}>
                {toPersianNumbers(categoriesCount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-1 sm:col-span-2 lg:col-span-1">
        <Card className={`${getCardSpacing()} bg-gradient-to-br from-brand-50 to-white dark:from-brand-950 dark:to-gray-900 border-brand-100 dark:border-brand-900 shadow-lg hover:shadow-xl transition-shadow duration-300`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-brand-100 dark:bg-brand-900 p-2 sm:p-3 rounded-xl">
              <Activity className={`${deviceInfo.isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-brand-600 dark:text-brand-400`} />
            </div>
            <div className="space-y-0.5">
              <p className={`${deviceInfo.isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>حرکات</p>
              <p className={`${deviceInfo.isMobile ? "text-lg" : "text-xl sm:text-2xl"} font-bold text-brand-600 dark:text-brand-400`}>
                {toPersianNumbers(exercisesCount)}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
