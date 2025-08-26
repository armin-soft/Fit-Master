
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Users, Dumbbell, Utensils, Pill, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getColorClasses } from "../utils/colorUtils";

interface StatsGridNewProps {
  stats: DashboardStats;
}

const statsConfig = [
  {
    title: "شاگردان فعال",
    value: (stats: DashboardStats) => stats.totalStudents,
    icon: Users,
    color: "emerald",
    description: "کل شاگردان ثبت شده",
    trend: "+12%"
  },
  {
    title: "حرکات تمرینی",
    value: (stats: DashboardStats) => stats.totalExercises || 0,
    icon: Dumbbell,
    color: "blue", 
    description: "حرکت تعریف شده",
    trend: "+8%"
  },
  {
    title: "برنامه غذایی",
    value: (stats: DashboardStats) => stats.totalMeals,
    icon: Utensils,
    color: "orange",
    description: "رژیم طراحی شده",
    trend: "+15%"
  },
  {
    title: "مکمل و ویتامین",
    value: (stats: DashboardStats) => stats.totalSupplements,
    icon: Pill,
    color: "purple",
    description: "مکمل تجویز شده",
    trend: "+5%"
  },
  {
    title: "نرخ موفقیت",
    value: (stats: DashboardStats) => stats.studentsProgress,
    icon: TrendingUp,
    color: "green",
    description: "میانگین پیشرفت شاگردان",
    suffix: "%",
    trend: "+3%"
  },
  {
    title: "نرخ تکمیل رژیم",
    value: (stats: DashboardStats) => stats.mealCompletionRate,
    icon: Utensils,
    color: "cyan",
    description: "شاگردان با رژیم فعال",
    suffix: "%",
    trend: "+10%"
  }
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const StatsGridNew = ({ stats }: StatsGridNewProps) => {
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`grid gap-6 mb-8 ${
        deviceInfo.isMobile 
          ? 'grid-cols-1' 
          : deviceInfo.isTablet 
          ? 'grid-cols-2' 
          : 'grid-cols-3 xl:grid-cols-6'
      }`}
    >
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        const value = stat.value(stats);
        const colors = getColorClasses(stat.color);

        return (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-xl p-6`}
            style={{ boxShadow: 'var(--shadow-soft)' }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -translate-y-12 translate-x-12" />

            <div className="relative z-10">
              <motion.div 
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center mb-4 shadow-lg`}
                whileHover={{ rotate: 8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {toPersianNumbers(value.toString())}{stat.suffix || ''}
                </h3>
                
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.description}
                  </p>
                  {stat.trend && (
                    <div className="flex items-center gap-1 text-xs">
                      <ArrowUp className="w-3 h-3 text-green-500" />
                      <span className="text-green-600 font-medium">{stat.trend}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsGridNew;
