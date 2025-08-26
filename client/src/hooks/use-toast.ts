
// Central entry point for toast system
import { useToast, toast, successToast, errorToast, warningToast, infoToast } from "@/hooks/toast/toast-utils";

// Export everything for use across the application
export {
  useToast,
  toast,
  successToast,
  errorToast,
  warningToast,
  infoToast
};

// For backwards compatibility
export const useCustomToast = useToast;
