import { CertifiedEvent } from "types/certificateEventTypes";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import apiClient from "./api";
import { handleApiResponse, handleApiError } from "constants/handleResponse";
import { showToast } from "utils/toast";

/**
 * Lấy danh sách giấy chứng nhận đã cấp cho người dùng
 */
export const fetchMyCertifiedEvents = async (): Promise<CertifiedEvent[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CERTIFICATES.MY_CERTIFICATES);
    return response.data.data;
  } catch (error) {
    const handledError = handleApiError(error);
    showToast({ statusCode: 400, message: handledError });
    return [];
  }
};


/**
 * Lấy thông tin chi tiết giấy chứng nhận theo ID
 * @param id ID của sự kiện
 */
export const getCertifiedEventById = async (id: number): Promise<CertifiedEvent | null> => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.CERTIFICATES.GET_BY_ID}?id=${id}`
    );
    return response.data.data;
  } catch (error) {
    const handledError = handleApiError(error);
    showToast({ statusCode: 400, message: handledError });
    return null;
  }
};

