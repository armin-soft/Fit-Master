
import { useLoginState } from "./useLoginState";
import { useLoginHandlers } from "./useLoginHandlers";

interface UseLoginProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const useLogin = ({ onLoginSuccess }: UseLoginProps) => {
  const { state, setState, step, setStep } = useLoginState();
  const handlers = useLoginHandlers({
    state,
    setState,
    step,
    setStep,
    onLoginSuccess
  });

  return {
    // State
    step,
    phone: state.phone,
    code: state.code,
    loading: state.loading,
    error: state.error,
    locked: state.locked,
    lockExpiry: state.lockExpiry,
    timeLeft: state.timeLeft,
    countdown: state.countdown,
    gymName: state.gymName,
    allowedPhone: state.allowedPhone,
    
    // Handlers
    ...handlers
  };
};
