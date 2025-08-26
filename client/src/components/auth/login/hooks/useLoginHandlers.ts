
import { useState } from "react";
import { validatePhone, validatePhoneAccess, isValidCode, sanitizePhoneNumber } from "../utils/validation";
import { setLockInfo, setLoginSuccess } from "../utils/storage";
import { LOGIN_CONSTANTS } from "../constants";
import { successToast } from "@/hooks/use-toast";
import { TrainerProfile } from "@/types/trainer";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { getStorageItem } from "@/utils/databaseStorage";

interface UseLoginHandlersProps {
  state: any;
  setState: any;
  step: string;
  setStep: any;
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const useLoginHandlers = ({
  state,
  setState,
  step,
  setStep,
  onLoginSuccess
}: UseLoginHandlersProps) => {
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('useLoginHandlers: Phone submit started with phone:', state.phone);
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));

    // پاکسازی شماره تلفن
    const cleanPhone = sanitizePhoneNumber(state.phone);
    console.log('useLoginHandlers: Clean phone:', cleanPhone);

    // بررسی فرمت صحیح شماره موبایل
    const phoneError = validatePhone(cleanPhone);
    if (phoneError) {
      console.log('useLoginHandlers: Phone validation error:', phoneError);
      setState((prev: any) => ({ ...prev, error: phoneError, loading: false }));
      return;
    }

    // بررسی مجاز بودن شماره موبایل مربی - فقط برای پنل مدیریت
    // این بررسی قبل از رفتن به مرحله کد تایید انجام می‌شود
    const accessError = validatePhoneAccess(cleanPhone, state.allowedPhone);
    if (accessError) {
      console.log('useLoginHandlers: Phone access error:', accessError);
      setState((prev: any) => ({ 
        ...prev, 
        error: "شماره موبایل وارد شده برای مربی این باشگاه مجاز نیست. لطفاً شماره صحیح مربی را وارد کنید.", 
        loading: false 
      }));
      return;
    }

    console.log('useLoginHandlers: Phone validation passed, moving to code step');
    
    // فقط بعد از تایید شماره موبایل مجاز، به مرحله کد تایید برویم
    console.log('useLoginHandlers: Authorized trainer phone verified, proceeding to verification code step');
    
    setStep("code");
    
    setState((prev: any) => ({ 
      ...prev, 
      countdown: LOGIN_CONSTANTS.RESEND_COUNTDOWN,
      loading: false,
      phone: cleanPhone // ذخیره شماره پاکسازی شده
    }));
    console.log(`کد تأیید برای شماره مربی مجاز ${cleanPhone} ارسال شد`);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));

    if (state.locked) {
      setState((prev: any) => ({ 
        ...prev, 
        error: "حساب کاربری شما قفل شده است. لطفاً صبر کنید.",
        loading: false 
      }));
      return;
    }

    if (!isValidCode(state.code)) {
      const newAttempts = state.attempts + 1;
      
      if (newAttempts >= LOGIN_CONSTANTS.MAX_ATTEMPTS) {
        // بعد از سومین تلاش ناموفق، حساب قفل می‌شود
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + LOGIN_CONSTANTS.LOCK_DURATION_DAYS);
        
        setState((prev: any) => ({
          ...prev,
          locked: true,
          lockExpiry: expiryDate,
          attempts: newAttempts,
          error: "حساب کاربری شما به دلیل ورود ناموفق بیش از حد مجاز، به مدت یک روز قفل شده است.",
          loading: false
        }));
        
        setLockInfo(newAttempts, expiryDate);
      } else {
        // نمایش پیام خطا با تعداد تلاش‌های باقی‌مانده
        setState((prev: any) => ({ 
          ...prev, 
          attempts: newAttempts,
          error: `کد وارد شده اشتباه است. (${toPersianNumbers(LOGIN_CONSTANTS.MAX_ATTEMPTS - newAttempts)} تلاش باقی مانده)`,
          loading: false
        }));
        setLockInfo(newAttempts);
      }
      
      return;
    }

    setTimeout(async () => {
      try {
        // Call API to authenticate trainer
        const response = await fetch('/api/auth/trainer-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for session cookies
          body: JSON.stringify({
            phone: state.phone,
            code: state.code
          })
        });

        const text = await response.text();
        let result: any = {};
        if (text.trim() !== '') {
          try {
            result = JSON.parse(text);
          } catch (jsonError) {
            console.warn('Failed to parse trainer login response JSON:', jsonError);
            result = { error: "خطا در دریافت پاسخ سرور" };
          }
        } else {
          result = { error: "پاسخ خالی از سرور" };
        }
        
        if (!response.ok) {
          setState((prev: any) => ({ 
            ...prev, 
            error: result.error || "خطا در ورود",
            loading: false 
          }));
          return;
        }

        // Get remember me preference
        // Get remember me status and clear login step via API
        const authResponse = await fetch('/api/auth/status', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        let rememberMe = false;
        if (authResponse.ok) {
          const authText = await authResponse.text();
          if (authText.trim() !== '') {
            try {
              const authData = JSON.parse(authText);
              rememberMe = authData.pendingRememberMe || false;
            } catch (jsonError) {
              console.warn('Failed to parse auth status response JSON:', jsonError);
            }
          }
        }
        
        // Clear login step via API
        await fetch('/api/auth/login-step', {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        // پاک کردن state محلی
        setState((prev: any) => ({ 
          ...prev, 
          loading: false, 
          error: "",
          code: "",
          phone: ""
        }));
        
        setLoginSuccess();
        
        const profile = await getStorageItem('trainerProfile', {}) as TrainerProfile;
        const trainerName = profile.name || 'کاربر';
        
        console.log('useLoginHandlers: Login successful, calling onLoginSuccess');
        successToast("ورود موفقیت‌آمیز", `${trainerName} عزیز، خوش آمدید`);
        
        // Call onLoginSuccess with a small delay to ensure storage operations complete
        setTimeout(() => {
          onLoginSuccess(rememberMe);
        }, 100);
      } catch (error) {
        setState((prev: any) => ({ 
          ...prev, 
          error: "خطا در ورود. لطفاً دوباره تلاش کنید.",
          loading: false 
        }));
      }
    }, 1200);
  };

  const handleChangePhone = async () => {
    setStep("phone");
    setState((prev: any) => ({ ...prev, code: "", error: "", countdown: 0 }));
    
    // پاک کردن step از storage
    // Clear login step via API
    await fetch('/api/auth/login-step', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const handleResendCode = () => {
    if (state.countdown > 0) return;
    
    setState((prev: any) => ({ ...prev, loading: true, error: "" }));
    
    setTimeout(() => {
      setState((prev: any) => ({ 
        ...prev, 
        countdown: LOGIN_CONSTANTS.RESEND_COUNTDOWN,
        loading: false 
      }));
      console.log(`کد تأیید مجدداً برای شماره ${state.phone} ارسال شد`);
    }, 1000);
  };

  const setPhone = (phone: string) => {
    console.log('useLoginHandlers: Setting phone to:', phone);
    setState((prev: any) => ({ ...prev, phone }));
  };

  const setCode = (code: string) => {
    setState((prev: any) => ({ ...prev, code }));
  };

  return {
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode,
    setPhone,
    setCode
  };
};
