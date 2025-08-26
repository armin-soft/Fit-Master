
import { useState, useEffect } from 'react';

export const usePersianDate = () => {
  const [persianDate, setPersianDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      
      // Convert to Persian calendar
      const persianDateString = new Intl.DateTimeFormat('fa-IR-u-ca-persian', options).format(now);
      setPersianDate(persianDateString);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return persianDate;
};
