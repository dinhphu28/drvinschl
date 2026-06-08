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

export async function getAvailableSlots(type: string) {
  const res = await api.get("/students/slots", { params: { type } });
  return res.data;
}

export async function getBookings() {
  const res = await api.get("/students/bookings");
  return res.data;
}

export async function bookSlot(slotId: string) {
  const res = await api.post("/students/bookings", { slotId });
  return res.data;
}

export async function cancelBooking(bookingId: string) {
  const res = await api.post(`/students/bookings/${bookingId}/cancel`);
  return res.data;
}

export async function rateTeacher(bookingId: string, rating: number, comment: string) {
  const res = await api.post(`/students/bookings/${bookingId}/rate`, { rating, comment });
  return res.data;
}

export async function registerExtra(type: "DUONG_TRUONG" | "SA_HINH", hours: number) {
  const res = await api.post("/students/extra-registration", null, { params: { type, hours } });
  return res.data;
}

export async function getExtraRegistrations() {
  const res = await api.get("/students/extra-registrations");
  return res.data;
}

export async function registerRetake(sessionId: string) {
  const res = await api.post(`/students/exams/${sessionId}/retake`);
  return res.data;
}
