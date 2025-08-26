
import { useEffect, useRef } from 'react';
import { useIsMobile } from './use-mobile';

interface UseSMSCodeReaderProps {
  onCodeReceived: (code: string) => void;
  enabled?: boolean;
}

export const useSMSCodeReader = ({ onCodeReceived, enabled = true }: UseSMSCodeReaderProps) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // تنها روی دستگاه‌های موبایل و تبلت فعال باشد
    const shouldEnableSMS = enabled && isMobile && ('OTPCredential' in window);
    
    if (!shouldEnableSMS) {
      console.log('SMS auto-read disabled: mobile/tablet only feature or API not supported');
      return;
    }

    const startSMSListener = async () => {
      try {
        // Cancel any existing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        console.log('Starting SMS code listener on mobile/tablet device...');
        
        const credential = await (navigator.credentials as any).get({
          otp: { transport: ['sms'] },
          signal: abortControllerRef.current.signal
        });

        if (credential && credential.code) {
          console.log('SMS code received on mobile/tablet:', credential.code);
          onCodeReceived(credential.code);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.log('SMS listener error:', error);
        }
      }
    };

    startSMSListener();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [onCodeReceived, enabled, isMobile]);

  const cleanup = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { 
    cleanup,
    isSMSEnabled: enabled && isMobile && ('OTPCredential' in window)
  };
};
