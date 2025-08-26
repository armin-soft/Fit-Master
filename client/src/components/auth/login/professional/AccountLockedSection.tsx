
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertTriangle, Ban, Shield, Timer, Clock, Key, RefreshCw, ZapOff, CheckCircle2 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface AccountLockedSectionProps {
  timeLeft: string;
  lockExpiry: Date | null;
  variants: any;
}

export const AccountLockedSection = ({ 
  timeLeft, 
  lockExpiry, 
  variants 
}: AccountLockedSectionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate floating security particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    }));
    setParticles(newParticles);

    // Animate through different security steps
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const securitySteps = [
    { icon: Lock, title: "سیستم امنیتی فعال", color: "emerald" },
    { icon: Shield, title: "محافظت از داده‌ها", color: "sky" },
    { icon: Key, title: "بازیابی دسترسی", color: "amber" },
    { icon: CheckCircle2, title: "وضعیت پایدار", color: "green" }
  ];

  const currentStepData = securitySteps[currentStep];

  return (
    <motion.div
      variants={variants}
      className="relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-slate-50/90 via-emerald-50/70 to-sky-50/90 dark:from-slate-900/90 dark:via-emerald-950/70 dark:to-sky-950/90 border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl responsive-p-md"
      dir="rtl"
    >
      {/* Floating Security Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full"
            initial={{ x: particle.x, y: particle.y, opacity: 0 }}
            animate={{
              x: [particle.x, particle.x + 20, particle.x],
              y: [particle.y, particle.y + 15, particle.y],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Advanced Security Lock Display */}
      <motion.div 
        className="text-center responsive-m-sm relative z-10"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <div className="relative mx-auto mb-6 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-emerald-500/60 border-r-sky-500/40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-2 border-2 border-transparent border-b-emerald-400/40 border-l-sky-400/60 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner glow background */}
          <motion.div
            className="absolute inset-6 bg-gradient-to-br from-emerald-500/20 via-sky-500/20 to-emerald-600/20 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-600/20"
            animate={{
              boxShadow: [
                "0 0 30px rgba(16, 185, 129, 0.2)",
                "0 0 60px rgba(14, 165, 233, 0.3)",
                "0 0 30px rgba(16, 185, 129, 0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Dynamic central icon */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className={`relative z-10 p-4 rounded-2xl bg-gradient-to-br ${
                currentStepData.color === 'emerald' ? 'from-emerald-600 to-emerald-700' :
                currentStepData.color === 'sky' ? 'from-sky-600 to-sky-700' :
                currentStepData.color === 'amber' ? 'from-amber-600 to-amber-700' :
                'from-green-600 to-green-700'
              } shadow-2xl`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            >
              <currentStepData.icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
            </motion.div>
          </AnimatePresence>

          {/* Corner warning indicators */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
            animate={{ 
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.3)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-3 h-3 text-white" />
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ZapOff className="w-3 h-3 text-white" />
          </motion.div>
        </div>

        {/* Dynamic Title and Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          <motion.h1 
            className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-400 dark:via-red-300 dark:to-orange-300 bg-clip-text text-transparent leading-tight"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            حساب کاربری موقتاً مسدود شده
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            سیستم امنیتی فعال است
          </motion.p>

          {/* Current Security Step Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 dark:from-emerald-500/20 dark:to-sky-500/20 border border-emerald-200/30 dark:border-emerald-700/30 rounded-2xl backdrop-blur-sm"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm md:text-base">
                {currentStepData.title}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Decorative separator with pulse effect */}
          <motion.div className="flex items-center gap-2 justify-center">
            <motion.div
              className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
            <motion.div
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="h-px flex-1 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Advanced Security Alert Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-4 relative z-10"
      >
        <div className="relative overflow-hidden rounded-2xl backdrop-blur-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-red-600/10"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative p-6 border border-red-300/30 dark:border-red-700/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.3)",
                      "0 0 0 20px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-red-700 dark:text-red-300">اعلان امنیتی سطح بالا</h3>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </motion.div>
                </div>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm md:text-base">
                  حساب کاربری شما به دلیل تلاش‌های ناموفق متعدد برای ورود به سیستم، موقتاً محدود شده است. 
                  این اقدام برای حفاظت از اطلاعات شخصی و حساب کاربری شما انجام شده است.
                </p>
                
                {/* Security Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-300/30 dark:border-emerald-700/30 rounded-lg"
                  >
                    <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-300 text-xs md:text-sm font-medium">
                      رمزنگاری پیشرفته
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center gap-2 px-3 py-2 bg-sky-500/10 dark:bg-sky-500/20 border border-sky-300/30 dark:border-sky-700/30 rounded-lg"
                  >
                    <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span className="text-sky-700 dark:text-sky-300 text-xs md:text-sm font-medium">
                      محافظت چند لایه
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-300/30 dark:border-amber-700/30 rounded-lg"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-amber-700 dark:text-amber-300 text-xs md:text-sm font-medium">
                      تشخیص تهدید
                    </span>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500/10 dark:bg-green-500/20 border border-green-300/30 dark:border-green-700/30 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 text-xs md:text-sm font-medium">
                      نظارت پیوسته
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-red-400/50"
              animate={{
                borderColor: [
                  "rgba(248, 113, 113, 0.3)",
                  "rgba(239, 68, 68, 0.7)",
                  "rgba(220, 38, 38, 0.5)",
                  "rgba(248, 113, 113, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Advanced Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="space-y-6 relative z-10"
      >
        <div className="text-center space-y-3">
          <motion.div 
            className="flex items-center justify-center gap-3"
            animate={{ 
              y: [0, -2, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
              زمان بازیابی دسترسی
            </h2>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Timer className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </motion.div>
          </motion.div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            دسترسی به حساب کاربری پس از پایان این زمان بازیابی می‌شود
          </p>
        </div>
        
        {/* Large Digital Clock Display */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-600/20 rounded-3xl blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative bg-gradient-to-br from-slate-100/80 to-slate-200/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl p-8 shadow-2xl">
            <motion.div 
              className="text-center"
              animate={{
                textShadow: [
                  "0 0 10px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(147, 51, 234, 0.7)",
                  "0 0 10px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-400 dark:via-purple-400 dark:to-blue-500 bg-clip-text text-transparent leading-tight">
                {toPersianNumbers(timeLeft)}
              </div>
              
              <motion.div 
                className="mt-4 flex justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {['ساعت', 'دقیقه', 'ثانیه'].map((unit, index) => (
                  <motion.div
                    key={unit}
                    className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 px-3 py-1 bg-white/50 dark:bg-slate-800/50 rounded-full border border-slate-200/50 dark:border-slate-600/50"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ 
                      delay: index * 0.2,
                      duration: 2, 
                      repeat: Infinity 
                    }}
                  >
                    {unit}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Progress Ring */}
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-t-blue-400/60 border-r-purple-400/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
        
        {/* Security Status Indicators */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="text-center p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-300/30 dark:border-green-700/30 rounded-2xl backdrop-blur-sm"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity
              }}
              className="mx-auto mb-2 w-8 h-8 flex items-center justify-center"
            >
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </motion.div>
            <div className="text-xs font-medium text-green-700 dark:text-green-300">
              وضعیت امنیت
            </div>
            <div className="text-xs font-bold text-green-800 dark:text-green-200 mt-1">
              فعال
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-center p-4 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-300/30 dark:border-blue-700/30 rounded-2xl backdrop-blur-sm"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: 0.5 
              }}
              className="mx-auto mb-2 w-8 h-8 flex items-center justify-center"
            >
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
              سطح محافظت
            </div>
            <div className="text-xs font-bold text-blue-800 dark:text-blue-200 mt-1">
              بالا
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-center p-4 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-300/30 dark:border-emerald-700/30 rounded-2xl backdrop-blur-sm"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: 1 
              }}
              className="mx-auto mb-2 w-8 h-8 flex items-center justify-center"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              نظارت سیستم
            </div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mt-1">
              آنلاین
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Final Security Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="text-center space-y-4 relative z-10"
      >
        <motion.div 
          className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-200/30 dark:border-slate-700/30 rounded-2xl backdrop-blur-sm"
          animate={{
            borderColor: [
              "rgba(148, 163, 184, 0.3)",
              "rgba(71, 85, 105, 0.5)",
              "rgba(148, 163, 184, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <p className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-200">
            این محدودیت برای حفظ امنیت و حریم خصوصی شما اعمال شده است
          </p>
        </motion.div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-emerald-500/50 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
