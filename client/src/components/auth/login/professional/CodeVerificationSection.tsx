
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ProfessionalErrorMessage } from "./ProfessionalErrorMessage";
import { useSMSCodeReader } from "@/hooks/useSMSCodeReader";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ProfessionalVerificationCodeInput, 
  ProfessionalVerificationStatusMessage, 
  ProfessionalVerificationActions 
} from "./components";

interface CodeVerificationSectionProps {
  code: string;
  setCode: (code: string) => void;
  phone: string;
  countdown: number;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
  variants: any;
}

export const CodeVerificationSection = ({
  code,
  setCode,
  phone,
  countdown,
  loading,
  error,
  onSubmit,
  onChangePhone,
  onResendCode,
  variants
}: CodeVerificationSectionProps) => {
  
  console.log('CodeVerificationSection: RENDERING! Phone:', phone, 'Code:', code);
  const isMobile = useIsMobile();
  
  // Auto-read SMS codes only on mobile/tablet
  const { cleanup, isSMSEnabled } = useSMSCodeReader({
    onCodeReceived: (receivedCode) => {
      console.log('Auto-filling verification code on mobile/tablet:', receivedCode);
      setCode(receivedCode);
    },
    enabled: code.length === 0 && !loading
  });

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === 6 && !loading) {
      const timer = setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        onSubmit(fakeEvent);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code, loading, onSubmit]);

  // Cleanup SMS listener when component unmounts
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(e);
  };

  return (
    <motion.form
      onSubmit={handleFormSubmit}
      className="space-y-6"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <ProfessionalErrorMessage error={error} />
      
      <ProfessionalVerificationCodeInput
        code={code}
        setCode={setCode}
        isSMSEnabled={isSMSEnabled}
        variants={variants}
      />
      
      <ProfessionalVerificationStatusMessage
        phone={phone}
        countdown={countdown}
        isSMSEnabled={isSMSEnabled}
        code={code}
        loading={loading}
      />
      
      <ProfessionalVerificationActions
        loading={loading}
        code={code}
        countdown={countdown}
        onChangePhone={onChangePhone}
        onResendCode={onResendCode}
        variants={variants}
      />
    </motion.form>
  );
};
