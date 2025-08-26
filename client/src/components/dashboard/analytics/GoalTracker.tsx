import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface GoalTrackerProps {
  stats: DashboardStats;
}

export const GoalTracker = ({ stats }: GoalTrackerProps) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const monthlyGoals = [
    {
      title: 'شاگردان جدید',
      current: stats.totalStudents,
      target: 15,
      icon: Target,
      color: 'emerald',
      unit: 'نفر'
    },
    {
      title: 'نرخ موفقیت',
      current: stats.studentsProgress,
      target: 85,
      icon: CheckCircle,
      color: 'blue',
      unit: '%'
    },
    {
      title: 'برنامه‌های فعال',
      current: stats.totalMeals + stats.totalSupplements,
      target: 100,
      icon: Clock,
      color: 'purple',
      unit: 'برنامه'
    }
  ];

  const getGoalStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return { status: 'completed', color: 'emerald', icon: CheckCircle };
    if (percentage >= 75) return { status: 'on-track', color: 'blue', icon: Clock };
    if (percentage >= 50) return { status: 'needs-attention', color: 'orange', icon: AlertCircle };
    return { status: 'behind', color: 'red', icon: AlertCircle };
  };

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: {
        bg: 'from-emerald-500 to-emerald-600',
        light: 'bg-emerald-50 dark:bg-emerald-950/30',
        text: 'text-emerald-600 dark:text-emerald-400'
      },
      blue: {
        bg: 'from-blue-500 to-blue-600',
        light: 'bg-blue-50 dark:bg-blue-950/30',
        text: 'text-blue-600 dark:text-blue-400'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        light: 'bg-purple-50 dark:bg-purple-950/30',
        text: 'text-purple-600 dark:text-purple-400'
      },
      orange: {
        bg: 'from-orange-500 to-orange-600',
        light: 'bg-orange-50 dark:bg-orange-950/30',
        text: 'text-orange-600 dark:text-orange-400'
      },
      red: {
        bg: 'from-red-500 to-red-600',
        light: 'bg-red-50 dark:bg-red-950/30',
        text: 'text-red-600 dark:text-red-400'
      }
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50"
      style={{ boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            اهداف ماهانه
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            پیشرفت اهداف ماه {toPersianNumbers(currentMonth.toString())}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {monthlyGoals.map((goal, index) => {
          const status = getGoalStatus(goal.current, goal.target);
          const colors = getColorClasses(status.color);
          const percentage = Math.min((goal.current / goal.target) * 100, 100);
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl ${colors.light}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                    <StatusIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {goal.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      هدف: {toPersianNumbers(goal.target.toString())} {goal.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${colors.text}`}>
                    {toPersianNumbers(goal.current.toString())}
                  </span>
                  <span className="text-sm text-gray-500 mr-1">
                    /{toPersianNumbers(goal.target.toString())}
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <motion.div
                  className={`h-full bg-gradient-to-r ${colors.bg} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {toPersianNumbers(percentage.toFixed(0))}% تکمیل شده
                </span>
                <span className={`text-xs font-medium ${colors.text}`}>
                  {percentage >= 100 ? '✓ تکمیل شد' : 
                   percentage >= 75 ? 'در مسیر مناسب' :
                   percentage >= 50 ? 'نیاز به توجه' : 'عقب‌تر از برنامه'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-l from-purple-50 to-purple-100/30 dark:from-purple-950/30 dark:to-purple-900/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            توصیه برای بهبود
          </span>
        </div>
        <p className="text-xs text-purple-600 dark:text-purple-400">
          برای رسیدن به اهداف ماهانه، تمرکز بر جذب {toPersianNumbers((15 - stats.totalStudents).toString())} شاگرد جدید و بهبود نرخ موفقیت توصیه می‌شود.
        </p>
      </motion.div>
    </motion.div>
  );
};