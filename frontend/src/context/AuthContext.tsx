import { createContext } from "react";

export interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);
