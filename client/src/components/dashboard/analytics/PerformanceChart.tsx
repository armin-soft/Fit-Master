import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Activity, Award } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface PerformanceChartProps {
  stats: DashboardStats;
}

export const PerformanceChart = ({ stats }: PerformanceChartProps) => {
  const performanceMetrics = [
    {
      title: 'نرخ موفقیت شاگردان',
      value: stats.studentsProgress,
      target: 85,
      icon: Target,
      color: 'emerald',
      description: 'از هدف ۸۵ درصدی'
    },
    {
      title: 'نرخ تکمیل رژیم',
      value: stats.mealCompletionRate,
      target: 90,
      icon: Activity,
      color: 'blue',
      description: 'از هدف ۹۰ درصدی'
    },
    {
      title: 'نرخ مصرف مکمل',
      value: stats.supplementCompletionRate,
      target: 75,
      icon: Award,
      color: 'purple',
      description: 'از هدف ۷۵ درصدی'
    }
  ];

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
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            تحلیل عملکرد
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            آمار پیشرفت و موفقیت شاگردان
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colors = getColorClasses(metric.color);
          const percentage = Math.min((metric.value / metric.target) * 100, 100);
          
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl ${colors.light}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {metric.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {metric.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${colors.text}`}>
                    {toPersianNumbers(metric.value.toString())}%
                  </span>
                  <p className="text-xs text-gray-500">
                    از {toPersianNumbers(metric.target.toString())}%
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-full bg-gradient-to-r ${colors.bg} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};