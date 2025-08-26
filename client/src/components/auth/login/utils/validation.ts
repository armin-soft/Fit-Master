
import { LOGIN_CONSTANTS } from "../constants";

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return "لطفاً شماره موبایل خود را وارد کنید";
  }
  
  if (phone.length !== LOGIN_CONSTANTS.PHONE_LENGTH) {
    return "شماره موبایل باید ۱۱ رقم باشد";
  }
  
  // بررسی که شماره با 09 شروع شود
  if (!phone.startsWith('09')) {
    return "شماره موبایل باید با ۰۹ شروع شود";
  }
  
  return null;
};

export const validatePhoneAccess = (phone: string, allowedPhone: string): string | null => {
  if (phone !== allowedPhone) {
    return "شماره موبایل وارد شده مجاز نیست";
  }
  
  return null;
};

export const validateCode = (code: string): string | null => {
  if (code.length !== LOGIN_CONSTANTS.CODE_LENGTH) {
    return "کد تأیید باید ۶ رقم باشد";
  }
  
  return null;
};

export const isValidCode = (code: string): boolean => {
  return code === LOGIN_CONSTANTS.VALID_CODE;
};

// تابع کمکی برای تبدیل اعداد فارسی به انگلیسی
export const convertPersianToEnglish = (value: string): string => {
  return value.replace(/[۰-۹]/g, (d) => {
    return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString();
  });
};

// تابع کمکی برای پاک کردن کاراکترهای غیر عددی
export const sanitizePhoneNumber = (value: string): string => {
  // ابتدا اعداد فارسی را به انگلیسی تبدیل کن
  const convertedValue = convertPersianToEnglish(value);
  // سپس فقط اعداد انگلیسی را نگه دار
  return convertedValue.replace(/[^0-9]/g, '');
};
