
import React from "react";
import { motion } from "framer-motion";

interface ProfessionalLoginBackgroundProps {
  variant: 'normal' | 'locked';
}

export const ProfessionalLoginBackground = ({ variant }: ProfessionalLoginBackgroundProps) => {
  const isLocked = variant === 'locked';

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* پس‌زمینه گرادیانی اصلی */}
      <div className={`absolute inset-0 ${
        isLocked 
          ? 'bg-gradient-to-br from-destructive/10 via-primary/10 to-primary/5 dark:from-destructive/20 dark:via-primary/20 dark:to-primary/10'
          : 'bg-gradient-to-br from-slate-50 via-emerald-50/30 to-sky-50/40 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/40'
      }`} />
      
      {/* عناصر هندسی متحرک */}
      <div className="absolute inset-0">
        {/* دایره‌های بزرگ */}
        <motion.div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full"
          style={{
            background: isLocked 
              ? 'radial-gradient(circle, hsl(var(--destructive) / 0.15) 0%, hsl(var(--destructive) / 0.08) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(var(--primary-emerald-rgb), 0.15) 0%, rgba(var(--primary-emerald-rgb), 0.08) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full"
          style={{
            background: isLocked 
              ? 'radial-gradient(circle, hsl(var(--warning-500) / 0.15) 0%, hsl(var(--warning-500) / 0.08) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb), 0.15) 0%, rgba(var(--secondary-ocean-rgb), 0.08) 40%, transparent 70%)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* اشکال هندسی کوچکتر */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-24 h-24 rounded-2xl"
          style={{
            background: isLocked 
              ? 'linear-gradient(45deg, hsl(var(--destructive) / 0.2), hsl(var(--warning) / 0.2))'
              : 'linear-gradient(45deg, hsl(var(--brand-500) / 0.2), hsl(var(--info-500) / 0.2))'
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full"
          style={{
            background: isLocked 
              ? 'linear-gradient(135deg, hsl(var(--warning) / 0.3), hsl(var(--destructive) / 0.3))'
              : 'linear-gradient(135deg, hsl(var(--info-500) / 0.3), hsl(var(--brand-500) / 0.3))'
          }}
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 12,
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
          backgroundImage: isLocked 
            ? `
              radial-gradient(circle at 1px 1px, hsl(var(--destructive) / 0.15) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, hsl(var(--warning) / 0.1) 1px, transparent 0)
            `
            : `
              radial-gradient(circle at 1px 1px, hsl(var(--brand-500) / 0.15) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, hsl(var(--info-500) / 0.1) 1px, transparent 0)
            `,
          backgroundSize: '40px 40px, 60px 60px'
        }}
      />

      {/* تأثیر نور و عمق */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-black/5 dark:to-black/10" />
    </div>
  );
};
