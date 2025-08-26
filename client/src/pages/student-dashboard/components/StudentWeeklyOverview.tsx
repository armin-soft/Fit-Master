
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useStudentData } from "../hooks/useStudentData";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentWeeklyOverview: React.FC = () => {
  const { studentData, loading } = useStudentData();

  const daysOfWeek = [
    { name: 'شنبه', key: 'exercisesDay6' },
    { name: 'یکشنبه', key: 'exercisesDay7' },
    { name: 'دوشنبه', key: 'exercisesDay1' },
    { name: 'سه‌شنبه', key: 'exercisesDay2' },
    { name: 'چهارشنبه', key: 'exercisesDay3' },
    { name: 'پنج‌شنبه', key: 'exercisesDay4' },
    { name: 'جمعه', key: 'exercisesDay5' }
  ];

  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // تبدیل به ایندکس فارسی
  };

  const [dayStatuses, setDayStatuses] = useState<Record<string, 'empty' | 'current' | 'completed'>>({});

  useEffect(() => {
    // Initialize with empty states since we don't have fake data anymore
    const currentDayIndex = getCurrentDayIndex();
    const newStatuses: Record<string, 'empty' | 'current' | 'completed'> = {};
    
    daysOfWeek.forEach((day, index) => {
      // All days are empty since we don't populate with fake data
      newStatuses[day.key] = 'empty';
    });
    
    setDayStatuses(newStatuses);
  }, []);

  const getDayStatus = (dayKey: string, isToday: boolean) => {
    return dayStatuses[dayKey] || 'empty';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentDayIndex = getCurrentDayIndex();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 shadow-lg"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            نمای هفتگی برنامه
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {daysOfWeek.map((day, index) => {
              const isToday = index === currentDayIndex;
              const status = getDayStatus(day.key, isToday);
              
              return (
                <motion.div
                  key={day.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`relative p-4 rounded-2xl border shadow-sm transition-all duration-300 ${
                    status === 'current' 
                      ? 'bg-gradient-to-br from-emerald-500 to-sky-500 text-white border-emerald-300 shadow-lg' 
                      : status === 'completed'
                      ? 'bg-gradient-to-br from-emerald-50 to-sky-50 border-emerald-200 dark:from-emerald-950/30 dark:to-sky-950/30 dark:border-emerald-800'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700'
                  }`}
                >
                  {/* نام روز */}
                  <div className="text-center mb-3">
                    <h3 className={`text-sm font-bold ${
                      status === 'current' ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}>
                      {day.name}
                    </h3>
                    {isToday && (
                      <Badge variant="secondary" className="text-xs mt-1 bg-white/20 text-white border-white/30">
                        امروز
                      </Badge>
                    )}
                  </div>

                  {/* آیکون وضعیت */}
                  <div className="flex justify-center">
                    {status === 'current' ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Clock className="w-8 h-8 text-white" />
                      </motion.div>
                    ) : status === 'completed' ? (
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    ) : (
                      <XCircle className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  {/* تعداد تمرین */}
                  <div className="text-center mt-2">
                    <span className={`text-xs ${
                      status === 'current' ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      بدون برنامه
                    </span>
                  </div>

                  {/* تأثیر نور */}
                  {status === 'current' && (
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl -translate-y-10 translate-x-10" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* خلاصه آماری */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-950/20 dark:to-sky-950/20 border border-emerald-200/50 dark:border-emerald-800/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  پیشرفت هفتگی
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {toPersianNumbers(studentData.completedDays.toString())} از ۷ روز تکمیل شده
                </p>
              </div>
              <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                {toPersianNumbers(studentData.weeklyProgress.toString())}%
              </Badge>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
