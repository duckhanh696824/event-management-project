import { ApiResponse } from "types/apiResponse";
import { showToast } from "utils/toast";

// Main function to handle successful API responses
export function handleApiResponse<T>(response: ApiResponse<T>): T {
  const { statusCode, message, data } = response;
  showToast({ statusCode, message });
  
  return data;
}

// Centralized error handling function - exported for external use
export const handleApiError = (error: any): never => {
  // Extract meaningful error message
  const errorMessage =
    error.response?.data?.message ||
    error.response?.data?.error ||
    "An unexpected error occurred";
  
  // Log the full error for debugging
  console.error("API Error Details:", {
    message: errorMessage,
    status: error.response?.status,
    data: error.response?.data,
  });
  
  // Show toast with error message
  showToast({ 
    statusCode: error.response?.status || 500, 
    message: errorMessage 
  });
  
  // Throw a standardized error
  throw new Error(errorMessage);
};
