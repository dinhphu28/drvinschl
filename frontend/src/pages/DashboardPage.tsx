import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getCurrentUser } from "../api/user";
import type { Role } from "../types/auth";

const roleRoutes: Record<Role, string> = {
  HOC_VIEN: "/mobile-only",
  KINH_DOANH: "/sales",
  KE_TOAN: "/accounting",
  GIAO_VU_KHU_VUC: "/ops",
  GIAO_VU_SA_HINH: "/ops",
  GIAO_VU_THI: "/exams",
  GIAO_VIEN: "/teacher",
  QUAN_LY_KHU_VUC: "/area-manager",
  ADMIN: "/admin",
  GIAM_DOC: "/director",
};

const DashboardPage = () => {
  const { accessToken, user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;

    const load = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
        const route = roleRoutes[res.data.role];
        navigate(route, { replace: true });
      } catch {
        navigate("/login", { replace: true });
      }
    };

    if (user) {
      navigate(roleRoutes[user.role], { replace: true });
    } else {
      load();
    }
  }, [accessToken, user, setUser, navigate]);

  return <p>Loading...</p>;
};

export default DashboardPage;
