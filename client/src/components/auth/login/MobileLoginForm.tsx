
import React, { useState, useEffect } from "react";
import { ModernErrorMessage } from "./ModernErrorMessage";
import { PhoneInputStep } from "./steps/PhoneInputStep";
import { CodeVerificationStep } from "./steps/CodeVerificationStep";
import { containerVariants, itemVariants } from "./utils/animationVariants";
import type { TrainerProfile } from "@/types/trainer";

interface MobileLoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const MobileLoginForm = ({ onLoginSuccess }: MobileLoginFormProps) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);

  // Base allowed phone number
  const BASE_ALLOWED_PHONE = "09123823886";

  // Load trainer profile on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { getStorageItem } = await import('@/utils/databaseStorage');
        const savedProfile = await getStorageItem('trainerProfile', null);
        if (savedProfile) {
          setTrainerProfile(savedProfile);
        }
      } catch (error) {
        console.error('Error loading trainer profile:', error);
      }
    };
    loadProfile();
  }, []);

  // Get all allowed phone numbers
  const getAllowedPhones = () => {
    const allowedPhones = [BASE_ALLOWED_PHONE];
    if (trainerProfile?.phone && trainerProfile.phone !== BASE_ALLOWED_PHONE) {
      allowedPhones.push(trainerProfile.phone);
    }
    return allowedPhones;
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!phone.trim()) {
      setError("لطفاً شماره موبایل خود را وارد کنید");
      setLoading(false);
      return;
    }

    // Check if the phone number is in the allowed list
    const allowedPhones = getAllowedPhones();
    if (!allowedPhones.includes(phone)) {
      setError("شماره موبایل وارد شده مجاز نیست");
      setLoading(false);
      return;
    }

    // Simulate sending SMS
    setTimeout(() => {
      setStep("code");
      setCountdown(120);
      setLoading(false);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1200);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    
    setLoading(true);
    setError("");

    // Check for correct activation code: 012345
    if (code !== "012345") {
      setCode("");
      setError("کد وارد شده اشتباه است");
      setLoading(false);
      return;
    }

    setTimeout(async () => {
      const { setStorageItem } = await import('@/utils/databaseStorage');
      await setStorageItem("isLoggedIn", "true");
      onLoginSuccess(false);
      setLoading(false);
    }, 1000);
  };

  const handleResendCode = () => {
    setCountdown(120);
    setCode("");
    setError("");
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChangePhone = () => {
    setStep("phone");
    setCode("");
    setError("");
  };

  return (
    <>
      <ModernErrorMessage error={error} />
      
      {step === "phone" ? (
        <PhoneInputStep
          phone={phone}
          setPhone={setPhone}
          loading={loading}
          onSubmit={handlePhoneSubmit}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          allowedPhones={getAllowedPhones()}
        />
      ) : (
        <CodeVerificationStep
          code={code}
          setCode={setCode}
          phone={phone}
          countdown={countdown}
          loading={loading}
          onSubmit={handleCodeSubmit}
          onChangePhone={handleChangePhone}
          onResendCode={handleResendCode}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
      )}
    </>
  );
};
