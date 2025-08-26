
export interface LoginStep {
  step: "phone" | "code";
}

export interface LoginState {
  phone: string;
  code: string;
  loading: boolean;
  error: string;
  locked: boolean;
  lockExpiry: Date | null;
  timeLeft: string;
  countdown: number;
  gymName: string;
  allowedPhone: string;
  attempts: number;
}

export interface LoginHandlers {
  handlePhoneSubmit: (e: React.FormEvent) => void;
  handleCodeSubmit: (e: React.FormEvent) => void;
  handleChangePhone: () => void;
  handleResendCode: () => void;
  setPhone: (phone: string) => void;
  setCode: (code: string) => void;
}

export interface AnimationVariants {
  hidden: any;
  visible: any;
}
