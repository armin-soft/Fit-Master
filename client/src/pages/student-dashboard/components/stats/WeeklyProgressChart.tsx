import { motion } from "framer-motion";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface WeeklyProgressChartProps {
  stats: {
    completedExercises: number;
    totalExercises: number;
    completedMeals: number;
    totalMeals: number;
    supplementsCompleted: number;
    totalSupplements: number;
    overallProgress: number;
  };
}

export const WeeklyProgressChart = ({ stats }: WeeklyProgressChartProps) => {
  const weekDays = [
    { name: "شنبه", short: "ش" },
    { name: "یکشنبه", short: "ی" },
    { name: "دوشنبه", short: "د" },
    { name: "سه‌شنبه", short: "س" },
    { name: "چهارشنبه", short: "چ" },
    { name: "پنج‌شنبه", short: "پ" },
  ];

  // Generate weekly progress data (simplified logic)
  const weeklyData = weekDays.map((day, index) => {
    // Simulate progress based on overall progress
    const baseProgress = Math.max(0, stats.overallProgress - 10 + Math.random() * 20);
    const progress = Math.min(100, Math.max(0, baseProgress));
    return {
      ...day,
      progress: Math.round(progress),
      isToday: index === new Date().getDay() // Simplified check
    };
  });

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-gray-300 dark:bg-gray-600";
  };

  const getProgressGradient = (progress: number) => {
    if (progress >= 80) return "from-emerald-400 to-emerald-600";
    if (progress >= 60) return "from-blue-400 to-blue-600";
    if (progress >= 40) return "from-yellow-400 to-yellow-600";
    return "from-gray-300 to-gray-400";
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
      style={{ boxShadow: 'var(--shadow-soft)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white flex items-center gap-3">
        <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        پیشرفت هفتگی
      </h4>

      {/* نمودار ستونی */}
      <div className="flex items-end justify-between gap-2 mb-6 h-32">
        {weeklyData.map((day, index) => (
          <motion.div
            key={day.name}
            className="flex flex-col items-center flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="w-full flex flex-col items-center">
              {/* Progress Bar */}
              <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
                <motion.div
                  className={`w-full bg-gradient-to-t ${getProgressGradient(day.progress)} rounded-lg`}
                  initial={{ height: 0 }}
                  animate={{ height: `${day.progress}%` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  style={{ position: 'absolute', bottom: 0 }}
                />
                
                {/* Today indicator */}
                {day.isToday && (
                  <motion.div
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  />
                )}
              </div>

              {/* Progress percentage */}
              <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mt-1">
                {toPersianNumbers(day.progress.toString())}%
              </div>

              {/* Day name */}
              <div className={`text-xs mt-1 ${day.isToday ? 'font-bold text-blue-600' : 'text-gray-500 dark:text-gray-400'}`}>
                {day.short}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">
            {toPersianNumbers(Math.round(weeklyData.reduce((sum, day) => sum + day.progress, 0) / weeklyData.length).toString())}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">میانگین هفته</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {toPersianNumbers(Math.max(...weeklyData.map(d => d.progress)).toString())}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">بهترین روز</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {toPersianNumbers(weeklyData.filter(d => d.progress >= 70).length.toString())}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">روزهای موفق</div>
        </div>
      </div>
    </motion.div>
  );
};