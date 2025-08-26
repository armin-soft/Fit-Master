
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSMSCodeReader } from "@/hooks/useSMSCodeReader";
import { VerificationCodeInput, VerificationStatusMessage, VerificationActions } from "./components";

interface CodeVerificationStepProps {
  code: string;
  setCode: (code: string) => void;
  phone: string;
  countdown: number;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
  containerVariants: any;
  itemVariants: any;
}

export const CodeVerificationStep = ({
  code,
  setCode,
  phone,
  countdown,
  loading,
  onSubmit,
  onChangePhone,
  onResendCode,
  containerVariants,
  itemVariants
}: CodeVerificationStepProps) => {
  
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

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <VerificationCodeInput
        code={code}
        setCode={setCode}
        isSMSEnabled={isSMSEnabled}
        itemVariants={itemVariants}
      />
      
      <VerificationStatusMessage
        phone={phone}
        countdown={countdown}
        isSMSEnabled={isSMSEnabled}
        code={code}
        loading={loading}
      />
      
      <VerificationActions
        loading={loading}
        code={code}
        countdown={countdown}
        onChangePhone={onChangePhone}
        onResendCode={onResendCode}
        itemVariants={itemVariants}
      />
    </motion.form>
  );
};
