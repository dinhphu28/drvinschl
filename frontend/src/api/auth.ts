import api from "./axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export const login = (data: LoginRequest) =>
  api.post("/auth/login", data);

export const loginWithGoogle = (idToken: string) =>
  api.post("/auth/google", { idToken });

export const refreshToken = () =>
  api.post("/auth/refresh");
