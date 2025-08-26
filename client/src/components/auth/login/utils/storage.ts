
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/databaseStorage';

export const getStoredProfile = async () => {
  try {
    const savedProfile = await getStorageItem('trainerProfile', null);
    return savedProfile;
  } catch (error) {
    console.error('خطا در بارگذاری پروفایل مربی:', error);
    return null;
  }
};

export const getLockInfo = async () => {
  try {
    const lockedUntil = await getStorageItem("loginLockExpiry", null);
    const savedAttempts = await getStorageItem("loginAttempts", 0);
    
    return {
      lockedUntil: lockedUntil ? new Date(lockedUntil) : null,
      attempts: savedAttempts || 0
    };
  } catch (error) {
    console.error('خطا در دریافت اطلاعات قفل:', error);
    return { lockedUntil: null, attempts: 0 };
  }
};

export const setLockInfo = async (attempts: number, lockExpiry?: Date) => {
  try {
    await setStorageItem("loginAttempts", attempts);
    if (lockExpiry) {
      await setStorageItem("loginLockExpiry", lockExpiry.toString());
    }
  } catch (error) {
    console.error('خطا در ذخیره اطلاعات قفل:', error);
  }
};

export const clearLockInfo = async () => {
  try {
    await removeStorageItem("loginLockExpiry");
    await removeStorageItem("loginAttempts");
  } catch (error) {
    console.error('خطا در پاک کردن اطلاعات قفل:', error);
  }
};

export const setLoginSuccess = async () => {
  try {
    await setStorageItem("isLoggedIn", "true");
    await clearLockInfo();
  } catch (error) {
    console.error('خطا در ذخیره وضعیت ورود:', error);
  }
};
