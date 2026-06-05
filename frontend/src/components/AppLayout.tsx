import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useAuth } from "../context/useAuth";
import type { Role } from "../types/auth";

interface NavItem {
  label: string;
  path: string;
}

const roleNav: Partial<Record<Role, NavItem[]>> = {
  ADMIN: [
    { label: "Gói học", path: "/admin" },
  ],
  KINH_DOANH: [
    { label: "Học viên", path: "/sales" },
  ],
  KE_TOAN: [
    { label: "Học phí", path: "/accounting" },
  ],
  GIAO_VU_KHU_VUC: [
    { label: "Lịch học", path: "/ops" },
  ],
  GIAO_VU_SA_HINH: [
    { label: "Lịch sa hình", path: "/ops" },
  ],
  GIAO_VU_THI: [
    { label: "Quản lý thi", path: "/exams" },
  ],
  GIAO_VIEN: [
    { label: "Lịch dạy", path: "/teacher" },
  ],
  QUAN_LY_KHU_VUC: [
    { label: "Khu vực", path: "/area-manager" },
  ],
  GIAM_DOC: [
    { label: "Tổng quan", path: "/director" },
  ],
};

const roleLabels: Record<Role, string> = {
  HOC_VIEN: "Học viên",
  KINH_DOANH: "Kinh doanh",
  KE_TOAN: "Kế toán",
  GIAO_VU_KHU_VUC: "Giáo vụ khu vực",
  GIAO_VU_SA_HINH: "Giáo vụ sa hình",
  GIAO_VU_THI: "Giáo vụ thi",
  GIAO_VIEN: "Giáo viên",
  QUAN_LY_KHU_VUC: "Quản lý khu vực",
  ADMIN: "Quản trị",
  GIAM_DOC: "Giám đốc",
};

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = user ? roleNav[user.role] ?? [] : [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <div className="app-sidebar-brand">Drvinschl</div>
        {user && <div className="app-sidebar-role">{roleLabels[user.role]}</div>}
        <nav className="app-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `app-sidebar-link${isActive ? " active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="app-sidebar-footer">
          {user && (
            <div className="mb-2">
              <strong>{user.firstName}</strong>
              <br />
              <small>{user.email}</small>
            </div>
          )}
          <Button color="light" size="sm" outline onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <h1>{title}</h1>
        </header>
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
