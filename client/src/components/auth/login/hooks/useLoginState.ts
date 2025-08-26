
import { useState, useEffect } from "react";
import { LoginState } from "../types";
import { getStoredProfile, getLockInfo } from "../utils/storage";
import { toPersianNumbers } from "@/lib/utils/numbers";

export const useLoginState = () => {
  const [state, setState] = useState<LoginState>({
    phone: "",
    code: "",
    loading: false,
    error: "",
    locked: false,
    lockExpiry: null,
    timeLeft: "",
    countdown: 0,
    gymName: "",
    allowedPhone: "", // فیلد خالی - باید توسط مدیر وارد شود
    attempts: 0
  });

  const [step, setStep] = useState<"phone" | "code">("phone");
  
  // Debug only for step changes
  useEffect(() => {
    console.log('useLoginState: Step changed to:', step);
  }, [step]);

  // مشکل: step در هر بار render به phone reset می‌شود
  // راه حل: step را در localStorage ذخیره کنیم
  useEffect(() => {
    const saveStep = async () => {
      if (step === "code") {
        // Save login step via API
        const response = await fetch('/api/auth/login-step', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ step })
        });
        if (response.ok) {
          console.log('useLoginState: Saved step to API:', step);
        }
      }
    };
    saveStep();
  }, [step]);

  // بازیابی step از localStorage هنگام init - فقط اگر واقعاً در جلسه فعلی است
  useEffect(() => {
    let isMounted = true; // جلوگیری از race condition
    
    const loadStep = async () => {
      try {
        // Check login state via API
        const authResponse = await fetch('/api/auth/status', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (authResponse.ok) {
          const authData = await authResponse.json();
          
          // اگر کاربر قبلاً لاگین است، step را پاک کن و در phone بمان
          if (authData.isLoggedIn) {
            await fetch('/api/auth/login-step', {
              method: 'DELETE',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' }
            });
            console.log('useLoginState: User already logged in, clearing login step');
            return;
          }
          
          // Check for saved login step
          if (authData.loginStep === "code" && isMounted) {
            console.log('useLoginState: Found saved step "code" - checking validity');
            if (authData.loginPhone && authData.loginPhone.length === 11) {
              console.log('useLoginState: Valid phone found, restoring step:', authData.loginStep);
              setStep(authData.loginStep);
            } else {
              console.log('useLoginState: Invalid phone data, clearing step and staying on phone');
              await fetch('/api/auth/login-step', {
                method: 'DELETE',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
              });
            }
          }
        }
      } catch (error) {
        console.error('خطا در بازیابی step:', error);
      }
    };
    
    // Don't load step automatically - let it default to "phone" 
    // Only restore if there's valid context
    // const timeoutId = setTimeout(loadStep, 50);
    
    // Always start fresh on phone step for now
    console.log('useLoginState: Starting fresh on phone step');
    
    return () => {
      // clearTimeout(timeoutId);
      isMounted = false;
    };
  }, []); // فقط یک بار

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // ابتدا تلاش برای دریافت شماره از API پروفایل مربی
        const profileResponse = await fetch('/api/trainer/profile', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        let defaultPhone = "09123823886"; // شماره پیش‌فرض fallback
        let gymName = "";
        
        if (profileResponse.ok) {
          const trainerProfile = await profileResponse.json();
          if (trainerProfile && trainerProfile.phone) {
            // اگر پروفایل مربی شماره موبایل دارد، از آن استفاده کن
            defaultPhone = trainerProfile.phone;
            gymName = trainerProfile.gymName || "";
            console.log('useLoginState: Using trainer profile phone:', defaultPhone);
          } else {
            console.log('useLoginState: No phone in trainer profile, using fallback');
          }
        } else {
          console.log('useLoginState: Could not fetch trainer profile, using fallback phone');
        }
        
        // تنظیم مقادیر state با شماره موبایل به‌دست‌آمده
        setState(prev => ({
          ...prev,
          phone: "", // فیلد خالی - باید توسط مدیر وارد شود
          gymName: gymName,
          allowedPhone: defaultPhone
        }));

        const { lockedUntil, attempts } = await getLockInfo();
        if (lockedUntil && lockedUntil > new Date()) {
          setState(prev => ({
            ...prev,
            locked: true,
            lockExpiry: lockedUntil,
            attempts
          }));
        }
      } catch (error) {
        console.error('خطا در بارگذاری اطلاعات ورود:', error);
        // در صورت خطا، از مقادیر پیش‌فرض استفاده کن
        setState(prev => ({
          ...prev,
          phone: "09123823886",
          gymName: "",
          allowedPhone: "09123823886"
        }));
      }
    };

    loadInitialData();
  }, []);

  // Lock countdown timer
  useEffect(() => {
    if (!state.lockExpiry) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = state.lockExpiry!.getTime() - now.getTime();
      
      if (diff <= 0) {
        window.location.reload();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let timeString = "";
      if (days > 0) timeString += `${toPersianNumbers(days)} روز `;
      if (hours > 0) timeString += `${toPersianNumbers(hours)} ساعت `;
      timeString += `${toPersianNumbers(minutes)} دقیقه ${toPersianNumbers(seconds)} ثانیه`;

      setState(prev => ({ ...prev, timeLeft: timeString }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.lockExpiry]);

  // Resend countdown timer
  useEffect(() => {
    if (step === "code" && state.countdown > 0) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, state.countdown]);

  return {
    state,
    setState,
    step,
    setStep
  };
};
