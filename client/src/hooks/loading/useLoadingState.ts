
import { useState, useEffect } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useAppVersionContext } from "@/contexts/AppVersionContext";

export const useLoadingState = () => {
  const appVersion = "3.8.4"; // ثابت برای جلوگیری از مشکل
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("آماده‌سازی سیستم...");
  const [isComplete, setIsComplete] = useState(false);

  // اطلاعات سیستم
  const systemInfo = {
    version: appVersion,
    totalComponents: 156,
    loadedComponents: Math.floor((progress / 100) * 156)
  };

  const gymName = "جیم سینک پرو";

  // مراحل بارگذاری بهینه شده با تأخیرهای کمتر
  const loadingSteps = [
    { progress: 15, text: "بررسی سازگاری سیستم...", delay: 200 },
    { progress: 35, text: "بارگذاری هسته اصلی برنامه...", delay: 300 },
    { progress: 55, text: "راه‌اندازی رابط کاربری...", delay: 250 },
    { progress: 75, text: "بارگذاری سیستم مدیریت...", delay: 200 },
    { progress: 90, text: "آماده‌سازی نهایی...", delay: 150 },
    { progress: 100, text: "سیستم کاملاً آماده است!", delay: 100 }
  ];

  useEffect(() => {
    let currentStepIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const executeStep = () => {
      if (currentStepIndex < loadingSteps.length) {
        const currentStep = loadingSteps[currentStepIndex];
        
        setProgress(currentStep.progress);
        setLoadingText(currentStep.text);
        
        if (currentStep.progress === 100) {
          setIsComplete(true);
        }
        
        currentStepIndex++;
        
        if (currentStepIndex < loadingSteps.length) {
          timeoutId = setTimeout(executeStep, currentStep.delay);
        }
      }
    };

    // شروع فوری بدون تأخیر اولیه
    executeStep();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return {
    progress,
    loadingText,
    gymName,
    systemInfo,
    isComplete
  };
};
