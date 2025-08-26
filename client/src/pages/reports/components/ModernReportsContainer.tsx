
import React from "react";
import { motion } from "framer-motion";

interface ModernReportsContainerProps {
  children: React.ReactNode;
}

export const ModernReportsContainer: React.FC<ModernReportsContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40 dark:from-emerald-950 dark:via-sky-950/30 dark:to-emerald-950/40" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb), 0.3) 0%, rgba(var(--secondary-ocean-rgb), 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb), 0.3) 0%, rgba(var(--primary-emerald-rgb), 0.2) 50%, transparent 100%)'
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Geometric Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(var(--primary-emerald-rgb), 0.2) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, rgba(var(--secondary-ocean-rgb), 0.15) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px, 80px 80px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
    </div>
  );
};
