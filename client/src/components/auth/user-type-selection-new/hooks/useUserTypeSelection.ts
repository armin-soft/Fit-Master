
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'management' | 'student' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleUserTypeSelection = async (type: 'management' | 'student') => {
    if (isProcessing || selectedType) return;
    
    console.log('شروع انتخاب نوع کاربر:', type);
    setIsProcessing(true);
    setSelectedType(type);
    setCurrentStep(2);
    
    try {
      // مرحله ۱: آماده‌سازی محیط
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep(3);
      
      // مرحله ۲: هدایت به پنل مناسب
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('هدایت به پنل مناسب برای نوع کاربر:', type);
      
      // هدایت مستقیم به پنل مناسب بدون ذخیره‌سازی دائم
      if (type === 'student') {
        console.log('هدایت به پنل شاگرد');
        navigate("/Student", { replace: true });
      } else if (type === 'management') {
        console.log('هدایت به پنل مدیریت');
        navigate("/Management", { replace: true });
      }
      
      // Reset state after successful navigation
      setIsProcessing(false);
      
    } catch (error) {
      console.error('خطا در هنگام هدایت:', error);
      setIsProcessing(false);
      setSelectedType(null);
      setCurrentStep(1);
    }
  };

  return {
    selectedType,
    isProcessing,
    currentStep,
    handleUserTypeSelection
  };
};
