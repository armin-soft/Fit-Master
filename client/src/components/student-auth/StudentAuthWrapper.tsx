
import { useState, useEffect } from "react";
import { StudentAuthenticatedContent } from "./StudentAuthenticatedContent";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { successToast } from "@/hooks/use-toast";
import { setStorageItem, getStorageItem, removeStorageItem } from "@/utils/databaseStorage";

interface StudentAuthWrapperProps {
  children: React.ReactNode;
}

export const StudentAuthWrapper = ({ children }: StudentAuthWrapperProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // بررسی وضعیت ورود شاگرد
    const checkAuth = async () => {
      try {
        // Check authentication status via API (similar to Management system)
        const response = await fetch('/api/student/auth/status', {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        
        let isLoggedIn = false;
        let studentData = null;
        let rememberMeExpiry = null;
        
        if (response.ok) {
          const text = await response.text();
          if (text.trim() !== '') {
            try {
              const authData = JSON.parse(text);
              isLoggedIn = authData.isLoggedIn;
              studentData = authData.student;
              rememberMeExpiry = authData.rememberMeExpiry;
            } catch (jsonError) {
              console.warn('Failed to parse student auth response JSON:', jsonError);
            }
          } else {
            console.warn('Empty response from /api/student/auth/status');
          }
        }
        
        if (isLoggedIn && studentData) {
          // Check if student is active
          if (studentData.isActive === false) {
            console.log('StudentAuthWrapper: Student is inactive, access denied');
            setAuthenticated(false);
            setIsChecking(false);
            
            // Clear any stored login data
            await removeStorageItem("studentLoggedIn");
            await removeStorageItem("loggedInStudentId"); 
            await removeStorageItem("studentProfile");
            
            // Show access denied notification
            setTimeout(() => {
              successToast(
                "دسترسی غیرفعال",
                "حساب کاربری شما توسط مربی غیرفعال شده است. برای فعال‌سازی مجدد با مربی خود تماس بگیرید."
              );
            }, 500);
            
            return;
          }
          
          console.log('StudentAuthWrapper: Student is logged in and active via API, setting authenticated state');
          setAuthenticated(true);
          setIsChecking(false);
          
          // Store student data locally for quick access
          await setStorageItem("studentLoggedIn", "true");
          await setStorageItem("loggedInStudentId", studentData.phone);
          await setStorageItem("studentProfile", studentData);
          
          // Show welcome back notification for logged in students
          setTimeout(() => {
            successToast(
              `${studentData.name || 'شاگرد'} عزیز، خوش آمدید`,
              "به پنل شخصی خود وارد شدید"
            );
          }, 500);
          
          return;
        } else {
          console.log('StudentAuthWrapper: Student is NOT logged in via API, checking storage');
        }
        
        // Fallback to storage-based check (for backward compatibility)
        const isStudentLoggedIn = await getStorageItem("studentLoggedIn", null) === "true";
        const loggedInStudentId = await getStorageItem("loggedInStudentId", null);
        const storedRememberMeExpiry = await getStorageItem("studentRememberMeExpiry", null);
        
        console.log('StudentAuthWrapper: Checking storage-based authentication');
        console.log('StudentAuthWrapper: isStudentLoggedIn:', isStudentLoggedIn);
        console.log('StudentAuthWrapper: loggedInStudentId:', loggedInStudentId);
        
        if (isStudentLoggedIn && loggedInStudentId) {
          // Try to get student profile from API
          try {
            const profileResponse = await fetch(`/api/student/profile/${loggedInStudentId}`, {
              credentials: 'include'
            });
            
            if (profileResponse.ok) {
              const profile = await profileResponse.json();
              
              // Check if student is active  
              if (profile.isActive === false) {
                console.log('StudentAuthWrapper: Student is inactive via storage check, access denied');
                setAuthenticated(false);
                setIsChecking(false);
                
                // Clear any stored login data
                await removeStorageItem("studentLoggedIn");
                await removeStorageItem("loggedInStudentId"); 
                await removeStorageItem("studentProfile");
                
                // Show access denied notification
                setTimeout(() => {
                  successToast(
                    "دسترسی غیرفعال",
                    "حساب کاربری شما توسط مربی غیرفعال شده است. برای فعال‌سازی مجدد با مربی خود تماس بگیرید."
                  );
                }, 500);
                
                return;
              }
              
              await setStorageItem("studentProfile", profile);
              
              setTimeout(() => {
                successToast(
                  `${profile.name || 'شاگرد'} عزیز، خوش آمدید`,
                  "به پنل شخصی خود وارد شدید"
                );
              }, 500);
            }
          } catch (error) {
            console.error('Error fetching student profile:', error);
          }
          
          setAuthenticated(true);
        } else if (storedRememberMeExpiry || rememberMeExpiry) {
          // Check if remember me is still valid
          const expiryDate = new Date(storedRememberMeExpiry || rememberMeExpiry);
          if (expiryDate > new Date()) {
            // Remember me token is still valid
            const rememberedPhone = await getStorageItem("rememberedStudentPhone", null);
            if (rememberedPhone) {
              console.log('StudentAuthWrapper: Remember me is valid, auto-logging in');
              await setStorageItem("studentLoggedIn", "true");
              await setStorageItem("loggedInStudentId", rememberedPhone);
              
              // Show welcome back message
              const profile = await getStorageItem('studentProfile', { name: 'شاگرد' });
              setTimeout(() => {
                successToast(
                  `${profile.name || 'شاگرد'} عزیز، خوش آمدید`,
                  "شما به صورت خودکار وارد شدید (مرا به خاطر بسپار)"
                );
              }, 500);
              
              setAuthenticated(true);
            } else {
              setAuthenticated(false);
            }
          } else {
            // Remember me expired, clear it
            await removeStorageItem("studentRememberMeExpiry");
            await removeStorageItem("rememberedStudentPhone");
            setAuthenticated(false);
          }
        } else {
          setAuthenticated(false);
        }
        
        setIsChecking(false);
      } catch (error) {
        console.error('خطا در بررسی احراز هویت شاگرد:', error);
        setAuthenticated(false);
        setIsChecking(false);
      }
    };
    
    // بررسی فوری وضعیت احراز هویت
    checkAuth();

    // گوش دادن به رویداد خروج شاگرد
    const handleStudentLogout = () => {
      console.log('StudentAuthWrapper: Student logout event received');
      setAuthenticated(false);
    };

    window.addEventListener('studentLogout', handleStudentLogout);
    
    return () => {
      window.removeEventListener('studentLogout', handleStudentLogout);
    };
  }, []);

  const handleLoginSuccess = async (phone: string, rememberMe: boolean = false) => {
    console.log('StudentAuthWrapper: Login successful for phone:', phone);
    setAuthenticated(true);
    
    try {
      // Update login state via API (similar to Management system)
      const response = await fetch('/api/student/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, rememberMe })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('StudentAuthWrapper: Login state updated via API', rememberMe ? 'with remember me' : 'without remember me');
        
        // Store student data locally
        await setStorageItem("studentLoggedIn", "true");
        await setStorageItem("loggedInStudentId", phone);
        if (result.student) {
          await setStorageItem("studentProfile", result.student);
        }
        
        // Handle remember me
        if (rememberMe && result.rememberMeExpiry) {
          await setStorageItem("studentRememberMeExpiry", result.rememberMeExpiry);
          await setStorageItem("rememberedStudentPhone", phone);
        }
      } else {
        console.error('Failed to update student login state via API');
      }
    } catch (error) {
      console.error('خطا در ذخیره تنظیمات remember me برای شاگرد:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      // Call API logout endpoint
      const response = await fetch('/api/student/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('StudentAuthWrapper: Logout successful via API');
      }
      
      // Clear local storage
      await removeStorageItem("studentLoggedIn");
      await removeStorageItem("loggedInStudentId");
      await removeStorageItem("studentProfile");
      await removeStorageItem("studentRememberMeExpiry");
      await removeStorageItem("rememberedStudentPhone");
      
      console.log('StudentAuthWrapper: All student login data cleared');
      setAuthenticated(false);
      
      // Emit logout event for other components
      window.dispatchEvent(new CustomEvent('studentLogout'));
    } catch (error) {
      console.error('خطا در خروج شاگرد:', error);
    }
  };

  // نمایش loading در حین بررسی احراز هویت
  if (isChecking) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بررسی احراز هویت شاگرد...</p>
        </div>
      </div>
    );
  }

  // اگر احراز هویت نشده، فرم ورود نمایش داده شود
  if (!authenticated) {
    return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // اگر احراز هویت شده، محتوای اصلی نمایش داده شود
  return <StudentAuthenticatedContent>{children}</StudentAuthenticatedContent>;
};
