
import React from "react";
import { motion } from "framer-motion";
import { Clock, Smartphone, Monitor } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfessionalVerificationStatusMessageProps {
  phone: string;
  countdown: number;
  isSMSEnabled: boolean;
  code: string;
  loading: boolean;
}

export const ProfessionalVerificationStatusMessage = ({
  phone,
  countdown,
  isSMSEnabled,
  code,
  loading
}: ProfessionalVerificationStatusMessageProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="text-center space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-slate-700 dark:text-slate-200 text-base font-semibold">
          کد تأیید به شماره {toPersianNumbers(phone)} ارسال شد
        </p>
      </motion.div>
      
      {countdown > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            ارسال مجدد کد تا {toPersianNumbers(Math.floor(countdown / 60))}:{toPersianNumbers((countdown % 60).toString().padStart(2, '0'))} دیگر
          </p>
        </motion.div>
      )}

      {/* SMS Auto-read indicator - only show on mobile/tablet */}
      {isSMSEnabled && code.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <Smartphone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            در انتظار دریافت پیامک برای خواندن خودکار کد...
          </p>
        </motion.div>
      )}

      {/* Desktop indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2"
        >
          <Monitor className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            لطفاً کد تأیید را بصورت دستی وارد کنید
          </p>
        </motion.div>
      )}
    </div>
  );
};
