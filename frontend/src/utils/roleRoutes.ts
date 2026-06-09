import type { Role } from "../types/auth";

export const roleRoutes: Record<Role, string> = {
  HOC_VIEN: "/student",
  KINH_DOANH: "/sales",
  KE_TOAN: "/accounting",
  GIAO_VU_KHU_VUC: "/ops",
  GIAO_VU_SA_HINH: "/ops",
  GIAO_VU_THI: "/exams",
  GIAO_VIEN: "/teacher",
  XE: "/admin",
  QUAN_LY_KHU_VUC: "/area-manager",
  ADMIN: "/admin",
  GIAM_DOC: "/director",
};

export const isStaffRole = (role: Role) => role !== "HOC_VIEN";
