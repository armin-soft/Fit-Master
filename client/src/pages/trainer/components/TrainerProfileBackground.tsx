
import React from "react";
import { motion } from "framer-motion";

export const TrainerProfileBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* گرادیان پس‌زمینه اصلی */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40" />
      
      {/* عناصر هندسی متحرک */}
      <div className="absolute inset-0">
        {/* دایره‌های بزرگ */}
        <motion.div
          className="absolute -top-60 -right-60 w-[30rem] h-[30rem] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb, 16 185 129), 0.08) 0%, rgba(var(--primary-emerald-rgb, 16 185 129), 0.03) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-60 -left-60 w-[25rem] h-[25rem] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.08) 0%, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.03) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* دایره‌های کوچک */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb, 16 185 129), 0.12) 0%, transparent 70%)'
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.12) 0%, transparent 70%)'
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* الگوی نقطه‌ای پیشرفته */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(var(--primary-emerald-rgb, 16 185 129), 0.1) 1px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.08) 1px, transparent 0)
          `,
          backgroundSize: '60px 60px, 120px 120px'
        }}
      />

      {/* تأثیر نور */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-white/8 dark:from-transparent dark:via-black/3 dark:to-black/8" />
    </div>
  );
};
