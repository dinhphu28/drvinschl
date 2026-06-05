import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { Role } from "../types/auth";
import type { JSX } from "react";

const RoleRoute = ({ children, roles }: { children: JSX.Element; roles: Role[] }) => {
  const { accessToken, user } = useAuth();

  if (!accessToken) return <Navigate to="/login" />;
  if (user && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

export default RoleRoute;
