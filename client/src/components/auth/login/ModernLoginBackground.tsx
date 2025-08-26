
import { motion } from "framer-motion";
import { Dumbbell, Star, Trophy, Target, Users, Activity } from "lucide-react";

const floatingElements = [
  { icon: Dumbbell, delay: 0, x: "15%", y: "20%", size: "w-12 h-12" },
  { icon: Star, delay: 0.5, x: "85%", y: "15%", size: "w-10 h-10" },
  { icon: Trophy, delay: 1, x: "10%", y: "75%", size: "w-14 h-14" },
  { icon: Target, delay: 1.5, x: "80%", y: "80%", size: "w-10 h-10" },
  { icon: Users, delay: 2, x: "25%", y: "60%", size: "w-8 h-8" },
  { icon: Activity, delay: 2.5, x: "75%", y: "45%", size: "w-12 h-12" },
];

export const ModernLoginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-sky-900 to-slate-900"></div>
      
      {/* Animated Gradient Mesh */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(var(--primary-emerald-rgb, 16 185 129), 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(var(--primary-emerald-dark-rgb, 5 150 105), 0.3) 0%, transparent 50%),
            radial-gradient(circle at 90% 60%, rgba(var(--secondary-ocean-dark-rgb, 8 145 178), 0.2) 0%, transparent 50%)
          `
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(var(--primary-emerald-rgb, 16 185 129), 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.2) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(var(--primary-emerald-dark-rgb, 5 150 105), 0.3) 0%, transparent 50%),
             radial-gradient(circle at 90% 60%, rgba(var(--secondary-ocean-dark-rgb, 8 145 178), 0.2) 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 40%, rgba(var(--primary-emerald-dark-rgb, 5 150 105), 0.3) 0%, transparent 50%),
             radial-gradient(circle at 70% 30%, rgba(var(--primary-emerald-rgb, 16 185 129), 0.2) 0%, transparent 50%),
             radial-gradient(circle at 50% 70%, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 50%, rgba(var(--secondary-ocean-dark-rgb, 8 145 178), 0.2) 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 30%, rgba(var(--primary-emerald-rgb, 16 185 129), 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(var(--secondary-ocean-rgb, 14 165 233), 0.2) 0%, transparent 50%),
             radial-gradient(circle at 40% 80%, rgba(var(--primary-emerald-dark-rgb, 5 150 105), 0.3) 0%, transparent 50%),
             radial-gradient(circle at 90% 60%, rgba(var(--secondary-ocean-dark-rgb, 8 145 178), 0.2) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating Icons */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 0.4, 0.6, 0.4, 0],
            scale: [0, 1, 1.1, 1, 0],
            rotate: [0, 180, 360],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <div className={`${element.size} bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 shadow-lg`}>
            <element.icon className="text-white/60" size={element.size === "w-8 h-8" ? 16 : element.size === "w-10 h-10" ? 20 : 24} />
          </div>
        </motion.div>
      ))}
      
      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};
