
import { useState, useEffect } from "react";
import { AuthenticatedContent } from "./AuthenticatedContent";
import { LoginContainer } from "./login/LoginContainer";
import { defaultProfile } from "@/types/trainer";
import { successToast } from "@/hooks/use-toast";
import { setStorageItem, getStorageItem, removeStorageItem } from "@/utils/databaseStorage";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check authentication status via API
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        let isLoggedIn = false;
        let rememberMeExpiry = null;
        
        if (response.ok) {
          const text = await response.text();
          if (text.trim() !== '') {
            try {
              const authData = JSON.parse(text);
              isLoggedIn = authData.isLoggedIn;
              rememberMeExpiry = authData.rememberMeExpiry;
            } catch (jsonError) {
              console.warn('Failed to parse auth response JSON:', jsonError);
            }
          } else {
            console.warn('Empty response from /api/auth/status');
          }
        }
        
        if (isLoggedIn) {
          console.log('AuthWrapper: User is logged in via API, setting authenticated state');
          setAuthenticated(true);
          setIsChecking(false);
          
          // Show welcome back notification for logged in users
          try {
            const profileResponse = await fetch('/api/trainer/profile', {
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' }
            });
            let profile = defaultProfile;
            if (profileResponse.ok) {
              const text = await profileResponse.text();
              if (text.trim() !== '') {
                try {
                  profile = JSON.parse(text);
                } catch (jsonError) {
                  console.warn('Failed to parse profile JSON:', jsonError);
                }
              }
            }
            setTimeout(() => {
              successToast(
                `${profile.name || 'کاربر'} عزیز، خوش آمدید`,
                "به سیستم مدیریت برنامه وارد شدید"
              );
            }, 500);
          } catch (error) {
            console.error('Error fetching profile for welcome message:', error);
          }
          
          return;
        } else {
          console.log('AuthWrapper: User is NOT logged in via API, clearing authentication state');
          setAuthenticated(false);
        }
        
        // Check if remember me is still valid
        if (rememberMeExpiry) {
          const expiryDate = new Date(rememberMeExpiry);
          if (expiryDate > new Date()) {
            // Remember me token is still valid
            await setStorageItem("isLoggedIn", "true");
            setAuthenticated(true);
            setIsChecking(false);
            
            // Show welcome back notification
            const profile = await getStorageItem('trainerProfile', defaultProfile);
            
            setTimeout(() => {
              successToast(
                `${profile.name || 'کاربر'} عزیز، خوش آمدید`,
                "شما به صورت خودکار وارد شدید (مرا به خاطر بسپار)"
              );
            }, 500);
            
            return; // Stop execution here to prevent setting isChecking to false again
          } else {
            // Remember me expired, clear it
            await removeStorageItem("rememberMeExpiry");
          }
        }
        
        console.log('AuthWrapper: Authentication check completed');
        setIsChecking(false);
      } catch (error) {
        console.error('خطا در بررسی احراز هویت:', error);
        console.log('AuthWrapper: Authentication check failed, setting isChecking to false');
        setIsChecking(false);
      }
    };
    
    // بررسی فوری وضعیت احراز هویت
    checkAuth();
  }, []);

  const handleLoginSuccess = async (rememberMe: boolean = false) => {
    setAuthenticated(true);
    
    try {
      // Update login state via API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rememberMe })
      });
      
      if (response.ok) {
        console.log('AuthWrapper: Login state updated via API', rememberMe ? 'with remember me' : 'without remember me');
      } else {
        console.error('Failed to update login state via API');
      }
    } catch (error) {
      console.error('خطا در ذخیره تنظیمات remember me:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { removeStorageItem } = await import('@/utils/databaseStorage');
      
      // پاک کردن تمام مقادیر مربوط به ورود
      await removeStorageItem("loginStep");
      await removeStorageItem("isLoggedIn");
      await removeStorageItem("rememberMeExpiry");
      console.log('AuthWrapper: All login data cleared');
      
      setAuthenticated(false);
    } catch (error) {
      console.error('خطا در خروج:', error);
    }
  };

  // Add global logout function for testing
  (window as any).clearLoginData = handleLogout;

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-100 dark:from-emerald-950 dark:to-sky-950">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">در حال بررسی احراز هویت...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show the login form
  if (!authenticated) {
    return <LoginContainer onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, show the main content
  return <AuthenticatedContent>{children}</AuthenticatedContent>;
};
