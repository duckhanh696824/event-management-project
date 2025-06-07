import { Event, EventType, Semester, AcademicYear } from "types/eventTypes";
import {
  API_ENDPOINTS,
  generateDynamicEndpoint,
} from "../constants/apiEndpoints";
import { ApiResponse } from "types/apiResponse";
// Import the custom API client
import apiClient from "./api";
import { handleApiResponse, handleApiError } from "constants/handleResponse";
import { showToast } from "utils/toast";

interface DropdownDataResponse {
  statusCode: number;
  message: string;
  data: {
    semesters: Semester[];
    academicYears: AcademicYear[];
    eventTypes: EventType[];
  };
}

export const fetchDropdownData = async (): Promise<
  DropdownDataResponse["data"]
> => {
  try {
    const response = await apiClient.get<DropdownDataResponse>(
      API_ENDPOINTS.DROPDOWN.DROPDOWN,
    );
    const dropdownData = (
      response.data as { data: DropdownDataResponse["data"] }
    ).data;
    return dropdownData;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createEvent = async (
  eventData: Event & { event_type_id: string },
): Promise<ApiResponse<Event>> => {
  const formData = new FormData();

  // Append all event data fields to FormData
  Object.keys(eventData).forEach((key) => {
    const value = eventData[key as keyof Event];
    if (value !== null && value !== undefined) {
      // Special handling for base64 image
      if (key === "image") {
        console.log("Image base64 being appended:", value); // Add this log
        formData.append("image", eventData.image);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  try {
    const response = await apiClient.post(
      API_ENDPOINTS.EVENTS.CREATE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return handleApiResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};
export const getEvents = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.GET_ALL);

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getEventById = async (id: string): Promise<ApiResponse<Event>> => {
  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.EVENTS.GET_ID, id);
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateEvent = async (
  id: string,
  eventData: Event,
): Promise<ApiResponse<Event>> => {
  const formData = new FormData();

  // Append all event data fields to FormData
  Object.keys(eventData).forEach((key) => {
    const value = eventData[key as keyof Event];
    if (value !== null && value !== undefined) {
      // Xử lý riêng trường hợp 'image'
      if (key === "image") {
        if (typeof eventData.image === "string" && eventData.image.startsWith("data:")) {
          // Nếu là base64
          formData.append("image", eventData.image);
        } else if (eventData.image as any instanceof File) {
          // Nếu là file
          formData.append("image", eventData.image);
        } else {
          console.warn("Image format is not valid");
        }
      } else {
        // Xử lý các trường khác
        formData.append(key, String(value));
      }
    }
  });

  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.EVENTS.UPDATE, id);
    const response = await apiClient.post(
      endpoint,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return handleApiResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteEvent = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const endpoint = generateDynamicEndpoint(API_ENDPOINTS.EVENTS.DELETE, id);
    const response = await apiClient.delete(endpoint);
    return handleApiResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

export const toggleRegistration = async (
  event_id: string,
): Promise<ApiResponse<{ is_registered: boolean }>> => {
  try {
    const response = await apiClient.post(
      `${API_ENDPOINTS.EVENTS.TOGGLE_REGISTRATION}?event_id=${event_id}`,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllRegistrations = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.EVENTS.GET_ALL_REGISTRATION,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllRegistrationUsers = async (
  eventId: string,
): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.EVENTS.REGISTRATION_USER}?eventId=${eventId}`,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Thêm hàm getRegistrationStatus
export const getRegistrationStatus = async (
  event_id: string,
): Promise<ApiResponse<{ is_registered: boolean }>> => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.EVENTS.REGISTRATION_STATUS}?eventId=${event_id}`,
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadEventImage = async (
  file: File,
): Promise<{ data: { base64Image: string } }> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await apiClient.post(
      API_ENDPOINTS.EVENTS.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // Log để kiểm tra phản hồi từ API
    console.log("Upload Image Response:", response);

    // Đảm bảo dữ liệu trả về từ API có chứa base64Image
    return response.data; // Phản hồi sẽ chứa { base64Image: "..." }
  } catch (error) {
    console.error("Image upload failed", error);
    throw new Error("Tải ảnh thất bại");
  }
};

export const getMyRegisteredEvents = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.MY_REGISTERED_EVENTS);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createEventCheckin = async (
  eventId: string, 
  times: number = 1, 
  refreshSec: number = 60
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.EVENTS.CREATE_CHECKIN, 
      {
        event_id: eventId,
        times: times,
        refresh_sec: refreshSec
      }
    );
    return handleApiResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getEventCheckins = async (
  eventId: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.EVENTS.GET_CHECKIN, 
      {
        event_id: eventId
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const generateCheckinQR = async (
  checkinDetailId: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.EVENTS.GENERATE_QR, 
      {
        checkin_detail_id: checkinDetailId
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
/**
 * Handles check-in or check-out action for an event
 */
export const handleCheckInOut = async (
  eventId: string,
  actionType: 'checkin' | 'checkout'
): Promise<ApiResponse<any>> => {
  try {
    const checkinsResponse = await getEventCheckins(eventId);
    
    if (checkinsResponse.statusCode !== 200) {
      return {
        statusCode: checkinsResponse.statusCode || 500,
        message: checkinsResponse.message || 'Failed to get check-in sessions',
        data: null
      };
    }

    const targetSession = checkinsResponse.data?.find((session: any) => 
      actionType === 'checkin' ? session.order === 1 : session.order === 2
    );

    if (!targetSession) {
      return {
        statusCode: 404,
        message: `${actionType} session not found`,
        data: null
      };
    }

    const qrResponse = await generateCheckinQR(targetSession.checkindetail_id);
    
    return {
      ...qrResponse,
      data: {
        ...qrResponse.data,
        actionType
      }
    };
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Gets check-in status for an event
 */
export const getCheckInStatus = async (
  eventId: string
): Promise<ApiResponse<{
  canCheckIn: boolean;
  canCheckOut: boolean;
  nextAction: string;
}>> => {
  try {
    const response = await getEventCheckins(eventId);
    
    if (response.statusCode !== 200 || !response.data) {
      return {
        statusCode: response.statusCode || 500,
        message: response.message || 'Failed to get check-in status',
        data: {
          canCheckIn: false,
          canCheckOut: false,
          nextAction: ''
        }
      };
    }

    const sessions = response.data;
    const checkinSession = sessions.find((s: any) => s.order === 1);
    const checkoutSession = sessions.find((s: any) => s.order === 2);

    return {
      statusCode: 200,
      message: "Success",
      data: {
        canCheckIn: checkinSession?.status === 0,
        canCheckOut: Boolean(checkoutSession?.status === 0 && checkinSession?.status === 1),
        nextAction: checkinSession?.status === 0 ? 'checkin' : 
                  checkoutSession?.status === 0 ? 'checkout' : ''
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: 'An error occurred while getting check-in status',
      data: {
        canCheckIn: false,
        canCheckOut: false,
        nextAction: ''
      }
    };
  }
};

export const manualCheckIn = async (
  checkinDetailId: string,
  username: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.EVENTS.MANUAL_CHECKIN,
      {
        checkin_detail_id: checkinDetailId,
        username: username
      }
    );
    return handleApiResponse(response.data);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Gets the list of students who have checked in for a specific check-in session
 * @param checkinDetailId The ID of the check-in detail/session
 * @returns ApiResponse with the list of checked-in students
 */
export const getCheckedInStudents = async (
  checkinDetailId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.EVENTS.GET_CHECKIN_RESULTS}?checkin_detail_id=${checkinDetailId}&page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};