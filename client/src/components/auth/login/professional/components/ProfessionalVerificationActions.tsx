
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, RefreshCw, Edit3 } from "lucide-react";

interface ProfessionalVerificationActionsProps {
  loading: boolean;
  code: string;
  countdown: number;
  onChangePhone: () => void;
  onResendCode: () => void;
  variants: any;
}

export const ProfessionalVerificationActions = ({
  loading,
  code,
  countdown,
  onChangePhone,
  onResendCode,
  variants
}: ProfessionalVerificationActionsProps) => {
  return (
    <motion.div variants={variants} className="space-y-4">
      <Button 
        type="submit" 
        className="w-full h-16 bg-gradient-to-l from-sky-600 via-emerald-600 to-sky-700 hover:from-sky-700 hover:via-emerald-700 hover:to-sky-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading || code.length !== 6}
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <motion.div
              className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>در حال تأیید و ورود...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span>ورود به سیستم</span>
            <LogIn className="h-5 w-5" />
          </div>
        )}
      </Button>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          type="button" 
          variant="ghost"
          onClick={onChangePhone}
          className="h-12 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-800/40 border border-slate-300/50 dark:border-slate-600/50 rounded-xl backdrop-blur-sm transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            <span className="text-sm font-semibold">تغییر شماره</span>
          </div>
        </Button>
        
        {countdown === 0 ? (
          <Button 
            type="button" 
            variant="ghost"
            onClick={onResendCode}
            className="h-12 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-800/40 border border-slate-300/50 dark:border-slate-600/50 rounded-xl backdrop-blur-sm transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm font-semibold">ارسال مجدد</span>
            </div>
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="ghost"
            disabled
            className="h-12 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200/50 dark:border-slate-700/50 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">ارسال مجدد</span>
            </div>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
