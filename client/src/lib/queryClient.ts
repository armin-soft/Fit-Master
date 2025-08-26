import { QueryClient } from "@tanstack/react-query";

import { getBasePath } from "@/utils/basePath";

// API Base URL configuration - auto-adapts to deployment path
const getApiBaseUrl = () => {
  const basePath = getBasePath();
  return basePath ? `${basePath}/api` : "./api";
};

// Default fetcher function for React Query with better error handling
const defaultFetcher = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url, {
      credentials: 'include', // Include cookies for session management
    });
    
    if (!response.ok) {
      console.error(`HTTP Error [GET ${url}]: ${response.status}`);
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    // Check content type before parsing as JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      console.warn(`Expected JSON response but got ${contentType} for GET ${url}`);
      const responseText = await response.text();
      console.warn(`Response text:`, responseText.substring(0, 200));
      throw new Error(`Invalid response type: expected JSON but got ${contentType || 'unknown'}`);
    }
  } catch (error) {
    // Handle network errors properly
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error(`Network Error [GET ${url}]: Unable to connect to server`);
      throw new Error('Unable to connect to server. Please check your connection.');
    }
    // Handle JSON parsing errors
    if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
      console.error(`JSON Parse Error [GET ${url}]: Server returned non-JSON response`);
      throw new Error('Server returned invalid response format. Please check server configuration.');
    }
    console.error(`Fetch Error [GET ${url}]:`, error);
    throw error;
  }
};

// API request helper for mutations with better error handling
export const apiRequest = async (
  url: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
  } = {}
): Promise<any> => {
  const { method = "GET", body, headers = {} } = options;
  
  const config: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const apiBaseUrl = getApiBaseUrl();
    const response = await fetch(`${apiBaseUrl}${url}`, config);
    
    if (!response.ok) {
      // Check content type before trying to parse as JSON
      const contentType = response.headers.get('content-type');
      let errorData: any = {};
      
      if (contentType && contentType.includes('application/json')) {
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.warn(`Failed to parse error response as JSON for ${method} ${url}:`, jsonError);
        }
      } else {
        // If it's HTML or other content type, read as text for debugging
        try {
          const errorText = await response.text();
          console.warn(`Non-JSON error response for ${method} ${url}:`, errorText.substring(0, 200));
        } catch (textError) {
          console.warn(`Failed to read error response for ${method} ${url}:`, textError);
        }
      }
      
      const error = new Error(errorData.error || `HTTP Error: ${response.status}`);
      console.error(`API Error [${method} ${url}]:`, error.message);
      throw error;
    }
    
    // Check content type for successful responses too
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      console.warn(`Expected JSON response but got ${contentType} for ${method} ${url}`);
      return response.text();
    }
  } catch (error) {
    // Log network errors properly
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error(`Network Error [${method} ${url}]: Unable to connect to server`);
      throw new Error('Unable to connect to server. Please check your connection.');
    }
    console.error(`Request Error [${method} ${url}]:`, error);
    throw error;
  }
};

// Create and configure the Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => {
        const [url] = queryKey as [string];
        return defaultFetcher(url);
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error.message.includes('401')) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});