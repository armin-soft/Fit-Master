
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, ArrowLeft, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { ProfessionalErrorMessage } from "./ProfessionalErrorMessage";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { sanitizePhoneNumber } from "../utils/validation";

interface PhoneInputSectionProps {
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  variants: any;
  allowedPhone: string;
  rememberMe?: boolean;
  setRememberMe?: (rememberMe: boolean) => void;
  userType?: "trainer" | "student";
}

export const PhoneInputSection = ({
  phone,
  setPhone,
  loading,
  error,
  onSubmit,
  variants,
  allowedPhone,
  rememberMe: propRememberMe,
  setRememberMe: propSetRememberMe,
  userType = "trainer"
}: PhoneInputSectionProps) => {
  const [localRememberMe, setLocalRememberMe] = React.useState(false);
  
  // Use props if available, otherwise use local state
  const rememberMe = propRememberMe !== undefined ? propRememberMe : localRememberMe;
  const setRememberMe = propSetRememberMe || setLocalRememberMe;
  
  React.useEffect(() => {
    if (propRememberMe === undefined) {
      const loadRememberMe = async () => {
        const { getStorageItem } = await import('@/utils/databaseStorage');
        const enabled = await getStorageItem("rememberMeEnabled", "false");
        setLocalRememberMe(enabled === "true");
      };
      loadRememberMe();
    }
  }, [propRememberMe]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // پاکسازی و تبدیل شماره
    const sanitizedPhone = sanitizePhoneNumber(value);
    
    // محدود کردن به 11 رقم
    if (sanitizedPhone.length <= 11) {
      console.log('PhoneInputSection: Setting phone to:', sanitizedPhone);
      setPhone(sanitizedPhone);
    }
  };

  const handleRememberMeChange = async (checked: boolean) => {
    setRememberMe(checked);
    // Store the remember me preference
    try {
      const { setStorageItem } = await import('@/utils/databaseStorage');
      await setStorageItem("rememberMeEnabled", checked.toString());
      console.log('Remember me preference saved:', checked);
    } catch (error) {
      console.error('Error saving remember me preference:', error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store the remember me preference globally (for backward compatibility)
    try {
      const { setStorageItem } = await import('@/utils/databaseStorage');
      await setStorageItem("pendingRememberMe", rememberMe.toString());
      await setStorageItem("pendingStudentRememberMe", rememberMe.toString());
    } catch (error) {
      console.error('Error saving pending remember me preference:', error);
    }
    
    onSubmit(e);
  };

  const isValidPhone = phone === allowedPhone;

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="space-y-6"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <ProfessionalErrorMessage error={error} />
      
      <motion.div variants={variants} className="space-y-4">
        <Label htmlFor="phone" className="text-slate-700 dark:text-slate-200 font-bold flex items-center gap-3 text-base">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-500/20">
            <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          شماره موبایل
        </Label>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
          
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={toPersianNumbers(phone)}
              onChange={handlePhoneChange}
              placeholder=""
              className="h-16 bg-white/40 dark:bg-slate-800/40 border-2 border-emerald-200/50 dark:border-emerald-700/50 text-slate-800 dark:text-white text-lg font-bold placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-emerald-500 focus:ring-emerald-500/30 rounded-2xl pl-6 pr-6 backdrop-blur-sm transition-all duration-300 text-center"
              dir="rtl"
              required
            />
            
            {/* نشانگر وضعیت */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isValidPhone 
                    ? 'bg-green-500' 
                    : phone.length > 0
                    ? 'bg-yellow-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
                animate={{ 
                  scale: isValidPhone ? [1, 1.2, 1] : 1,
                  opacity: phone ? [0.6, 1, 0.6] : 0.6
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
        
        {/* نشانگر اعتبار شماره */}
        {isValidPhone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {userType === "trainer" ? "شماره موبایل مربی مجاز تأیید شد" : "شماره موبایل شاگرد مجاز تأیید شد"}
            </span>
          </motion.div>
        )}
        
        {/* راهنمای شماره مجاز */}
        {phone.length > 0 && !isValidPhone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              {userType === "trainer" ? "فقط شماره موبایل مربی مجاز امکان ورود دارد" : "فقط شماره موبایل شاگرد مجاز امکان ورود دارد"}
            </span>
          </motion.div>
        )}

        {/* Remember Me Checkbox */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 justify-center"
          dir="rtl"
        >
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={handleRememberMeChange}
            className="border-emerald-500 data-[state=checked]:bg-emerald-500"
          />
          <Label 
            htmlFor="rememberMe" 
            className="text-slate-600 dark:text-slate-300 font-medium cursor-pointer select-none"
          >
            مرا به مدت ۳۰ روز به خاطر بسپار
          </Label>
        </motion.div>
      </motion.div>
      
      <motion.div variants={variants}>
        <Button 
          type="submit" 
          className="w-full h-16 bg-gradient-to-l from-emerald-600 via-sky-600 to-emerald-700 hover:from-emerald-700 hover:via-sky-700 hover:to-emerald-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !isValidPhone}
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
        
        {/* یادداشت امنیتی */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <p className="text-center text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            کد تأیید با رمزگذاری ۲۵۶ بیتی ارسال می‌شود
          </p>
        </motion.div>
      </motion.div>
    </motion.form>
  );
};
