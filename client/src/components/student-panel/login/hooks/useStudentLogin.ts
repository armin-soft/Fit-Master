
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "@/hooks/useStudents";
import { StudentLoginState, UseStudentLoginProps } from "./types";
import { checkStorageAvailability } from "./storage";
import { createPhoneSubmitHandler, createCodeSubmitHandler, createResendCodeHandler } from "./formHandlers";
import { toPersianNumbers } from "@/lib/utils/numbers";

const initialState: StudentLoginState = {
  phone: "",
  code: "",
  loading: false,
  error: "",
  locked: false,
  lockExpiry: null,
  timeLeft: "",
  countdown: 0,
  attempts: 0,
  rememberMe: false
};

export const useStudentLogin = ({ onLoginSuccess }: UseStudentLoginProps) => {
  const navigate = useNavigate();
  const { students } = useStudents();
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [state, setState] = useState<StudentLoginState>(initialState);

  // بررسی دسترسی به storage
  useEffect(() => {
    const storageError = checkStorageAvailability();
    if (storageError) {
      setState(prev => ({ ...prev, error: storageError }));
    }
  }, []);

  // شمارش معکوس برای ارسال مجدد کد
  useEffect(() => {
    if (step === "code" && state.countdown > 0) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, state.countdown]);

  // مدیریت قفل حساب و محاسبه زمان باقی‌مانده
  useEffect(() => {
    if (state.locked && state.lockExpiry) {
      const timer = setInterval(() => {
        const now = new Date();
        const expiry = new Date(state.lockExpiry!);
        const diff = expiry.getTime() - now.getTime();
        
        if (diff <= 0) {
          // زمان قفل به پایان رسیده
          setState(prev => ({
            ...prev,
            locked: false,
            lockExpiry: null,
            timeLeft: "",
            attempts: 0,
            error: ""
          }));
        } else {
          // محاسبه زمان باقی‌مانده
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          const timeLeft = hours > 0 
            ? `${toPersianNumbers(hours)} ساعت و ${toPersianNumbers(minutes)} دقیقه`
            : minutes > 0 
            ? `${toPersianNumbers(minutes)} دقیقه و ${toPersianNumbers(seconds)} ثانیه`
            : `${toPersianNumbers(seconds)} ثانیه`;
            
          setState(prev => ({ ...prev, timeLeft }));
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [state.locked, state.lockExpiry]);

  const handlePhoneSubmit = createPhoneSubmitHandler(state, setState, students, setStep);
  const handleCodeSubmit = createCodeSubmitHandler(state, setState, students, navigate, onLoginSuccess);
  const handleResendCode = createResendCodeHandler(state, setState);

  const handleChangePhone = () => {
    setStep("phone");
    setState(prev => ({ ...prev, code: "", error: "", countdown: 0 }));
  };

  const setPhone = (phone: string) => {
    setState(prev => ({ ...prev, phone }));
  };

  const setCode = (code: string) => {
    setState(prev => ({ ...prev, code }));
  };

  const setRememberMe = (rememberMe: boolean) => {
    setState(prev => ({ ...prev, rememberMe }));
  };

  return {
    step,
    phone: state.phone,
    code: state.code,
    loading: state.loading,
    error: state.error,
    locked: state.locked,
    lockExpiry: state.lockExpiry,
    timeLeft: state.timeLeft,
    countdown: state.countdown,
    rememberMe: state.rememberMe,
    setPhone,
    setCode,
    setRememberMe,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode,
    students
  };
};
