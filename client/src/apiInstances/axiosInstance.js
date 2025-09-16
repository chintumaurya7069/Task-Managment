import axios from "axios";
import { BACKEND_BASE_URL } from "./baseurl";

const BACKEND_URL = BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.set("Accept", "application/json");
    config.headers.set("Content-Type", "application/json");
    return config;
  },
  (error) => {
    return Promise.resolve({ error: error.message });
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("🚀 ~ error:", error);
    if (error.response) {
      const errorResponse = {
        success: false,
        status: error.response.status,
        data: error.response.data, // Return API error response
      };
      console.log("🚀 ~ errorResponse:", errorResponse);
      return Promise.reject(errorResponse);
    }
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
);

export default axiosInstance;
