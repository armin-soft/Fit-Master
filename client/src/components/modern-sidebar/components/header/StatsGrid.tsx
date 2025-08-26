
import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Award, Star } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { SidebarStats } from "../../types";

interface StatsGridProps {
  stats: SidebarStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <motion.div
      className="grid grid-cols-4 gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-lg p-2 text-center border border-emerald-200/30 dark:border-emerald-700/30">
        <Users className="h-3 w-3 text-emerald-600 dark:text-emerald-400 mx-auto mb-0.5" />
        <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
          {toPersianNumbers(stats.totalStudents.toString())}
        </div>
        <div className="text-2xs text-emerald-600 dark:text-emerald-400">شاگرد</div>
      </div>
      
      <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-lg p-2 text-center border border-sky-200/30 dark:border-sky-700/30">
        <Target className="h-3 w-3 text-sky-600 dark:text-sky-400 mx-auto mb-0.5" />
        <div className="text-sm font-bold text-sky-800 dark:text-sky-200">
          {toPersianNumbers(stats.activePrograms.toString())}
        </div>
        <div className="text-2xs text-sky-600 dark:text-sky-400">برنامه</div>
      </div>
      
      <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-lg p-2 text-center border border-emerald-200/30 dark:border-emerald-700/30">
        <Award className="h-3 w-3 text-emerald-600 dark:text-emerald-400 mx-auto mb-0.5" />
        <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
          {toPersianNumbers(stats.completedSessions.toString())}
        </div>
        <div className="text-2xs text-emerald-600 dark:text-emerald-400">جلسه</div>
      </div>
      
      <div className="bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm rounded-lg p-2 text-center border border-amber-200/30 dark:border-amber-700/30">
        <Star className="h-3 w-3 text-amber-600 dark:text-amber-400 mx-auto mb-0.5" />
        <div className="text-sm font-bold text-amber-800 dark:text-amber-200">
          {toPersianNumbers(stats.rating.toString())}
        </div>
        <div className="text-2xs text-amber-600 dark:text-amber-400">امتیاز</div>
      </div>
    </motion.div>
  );
};
