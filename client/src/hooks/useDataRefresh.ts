
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface DataRefreshOptions {
  keys?: string[];
}

export const useDataRefresh = ({
  keys = []
}: DataRefreshOptions = {}) => {
  const queryClient = useQueryClient();

  const refreshData = useCallback(() => {
    if (keys.length > 0) {
      keys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    } else {
      // Refresh all queries if no specific keys provided
      queryClient.invalidateQueries();
    }
  }, [queryClient, keys]);

  return { refreshData };
};

// Helper function to trigger data change events manually only
export const triggerDataChange = (key: string) => {
  const event = new CustomEvent('dataChanged', { detail: { key } });
  window.dispatchEvent(event);
};
