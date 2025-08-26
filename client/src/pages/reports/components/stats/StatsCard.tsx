
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StatsCardProps {
  stat: {
    id: number;
    title: string;
    value: number;
    icon: LucideIcon;
    gradient: string;
    bgGradient: string;
    darkBgGradient: string;
    change: string;
    changeType: string;
    suffix?: string;
    description: string;
  };
  index: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stat, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} dark:bg-gradient-to-br dark:${stat.darkBgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            
            <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${
              stat.changeType === 'positive' 
                ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30' 
                : 'text-destructive bg-destructive/10 dark:text-destructive dark:bg-destructive/20'
            }`}>
              <TrendingUp className="h-3 w-3" />
              {toPersianNumbers(stat.change)}
            </div>
          </div>
          
          {/* Value */}
          <div className="mb-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
              {toPersianNumbers(stat.value.toString())}{stat.suffix || ''}
            </div>
          </div>
          
          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
              {stat.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
              {stat.description}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full -translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-tl from-white/10 to-white/5 rounded-full translate-y-4 -translate-x-4 group-hover:scale-125 transition-transform duration-500" />
      </div>
    </motion.div>
  );
};
