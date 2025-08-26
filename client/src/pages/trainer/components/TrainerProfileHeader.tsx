
import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Star, Crown, Zap, Award } from "lucide-react";
import { useAppName } from "@/contexts/AppNameContext";

export const TrainerProfileHeader = () => {
  const { appName } = useAppName();
  
  return (
    <motion.div 
      className="text-center space-y-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* نشان حرفه‌ای */}
      <motion.div
        className="inline-flex items-center gap-4 bg-gradient-to-r from-brand-500 to-info-600 text-white rounded-full px-8 py-4 shadow-2xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Crown className="h-6 w-6 text-warning-300" fill="currentColor" />
        </motion.div>
        <span className="font-bold text-lg">مربی حرفه‌ای معتمد</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-warning-300 fill-warning-300" />
          ))}
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-brand-600 via-info-600 to-brand-700 bg-clip-text text-transparent leading-tight">
          پروفایل مربی
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
          مدیریت کامل اطلاعات شخصی و حرفه‌ای {appName} با بالاترین استانداردهای امنیتی
        </p>
      </motion.div>

      {/* ویژگی‌ها */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { icon: Shield, text: "امنیت پیشرفته", color: "from-brand-500 to-brand-600" },
          { icon: Zap, text: "سرعت بالا", color: "from-info-500 to-info-600" },
          { icon: Award, text: "کیفیت برتر", color: "from-brand-500 to-info-600" },
          { icon: User, text: "کاربرپسند", color: "from-info-500 to-brand-600" }
        ].map((feature, index) => (
          <motion.div
            key={feature.text}
            className={`flex items-center gap-3 bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full text-base font-semibold shadow-xl`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <feature.icon className="h-5 w-5" />
            <span>{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* خط تزئینی */}
      <motion.div
        className="flex items-center justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent flex-1 max-w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <div className="w-4 h-4 bg-gradient-to-r from-brand-400 to-info-500 rounded-full shadow-lg" />
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-info-400 to-transparent flex-1 max-w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};
