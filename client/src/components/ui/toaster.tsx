
import { useEffect, useState } from "react";
import { useToast as useToastHook } from "@/hooks/toast";
import { ToastProvider } from "@/components/ui/toast";
import { ToastContainer } from "./toast/toast-container";
import { ToastType } from "@/hooks/toast/toast-types";
import { dispatch } from "@/hooks/toast/toast-reducer";

export function Toaster() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  
  useEffect(() => {
    // Subscribe to toast events
    function handleToastEvent(event: CustomEvent) {
      const { type, toast, toastId } = event.detail;
      
      setToasts((prevToasts) => {
        switch (type) {
          case "ADD_TOAST":
            return [...prevToasts, toast];
          case "UPDATE_TOAST":
            return prevToasts.map((t) => 
              t.id === toast.id ? { ...t, ...toast } : t
            );
          case "DISMISS_TOAST": {
            if (toastId === undefined) {
              return prevToasts.map((t) => ({ ...t, open: false }));
            }
            return prevToasts.map((t) =>
              t.id === toastId ? { ...t, open: false } : t
            );
          }
          case "REMOVE_TOAST":
            if (toastId === undefined) {
              return [];
            }
            return prevToasts.filter((t) => t.id !== toastId);
          default:
            return prevToasts;
        }
      });
    }
    
    // Listen for custom toast events
    window.addEventListener("toast", handleToastEvent as EventListener);
    
    // Expose the toasts array through the useToast hook
    const originalUseToast = useToastHook;
    (useToastHook as any).toasts = toasts;
    
    return () => {
      window.removeEventListener("toast", handleToastEvent as EventListener);
    };
  }, [toasts]);

  return (
    <ToastProvider>
      <ToastContainer toasts={toasts} />
    </ToastProvider>
  )
}
