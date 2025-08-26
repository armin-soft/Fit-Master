
import { toPersianNumbers } from "@/lib/utils/numbers";

export const formatTimeWithSeconds = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return toPersianNumbers(`${hours}:${minutes}:${seconds}`);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2);
};
