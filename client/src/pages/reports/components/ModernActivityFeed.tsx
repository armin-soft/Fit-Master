
import React from "react";
import { motion } from "framer-motion";
import { Clock, User, Dumbbell, Apple, Pill, TrendingUp, Calendar } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudents } from "@/hooks/useStudents";

export const ModernActivityFeed = () => {
  const { students } = useStudents();

  // Generate real activities from student data
  const generateActivities = () => {
    const activities: any[] = [];
    
    students.forEach((student, index) => {
      if (student.name) {
        activities.push({
          id: `student-${student.id}`,
          type: "student_added",
          title: "شاگرد جدید",
          description: `${student.name} به سیستم اضافه شد`,
          time: new Date(Date.now() - (index + 1) * 60 * 60 * 1000),
          icon: User,
          color: "from-blue-500 to-cyan-500",
          priority: "normal"
        });
      }

      if (student.exercises && Object.keys(student.exercises).length > 0) {
        activities.push({
          id: `exercise-${student.id}`,
          type: "exercise_assigned",
          title: "برنامه تمرینی",
          description: `برنامه تمرینی برای ${student.name || 'شاگرد'} تعریف شد`,
          time: new Date(Date.now() - (index + 2) * 60 * 60 * 1000),
          icon: Dumbbell,
          color: "from-emerald-500 to-teal-500",
          priority: "high"
        });
      }

      if (student.meals && Array.isArray(student.meals) && student.meals.length > 0) {
        activities.push({
          id: `meals-${student.id}`,
          type: "meals_assigned",
          title: "برنامه تغذیه",
          description: `رژیم غذایی برای ${student.name || 'شاگرد'} طراحی شد`,
          time: new Date(Date.now() - (index + 3) * 60 * 60 * 1000),
          icon: Apple,
          color: "from-orange-500 to-amber-500",
          priority: "high"
        });
      }

      if (student.supplements && Array.isArray(student.supplements) && student.supplements.length > 0) {
        activities.push({
          id: `supplement-${student.id}`,
          type: "supplement_assigned",
          title: "مکمل غذایی",
          description: `مکمل‌ها برای ${student.name || 'شاگرد'} تجویز شدند`,
          time: new Date(Date.now() - (index + 4) * 60 * 60 * 1000),
          icon: Pill,
          color: "from-purple-500 to-indigo-500",
          priority: "medium"
        });
      }
    });

    return activities
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, 8); // Show latest 8 activities
  };

  const activities = generateActivities();

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return "چند دقیقه پیش";
    } else if (diffInHours < 24) {
      return `${toPersianNumbers(diffInHours.toString())} ساعت پیش`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${toPersianNumbers(diffInDays.toString())} روز پیش`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-r-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10';
      case 'medium': return 'border-r-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/10';
      default: return 'border-r-sky-400 bg-sky-50/50 dark:bg-sky-900/10';
    }
  };

  const getActivityTypeLabel = (type: string): string => {
    switch (type) {
      case 'student_added': return 'افزودن شاگرد';
      case 'exercise_assigned': return 'تعریف تمرین';
      case 'meals_assigned': return 'تعریف تغذیه';
      case 'supplement_assigned': return 'تجویز مکمل';
      default: return 'فعالیت';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              آخرین فعالیت‌ها
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              جدیدترین رویدادها و تغییرات سیستم
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-100 to-primary/10 dark:from-sky-900/30 dark:to-primary/20 rounded-full">
            <TrendingUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">
              به‌روزرسانی لحظه‌ای
            </span>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              هنوز فعالیتی ثبت نشده
            </h4>
            <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
              پس از شروع کار با سیستم و افزودن شاگردان، فعالیت‌ها در اینجا نمایش داده خواهند شد
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                className={`group relative border-r-4 ${getPriorityColor(activity.priority)} rounded-lg transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-start gap-4 p-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex-shrink-0 p-3 bg-gradient-to-r ${activity.color} rounded-xl shadow-lg`}
                  >
                    <activity.icon className="h-5 w-5 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                          {activity.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{getTimeAgo(activity.time)}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>{getActivityTypeLabel(activity.type)}</span>
                    </div>
                  </div>
                  
                  {/* Priority Indicator */}
                  <div className={`w-2 h-2 rounded-full ${
                    activity.priority === 'high' ? 'bg-emerald-400' :
                    activity.priority === 'medium' ? 'bg-yellow-400' : 'bg-sky-400'
                  } group-hover:scale-125 transition-transform duration-200`} />
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-primary group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
