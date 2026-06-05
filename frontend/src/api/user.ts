import api from "./axios";
import type { UserProfile } from "../types/auth";

export const getCurrentUser = () => api.get<UserProfile>("/auth/me");
