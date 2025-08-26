// دیتابیس آنلاین جایگزین localStorage
import { apiRequest } from "@/lib/queryClient";

export interface StorageItem {
  key: string;
  value: any;
}

/**
 * دیتابیس آنلاین جایگزین localStorage که با PostgreSQL کار می‌کند
 */
export class DatabaseStorage {
  private static instance: DatabaseStorage | null = null;
  private sessionId: string;

  constructor() {
    // Use persistent session ID for data continuity across restarts
    this.sessionId = this.getOrCreatePersistentSessionId();
  }

  static getInstance(): DatabaseStorage {
    if (!DatabaseStorage.instance) {
      DatabaseStorage.instance = new DatabaseStorage();
    }
    return DatabaseStorage.instance;
  }

  private getOrCreatePersistentSessionId(): string {
    // Try to get persistent session from browser storage first
    try {
      const stored = window.localStorage.getItem('gym-sync-session-id');
      if (stored) {
        return stored;
      }
    } catch {
      // If localStorage fails, continue with memory storage
    }

    // Generate a new persistent session ID
    const newSessionId = `persistent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Try to store it persistently
    try {
      window.localStorage.setItem('gym-sync-session-id', newSessionId);
    } catch {
      // If localStorage fails, we'll use memory only (will reset on reload)
    }
    
    return newSessionId;
  }

  /**
   * دریافت یک مقدار از دیتابیس آنلاین
   */
  async getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const response = await apiRequest(`/preferences/${encodeURIComponent(key)}?sessionId=${encodeURIComponent(this.sessionId)}`, {
        method: 'GET'
        // Send client sessionId as query parameter
      });

      if (response && response.value) {
        try {
          // اگر value خودش یک رشته JSON است، آن را parse کن
          const parsedValue = typeof response.value === 'string' ? JSON.parse(response.value) : response.value;
          // اگر نتیجه باز هم رشته JSON باشد، دوباره parse کن (برای حل مشکل double stringify)
          if (typeof parsedValue === 'string') {
            try {
              return JSON.parse(parsedValue);
            } catch {
              return parsedValue as T;
            }
          }
          return parsedValue;
        } catch {
          return response.value as T;
        }
      }

      return defaultValue !== undefined ? defaultValue : null;
    } catch (error) {
      // Don't log network errors as they are already logged in apiRequest
      if (!(error as any)?.message?.includes('Unable to connect to server')) {
        console.error(`خطا در دریافت ${key} از دیتابیس:`, error);
      }
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  /**
   * ذخیره یک مقدار در دیتابیس آنلاین
   */
  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      await apiRequest('/preferences', {
        method: 'POST',
        body: {
          key,
          value,
          sessionId: this.sessionId
        }
        // Send client sessionId in request body
      });

      return true;
    } catch (error) {
      // Don't log network errors as they are already logged in apiRequest
      if (!(error as any)?.message?.includes('Unable to connect to server')) {
        console.error(`خطا در ذخیره ${key} در دیتابیس:`, error);
      }
      return false;
    }
  }

  /**
   * حذف یک مقدار از دیتابیس آنلاین
   */
  async removeItem(key: string): Promise<boolean> {
    try {
      await apiRequest(`/preferences/${encodeURIComponent(key)}?sessionId=${encodeURIComponent(this.sessionId)}`, {
        method: 'DELETE'
        // Send client sessionId as query parameter
      });

      return true;
    } catch (error) {
      // Don't log network errors as they are already logged in apiRequest
      if (!(error as any)?.message?.includes('Unable to connect to server')) {
        console.error(`خطا در حذف ${key} از دیتابیس:`, error);
      }
      return false;
    }
  }

  /**
   * دریافت تمام ترجیحات کاربر
   */
  async getAllItems(): Promise<StorageItem[]> {
    try {
      const response = await apiRequest(`/preferences?sessionId=${encodeURIComponent(this.sessionId)}`, {
        method: 'GET'
        // Send client sessionId as query parameter
      });

      return (response || []).map((pref: any) => ({
        key: pref.key,
        value: JSON.parse(pref.value)
      }));
    } catch (error) {
      // Don't log network errors as they are already logged in apiRequest
      if (!(error as any)?.message?.includes('Unable to connect to server')) {
        console.error('خطا در دریافت تمام ترجیحات از دیتابیس:', error);
      }
      return [];
    }
  }

  /**
   * پاک کردن تمام داده‌ها (برای logout)
   */
  async clear(): Promise<boolean> {
    try {
      const allItems = await this.getAllItems();
      
      for (const item of allItems) {
        await this.removeItem(item.key);
      }

      return true;
    } catch (error) {
      console.error('خطا در پاک کردن تمام داده‌ها:', error);
      return false;
    }
  }
}

// Instance واحد برای استفاده در تمام پروژه
export const databaseStorage = DatabaseStorage.getInstance();

/**
 * Utility functions که با localStorage سازگار هستند اما از دیتابیس استفاده می‌کنند
 */

export const getStorageItem = async <T>(key: string, defaultValue: T): Promise<T> => {
  try {
    const value = await databaseStorage.getItem(key, defaultValue);
    return value !== null ? value : defaultValue;
  } catch (error) {
    console.error(`خطا در دریافت ${key}:`, error);
    return defaultValue;
  }
};

export const setStorageItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    await databaseStorage.setItem(key, value);
  } catch (error) {
    console.error(`خطا در ذخیره ${key}:`, error);
  }
};

export const removeStorageItem = async (key: string): Promise<void> => {
  try {
    await databaseStorage.removeItem(key);
  } catch (error) {
    console.error(`خطا در حذف ${key}:`, error);
  }
};

/**
 * Hook برای استفاده آسان در کامپوننت‌های React
 */
import { useState, useEffect } from 'react';

export function useDatabaseStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      setLoading(true);
      try {
        const storedValue = await getStorageItem(key, defaultValue);
        setValue(storedValue);
      } catch (error) {
        console.error(`خطا در بارگذاری ${key}:`, error);
        setValue(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key, defaultValue]);

  const setStoredValue = async (newValue: T) => {
    try {
      setValue(newValue);
      await setStorageItem(key, newValue);
    } catch (error) {
      console.error(`خطا در ذخیره ${key}:`, error);
      // در صورت خطا، مقدار قبلی را برگردان
      const oldValue = await getStorageItem(key, defaultValue);
      setValue(oldValue);
    }
  };

  const removeStoredValue = async () => {
    try {
      setValue(defaultValue);
      await removeStorageItem(key);
    } catch (error) {
      console.error(`خطا در حذف ${key}:`, error);
    }
  };

  return {
    value,
    setValue: setStoredValue,
    removeValue: removeStoredValue,
    loading
  };
}