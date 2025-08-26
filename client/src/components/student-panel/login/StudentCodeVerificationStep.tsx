
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw, MessageSquare, Smartphone, Monitor } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useSMSCodeReader } from "@/hooks/useSMSCodeReader";
import { useIsMobile } from "@/hooks/use-mobile";

interface StudentCodeVerificationStepProps {
  variants: any;
  code: string;
  setCode: (code: string) => void;
  loading: boolean;
  error: string;
  countdown: number;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
}

export const StudentCodeVerificationStep = ({
  variants,
  code,
  setCode,
  loading,
  error,
  countdown,
  onSubmit,
  onChangePhone,
  onResendCode
}: StudentCodeVerificationStepProps) => {
  
  const isMobile = useIsMobile();
  
  // Auto-read SMS codes only on mobile/tablet
  const { cleanup, isSMSEnabled } = useSMSCodeReader({
    onCodeReceived: (receivedCode) => {
      console.log('Auto-filling verification code on mobile/tablet:', receivedCode);
      setCode(receivedCode);
    },
    enabled: code.length === 0 && !loading
  });

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === 6 && !loading) {
      const timer = setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        onSubmit(fakeEvent);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code, loading, onSubmit]);

  // Cleanup SMS listener when component unmounts
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <form onSubmit={onSubmit} className="space-y-6" dir="rtl">
      <motion.div variants={variants} className="space-y-2">
        <Label htmlFor="code" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
          {isMobile ? (
            <Smartphone className="h-4 w-4 text-emerald-600" />
          ) : (
            <Monitor className="h-4 w-4 text-emerald-600" />
          )}
          {isSMSEnabled ? 
            "کد تأیید (خودکار از پیامک خوانده می‌شود)" : 
            "کد تأیید را وارد کنید"
          }
        </Label>
        
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
            
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              dir="ltr"
            >
              <InputOTPGroup className="gap-3">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot 
                    key={index}
                    index={index}
                    className="w-12 h-12 text-lg font-bold bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl backdrop-blur-sm text-center"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          variants={variants}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
        >
          <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
        </motion.div>
      )}

      <motion.div variants={variants} className="space-y-3">
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              در حال ورود...
            </div>
          ) : (
            "تأیید و ورود"
          )}
        </Button>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onChangePhone}
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            تغییر شماره
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onResendCode}
            disabled={countdown > 0 || loading}
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 disabled:opacity-50"
          >
            {countdown > 0 ? (
              `ارسال مجدد ${toPersianNumbers(countdown)}s`
            ) : (
              <>
                <RefreshCw className="h-4 w-4 ml-1" />
                ارسال مجدد کد
              </>
            )}
          </Button>
        </div>
      </motion.div>

      {/* SMS Auto-read indicator - only show on mobile/tablet */}
      {isSMSEnabled && code.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            <MessageSquare className="h-3 w-3" />
            در انتظار دریافت پیامک برای خواندن خودکار کد...
          </p>
        </motion.div>
      )}

      {/* Desktop indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            <Monitor className="h-3 w-3" />
            لطفاً کد تأیید را بصورت دستی وارد کنید
          </p>
        </motion.div>
      )}
    </form>
  );
};
