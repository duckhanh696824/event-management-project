import { CertificateTemplate, CreateCertificateTemplatePayload } from "types/certificateTemplateTypes";
import { API_ENDPOINTS, generateDynamicEndpoint } from "../constants/apiEndpoints";
import apiClient from "./api";
import { handleApiResponse, handleApiError } from "constants/handleResponse";
import { showToast } from "utils/toast";
import { EventType } from "types/eventTypes";

export const fetchCertificateTemplates = async (): Promise<CertificateTemplate[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CERTIFICATE_TEMPLATE.GET_ALL);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCertificateTemplateById = async (
  id: string
): Promise<CertificateTemplate> => {
  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.CERTIFICATE_TEMPLATE.GET_BY_ID, id);
    const response = await apiClient.get(endpoint);
    console.log("API response in getCertificateTemplateById:", response.data);
    const data = handleApiResponse(response.data);

    const rawData = handleApiResponse(response.data) as any; // 👈 ép kiểu tạm là any hoặc định nghĩa type rõ hơn

    // Parse field_positions_json thành object
    const field_positions =
      typeof rawData.field_positions_json === "string"
        ? JSON.parse(rawData.field_positions_json)
        : {};

    return {
      ...rawData,
      field_positions,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createCertificateTemplate = async (
  payload: CreateCertificateTemplatePayload
): Promise<CertificateTemplate> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CERTIFICATE_TEMPLATE.CREATE, payload);
    const data = handleApiResponse<CertificateTemplate>(response.data);
    showToast({ statusCode: 200, message: "Tạo mẫu thành công" });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCertificateTemplate = async (
  id: string,
  payload: Partial<CreateCertificateTemplatePayload>
): Promise<CertificateTemplate> => {
  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.CERTIFICATE_TEMPLATE.UPDATE, id);
    const response = await apiClient.post(endpoint, payload);
    const data = handleApiResponse<CertificateTemplate>(response.data);
    showToast({ statusCode: 200, message: "Cập nhật mẫu thành công" });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteCertificateTemplate = async (
  id: string
): Promise<void> => {
  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.CERTIFICATE_TEMPLATE.DELETE, id);
    const response = await apiClient.delete(endpoint);
    handleApiResponse(response.data);
    showToast({ statusCode: 200, message: "Xóa mẫu thành công" });
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadTemplateBackground = async (
  templateId: string,
  file: File
): Promise<{ base64Image: string }> => {
  const formData = new FormData();
  formData.append("background", file);

  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.CERTIFICATE_TEMPLATE.UPLOAD_BACKGROUND, templateId);
    const response = await apiClient.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const data = handleApiResponse<{ base64Image: string }>(response.data);
    showToast({ statusCode: 200, message: "Upload nền thành công" });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchCertificateTemplateDropdown = async (): Promise<{
  eventTypes: EventType[];
}> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CERTIFICATE_TEMPLATE.DROPDOWN_DATA);
    const data = (response.data as { data: { eventTypes: { id: string; name: string }[] } }).data;
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
