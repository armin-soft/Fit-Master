
import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Star, Zap, Award, GraduationCap } from "lucide-react";

export const StudentProfileHeader = () => {
  return (
    <motion.div 
      className="text-center space-y-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Student Badge */}
      <motion.div
        className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-sky-600 text-white rounded-full px-8 py-4 shadow-2xl border border-white/20"
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
          <GraduationCap className="h-6 w-6 text-white" />
        </motion.div>
        <span className="font-bold text-lg">پنل شاگرد</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-300 fill-yellow-300" />
          ))}
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-600 via-sky-600 to-emerald-700 bg-clip-text text-transparent leading-tight">
          پروفایل شاگرد
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
          مشاهده اطلاعات شخصی با بالاترین استانداردهای امنیتی و کیفیت
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {[
          { icon: Shield, text: "امنیت بالا", color: "from-emerald-500 to-emerald-600" },
          { icon: Zap, text: "سرعت فوق‌العاده", color: "from-sky-500 to-sky-600" },
          { icon: Award, text: "کیفیت برتر", color: "from-emerald-500 to-sky-600" },
          { icon: User, text: "کاربرپسند", color: "from-sky-500 to-emerald-600" }
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

      {/* Decorative Line */}
      <motion.div
        className="flex items-center justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent flex-1 max-w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full shadow-lg" />
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent flex-1 max-w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};
