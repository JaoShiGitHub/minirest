import axios from "axios";

// Create a new Axios instance with base URL and credentials
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

// A variable to store the promise of a new access token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach the access token if it exists
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor: Handle 401 Unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // A flag to prevent infinite loops by checking if the request has already been retried
    if (error.response.status === 401 && !originalRequest._retry) {
      // If we are already refreshing, add the new failed request to the queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Set the retry flag and the refreshing flag
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // IMPORTANT: The refresh endpoint request MUST NOT be intercepted
        // This is handled by a separate function or endpoint logic
        const { data } = await axios.post(
          "http://localhost:4000/customer/refresh-token",
          {},
          { withCredentials: true }
        );

        // Assuming your backend returns a new access token
        const newAccessToken = data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update the access token for the original request and any queued requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        // Retry the original failed request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, clear everything and redirect to login
        localStorage.removeItem("accessToken");
        processQueue(refreshError);
        // You'll need to handle the redirection in your AuthProvider or component
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
