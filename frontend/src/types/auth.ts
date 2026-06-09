export type Role =
  | "HOC_VIEN"
  | "KINH_DOANH"
  | "KE_TOAN"
  | "GIAO_VU_KHU_VUC"
  | "GIAO_VU_SA_HINH"
  | "GIAO_VU_THI"
  | "GIAO_VIEN"
  | "XE"
  | "QUAN_LY_KHU_VUC"
  | "ADMIN"
  | "GIAM_DOC";

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}
