
import { useState, useEffect } from 'react';

export const usePersianDate = () => {
  const [persianDate, setPersianDate] = useState<string>('');

  useEffect(() => {
    const updatePersianDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      
      try {
        const formatter = new Intl.DateTimeFormat('fa-IR', options);
        setPersianDate(formatter.format(now));
      } catch (error) {
        console.error('Error formatting Persian date:', error);
        setPersianDate('');
      }
    };

    updatePersianDate();
    
    // اختیاری: به‌روزرسانی تاریخ هر روز در نیمه‌شب
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - new Date().getTime();
    
    const timeout = setTimeout(updatePersianDate, timeUntilMidnight);
    
    return () => clearTimeout(timeout);
  }, []);

  return persianDate;
};
