
import { validatePhone } from "@/components/auth/login/utils/validation";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { Student } from "@/components/students/StudentTypes";
import { StudentLoginState, STUDENT_VALID_CODE, MAX_ATTEMPTS, RESEND_COUNTDOWN } from "./types";
import { isValidStudentPhone, findStudentByPhone } from "./validation";
import { saveStudentLogin } from "./storage";

export const createPhoneSubmitHandler = (
  state: StudentLoginState,
  setState: React.Dispatch<React.SetStateAction<StudentLoginState>>,
  students: Student[],
  setStep: React.Dispatch<React.SetStateAction<"phone" | "code">>
) => {
  return (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: "" }));

    console.log('formHandlers: Phone submit started with phone:', state.phone);

    const phoneError = validatePhone(state.phone);
    if (phoneError) {
      setState(prev => ({ ...prev, error: phoneError, loading: false }));
      return;
    }

    if (!isValidStudentPhone(state.phone, students)) {
      setState(prev => ({ 
        ...prev, 
        error: "شماره موبایل شما در سیستم ثبت نشده است. لطفاً با مربی خود تماس بگیرید.",
        loading: false 
      }));
      return;
    }

    setTimeout(() => {
      setStep("code");
      setState(prev => ({ 
        ...prev, 
        countdown: RESEND_COUNTDOWN,
        loading: false,
        error: ""
      }));
      console.log(`کد تأیید برای شاگرد با شماره ${state.phone} ارسال شد`);
    }, 1500);
  };
};

export const createCodeSubmitHandler = (
  state: StudentLoginState,
  setState: React.Dispatch<React.SetStateAction<StudentLoginState>>,
  students: Student[],
  navigate: (path: string) => void,
  onLoginSuccess: (phone: string, rememberMe?: boolean) => void
) => {
  return async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, loading: true, error: "" }));

    console.log('formHandlers: Code submit started');
    console.log('formHandlers: Entered code:', state.code);

    if (state.locked) {
      setState(prev => ({ 
        ...prev, 
        error: "حساب کاربری شما قفل شده است. لطفاً صبر کنید.",
        loading: false 
      }));
      return;
    }

    if (state.code !== STUDENT_VALID_CODE) {
      const newAttempts = state.attempts + 1;
      
      if (newAttempts >= MAX_ATTEMPTS) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        
        setState(prev => ({
          ...prev,
          locked: true,
          lockExpiry: expiryDate,
          attempts: newAttempts,
          error: "حساب کاربری شما به دلیل ورود ناموفق بیش از حد مجاز، به مدت یک روز قفل شده است.",
          loading: false
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          attempts: newAttempts,
          error: `کد وارد شده اشتباه است. (${toPersianNumbers(MAX_ATTEMPTS - newAttempts)} تلاش باقی مانده)`,
          loading: false
        }));
      }
      
      return;
    }

    // کد صحیح است
    console.log('formHandlers: Code is correct!');
    
    const foundStudent = findStudentByPhone(state.phone, students);
    console.log('formHandlers: Found student for login:', foundStudent);
    
    if (foundStudent) {
      // Save student login using local storage method (for backward compatibility)
      try {
        const { setStorageItem } = await import('@/utils/databaseStorage');
        
        await setStorageItem("studentLoggedIn", "true");
        await setStorageItem("loggedInStudentId", state.phone);
        await setStorageItem("studentProfile", foundStudent);
        
        // Set remember me for student if enabled
        if (state.rememberMe) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);
          await setStorageItem("studentRememberMeExpiry", expiryDate.toISOString());
          await setStorageItem("rememberedStudentPhone", state.phone);
        }
      } catch (error) {
        console.error('Error saving student login data:', error);
      }
      
      // انتقال فوری به داشبورد شاگرد
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
        console.log('formHandlers: Calling onLoginSuccess and navigating to /Student');
        
        // انتقال به داشبورد
        navigate("/Student");
        
        // فراخوانی callback
        onLoginSuccess(state.phone, state.rememberMe);
      }, 500);
    } else {
      console.error('formHandlers: Student not found for phone:', state.phone);
      setState(prev => ({ 
        ...prev, 
        error: "خطا در ورود. شاگرد یافت نشد.",
        loading: false 
      }));
    }
  };
};

export const createResendCodeHandler = (
  state: StudentLoginState,
  setState: React.Dispatch<React.SetStateAction<StudentLoginState>>
) => {
  return () => {
    if (state.countdown > 0) return;
    
    setState(prev => ({ ...prev, loading: true, error: "" }));
    
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        countdown: RESEND_COUNTDOWN,
        loading: false 
      }));
      console.log(`کد تأیید مجدداً برای شماره ${state.phone} ارسال شد`);
    }, 1000);
  };
};
