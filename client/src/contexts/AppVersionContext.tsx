
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '@/utils/databaseStorage';

interface AppVersionContextType {
  version: string;
  isLoading: boolean;
  error: string | null;
}

const AppVersionContext = createContext<AppVersionContextType>({
  version: '4.0.0',
  isLoading: true,
  error: null
});

export function useAppVersionContext() {
  const context = useContext(AppVersionContext);
  if (!context) {
    throw new Error('useAppVersionContext must be used within AppVersionProvider');
  }
  return context;
}

interface AppVersionProviderProps {
  children: React.ReactNode;
}

export const AppVersionProvider: React.FC<AppVersionProviderProps> = ({ children }) => {
  const [version, setVersion] = useState('4.0.0');
  const [isLoading, setIsLoading] = useState(true); // شروع با true تا نسخه از منیفست لود شود
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async () => {
      // Use API endpoints instead of storage items
      
      try {
        // همیشه از Manifest.json بخوان تا از جدید بودن اطمینان حاصل شود
        const response = await fetch('/Manifest.json');
        const manifest = await response.json();
        const appVersion = manifest.version || '4.0.0'; // fallback اگر منیفست موجود نباشد
        
        // بررسی آیا نسخه تغییر کرده یا خیر
        const cachedVersion = await getStorageItem('app-version', null);
        if (cachedVersion !== appVersion) {
          console.log(`App version updated: ${cachedVersion} → ${appVersion}`);
          await setStorageItem('app-version', appVersion);
        }
        
        setVersion(appVersion);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading app version from Manifest:', err);
        
        // در صورت خطا، سعی کن از cache استفاده کنی
        try {
          const cachedVersion = await getStorageItem('app-version', '4.0.0');
          setVersion(cachedVersion);
          console.log(`Using cached version: ${cachedVersion}`);
        } catch (cacheErr) {
          console.error('Error loading cached version:', cacheErr);
          setVersion('4.0.0'); // fallback نهایی
          setError('خطا در بارگذاری نسخه');
        }
        setIsLoading(false);
      }
    };
    
    fetchVersion().catch(console.error);
  }, []);

  return (
    <AppVersionContext.Provider value={{ version, isLoading, error }}>
      {children}
    </AppVersionContext.Provider>
  );
};
