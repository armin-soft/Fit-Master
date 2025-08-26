
import React from "react";
import { motion } from "framer-motion";

export const LoadingBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      {/* گرادیان اصلی با رنگ‌های انتخاب نوع کاربر - فول اسکرین */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'var(--bg-gradient-primary)' }}
      />
      
      {/* المان‌های انیمیشنی */}
      <div className="absolute inset-0 w-full h-full">
        {/* دایره‌های شناور */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb, 16 185 129), 0.2) 0%, transparent 70%)' }}
        />
        
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.15) 0%, transparent 70%)' }}
        />
        
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb, 16 185 129), 0.1) 0%, transparent 70%)' }}
        />
      </div>
      
      {/* الگوی نقطه‌ای */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* خطوط شعاعی */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scaleY: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-px bg-white/10 origin-bottom"
            style={{
              height: '50%',
              left: '50%',
              bottom: '50%',
              transform: `rotate(${i * 30}deg) translateX(-50%)`
            }}
          />
        ))}
      </div>
    </div>
  );
};
