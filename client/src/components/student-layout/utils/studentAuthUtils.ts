
export const handleStudentLogout = async () => {
  try {
    // Logout through API endpoint instead of client-side storage cleanup
    const response = await fetch('/api/student/logout', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('studentAuthUtils: Student logout completed via API');
    
    // انتشار رویداد برای اطلاع سایر کامپوننت‌ها
    window.dispatchEvent(new Event('studentLogout'));
    
    // هدایت به صفحه اصلی
    window.location.href = "/";
  } catch (error) {
    console.error('خطا در خروج:', error);
    window.location.href = "/";
  }
};
