import api from "./axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
}

export interface AuthenticationResponse {
  accessToken: string;
  accessTokenExpiration: number;
}

export const login = (data: LoginRequest) =>
  api.post("/auth/login", data);

export const refreshToken = () =>
  api.post("/auth/refresh");
