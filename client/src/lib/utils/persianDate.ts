import { toPersianNumbers } from './numbers';
import { format } from 'date-fns-jalali';

function getPersianMonth(month: number): string {
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 
    'تیر', 'مرداد', 'شهریور', 
    'مهر', 'آبان', 'آذر', 
    'دی', 'بهمن', 'اسفند'
  ];
  
  return persianMonths[month - 1] || '';
}

export function formatPersianDateForFilename(): string {
  // Get current date
  const now = new Date();
  
  // Use date-fns-jalali for accurate Persian date conversion
  const persianYear = format(now, 'yyyy');
  const persianMonth = format(now, 'MM');
  const persianDay = format(now, 'dd');
  const hours = format(now, 'HH');
  const minutes = format(now, 'mm');
  const seconds = format(now, 'ss');
  
  // Create the format: Gym-Sync-1404-03-04-10-45-24.json
  return `Gym-Sync-${persianYear}-${persianMonth}-${persianDay}-${hours}-${minutes}-${seconds}`;
}

export function getCurrentPersianDate(withTime: boolean = false): string {
  try {
    // Try to use Intl.DateTimeFormat if available
    if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'persian'
      };
      
      if (withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }
      
      const persianDate = new Intl.DateTimeFormat('fa-IR', options).format(new Date());
      return persianDate;
    }
  } catch (error) {
    console.error('Error formatting Persian date:', error);
  }
  
  // Fallback to manual conversion if Intl isn't available or fails
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Calculate Persian year (simplified)
  const isPreviousPersianYear = month <= 3;
  const persianYear = year - 621 - (isPreviousPersianYear ? 1 : 0);
  
  // Convert month (simplified)
  let persianMonth = month + 3;
  if (persianMonth > 12) {
    persianMonth -= 12;
  }
  
  // Get Persian month name
  const persianMonthName = getPersianMonth(persianMonth);
  
  // Format date
  let result = `${toPersianNumbers(day)} ${persianMonthName} ${toPersianNumbers(persianYear)}`;
  
  // Add time if requested
  if (withTime) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    result += ` ${toPersianNumbers(hours)}:${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(seconds.toString().padStart(2, '0'))}`;
  }
  
  return result;
}
