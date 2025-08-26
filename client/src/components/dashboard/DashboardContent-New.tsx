
import { motion } from "framer-motion";
import { DashboardStats } from "@/types/dashboard";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { DashboardHeaderNew } from "./header/DashboardHeader-New";
import { StatsGridNew } from "./stats/StatsGrid-New";
import { QuickActionsNew } from "./quick-access/QuickActions-New";
import { StudentsOverviewNew } from "./students/StudentsOverview-New";
import { PerformanceChart } from "./analytics/PerformanceChart";
import { ActivityFeed } from "./analytics/ActivityFeed";
import { GoalTracker } from "./analytics/GoalTracker";
import { toPersianNumbers } from "@/lib/utils/numbers";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
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

interface DashboardContentNewProps {
  stats: DashboardStats;
  currentTime: Date;
  students: Student[];
  trainerProfile: {
    name: string;
    image: string;
  };
}

export const DashboardContentNew = ({ 
  stats, 
  currentTime, 
  students, 
  trainerProfile 
}: DashboardContentNewProps) => {
  const deviceInfo = useDeviceInfo();
  
  // محاسبه آمار واقعی بر اساس داده‌های دیتابیس آنلاین
  const calculateRealCapacityUsage = () => {
    return Math.round((stats.totalStudents / stats.maxCapacity) * 100);
  };

  const getPerformanceMessage = () => {
    if (stats.studentsProgress >= 80) {
      return "عملکرد فوق‌العاده! ادامه دهید";
    } else if (stats.studentsProgress >= 60) {
      return "عملکرد خوب، قابل بهبود";
    } else if (stats.studentsProgress >= 40) {
      return "عملکرد متوسط، نیاز به توجه بیشتر";
    } else {
      return "نیاز به بررسی و بهبود برنامه‌ها";
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen w-full"
    >
      <motion.div variants={itemVariants}>
        <DashboardHeaderNew 
          trainerProfile={trainerProfile}
          totalStudents={stats.totalStudents}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatsGridNew stats={stats} />
      </motion.div>

      {/* Quick Actions Section */}
      <motion.div variants={itemVariants}>
        <QuickActionsNew />
      </motion.div>

      {/* Main Analytics Grid */}
      <div className={`grid gap-8 ${deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Left Column - Performance & Goals */}
        <motion.div 
          variants={itemVariants}
          className="space-y-8"
        >
          <PerformanceChart stats={stats} />
          <GoalTracker stats={stats} />
        </motion.div>
        
        {/* Right Column - Students & Activity */}
        <motion.div 
          variants={itemVariants}
          className="space-y-8"
        >
          <StudentsOverviewNew students={students} />
          <ActivityFeed />
        </motion.div>
      </div>

      {/* Bottom Section - Quick Stats & Performance Summary */}
      <div className={`grid gap-8 mt-8 ${deviceInfo.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* کارت آمار سریع */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">آمار سریع سیستم</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
              <div className="text-center">
                <span className="text-2xl font-bold text-emerald-600">{toPersianNumbers(stats.mealCompletionRate.toString())}%</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">نرخ تکمیل رژیم</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30">
              <div className="text-center">
                <span className="text-2xl font-bold text-sky-600">{toPersianNumbers(stats.supplementCompletionRate.toString())}%</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">نرخ مصرف مکمل</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-primary/10 dark:bg-primary/20">
              <div className="text-center">
                <span className="text-2xl font-bold text-primary">
                  {toPersianNumbers(calculateRealCapacityUsage().toString())}%
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">ظرفیت استفاده</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-secondary/10 dark:bg-secondary/20">
              <div className="text-center">
                <span className="text-2xl font-bold text-secondary-foreground">
                  {toPersianNumbers((stats.totalMeals + stats.totalSupplements).toString())}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">کل برنامه‌ها</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* کارت خلاصه عملکرد */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl p-8 text-white"
          style={{ background: 'var(--bg-gradient-secondary)' }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6">خلاصه عملکرد کلی</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-lg">میانگین پیشرفت شاگردان</span>
                <span className="text-3xl font-bold">{toPersianNumbers(stats.studentsProgress.toString())}%</span>
              </div>
              
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.studentsProgress}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{toPersianNumbers(stats.totalStudents.toString())}</p>
                  <p className="text-sm text-white/80">شاگرد فعال</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{toPersianNumbers(stats.totalExercises.toString())}</p>
                  <p className="text-sm text-white/80">حرکت تمرینی</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{toPersianNumbers((stats.totalMeals + stats.totalSupplements).toString())}</p>
                  <p className="text-sm text-white/80">برنامه تغذیه</p>
                </div>
              </div>
              
              <p className="text-white/90 text-sm text-center">
                {getPerformanceMessage()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardContentNew;
