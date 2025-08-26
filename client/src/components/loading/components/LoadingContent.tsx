
import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, Zap, Shield } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface LoadingContentProps {
  gymName: string;
  systemInfo: {
    version: string;
    totalComponents: number;
    loadedComponents: number;
  };
}

export const LoadingContent = ({ gymName, systemInfo }: LoadingContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-xs xs:max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
      {/* آیکون اصلی */}
      <motion.div
        initial={{ scale: 0, rotate: -360 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        className="relative mb-4 xs:mb-6 sm:mb-8 lg:mb-12"
      >
        <div className="relative">
          {/* دایره اصلی */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center"
          >
            <Crown className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" fill="currentColor" />
          </motion.div>
          
          {/* آیکون‌های چرخشی */}
          {[Sparkles, Zap, Shield].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 15 + index * 5, 
                repeat: Infinity, 
                ease: "linear"
              }}
              className="absolute inset-0"
            >
              <div 
                className="absolute w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                style={{
                  top: `${20 + index * 30}%`,
                  right: `${-10 - index * 5}%`,
                  transform: 'translate(50%, -50%)'
                }}
              >
                <Icon className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-3 xs:mb-4 sm:mb-6 lg:mb-8"
      >
        <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4">
          <span className="block mb-1 xs:mb-2">جیم سینک</span>
          <span className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-medium opacity-90">
            سیستم مدیریت هوشمند ورزشی
          </span>
        </h1>
        
        {gymName && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="inline-flex items-center gap-1 xs:gap-2 bg-white/15 backdrop-blur-lg rounded-full px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border border-white/20"
          >
            <Crown className="w-3 h-3 xs:w-4 xs:h-4 text-brand-300" />
            <span className="text-white font-medium text-xs xs:text-sm sm:text-base">{gymName}</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* اطلاعات سیستم */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="grid grid-cols-1 xs:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 w-full max-w-xs xs:max-w-md sm:max-w-2xl mb-4 xs:mb-6 sm:mb-8"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.version)}
          </div>
          <div className="text-2xs xs:text-xs sm:text-sm text-white/70">نسخه سیستم</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.totalComponents.toString())}
          </div>
          <div className="text-2xs xs:text-xs sm:text-sm text-white/70">کامپوننت سیستم</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 border border-white/20 text-center">
          <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-white mb-1">
            {toPersianNumbers(systemInfo.loadedComponents.toString())}
          </div>
          <div className="text-2xs xs:text-xs sm:text-sm text-white/70">بارگذاری شده</div>
        </div>
      </motion.div>
      
      {/* پیام انگیزشی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs xs:text-sm sm:text-base text-white/80 leading-relaxed max-w-xs xs:max-w-sm sm:max-w-lg">
          سیستم مدیریت پیشرفته برای مربیان حرفه‌ای و ورزشکاران جدی
        </p>
        <p className="text-2xs xs:text-xs sm:text-sm text-white/60 mt-1 xs:mt-2">
          همراه شما در مسیر موفقیت ورزشی
        </p>
      </motion.div>
    </div>
  );
};
