import { motion } from "framer-motion";
import { Activity, TrendingUp, Clock, Target, Zap, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface EnhancedStatsCardsProps {
  stats: {
    totalCalories: number;
    averageCaloriesPerMeal: number;
    totalProtein: number;
    averageProteinPerMeal: number;
    exercisesByCategory: Record<string, number>;
    mealsByType: Record<string, number>;
    supplementsByType: Record<string, number>;
    weeklyGoalProgress: number;
    streakDays: number;
    totalActiveDays: number;
    overallProgress: number;
  };
}

export const EnhancedStatsCards = ({ stats }: EnhancedStatsCardsProps) => {
  const nutritionCards = [
    {
      title: "کالری کل",
      value: toPersianNumbers(stats.totalCalories.toString()),
      unit: "کالری",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      textColor: "text-orange-600"
    },
    {
      title: "میانگین کالری",
      value: toPersianNumbers(stats.averageCaloriesPerMeal.toString()),
      unit: "کالری/وعده",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-600"
    },
    {
      title: "پروتئین کل",
      value: toPersianNumbers(stats.totalProtein.toString()),
      unit: "گرم",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      textColor: "text-purple-600"
    },
    {
      title: "میانگین پروتئین",
      value: toPersianNumbers(stats.averageProteinPerMeal.toString()),
      unit: "گرم/وعده",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-600"
    }
  ];

  const progressCards = [
    {
      title: "روزهای متوالی",
      value: toPersianNumbers(stats.streakDays.toString()),
      unit: "روز",
      icon: Calendar,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      textColor: "text-yellow-600"
    },
    {
      title: "هدف هفتگی",
      value: toPersianNumbers(stats.weeklyGoalProgress.toString()),
      unit: "%",
      icon: Target,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      textColor: "text-green-600"
    },
    {
      title: "روزهای فعال",
      value: `${toPersianNumbers(Math.round(stats.overallProgress / 15).toString())}/${toPersianNumbers(stats.totalActiveDays.toString())}`,
      unit: "روز",
      icon: Clock,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      textColor: "text-indigo-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* کارت‌های تغذیه */}
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        style={{ boxShadow: 'var(--shadow-soft)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          آمار تغذیه
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          {nutritionCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`p-4 rounded-2xl ${card.bgColor} border border-gray-100 dark:border-gray-800`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${card.textColor}`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{card.unit}</span>
                </div>
                <div className={`text-2xl font-bold ${card.textColor} mb-1`}>
                  {card.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {card.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* کارت‌های پیشرفت */}
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        style={{ boxShadow: 'var(--shadow-soft)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
          آمار پیشرفت
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          {progressCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className={`p-4 rounded-2xl ${card.bgColor} border border-gray-100 dark:border-gray-800`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${card.textColor}`} />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{card.title}</div>
                      <div className={`text-xl font-bold ${card.textColor}`}>
                        {card.value} <span className="text-sm font-normal">{card.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* کارت توزیع برنامه‌ها */}
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50"
        style={{ boxShadow: 'var(--shadow-soft)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="font-bold text-lg mb-6 text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          توزیع برنامه‌ها
        </h4>
        
        <div className="space-y-4">
          {/* تمرینات بر اساس دسته‌بندی */}
          {Object.keys(stats.exercisesByCategory).length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">تمرینات</h5>
              <div className="space-y-2">
                {Object.entries(stats.exercisesByCategory).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                    <span className="font-bold text-blue-600">{toPersianNumbers(count.toString())}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* وعده‌های غذایی بر اساس نوع */}
          {Object.keys(stats.mealsByType).length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">وعده‌های غذایی</h5>
              <div className="space-y-2">
                {Object.entries(stats.mealsByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{type}</span>
                    <span className="font-bold text-green-600">{toPersianNumbers(count.toString())}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* مکمل‌ها بر اساس نوع */}
          {Object.keys(stats.supplementsByType).length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">مکمل‌ها</h5>
              <div className="space-y-2">
                {Object.entries(stats.supplementsByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{type}</span>
                    <span className="font-bold text-purple-600">{toPersianNumbers(count.toString())}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};