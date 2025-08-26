
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dumbbell, 
  Apple, 
  Pill, 
  BarChart3, 
  MessageSquare, 
  User,
  Calendar,
  Target,
  ArrowLeft
} from "lucide-react";
import { useStudentDashboardStats } from "../hooks/useStudentDashboardStats";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface QuickAccessItem {
  icon: any;
  title: string;
  description: string;
  badge?: string;
  color: string;
  bgColor: string;
  delay: number;
}

export const StudentQuickAccessGrid: React.FC = () => {
  const stats = useStudentDashboardStats();

  // Create dynamic quick access items based on real data
  const quickAccessItems: QuickAccessItem[] = [
    {
      icon: Dumbbell,
      title: "برنامه تمرینی امروز",
      description: "مشاهده و شروع تمرین‌های برنامه‌ریزی شده برای امروز",
      badge: stats.totalExercises > 0 ? `${toPersianNumbers(stats.totalExercises)} تمرین` : undefined,
      color: "from-brand-500 to-brand-600",
      bgColor: "from-brand-400/5 to-brand-500/10",
      delay: 0
    },
    {
      icon: Apple,
      title: "برنامه غذایی",
      description: "مشاهده وعده‌های غذایی و ثبت مصرف",
      badge: stats.totalMeals > 0 ? `${toPersianNumbers(stats.totalMeals)} وعده` : undefined,
      color: "from-info-500 to-info-600",
      bgColor: "from-info-50 to-info-100/50",
      delay: 0.1
    },
    {
      icon: Pill,
      title: "مکمل‌های روزانه",
      description: "مشاهده و ثبت مصرف مکمل‌ها",
      badge: stats.totalSupplements > 0 ? `${toPersianNumbers(stats.totalSupplements)} مکمل` : undefined,
      color: "from-brand-600 to-info-600",
      bgColor: "from-brand-50 to-info-100/50",
      delay: 0.2
    },
    {
      icon: Calendar,
      title: "برنامه هفتگی",
      description: "نمای کلی برنامه تمرینی و غذایی هفته",
      color: "from-info-600 to-brand-600",
      bgColor: "from-info-50 to-brand-100/50",
      delay: 0.3
    },
    {
      icon: BarChart3,
      title: "گزارشات پیشرفت",
      description: "مشاهده آمار و نمودارهای پیشرفت",
      badge: stats.overallProgress > 0 ? `${toPersianNumbers(stats.overallProgress)}%` : undefined,
      color: "from-brand-500 to-info-500",
      bgColor: "from-brand-50 to-info-100/50",
      delay: 0.4
    },
    {
      icon: MessageSquare,
      title: "ارتباط با مربی",
      description: "چت و دریافت راهنمایی از مربی",
      color: "from-info-500 to-brand-500",
      bgColor: "from-info-50 to-brand-100/50",
      delay: 0.5
    }
  ];

  if (stats.isLoading) {
    return (
      <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            دسترسی سریع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-3xl h-40"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          دسترسی سریع
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`group relative overflow-hidden bg-gradient-to-br ${item.bgColor} border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}>
                  <CardContent className="p-6">
                    {/* هدر */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}
                        whileHover={{ rotate: 8, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs font-medium">
                          {item.badge}
                        </Badge>
                      )}
                    </div>

                    {/* محتوا */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* دکمه */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full group-hover:bg-primary/10 transition-colors"
                      >
                        مشاهده
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </div>

                    {/* تأثیر نور */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
