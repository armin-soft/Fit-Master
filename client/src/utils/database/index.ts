
/**
 * Online Database Utilities
 * Centralized management of PostgreSQL database operations with improved error handling and performance
 */

import { toast } from "@/hooks/use-toast";

/**
 * Generic type for database operations
 */
export type DBItem = {
  id: number;
  [key: string]: any;
};

/**
 * Safely parse JSON data from online database with improved error handling
 */
export const safeJSONParse = async <T>(key: string, fallback: T): Promise<T> => {
  try {
    // Use proper API endpoints instead of preferences system
    const response = await fetch(`/api/data/${encodeURIComponent(key)}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data as T;
    }
    return fallback;
  } catch (error) {
    console.error(`Error parsing ${key} from API:`, error);
    return fallback;
  }
};

/**
 * Safely save data to online database with error handling
 */
export const safeJSONSave = async <T>(key: string, data: T): Promise<boolean> => {
  try {
    // Use proper API endpoints instead of preferences system
    const response = await fetch(`/api/data/${encodeURIComponent(key)}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      return true;
    }
    throw new Error(`Failed to save ${key}`);
  } catch (error) {
    console.error(`Error saving ${key} to API:`, error);
    toast({
      variant: "destructive",
      title: "خطا در ذخیره سازی",
      description: `مشکلی در ذخیره اطلاعات ${key} پیش آمده است`
    });
    return false;
  }
};

/**
 * Trigger a database event to notify other tabs of data changes
 */
export const notifyDataChange = (key: string): void => {
  window.dispatchEvent(new Event('database-updated'));
};

/**
 * Get the next available ID for a collection
 */
export const getNextId = (items: DBItem[]): number => {
  return items.length > 0 
    ? Math.max(...items.map(item => item.id)) + 1 
    : 1;
};

/**
 * Database collection abstraction with CRUD operations using online PostgreSQL
 */
export class DBCollection<T extends DBItem> {
  private key: string;
  
  constructor(key: string) {
    this.key = key;
  }
  
  async getAll(): Promise<T[]> {
    return await safeJSONParse<T[]>(this.key, []);
  }
  
  async getById(id: number): Promise<T | undefined> {
    const items = await this.getAll();
    return items.find(item => item.id === id);
  }
  
  async save(item: T): Promise<boolean> {
    const items = await this.getAll();
    const index = items.findIndex(i => i.id === item.id);
    
    if (index >= 0) {
      items[index] = item;
    } else {
      item.id = getNextId(items);
      items.push(item);
    }
    
    const result = await safeJSONSave(this.key, items);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  async saveAll(newItems: T[]): Promise<boolean> {
    const result = await safeJSONSave(this.key, newItems);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  async delete(id: number): Promise<boolean> {
    const items = await this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) {
      return false; // Item not found
    }
    
    const result = await safeJSONSave(this.key, filteredItems);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  async deleteMany(ids: number[]): Promise<boolean> {
    const items = await this.getAll();
    const filteredItems = items.filter(item => !ids.includes(item.id));
    
    const result = await safeJSONSave(this.key, filteredItems);
    if (result) notifyDataChange(this.key);
    return result;
  }
  
  async clear(): Promise<boolean> {
    const result = await safeJSONSave(this.key, []);
    if (result) notifyDataChange(this.key);
    return result;
  }
}

/**
 * Create a database collection instance
 */
export function createCollection<T extends DBItem>(key: string): DBCollection<T> {
  return new DBCollection<T>(key);
}
