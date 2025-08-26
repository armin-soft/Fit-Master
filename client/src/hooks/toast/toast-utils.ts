import { Toast, ToastVariant } from "./toast-types";
import { dispatch, genId } from "./toast-reducer";
import * as React from "react";
import { ToastActionElement, ToastAction } from "@/components/ui/toast";

// Track the last notification to prevent duplicates
const toastHistory = new Map<string, number>();

// Define the modern action type that matches what the toast system expects
interface ToastActionProps {
  label: string;
  onClick: () => void;
}

// Helper function to convert simple action to proper ToastActionElement
const createActionElement = (action: ToastActionProps): ToastActionElement => {
  // Create a proper React element with all required props
  const element = React.createElement(ToastAction, {
    onClick: action.onClick,
    altText: action.label, // Required prop for ToastAction
    children: action.label
  });
  
  // Two-step type assertion as recommended by TypeScript
  return element as unknown as ToastActionElement;
};

// Toast function to show notifications - compatible with both interfaces
export function toast(options: {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastActionProps;
} | (Toast & { variant?: ToastVariant })): { id: string; dismiss: () => void; update: (props: Toast) => void } {
  
  const id = genId();
  
  // Normalize the options to work with both formats
  const normalizedProps: Toast = {
    ...(options as any),
    // Convert simple action object to proper React element if needed
    action: options.action && 'label' in options.action 
      ? createActionElement(options.action)
      : options.action,
  };
  
  // Create a unique key for this notification based on content
  const toastKey = `${normalizedProps.title}-${normalizedProps.description}`;
  const now = Date.now();
  
  // Check for duplicate notifications within a short time frame (3 seconds)
  if (toastHistory.has(toastKey)) {
    const lastShown = toastHistory.get(toastKey) || 0;
    if (now - lastShown < 3000) {
      // Skip showing duplicates
      return { id, dismiss: () => {}, update: () => {} };
    }
  }
  
  // Record this notification in history
  toastHistory.set(toastKey, now);
  
  // Clean up old notifications from history after 30 seconds
  setTimeout(() => {
    toastHistory.delete(toastKey);
  }, 30000);

  const update = (props: Toast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
    
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...normalizedProps,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // Set window.showToast for backwards compatibility
  if (typeof window !== 'undefined' && !window.showToast) {
    window.showToast = toast;
  }

  // Auto dismiss after TOAST_REMOVE_DELAY
  const duration = typeof normalizedProps.duration === 'number' ? normalizedProps.duration : 5000;
  setTimeout(() => {
    dismiss();
  }, duration - 100); // matches TOAST_REMOVE_DELAY - 100

  return {
    id,
    dismiss,
    update,
  };
}

// Standard toast variants
export const successToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "success",
  });
};

export const errorToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "destructive",
  });
};

export const warningToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "warning",
  });
};

export const infoToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "default",
  });
};

// Hook for toast functionality
export function useToast() {
  return {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    toasts: [] // This will be populated from the context provider
  };
}
