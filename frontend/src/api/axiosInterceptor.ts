import api from "./axios";
import { refreshToken } from "./auth";

let isRefreshing = false;

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        const res = await refreshToken();
        sessionStorage.setItem("accessToken", res.data.accessToken);
        isRefreshing = false;
        err.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(err.config);
      } catch (e) {
        isRefreshing = false;
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);
