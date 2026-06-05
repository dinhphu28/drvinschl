import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://localhost:8080/api/v1";

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, username: email, password });
  return res.data;
}

export async function getProfile() {
  const res = await api.get("/students/profile");
  return res.data;
}

export async function getProgress() {
  const res = await api.get("/students/progress");
  return res.data;
}

export async function getPayments() {
  const res = await api.get("/students/payments");
  return res.data;
}

export async function getExams() {
  const res = await api.get("/students/exams");
  return res.data;
}
