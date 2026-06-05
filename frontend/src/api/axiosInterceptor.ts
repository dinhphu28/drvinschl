import api from "./axios";
import { refreshToken } from "./auth";

let isRefreshing = false;

api.interceptors.response.use(
  res => res,
  async (err) => {
    if (err.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        await refreshToken();
        isRefreshing = false;
        return api(err.config);
      } catch (e) {
        isRefreshing = false;
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);
