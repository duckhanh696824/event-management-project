// src/constants/apiConfig.ts
export const API_BASE_URL = "http://157.20.82.3:9000/api";

export const API_ENDPOINTS = {
  EVENTS: {
    CREATE: `${API_BASE_URL}/event/create`,
    GET_ALL: `${API_BASE_URL}/event/get-all`,
    GET_ID: `${API_BASE_URL}/event/get-by-id`,
    UPDATE: `${API_BASE_URL}/event/update`,
    DELETE: `${API_BASE_URL}/event/delete`,
    GET_ALL_REGISTRATION: `${API_BASE_URL}/event-registration/get-all`,
    TOGGLE_REGISTRATION: `${API_BASE_URL}/event-registration/toggle`,
    REGISTRATION_STATUS: `${API_BASE_URL}/event-registration/get-registration-status`,
    UPLOAD_IMAGE: `${API_BASE_URL}/event/upload-image`,
    REGISTRATION_USER: `${API_BASE_URL}/event-registration/get-registered-users`,
    UPLOAD_POSTER: `${API_BASE_URL}/event/upload-poster`,
    UPDATE_QR_POSITION: `${API_BASE_URL}/event/update-qr-position`,
    GET_POSTER_DATA: `${API_BASE_URL}/event/get-poster-data`,
  },
  EVENT_TYPES: {
    GET_ALL: `${API_BASE_URL}/event-type/get-all`,
    GET_ID: `${API_BASE_URL}/event-type/get-by-id`,
    CREATE: `${API_BASE_URL}/event-type/create`,
    UPDATE: `${API_BASE_URL}/event-type/update`,
    DELETE: `${API_BASE_URL}/event-type/delete`,
  },
  DROPDOWN: {
    DROPDOWN: `${API_BASE_URL}/event/dropdown-data`,
  },
  USERS: {
    GET_NICKNAME: `${API_BASE_URL}/user/get-nickname`,
    GET_USER_INFO: `${API_BASE_URL}/user/get-user-info`,
    CHANGE_PASSWORD: `${API_BASE_URL}/user/change-password`,
    CHANGE_EMAIL: `${API_BASE_URL}/user/change-email`,
    VERIFY_EMAIL: `${API_BASE_URL}/user/verify-email`,
    CHANGE_PHONE_NUMBER: `${API_BASE_URL}/user/change-phone-number`,
    SEARCH_MSSV: `${API_BASE_URL}/user/search-mssv`,
  },
} as const;

export const generateDynamicEndpoint = (baseEndpoint: string, id?: string) => {
  return id ? `${baseEndpoint}?id=${id}` : baseEndpoint;
};
