import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper to convert day number to Persian weekday name
 */
export function getDayName(dayNumber: number | null): string {
  if (dayNumber === null) return '';
  
  switch(dayNumber) {
    case 1: return "شنبه";
    case 2: return "یکشنبه";
    case 3: return "دوشنبه";
    case 4: return "سه شنبه";
    case 5: return "چهارشنبه";
    case 6: return "پنج شنبه";
    case 7: return "جمعه";
    default: return "روز نامشخص";
  }
}
