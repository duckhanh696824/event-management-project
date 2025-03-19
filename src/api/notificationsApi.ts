// src/api/notificationsApi.ts
import apiClient from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { handleApiError } from "../constants/handleResponse";

export interface Notification {
  id: number;
  title: string;         // event title từ backend
  heading: string;       // tiêu đề thông báo
  description: string;   // mô tả ngắn
  content: string;       // nội dung đầy đủ
  entity: string;        // loại entity (ví dụ: 'event')
  entity_id: number;     // ID của entity liên quan
  created_at: string;    // thời gian tạo
}

export const getNotifications = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.NOTIFICATIONS.GET_NOTIFICATIONS);
    return response.data; // { statusCode, message, data: { notifications: Notification[] } }
  } catch (error) {
    return handleApiError(error);
  }
};

export const getEventNotifications = async (eventId: number) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.NOTIFICATIONS.GET_EVENT_NOTIFICATIONS}?event_id=${eventId}`
    );
    return response.data; // { statusCode, message, data: { notifications: Notification[] } }
  } catch (error) {
    return handleApiError(error);
  }
};


// Optional: Thêm các hàm khác nếu cần
export const markAsRead = async (notificationId: number) => {
  try {
    const response = await apiClient.patch(
      `${API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ}/${notificationId}`
    );
    return response.data; // { statusCode, message }
  } catch (error) {
    return handleApiError(error);
  }
};