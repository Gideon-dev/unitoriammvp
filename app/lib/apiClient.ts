import axios from "axios";
import { signOut, getSession } from "next-auth/react";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "https://tutormeapi-6w2f.onrender.com/api/v2/",
  withCredentials: true, // Ensure cookies (sessions) are sent
});

// Request Interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Check if this request requires authentication
    if (config.headers.requiresAuth !== false) {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handles Token Refresh)
apiClient.interceptors.response.use(
  (response) => response, // Return response if OK
  async (error) => {
    const originalRequest = error.config;

    // If token expired & this request is not already retrying
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      try {
        const refreshResponse = await axios.post("/api/auth/refreshToken");
        const newAccessToken = refreshResponse.data.accessToken;

        // Update session with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest); // Retry request with new token
      } catch (refreshError) {
        console.error("Refresh Token Expired. Signing out...", refreshError);
        signOut(); // Log the user out
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
