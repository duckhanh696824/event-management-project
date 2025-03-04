import apiClient from "./api";
import { API_ENDPOINTS } from "constants/apiEndpoints";
import { handleApiResponse } from "constants/handleResponse";
import { ApiResponse } from "types/apiResponse";

// Định nghĩa UserInfo nếu chưa có
interface UserInfo {
    id: number;
    username: string;
    email: string;
    nickname: string;
    class_name: string;
    phone_number: string;
    is_verify_email: boolean;
    is_teacher: boolean;
    is_admin: boolean;
  }

export const getNickname = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.USERS.GET_NICKNAME);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await apiClient.get<ApiResponse<UserInfo>>(API_ENDPOINTS.USERS.GET_USER_INFO);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    return response.json();
  };

export const changePassword = async (password: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, { password });
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const changeEmail = async (email: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CHANGE_EMAIL, { email });
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async () => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.USERS.VERIFY_EMAIL);
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const changePhoneNumber = async (phone_number: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CHANGE_PHONE_NUMBER, { phone_number });
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

export const searchMssv = async (query: string) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.USERS.SEARCH_MSSV}?query=${query}`);
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

