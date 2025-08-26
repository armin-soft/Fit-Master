
import { motion } from "framer-motion";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { StudentStatsCard } from "./StudentStatsCard";
import { Dumbbell, Utensils, Pill, TrendingUp } from "lucide-react";

interface StudentStatsGridNewProps {
  stats: {
    weeklyProgress: number;
    completedExercises: number;
    totalExercises: number;
    completedMeals: number;
    totalMeals: number;
    supplementsCompleted: number;
    totalSupplements: number;
    overallProgress: number;
  };
}

export const StudentStatsGridNew = ({ stats }: StudentStatsGridNewProps) => {
  const deviceInfo = useDeviceInfo();
  
  const statsCards = [
    {
      title: "تمرینات",
      value: stats.completedExercises,
      total: stats.totalExercises,
      icon: Dumbbell,
      color: "emerald" as const,
      progress: stats.totalExercises > 0 ? Math.round((stats.completedExercises / stats.totalExercises) * 100) : 0
    },
    {
      title: "وعده‌های غذایی",
      value: stats.completedMeals,
      total: stats.totalMeals,
      icon: Utensils,
      color: "sky" as const,
      progress: stats.totalMeals > 0 ? Math.round((stats.completedMeals / stats.totalMeals) * 100) : 0
    },
    {
      title: "مکمل‌ها",
      value: stats.supplementsCompleted,
      total: stats.totalSupplements,
      icon: Pill,
      color: "orange" as const,
      progress: stats.totalSupplements > 0 ? Math.round((stats.supplementsCompleted / stats.totalSupplements) * 100) : 0
    },
    {
      title: "پیشرفت کلی",
      value: stats.overallProgress,
      total: 100,
      icon: TrendingUp,
      color: "emerald-sky" as const,
      progress: stats.overallProgress
    }
  ];

  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-2";
    if (deviceInfo.isTablet) return "grid-cols-2 md:grid-cols-4";
    return "grid-cols-4";
  };

  return (
    <div className={`grid ${getGridCols()} gap-6 mb-8`}>
      {statsCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <StudentStatsCard {...card} />
        </motion.div>
      ))}
    </div>
  );
};

export default StudentStatsGridNew;
