
// Enhanced storage manager using online PostgreSQL database
interface StorageManager {
  setItem: (key: string, value: any) => Promise<boolean>;
  getItem: (key: string) => Promise<any>;
  removeItem: (key: string) => Promise<boolean>;
  isAvailable: () => boolean;
}

class DatabaseStorageManager implements StorageManager {
  private fallbackStorage: { [key: string]: any } = {};

  constructor() {
    console.log('Database storage manager initialized');
  }

  isAvailable(): boolean {
    // Database storage is always available via API
    return true;
  }

  async setItem(key: string, value: any): Promise<boolean> {
    try {
      const { setStorageItem } = await import('./databaseStorage');
      await setStorageItem(key, value);
      console.log(`Saved to database: ${key}`);
      return true;
    } catch (error) {
      console.error(`Failed to save ${key} to database:`, error);
      this.fallbackStorage[key] = value;
      return false;
    }
  }

  async getItem(key: string): Promise<any> {
    try {
      const { getStorageItem } = await import('./databaseStorage');
      const value = await getStorageItem(key, null);
      console.log(`Retrieved from database: ${key} = ${value}`);
      return value;
    } catch (error) {
      console.error(`Failed to retrieve ${key} from database:`, error);
      return this.fallbackStorage[key] || null;
    }
  }

  async removeItem(key: string): Promise<boolean> {
    try {
      const { removeStorageItem } = await import('./databaseStorage');
      await removeStorageItem(key);
      console.log(`Removed from database: ${key}`);
      delete this.fallbackStorage[key];
      return true;
    } catch (error) {
      console.error(`Failed to remove ${key} from database:`, error);
      delete this.fallbackStorage[key];
      return false;
    }
  }
}

export const storageManager = new DatabaseStorageManager();
export default storageManager;
