import api from "./axios";

export type StudentSessionType =
  | "CO_BAN_4H"
  | "CABIN"
  | "DAT"
  | "SA_HINH_THO"
  | "SA_HINH_CAM_UNG";

export const getStudentProfile = () => api.get("/students/profile");
export const getStudentProgress = () => api.get("/students/progress");
export const getStudentPayments = () => api.get("/students/payments");
export const getAvailableStudentSlots = (type: StudentSessionType) =>
  api.get("/students/slots", { params: { type } });
export const getStudentBookings = () => api.get("/students/bookings");
export const bookStudentSlot = (slotId: string) => api.post("/students/bookings", { slotId });
export const cancelStudentBooking = (bookingId: string) =>
  api.post(`/students/bookings/${bookingId}/cancel`);
export const rateStudentTeacher = (bookingId: string, rating: number, comment: string) =>
  api.post(`/students/bookings/${bookingId}/rate`, { rating, comment });
export const getStudentExams = () => api.get("/students/exams");
export type ExamRetakePart =
  | "LY_THUYET"
  | "MO_PHONG"
  | "SA_HINH"
  | "DUONG_TRUONG"
  | "TOT_NGHIEP"
  | "SAT_HACH";
export const registerStudentRetake = (sessionId: string, part?: ExamRetakePart) =>
  api.post(`/students/exams/${sessionId}/retake`, null, { params: part ? { part } : {} });
export type StudentExtraType =
  | "DUONG_TRUONG"
  | "SA_HINH_THO"
  | "SA_HINH_CAM_UNG_TAP"
  | "SA_HINH_CAM_UNG_THI";
export const registerStudentExtra = (type: StudentExtraType, hours: number) =>
  api.post("/students/extra-registration", null, { params: { type, hours } });
export const getStudentExtraRegistrations = () => api.get("/students/extra-registrations");
