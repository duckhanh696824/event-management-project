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
    MY_REGISTERED_EVENTS: `${API_BASE_URL}/event-registration/my-events`,
    UPLOAD_POSTER: `${API_BASE_URL}/event/upload-poster`,
    UPDATE_QR_POSITION: `${API_BASE_URL}/event/update-qr-position`,
    GET_POSTER_DATA: `${API_BASE_URL}/event/get-poster-data`,
    CREATE_CHECKIN: `${API_BASE_URL}/event-checkin/create-check-in`,
    GENERATE_QR: `${API_BASE_URL}/event-checkin/generate-qr`,
    GET_CHECKIN: `${API_BASE_URL}/event-checkin/get-check-in`,
    MANUAL_CHECKIN: `${API_BASE_URL}/event-checkin/manual-check-in`,
    GET_CHECKIN_RESULTS: `${API_BASE_URL}/event-checkin/get-check-in-results`,
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
  NOTIFICATIONS: {
    GET_EVENT_NOTIFICATIONS: `${API_BASE_URL}/notification/get-event-notifications`,
    GET_NOTIFICATIONS: `${API_BASE_URL}/notification/get-notifications`,
    MARK_AS_READ: `${API_BASE_URL}/notification/mark-as-read`,
    CREATE_EVENT_NOTIFICATION: `${API_BASE_URL}/notification/create-event-notification`,
    POST_NOTIFY: `${API_BASE_URL}/event-registration/notify-registered-users`,
  },
  CHECKINS: {
    CHECKIN: `${API_BASE_URL}/check-in/check-in`,                         // API check-in
    GET_CHECKIN_LIST_BY_EVENT: `${API_BASE_URL}/check-in/get-check-in-list`, // Lấy danh sách check-in theo event
    GET_CHECKIN_HISTORY: `${API_BASE_URL}/check-in/history`,             // Lịch sử check-in của user
    CHECKIN_BY_QR: `${API_BASE_URL}/check-in/check-in-by-qr`,            // Check-in bằng QR
  },
  CERTIFICATE_TEMPLATE: {
    GET_ALL: `${API_BASE_URL}/certificate-template/get-all`,
    GET_BY_ID: `${API_BASE_URL}/certificate-template/get-by-id`,
    CREATE: `${API_BASE_URL}/certificate-template/create`,
    UPDATE: `${API_BASE_URL}/certificate-template/update`,
    DELETE: `${API_BASE_URL}/certificate-template/delete`,
    UPLOAD_BACKGROUND: `${API_BASE_URL}/certificate-template/upload-background`,
    DROPDOWN_DATA: `${API_BASE_URL}/certificate-template/dropdown-data`,
  },
  CERTIFICATES: {
    MY_CERTIFICATES: `${API_BASE_URL}/certificate-event/my-certified-events`,
    GET_BY_ID: `${API_BASE_URL}/certificate-event/view`,
  },
} as const;

export const generateDynamicEndpoint = (baseEndpoint: string, id?: string) => {
  return id ? `${baseEndpoint}?id=${id}` : baseEndpoint;
};
