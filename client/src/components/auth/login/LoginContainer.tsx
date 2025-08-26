
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { LoginForm } from "./LoginFormMain";

interface LoginContainerProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginContainer = ({ onLoginSuccess }: LoginContainerProps) => {
  return (
    <PageContainer fullScreen fullHeight>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </PageContainer>
  );
};
