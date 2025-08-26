
import { format } from 'date-fns-jalali';
import { toPersianNumbers } from "@/lib/utils/numbers";

export const formatDate = (timestamp: number): string => {
  try {
    const date = new Date(timestamp);
    return toPersianNumbers(format(date, 'yyyy/MM/dd - HH:mm'));
  } catch (error) {
    return toPersianNumbers(new Date(timestamp).toLocaleDateString('fa-IR'));
  }
};
