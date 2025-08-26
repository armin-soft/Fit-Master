
import React from "react";
import { motion } from "framer-motion";

interface StudentLoginHeaderProps {
  step: "phone" | "code";
  phone?: string;
  variants: any;
}

export const StudentLoginHeader = ({ step, phone, variants }: StudentLoginHeaderProps) => {
  return (
    <motion.div variants={variants} className="text-center space-y-6">
      <motion.div
        variants={variants}
        className="space-y-3"
      >
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
          <motion.div
            className="text-white text-2xl font-bold"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🏋️‍♂️
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-emerald-700 to-sky-700 dark:from-white dark:via-emerald-300 dark:to-sky-300 bg-clip-text text-transparent">
          پنل شاگرد
        </h1>
        
        {step === "phone" ? (
          <p className="text-slate-600 dark:text-slate-300 text-lg font-medium leading-relaxed">
            شماره موبایل خود را وارد کنید
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
              کد تأیید را وارد کنید
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              کد به شماره {phone} ارسال شد
            </p>
          </div>
        )}
      </motion.div>
      
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
        variants={variants}
      />
    </motion.div>
  );
};
