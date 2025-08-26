import { useEffect } from 'react';
import { useAppName } from '@/contexts/AppNameContext';

interface UseDocumentTitleOptions {
  suffix?: string;
  prefix?: string;
  fallback?: string;
}

export const useDocumentTitle = (
  title?: string, 
  options: UseDocumentTitleOptions = {}
) => {
  const { appName, isLoading } = useAppName();
  const { suffix = '', prefix = '', fallback = 'فیت مستر' } = options;

  useEffect(() => {
    if (isLoading) return;

    const documentTitle = title 
      ? `${prefix}${title}${suffix} - ${appName}`
      : appName || fallback;
    
    document.title = documentTitle;
    
    // بازگردانی title قبلی در cleanup
    return () => {
      document.title = appName || fallback;
    };
  }, [title, appName, isLoading, prefix, suffix, fallback]);
};