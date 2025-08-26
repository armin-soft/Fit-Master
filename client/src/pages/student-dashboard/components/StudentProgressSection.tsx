
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, Award } from "lucide-react";
import { useStudentData } from "../hooks/useStudentData";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const StudentProgressSection: React.FC = () => {
  const { studentData, loading } = useStudentData();

  const progressItems = [
    {
      title: "پیشرفت هفتگی",
      value: studentData.weeklyProgress,
      max: 100,
      description: `${toPersianNumbers(studentData.completedDays.toString())} از ۷ روز تکمیل شده`,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/20"
    },
    {
      title: "پیشرفت وزن",
      value: studentData.weightProgress,
      max: 100,
      description: `هدف: ${toPersianNumbers(studentData.targetWeight.toString())} کیلوگرم`,
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-100 dark:bg-sky-900/20"
    },
    {
      title: "تکمیل وعده‌های غذایی",
      value: studentData.mealCompletionRate,
      max: 100,
      description: "نرخ موفقیت در برنامه غذایی",
      color: "from-emerald-600 to-sky-600",
      bgColor: "bg-gradient-to-r from-emerald-100 to-sky-100 dark:from-emerald-900/20 dark:to-sky-900/20"
    },
    {
      title: "مصرف مکمل‌ها",
      value: studentData.supplementCompletionRate,
      max: 100,
      description: "نرخ استفاده از مکمل‌های تجویزی",
      color: "from-sky-600 to-emerald-600",
      bgColor: "bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/20 dark:to-emerald-900/20"
    }
  ];

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <motion.div 
              className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </motion.div>
            پیشرفت و عملکرد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {progressItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className={`p-5 rounded-2xl ${item.bgColor} border border-white/20 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <Badge variant="outline" className="text-sm font-bold">
                  {toPersianNumbers(item.value.toString())}%
                </Badge>
              </div>
              
              <div className="space-y-3">
                <Progress 
                  value={item.value} 
                  className="h-4 bg-white/50"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* بخش انگیزشی */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg"
          >
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-yellow-200" />
              <div>
                <h4 className="text-lg font-bold">عالی! ادامه دهید! 🎉</h4>
                <p className="text-white/90 text-sm">
                  شما در مسیر درستی قرار دارید. با انگیزه پیش بروید!
                </p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
