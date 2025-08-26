
import { useState, useEffect, useRef } from 'react';

interface BrowserSupportState {
  isSupported: boolean;
  isChecking: boolean;
  error: string | null;
}

export const useBrowserSupport = () => {
  const [state, setState] = useState<BrowserSupportState>({
    isSupported: false,
    isChecking: true,
    error: null
  });
  
  const hasChecked = useRef(false);
  
  const checkBrowserSupport = () => {
    // Only check once to prevent infinite loops
    if (hasChecked.current) {
      return;
    }
    
    hasChecked.current = true;
    
    try {
      const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
      
      setState({
        isSupported,
        isChecking: false,
        error: isSupported ? null : 'مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند'
      });
    } catch (error) {
      setState({
        isSupported: false,
        isChecking: false,
        error: 'خطا در بررسی پشتیبانی مرورگر'
      });
    }
  };
  
  useEffect(() => {
    checkBrowserSupport();
  }, []); // Empty dependency array to run only once
  
  return {
    ...state,
    checkBrowserSupport: () => {
      hasChecked.current = false;
      checkBrowserSupport();
    }
  };
};
