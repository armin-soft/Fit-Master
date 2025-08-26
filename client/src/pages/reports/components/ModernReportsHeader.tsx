
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import { usePersianDate } from "@/hooks/usePersianDate";

export const ModernReportsHeader = () => {
  const persianDate = usePersianDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-10"
    >
      <div className="relative overflow-hidden">
        {/* Main Header Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 shadow-2xl">
          {/* Header Content */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Title Section */}
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <div className="p-4 bg-gradient-to-br from-brand-500 to-info-500 rounded-2xl shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-warning-400 to-warning-500 rounded-full animate-pulse" />
              </motion.div>
              
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl font-bold bg-gradient-to-r from-brand-600 via-info-600 to-brand-700 bg-clip-text text-transparent"
                >
                  گزارشات تحلیلی پیشرفته
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <Calendar className="h-5 w-5 text-brand-500" />
                  <span className="text-lg font-medium">{persianDate}</span>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-muted-foreground max-w-md"
                >
                  آنالیز جامع عملکرد، آمار دقیق و گزارشات تخصصی سیستم مدیریت باشگاه
                </motion.p>
              </div>
            </div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500/10 to-info-500/10 dark:from-brand-500/20 dark:to-info-500/20 rounded-full">
                <TrendingUp className="h-5 w-5 text-brand-600" />
                <span className="text-sm font-semibold text-brand-700 dark:text-brand-400">
                  عملکرد عالی
                </span>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-brand-400/10 to-info-500/10 rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-info-400/10 to-brand-500/10 rounded-full translate-x-12 translate-y-12" />
        </div>
      </div>
    </motion.div>
  );
};
