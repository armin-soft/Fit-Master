
import { removeStorageItem } from '@/utils/databaseStorage';

export const handleLogout = async () => {
  try {
    console.log('Logout initiated - clearing session and authentication data');
    
    // ابتدا session سرور را destroy کن
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Server session destroyed successfully');
      } else {
        console.warn('Failed to destroy server session, continuing with client cleanup');
      }
    } catch (error) {
      console.warn('Error destroying server session:', error);
    }
    
    // سپس تمام اطلاعات احراز هویت محلی را پاک کن
    await removeStorageItem("isLoggedIn");
    await removeStorageItem("loginStep");
    await removeStorageItem("rememberMeExpiry");
    await removeStorageItem("hasSelectedUserType");
    await removeStorageItem("selectedUserType");
    await removeStorageItem("rememberMeEnabled");
    await removeStorageItem("pendingRememberMe");
    
    console.log('All authentication data cleared');
    
    // هدایت به صفحه انتخاب نوع کاربری
    window.location.href = "/";
  } catch (error) {
    console.error('خطا در خروج از سیستم:', error);
    // در صورت خطا، بازهم به صفحه انتخاب نوع کاربری برگرد
    window.location.href = "/";
  }
};
