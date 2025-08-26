
import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update immediately
    setTime(new Date());
    
    // Then update every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};
