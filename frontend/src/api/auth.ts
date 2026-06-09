import api from "./axios";

export interface LoginRequest {
  loginId: string;
  password: string;
}

export const login = (data: LoginRequest) =>
  api.post("/auth/login", { email: data.loginId, username: data.loginId, password: data.password });

export const loginWithGoogle = (idToken: string) =>
  api.post("/auth/google", { idToken });

export const refreshToken = () =>
  api.post("/auth/refresh");
