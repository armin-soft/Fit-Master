
import React from "react";
import { motion } from "framer-motion";

export const SidebarBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-brand-400/5 to-info-500/5 dark:from-slate-950/95 dark:via-brand-500/10 dark:to-info-500/10" />
      
      {/* Animated geometric shapes */}
      <motion.div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(var(--primary-emerald-rgb), 0.4) 0%, rgba(var(--secondary-ocean-rgb), 0.2) 50%, transparent 100%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(var(--secondary-ocean-rgb), 0.3) 0%, rgba(var(--primary-emerald-rgb), 0.1) 50%, transparent 100%)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Flowing lines */}
      <motion.div
        className="absolute top-1/3 right-0 w-full h-px bg-gradient-to-l from-brand-500/30 via-info-500/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-info-500/30 via-brand-500/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Dotted pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(var(--primary-emerald-rgb), 0.3) 1px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(var(--secondary-ocean-rgb), 0.2) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px, 60px 60px'
        }}
      />
    </div>
  );
};
