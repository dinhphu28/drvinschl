import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { refreshToken } from "../api/auth";
import type { UserProfile } from "../types/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(
    () => sessionStorage.getItem("accessToken")
  );

  const setAccessToken = (token: string | null) => {
    if (token) {
      sessionStorage.setItem("accessToken", token);
    } else {
      sessionStorage.removeItem("accessToken");
    }
    setAccessTokenState(token);
  };
  const [user, setUser] = useState<UserProfile | null>(null);

  const refresh = async () => {
    const res = await refreshToken();
    setAccessToken(res.data.accessToken);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, setAccessToken, setUser, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
