
// استفاده از دیتابیس آنلاین به جای localStorage
import { getStorageItem, setStorageItem, removeStorageItem } from './databaseStorage';

export const getLocalStorageItem = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    return await getStorageItem(key, defaultValue);
  } catch (error) {
    console.error(`Error reading database key "${key}":`, error);
    return defaultValue;
  }
};

export const setLocalStorageItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    await setStorageItem(key, value);
  } catch (error) {
    console.error(`Error setting database key "${key}":`, error);
  }
};

export const removeLocalStorageItem = async (key: string): Promise<void> => {
  try {
    await removeStorageItem(key);
  } catch (error) {
    console.error(`Error removing database key "${key}":`, error);
  }
};

// Fallback functions for backward compatibility - now using database storage
export const getLocalStorageItemSync = <T>(key: string, defaultValue: T): T => {
  // Note: This is now synchronous fallback, but ideally should be avoided
  // Use getLocalStorageItem (async) instead
  console.warn(`getLocalStorageItemSync is deprecated. Use getLocalStorageItem instead for key: ${key}`);
  return defaultValue;
};

export const setLocalStorageItemSync = <T>(key: string, value: T): void => {
  // Note: This is now synchronous fallback, but ideally should be avoided
  // Use setLocalStorageItem (async) instead
  console.warn(`setLocalStorageItemSync is deprecated. Use setLocalStorageItem instead for key: ${key}`);
  
  // Fire and forget async call
  setLocalStorageItem(key, value).catch(error => {
    console.error(`Error in setLocalStorageItemSync for key "${key}":`, error);
  });
};

export const removeLocalStorageItemSync = (key: string): void => {
  // Note: This is now synchronous fallback, but ideally should be avoided  
  // Use removeLocalStorageItem (async) instead
  console.warn(`removeLocalStorageItemSync is deprecated. Use removeLocalStorageItem instead for key: ${key}`);
  
  // Fire and forget async call
  removeLocalStorageItem(key).catch(error => {
    console.error(`Error in removeLocalStorageItemSync for key "${key}":`, error);
  });
};
