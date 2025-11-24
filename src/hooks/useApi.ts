import { useState, useCallback } from "react";
import api from "../services/api";
import type { ApiResponse } from "../types";

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(
    async <T>(
      method: "get" | "post" | "put" | "delete",
      url: string,
      data?: any,
      options?: UseApiOptions
    ): Promise<ApiResponse<T> | null> => {
      setLoading(true);
      setError(null);

      console.log(`🚀 Llamando API: ${method.toUpperCase()} ${url}`, data);

      try {
        const response = await api({
          method,
          url,
          data
        });
        
        const result: ApiResponse<T> = response.data;
        console.log('✅ Respuesta del servidor:', result);

        if (result.success && options?.onSuccess) {
          options.onSuccess(result.data); 
        }

        if (!result.success && options?.onError) {
          options.onError(result.error || "Error desconocido");
        }

        return result;
      } catch (err: any) {
        console.error('❌ Error completo:', err);
        
        // Mejor manejo de errores
        const errorMessage = err.response?.data?.error || 
                           err.response?.data?.message || 
                           err.message || 
                           "Error de conexión";
        
        setError(errorMessage);

        if (options?.onError) {
          options.onError(errorMessage);
        }

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    callApi,
    clearError,
  };
};