
import React from "react";
import { motion } from "framer-motion";

export const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* گرادیان پس‌زمینه اصلی */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-brand-50/30 to-info-50/40 dark:from-slate-900 dark:via-brand-950/30 dark:to-info-950/40" />
      
      {/* عناصر هندسی متحرک */}
      <div className="absolute inset-0">
        {/* دایره‌های بزرگ */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb), 0.1) 0%, rgba(var(--primary-emerald-rgb), 0.05) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb), 0.1) 0%, rgba(var(--secondary-ocean-rgb), 0.05) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* خطوط هندسی */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-px bg-gradient-to-l from-brand-500/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-48 h-px bg-gradient-to-r from-sky-400/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0],
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
        className="absolute inset-0 opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(var(--primary-emerald-rgb, 16 185 129), 0.15) 1px, transparent 0),
            radial-gradient(circle at 20px 20px, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.1) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px, 80px 80px'
        }}
      />

      {/* تأثیر نور */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-black/5 dark:to-black/10" />
    </div>
  );
};
