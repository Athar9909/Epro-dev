import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

let userType = null;

export const setUserType = (type) => {
  userType = type;
};

const setAuthHeaders = (config) => {
  const token = localStorage.getItem("token-user-proc");

  if (token) {
    config.headers["x-auth-token-user"] = token;
  }

  if (userType) {
    config.headers["x-auth-user-type"] =
      userType === "buyer" ? "User" : "Vendor";
  }

  return config;
};

apiClient.interceptors.request.use(setAuthHeaders);

const errorCallBack = (error) => {
  const status = error?.response?.status;
  if (!error.response) {
    console.error("🚨 Network error:", error.message);
  } else if (status >= 400 && status < 500) {
    console.warn("⚠️ Client error:", status, error.response.data.message);
  } else {
    console.error(
      "❌ Server error:",
      status,
      error.response?.data?.message || error.message
    );
  }

  return Promise.reject(error);
};

apiClient.interceptors.response.use((res) => res, errorCallBack);

const apiService = {
  get: async (...args) => {
    const response = await apiClient.get(...args);
    return response.data;
  },
  post: async (...args) => {
    const response = await apiClient.post(...args);
    return response.data;
  },
  put: async (...args) => {
    const response = await apiClient.put(...args);
    return response.data;
  },
  delete: async (...args) => {
    const response = await apiClient.delete(...args);
    return response.data;
  },
  patch: async (...args) => {
    const response = await apiClient.patch(...args);
    return response.data;
  },
};

export default apiService;
