import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();

  if (!accessToken) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
