// src/api/checkinApi.ts
import apiClient from "./api";
import { API_ENDPOINTS } from "constants/apiEndpoints";
import { handleApiResponse } from "constants/handleResponse";
import { ApiResponse } from "types/apiResponse";

// Định nghĩa kiểu dữ liệu nếu cần
interface CheckInData {
  user_id: number;
  event_id: number;
  check_in_time: string;
}

interface CheckInHistory {
  event_id: number;
  event_name: string;
  check_in_time: string;
}

// API thực hiện check-in
export const checkIn = async (data: { event_id: number }) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CHECKINS.CHECKIN, data);
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

// API check-in bằng QR code
export const checkInByQR = async (qrCode: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CHECKINS.CHECKIN_BY_QR, { qr_code: qrCode });
    return handleApiResponse(response.data);
  } catch (error) {
    throw error;
  }
};

// API lấy danh sách check-in của 1 event
export const getCheckInListByEvent = async (eventId: number) => {
  try {
    const response = await apiClient.get<ApiResponse<CheckInData[]>>(
      `${API_ENDPOINTS.CHECKINS.GET_CHECKIN_LIST_BY_EVENT}?event_id=${eventId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// API lấy lịch sử check-in của user
export const getCheckInHistory = async () => {
  try {
    const response = await apiClient.get<ApiResponse<CheckInHistory[]>>(API_ENDPOINTS.CHECKINS.GET_CHECKIN_HISTORY);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
