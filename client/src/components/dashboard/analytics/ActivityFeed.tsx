import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, User, Plus, Edit, Trash, Calendar } from 'lucide-react';
import { toPersianNumbers } from '@/lib/utils/numbers';

interface ActivityItem {
  id: string;
  type: 'student_added' | 'program_created' | 'meal_assigned' | 'supplement_assigned' | 'exercise_assigned';
  title: string;
  description: string;
  time: string;
  icon: any;
  color: string;
}

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Simulate recent activities based on real data patterns
    const generateActivities = () => {
      const activityTypes = [
        {
          type: 'student_added' as const,
          title: 'شاگرد جدید اضافه شد',
          description: 'آرمین اسکندری به سیستم اضافه شد',
          icon: User,
          color: 'emerald'
        },
        {
          type: 'meal_assigned' as const,
          title: 'برنامه غذایی تخصیص یافت',
          description: 'رژیم کاهش وزن به شاگرد تخصیص داده شد',
          icon: Plus,
          color: 'blue'
        },
        {
          type: 'supplement_assigned' as const,
          title: 'مکمل تجویز شد',
          description: 'ویتامین D3 و پروتئین وی تجویز شد',
          icon: Edit,
          color: 'purple'
        },
        {
          type: 'exercise_assigned' as const,
          title: 'برنامه تمرینی طراحی شد',
          description: 'برنامه ۴ روزه تمرین طراحی شد',
          icon: Activity,
          color: 'orange'
        }
      ];

      const times = ['۵ دقیقه پیش', '۱۵ دقیقه پیش', '۳۰ دقیقه پیش', '۱ ساعت پیش', '۲ ساعت پیش'];
      
      return activityTypes.map((activity, index) => ({
        id: `activity-${index}`,
        ...activity,
        time: times[index] || '۱ ساعت پیش'
      }));
    };

    setActivities(generateActivities());
  }, []);

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
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            فعالیت‌های اخیر
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            آخرین تغییرات و بروزرسانی‌ها
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const colors = getColorClasses(activity.color);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  {activity.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {activity.time}
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
        className="mt-6 text-center"
      >
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
          مشاهده تمام فعالیت‌ها
        </button>
      </motion.div>
    </motion.div>
  );
};