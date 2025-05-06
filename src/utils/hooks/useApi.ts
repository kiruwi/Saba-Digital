import { useState, useCallback } from 'react';
import axios from 'axios';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export function useApi<T>() {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const makeRequest = useCallback(
    async (url: string, options: ApiOptions = {}) => {
      setResponse((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const { method = 'GET', headers, params, data } = options;
        const response = await axios.request<T>({
          url,
          method,
          headers,
          params,
          data,
        });

        setResponse({
          data: response.data,
          error: null,
          loading: false,
        });

        return response.data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setResponse({
          data: null,
          error: errorMessage,
          loading: false,
        });
        throw error;
      }
    },
    []
  );

  return {
    ...response,
    request: makeRequest,
  };
}
