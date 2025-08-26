
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, ArrowLeft, Shield } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PhoneInputStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  containerVariants: any;
  itemVariants: any;
  allowedPhones: string[];
}

export const PhoneInputStep = ({
  phone,
  setPhone,
  loading,
  onSubmit,
  containerVariants,
  itemVariants,
  allowedPhones
}: PhoneInputStepProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // فقط اعداد انگلیسی مجاز
    const numbersOnly = value.replace(/[^0-9]/g, '');
    
    // محدود کردن به 11 رقم
    if (numbersOnly.length <= 11) {
      setPhone(numbersOnly);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-4">
        <Label htmlFor="phone" className="text-slate-700 dark:text-slate-200 font-bold flex items-center gap-3 text-base">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-violet-500/20">
            <Phone className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          شماره موبایل
        </Label>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
          
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              value={toPersianNumbers(phone)}
              onChange={handlePhoneChange}
              placeholder={toPersianNumbers("09123823886")}
              className="h-16 bg-white/40 dark:bg-slate-800/40 border-2 border-violet-200/50 dark:border-violet-700/50 text-slate-800 dark:text-white text-lg font-bold placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-violet-500 focus:ring-violet-500/30 rounded-2xl pl-6 pr-6 backdrop-blur-sm transition-all duration-300 text-center"
              dir="ltr"
              required
            />
            
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  phone && phone.length === 11 
                    ? 'bg-green-500' 
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
                animate={{ 
                  scale: phone && phone.length === 11 ? [1, 1.2, 1] : 1,
                  opacity: phone ? [0.6, 1, 0.6] : 0.6
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>

        {/* Allowed phones hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            فقط شماره‌های مجاز قابل ورود هستند
          </p>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          type="submit" 
          className="w-full h-16 bg-gradient-to-l from-violet-600 via-purple-600 to-violet-700 hover:from-violet-700 hover:via-purple-700 hover:to-violet-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !phone || phone.length < 11}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <motion.div
                className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>در حال ارسال کد تأیید...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span>دریافت کد تأیید</span>
              <ArrowLeft className="h-5 w-5" />
            </div>
          )}
        </Button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <Shield className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <p className="text-center text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            کد تأیید با رمزگذاری ۲۵۶ بیتی ارسال می‌شود
          </p>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};
