
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Apple, Pill, Target, TrendingUp, Zap } from "lucide-react";
import { useStudentData } from "../hooks/useStudentData";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Skeleton } from "@/components/ui/skeleton";

export const StudentStatsOverview: React.FC = () => {
  const { studentData, loading } = useStudentData();

  const statsCards = [
    {
      icon: Dumbbell,
      title: "تمرین‌های هفته",
      value: studentData.totalWorkouts.toString(),
      subtitle: "تمرین برنامه‌ریزی شده",
      color: "from-brand-500 to-brand-600",
      bgColor: "from-brand-50 to-brand-100/50 dark:from-brand-950/30 dark:to-brand-900/20",
      borderColor: "border-brand-200/50 dark:border-brand-800/50"
    },
    {
      icon: Apple,
      title: "وعده‌های غذایی",
      value: studentData.totalMeals.toString(),
      subtitle: "برنامه تغذیه روزانه",
      color: "from-info-500 to-info-600",
      bgColor: "from-info-50 to-info-100/50 dark:from-info-950/30 dark:to-info-900/20",
      borderColor: "border-info-200/50 dark:border-info-800/50"
    },
    {
      icon: Pill,
      title: "مکمل‌های روزانه",
      value: studentData.totalSupplements.toString(),
      subtitle: "مکمل تجویز شده",
      color: "from-brand-600 to-info-600",
      bgColor: "from-brand-50 to-info-100/50 dark:from-brand-950/30 dark:to-info-900/20",
      borderColor: "border-brand-200/50 dark:border-info-800/50"
    },
    {
      icon: Target,
      title: "هدف وزن",
      value: `${studentData.weightProgress}%`,
      subtitle: "پیشرفت به سمت هدف",
      color: "from-info-600 to-brand-600",
      bgColor: "from-info-50 to-brand-100/50 dark:from-info-950/30 dark:to-brand-900/20",
      borderColor: "border-info-200/50 dark:border-brand-800/50"
    },
    {
      icon: Zap,
      title: "کالری روزانه",
      value: studentData.calories.toString(),
      subtitle: "برآورد مصرف انرژی",
      color: "from-brand-500 to-info-500",
      bgColor: "from-brand-50 to-info-100/50 dark:from-brand-950/30 dark:to-info-900/20",
      borderColor: "border-brand-200/50 dark:border-info-800/50"
    },
    {
      icon: TrendingUp,
      title: "روزهای فعال",
      value: studentData.completedDays.toString(),
      subtitle: "از هفت روز هفته",
      color: "from-info-500 to-brand-500",
      bgColor: "from-info-50 to-brand-100/50 dark:from-info-950/30 dark:to-brand-900/20",
      borderColor: "border-info-200/50 dark:border-brand-800/50"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-12 w-12 rounded-xl mb-4" />
            <Skeleton className="h-6 w-16 mb-2" />
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-3 w-16" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
      {statsCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <Card className={`relative overflow-hidden bg-gradient-to-br ${card.bgColor} border ${card.borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardContent className="p-4 sm:p-6">
                {/* آیکون */}
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* محتوا */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {toPersianNumbers(card.value)}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {card.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {card.subtitle}
                  </p>
                </div>

                {/* تأثیر نور */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-12 translate-x-12" />
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
