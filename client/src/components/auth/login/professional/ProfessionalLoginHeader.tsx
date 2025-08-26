
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, GraduationCap } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useAppVersionContext } from "@/contexts/AppVersionContext";

interface ProfessionalLoginHeaderProps {
  gymName: string;
  variants: any;
}

export const ProfessionalLoginHeader = ({ gymName, variants }: ProfessionalLoginHeaderProps) => {
  const { version: appVersion, isLoading } = useAppVersionContext();
  const isStudentPanel = gymName === "پنل شاگرد";
  const [projectName, setProjectName] = useState('فیت مستر');

  useEffect(() => {
    const loadProjectName = async () => {
      try {
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        setProjectName(manifest.name || 'فیت مستر');
      } catch (error) {
        console.error('Failed to load project name:', error);
      }
    };
    loadProjectName();
  }, []);

  return (
    <motion.div variants={variants} className="text-center space-y-4 sm:space-y-6">
      {/* لوگو و آیکون */}
      <motion.div 
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
            {isStudentPanel ? (
              <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            ) : (
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            )}
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
          </div>
        </div>
      </motion.div>

      {/* عنوان اصلی */}
      <div className="space-y-1 sm:space-y-2 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight">
          {isStudentPanel ? "ورود به پنل شاگرد" : "ورود به پنل مدیریت"}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium px-2 sm:px-0">
          {isStudentPanel ? "سیستم مدیریت برنامه شخصی" : projectName}
        </p>
      </div>

      {/* نسخه برنامه */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-lg sm:rounded-xl border border-emerald-200/30 dark:border-emerald-700/30"
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold">
          نسخه {toPersianNumbers(appVersion || '1.40.0')}
        </span>
      </motion.div>

      {/* توضیحات امنیتی */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center px-2 sm:px-0"
      >
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
          {isStudentPanel ? 
            "برای ورود به پنل شخصی، شماره موبایل خود را وارد کنید" :
            "برای ورود به پنل مدیریت، شماره موبایل مجاز خود را وارد کنید"
          }
        </p>
      </motion.div>
    </motion.div>
  );
};
