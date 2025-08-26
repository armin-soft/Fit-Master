import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTrainerProfile } from '@/hooks/trainer/useTrainerProfile';

interface AppNameContextType {
  appName: string;
  gymName: string | null;
  isLoading: boolean;
  refreshAppName: () => void;
}

const AppNameContext = createContext<AppNameContextType>({
  appName: 'فیت مستر',
  gymName: null,
  isLoading: true,
  refreshAppName: () => {}
});

export const useAppName = () => {
  const context = useContext(AppNameContext);
  if (!context) {
    throw new Error('useAppName must be used within AppNameProvider');
  }
  return context;
};

interface AppNameProviderProps {
  children: React.ReactNode;
}

export const AppNameProvider: React.FC<AppNameProviderProps> = ({ children }) => {
  const [appName, setAppName] = useState('فیت مستر');
  const [gymName, setGymName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { profile, isLoading: profileLoading } = useTrainerProfile();

  const refreshAppName = async () => {
    try {
      // نام پروژه را از منیفست بخوانیم
      const response = await fetch('/Manifest.json');
      const manifest = await response.json();
      setAppName(manifest.name || 'فیت مستر');
      
      // نام محل فعالیت را جداگانه نگه داریم ولی در نمایش از آن استفاده نمی‌کنیم
      if (profile?.gymName && profile.gymName.trim() !== '') {
        setGymName(profile.gymName);
      } else {
        setGymName(null);
      }
    } catch (error) {
      console.error('Failed to load project name from manifest:', error);
      // در صورت خطا از نام پیش‌فرض استفاده کنیم
      setAppName('فیت مستر');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!profileLoading) {
      refreshAppName();
    }
  }, [profile, profileLoading]);

  useEffect(() => {
    setIsLoading(profileLoading);
  }, [profileLoading]);

  return (
    <AppNameContext.Provider value={{ 
      appName, 
      gymName, 
      isLoading, 
      refreshAppName 
    }}>
      {children}
    </AppNameContext.Provider>
  );
};