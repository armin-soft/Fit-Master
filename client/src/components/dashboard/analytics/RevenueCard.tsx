import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Users } from 'lucide-react';
import { DashboardStats } from '@/types/dashboard';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface RevenueCardProps {
  stats: DashboardStats;
}

export const RevenueCard = ({ stats }: RevenueCardProps) => {
  // محاسبه درآمد تخمینی بر اساس تعداد شاگردان
  const estimatedMonthlyRevenue = stats.totalStudents * 500000; // فرض: هر شاگرد ۵۰۰ هزار تومان در ماه
  const estimatedYearlyRevenue = estimatedMonthlyRevenue * 12;
  const averageRevenuePerStudent = stats.totalStudents > 0 ? estimatedMonthlyRevenue / stats.totalStudents : 0;

  const revenueMetrics = [
    {
      title: 'درآمد ماهانه تخمینی',
      value: estimatedMonthlyRevenue,
      icon: DollarSign,
      color: 'emerald',
      format: 'currency',
      change: '+12%'
    },
    {
      title: 'درآمد سالانه تخمینی',
      value: estimatedYearlyRevenue,
      icon: TrendingUp,
      color: 'blue',
      format: 'currency',
      change: '+8%'
    },
    {
      title: 'متوسط درآمد هر شاگرد',
      value: averageRevenuePerStudent,
      icon: Users,
      color: 'purple',
      format: 'currency',
      change: 'ثابت'
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${toPersianNumbers((amount / 1000000).toFixed(1))} میلیون`;
    }
    return `${toPersianNumbers(amount.toLocaleString())} تومان`;
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
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            تحلیل درآمد
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            درآمد تخمینی و آمار مالی
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {revenueMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const colors = getColorClasses(metric.color);
          
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl ${colors.light}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {metric.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      تغییرات: {metric.change}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${colors.text}`}>
                    {formatCurrency(metric.value)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-l from-emerald-50 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-900/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            پیش‌بینی ماه آینده
          </span>
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          با افزایش {toPersianNumbers('2')} شاگرد جدید، درآمد ماهانه به {formatCurrency(estimatedMonthlyRevenue + 1000000)} خواهد رسید.
        </p>
      </motion.div>
    </motion.div>
  );
};