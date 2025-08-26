import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Coffee, Star } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface DietStats {
  totalMeals: number;
  todayMeals: number;
  activeDays: number;
}

interface StatsCardsProps {
  stats: DietStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statsData = [
    {
      icon: Utensils,
      label: "کل وعده‌ها",
      value: stats.totalMeals,
      bgColor: "bg-gradient-to-br from-brand-500/10 to-brand-600/20",
      iconColor: "text-brand-600"
    },
    {
      icon: Coffee,
      label: "روش فعال",
      value: stats.todayMeals,
      bgColor: "bg-gradient-to-br from-info-500/10 to-info-600/20",
      iconColor: "text-info-600"
    },
    {
      icon: Star,
      label: "روزهای برنامه",
      value: stats.activeDays,
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/20",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {toPersianNumbers(stat.value)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};