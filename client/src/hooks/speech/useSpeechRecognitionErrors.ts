
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function useSpeechRecognitionErrors() {
  const { toast } = useToast();
  const [shownErrors, setShownErrors] = useState<string[]>([]);
  
  const handleRecognitionError = (error: string) => {
    console.log("Recognition error:", error);
    
    // Prevent showing the same error type multiple times
    if (shownErrors.includes(error)) {
      return;
    }
    
    if (error === "not-allowed") {
      toast({
        title: "دسترسی به میکروفون",
        description: "لطفاً به مرورگر اجازه دسترسی به میکروفون را بدهید.",
        variant: "destructive",
      });
      setShownErrors(prev => [...prev, error]);
    } else if (error === "audio-capture") {
      toast({
        title: "خطا",
        description: "میکروفون قابل دسترسی نیست.",
        variant: "destructive",
      });
      setShownErrors(prev => [...prev, error]);
    } else if (error === "network") {
      toast({
        title: "خطای شبکه",
        description: "مشکلی در ارتباط با سرویس تشخیص گفتار وجود دارد.",
        variant: "destructive",
      });
      setShownErrors(prev => [...prev, error]);
    } else if (error !== "aborted") {
      toast({
        title: "خطا",
        description: "خطا در تشخیص گفتار. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
      setShownErrors(prev => [...prev, error]);
    }
  };
  
  const showRecordingStartedToast = () => {
    toast({
      title: "ضبط صدا",
      description: "در حال گوش دادن به صحبت شما...",
    });
  };
  
  const showRecordingStoppedToast = () => {
    toast({
      title: "ضبط صدا متوقف شد",
      description: "متن گفتار شما ثبت شد.",
    });
  };
  
  // Reset error tracking
  const resetErrors = () => {
    setShownErrors([]);
  };
  
  return {
    handleRecognitionError,
    showRecordingStartedToast,
    showRecordingStoppedToast,
    resetErrors
  };
}
