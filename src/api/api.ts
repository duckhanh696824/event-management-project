import axios from "axios";
import { API_BASE_URL } from "constants/apiEndpoints";
import { logoutApi } from "./Authapi";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

// Lấy token từ sessionStorage
const getAuthToken = () => {
  const authTokenString = sessionStorage.getItem("authToken");
  return authTokenString ? JSON.parse(authTokenString) : null;
};

// Thêm interceptor cho request để gắn Authorization
apiClient.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();
    if (authToken?.access_token) {
      config.headers.Authorization = `Bearer ${authToken.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Biến kiểm tra tránh loop refresh token vô hạn
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Hàm gọi API refresh token
const refreshToken = async () => {
  const authToken = getAuthToken();
  if (!authToken || !authToken.refresh_token) {
    throw new Error("Không tìm thấy refresh token");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
      refresh_token: authToken.refresh_token,
    });

    const newToken = response.data.data.token;
    sessionStorage.setItem("authToken", JSON.stringify(newToken));

    // Gọi lại tất cả request đã chờ
    refreshSubscribers.forEach((callback) => callback(newToken.access_token));
    refreshSubscribers = [];

    return newToken.access_token;
  } catch (error) {
    throw error;
  }
};

// Interceptor xử lý lỗi 401 (Unauthorized)
apiClient.interceptors.response.use(
  (response) => response, // Nếu response thành công, trả về luôn
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đã có refresh token đang chạy, chờ token mới
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshToken();
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        logoutApi(); // Đăng xuất nếu refresh thất bại
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
