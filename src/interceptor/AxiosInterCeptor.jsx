import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jobsportalbackend-2.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setUpResponseInterceptor = (logoutCallback) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (logoutCallback) {
          logoutCallback(); // clears token + redirect
        } else {
          localStorage.removeItem("token");
          window.location.href = "/login"; 
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
