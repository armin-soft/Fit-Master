
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfessionalLoginBackground } from "@/components/auth/login/professional/ProfessionalLoginBackground";
import { ProfessionalLoginHeader } from "@/components/auth/login/professional/ProfessionalLoginHeader";
import { PhoneInputSection } from "@/components/auth/login/professional/PhoneInputSection";
import { CodeVerificationSection } from "@/components/auth/login/professional/CodeVerificationSection";
import { AccountLockedSection } from "@/components/auth/login/professional/AccountLockedSection";
import { useStudentLogin } from "./hooks/useStudentLogin";
import { ANIMATION_VARIANTS } from "@/components/auth/login/constants";

interface StudentLoginFormProps {
  onLoginSuccess: (phone: string, rememberMe?: boolean) => void;
}

export const StudentLoginForm = ({ onLoginSuccess }: StudentLoginFormProps) => {
  const {
    step,
    phone,
    setPhone,
    code,
    setCode,
    loading,
    error,
    locked,
    lockExpiry,
    timeLeft,
    countdown,
    rememberMe,
    setRememberMe,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode,
    students
  } = useStudentLogin({ onLoginSuccess });

  // Get the first student's phone as allowed phone (or empty string if no students)
  const allowedPhone = students && students.length > 0 ? students[0].phone || "" : "";

  if (locked) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-sky-950/30">
        <ProfessionalLoginBackground variant="locked" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.container}
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md"
          >
            <motion.div
              variants={ANIMATION_VARIANTS.item}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AccountLockedSection 
                timeLeft={timeLeft}
                lockExpiry={lockExpiry}
                variants={ANIMATION_VARIANTS.item}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-sky-950/30">
      <ProfessionalLoginBackground variant="normal" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.container}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg"
        >
          <motion.div 
            variants={ANIMATION_VARIANTS.item}
            className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <ProfessionalLoginHeader 
              gymName="پنل شاگرد" 
              variants={ANIMATION_VARIANTS.item} 
            />
            
            <motion.div 
              className="mt-6 sm:mt-8" 
              dir="rtl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {step === "phone" ? (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <PhoneInputSection
                      phone={phone}
                      setPhone={setPhone}
                      loading={loading}
                      error={error}
                      onSubmit={handlePhoneSubmit}
                      variants={ANIMATION_VARIANTS.item}
                      allowedPhone={allowedPhone}
                      rememberMe={rememberMe}
                      setRememberMe={setRememberMe}
                      userType="student"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <CodeVerificationSection
                      code={code}
                      setCode={setCode}
                      phone={phone}
                      countdown={countdown}
                      loading={loading}
                      error={error}
                      onSubmit={handleCodeSubmit}
                      onChangePhone={handleChangePhone}
                      onResendCode={handleResendCode}
                      variants={ANIMATION_VARIANTS.item}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
