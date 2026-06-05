import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { refreshToken } from "../api/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const refresh = async () => {
    const res = await refreshToken();
    setAccessToken(res.data.accessToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
