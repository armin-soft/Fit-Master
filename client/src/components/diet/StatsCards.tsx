
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Calendar, Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { DietStats } from "./types";

interface StatsCardsProps {
  stats: DietStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4"
    >
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm text-emerald-800 dark:text-emerald-200">کل وعده‌ها</span>
          </div>
          <p className="text-xl font-black text-emerald-600">{toPersianNumbers(stats.totalMeals)}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm text-blue-800 dark:text-blue-200">روزهای فعال</span>
          </div>
          <p className="text-xl font-black text-blue-600">{toPersianNumbers(stats.activeDays)}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm text-purple-800 dark:text-purple-200">امروز</span>
          </div>
          <p className="text-xl font-black text-purple-600">{toPersianNumbers(stats.todayMeals)}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
