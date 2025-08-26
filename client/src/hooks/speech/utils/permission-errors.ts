
export const PERMISSION_ERRORS = {
  DENIED: 'not-allowed',
  BLOCKED: 'permission-denied',
  NO_MICROPHONE: 'no-microphone'
} as const;

export const getPermissionErrorMessage = (error: string): string => {
  switch (error) {
    case PERMISSION_ERRORS.DENIED:
      return 'دسترسی به میکروفون رد شد. لطفاً در تنظیمات مرورگر اجازه دهید.';
    case PERMISSION_ERRORS.BLOCKED:
      return 'دسترسی به میکروفون مسدود است. لطفاً تنظیمات مرورگر را بررسی کنید.';
    case PERMISSION_ERRORS.NO_MICROPHONE:
      return 'میکروفونی یافت نشد. لطفاً میکروفون را متصل کنید.';
    default:
      return 'خطا در دسترسی به میکروفون';
  }
};
