
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface UseDataRefreshOptions {
  keys: string[];
  interval?: number;
  onStorageChange?: boolean;
}

// Global event emitter for data changes
const dataChangeEvents = new Map<string, Set<() => void>>();

export const triggerDataChange = (key: string) => {
  const listeners = dataChangeEvents.get(key);
  if (listeners) {
    listeners.forEach(listener => listener());
  }
  
  // Also trigger global storage event
  window.dispatchEvent(new StorageEvent('storage', { key }));
};

export const useDataRefresh = ({ keys, interval = 5000, onStorageChange = true }: UseDataRefreshOptions) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const refreshQueries = () => {
      keys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    };

    // Set up interval refresh
    const intervalId = setInterval(refreshQueries, interval);

    // Set up storage change listeners
    const handleStorageChange = (e: StorageEvent) => {
      if (keys.includes(e.key || '')) {
        refreshQueries();
      }
    };

    // Set up custom event listeners
    const listeners = new Set<() => void>();
    const refreshHandler = () => refreshQueries();
    
    keys.forEach(key => {
      if (!dataChangeEvents.has(key)) {
        dataChangeEvents.set(key, new Set());
      }
      dataChangeEvents.get(key)!.add(refreshHandler);
      listeners.add(refreshHandler);
    });

    if (onStorageChange) {
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      clearInterval(intervalId);
      
      if (onStorageChange) {
        window.removeEventListener('storage', handleStorageChange);
      }
      
      // Clean up custom event listeners
      keys.forEach(key => {
        const keyListeners = dataChangeEvents.get(key);
        if (keyListeners) {
          listeners.forEach(listener => keyListeners.delete(listener));
        }
      });
    };
  }, [keys, interval, onStorageChange, queryClient]);
};
