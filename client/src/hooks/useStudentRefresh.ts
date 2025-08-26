
import { useState, useCallback } from "react";

/**
 * هوک برای بروزرسانی دستی داده‌های دانشجو
 * این هوک فقط بروزرسانی دستی را پشتیبانی می‌کند
 */
export function useStudentRefresh() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // تابع برای شروع بروزرسانی دستی فقط
  const triggerRefresh = useCallback(() => {
    console.log('Manual refresh triggered at:', new Date().toLocaleTimeString());
    setRefreshTrigger(prev => prev + 1);
    setLastRefresh(new Date());
  }, []);

  return { refreshTrigger, triggerRefresh, lastRefresh };
}
