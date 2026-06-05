import { createContext } from "react";
import type { UserProfile } from "../types/auth";

export interface AuthContextType {
  accessToken: string | null;
  user: UserProfile | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: UserProfile | null) => void;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
