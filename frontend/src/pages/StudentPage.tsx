import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavLink,
  Row,
  Table,
  TabContent,
  TabPane,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import {
  bookStudentSlot,
  cancelStudentBooking,
  getAvailableStudentSlots,
  getStudentBookings,
  getStudentExams,
  getStudentExtraRegistrations,
  getStudentPayments,
  getStudentProgress,
  getStudentProfile,
  getSatHachInstructions,
  rateStudentTeacher,
  registerStudentExtra,
  registerStudentRetake,
  updateStudentProfile,
  type ExamRetakePart,
  type StudentExtraType,
  type StudentSessionType,
} from "../api/student";
import { sanitizeRichText } from "../utils/richText";

interface StudentProfile {
  id: string;
  fullName: string;
  dob: string;
  phone: string;
  coursePackage: string;
  applicationDate: string;
  openingDate: string;
  closingDate: string;
  settlementDate: string;
  certificateReceivedDate: string;
  registrationFormSubmitted: boolean;
  photoSubmitted: boolean;
  healthCheckSubmitted: boolean;
  healthCheckSubmittedDate?: string;
  secondFeePaid: boolean;
  finalFeePaid: boolean;
  tuitionReminder: boolean;
  totalFee: number;
  paidFee: number;
  remainingFee: number;
  courseStatus: string;
  courseEnrollments?: StudentCourseEnrollment[];
}

interface StudentCourseEnrollment {
  id?: string | null;
  coursePackage: string;
  courseStatus?: string;
  applicationDate?: string;
  openingDate?: string;
  closingDate?: string;
  settlementDate?: string;
  certificateReceivedDate?: string;
  totalFee?: number;
  paidFee?: number;
  remainingFee?: number;
  primaryCourse: boolean;
}

interface ProgressItem {
  id: string;
  module: string;
  status: string;
  completedHours: number;
  requiredHours: number;
  totalKm: number;
  remainingKm: number;
  totalMinutes: number;
}

interface PaymentItem {
  id: string;
  paymentType: string;
  amount: number;
  paidAt: string;
  note?: string;
}

interface Slot {
  id: string;
  sessionType: StudentSessionType;
  startTime: string;
  endTime: string;
  teacher?: { firstName?: string; lastName?: string };
  vehicle?: { licensePlate?: string };
}

interface Booking {
  id: string;
  status: string;
  teacherRating?: number | null;
  teacherComment?: string | null;
  slot: Slot;
  student: { fullName: string };
}

interface ExamRegistration {
  id: string;
  passed: boolean | null;
  score?: string;
  retake: boolean;
  retakeFee?: number;
  retakePart?: string;
  examSession: {
    id: string;
    examType: string;
    examDate: string;
    location?: string;
    instructions?: string;
  };
}

interface ExtraRegistration {
  id: string;
  extraType: string;
  hours?: number;
  fee?: number;
}

const sessionTypes: { value: StudentSessionType; label: string }[] = [
  { value: "CO_BAN_4H", label: "4h cơ bản" },
  { value: "CABIN", label: "Cabin" },
  { value: "DAT", label: "DAT" },
  { value: "SA_HINH_THO", label: "Sa hình thô" },
  { value: "SA_HINH_CAM_UNG", label: "Sa hình cảm ứng" },
];

const moduleLabels: Record<string, string> = {
  LY_THUYET: "Lý thuyết",
  MO_PHONG: "Mô phỏng",
  CO_BAN_4H: "4h cơ bản",
  CABIN: "Cabin",
  DAT: "DAT",
  SA_HINH_THO: "Sa hình thô",
  SA_HINH_CAM_UNG: "Sa hình cảm ứng",
};

const progressModules = [
  "LY_THUYET",
  "MO_PHONG",
  "CO_BAN_4H",
  "CABIN",
  "DAT",
  "SA_HINH_THO",
  "SA_HINH_CAM_UNG",
] as const;

type ProgressModule = (typeof progressModules)[number];

const studentSidebarItems = [
  { id: "1", label: "Tiến độ" },
  { id: "2", label: "Đặt lịch" },
  { id: "3", label: "Học phí" },
  { id: "4", label: "Thi Sát Hạch" },
];

const paymentLabels: Record<string, string> = {
  HOC_PHI: "Học phí",
  HOC_THEM: "Học thêm",
  THI_LAI: "Thi lại",
  HOAN_PHI: "Hoàn phí",
};

const examLabels: Record<string, string> = {
  TOT_NGHIEP: "Thi tốt nghiệp",
  SAT_HACH: "Thi sát hạch",
};
const retakePartLabels: Record<ExamRetakePart, string> = {
  LY_THUYET: "Lý thuyết",
  MO_PHONG: "Mô phỏng",
  SA_HINH: "Sa hình",
  DUONG_TRUONG: "Đường trường",
  TOT_NGHIEP: "Tốt nghiệp",
  SAT_HACH: "Sát hạch",
};
const asArray = <T,>(value: unknown): T[] => Array.isArray(value) ? value : [];
const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleDateString("vi-VN") : "—");
const toDateInputValue = (value?: string | null) => (value ? value.slice(0, 10) : "");

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeProgressModule, setActiveProgressModule] = useState<ProgressModule>("LY_THUYET");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "", dob: "" });
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [exams, setExams] = useState<ExamRegistration[]>([]);
  const [satHachInstructions, setSatHachInstructions] = useState("");
  const [extras, setExtras] = useState<ExtraRegistration[]>([]);
  const [sessionType, setSessionType] = useState<StudentSessionType>("CO_BAN_4H");
  const [ratingBookingId, setRatingBookingId] = useState("");
  const [ratingValue, setRatingValue] = useState("5");
  const [ratingComment, setRatingComment] = useState("");
  const [extraType, setExtraType] = useState<StudentExtraType>("DUONG_TRUONG");
  const [extraHours, setExtraHours] = useState("1");
  const [retakeParts, setRetakeParts] = useState<Record<string, ExamRetakePart>>({});
  const [message, setMessage] = useState("");

  const loadAll = () => {
    getStudentProfile().then((r) => setProfile(r.data)).catch(() => setProfile(null));
    getStudentProgress().then((r) => setProgress(asArray<ProgressItem>(r.data))).catch(() => setProgress([]));
    getStudentPayments().then((r) => setPayments(asArray<PaymentItem>(r.data))).catch(() => setPayments([]));
    getStudentBookings().then((r) => setBookings(asArray<Booking>(r.data))).catch(() => setBookings([]));
    getStudentExams().then((r) => setExams(asArray<ExamRegistration>(r.data))).catch(() => setExams([]));
    getSatHachInstructions().then((r) => setSatHachInstructions(r.data.content || "")).catch(() => setSatHachInstructions(""));
    getStudentExtraRegistrations().then((r) => setExtras(asArray<ExtraRegistration>(r.data))).catch(() => setExtras([]));
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setProfileForm({
      fullName: profile.fullName ?? "",
      phone: profile.phone ?? "",
      dob: toDateInputValue(profile.dob),
    });
  }, [profile]);

  useEffect(() => {
    getAvailableStudentSlots(sessionType).then((r) => setSlots(asArray<Slot>(r.data))).catch(() => setSlots([]));
  }, [sessionType]);

  const bookingOptions = useMemo(
    () => bookings.map((booking) => ({
      value: booking.id,
      label: `${booking.slot?.sessionType?.replace(/_/g, " ")} - ${new Date(booking.slot?.startTime).toLocaleString("vi-VN")}`,
    })),
    [bookings],
  );
  const progressByModule = useMemo(
    () => progress.reduce<Record<string, ProgressItem>>((acc, item) => {
      acc[item.module] = item;
      return acc;
    }, {}),
    [progress],
  );
  const activeProgress = progressByModule[activeProgressModule];
  const safeSlots = asArray<Slot>(slots);
  const courseEnrollments = profile?.courseEnrollments?.length
    ? profile.courseEnrollments
    : profile?.coursePackage
      ? [{
          coursePackage: profile.coursePackage,
          courseStatus: profile.courseStatus,
          applicationDate: profile.applicationDate,
          openingDate: profile.openingDate,
          closingDate: profile.closingDate,
          settlementDate: profile.settlementDate,
          certificateReceivedDate: profile.certificateReceivedDate,
          totalFee: profile.totalFee,
          paidFee: profile.paidFee,
          remainingFee: profile.remainingFee,
          primaryCourse: true,
        }]
      : [];
  const missingBasicInfo = !profile?.fullName || !profile?.phone || !profile?.dob;

  const handleProfileFormChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudentProfile({
      fullName: profileForm.fullName.trim(),
      phone: profileForm.phone.trim(),
      dob: profileForm.dob || null,
    });
    setMessage("Đã cập nhật thông tin cá nhân");
    loadAll();
  };

  const handleBookSlot = async (slotId: string) => {
    await bookStudentSlot(slotId);
    setMessage("Đã đặt lịch học");
    loadAll();
    getAvailableStudentSlots(sessionType).then((r) => setSlots(asArray<Slot>(r.data))).catch(() => setSlots([]));
  };

  const handleCancelBooking = async (bookingId: string) => {
    await cancelStudentBooking(bookingId);
    setMessage("Đã hủy lịch");
    loadAll();
  };

  const handleRateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ratingBookingId) {
      setMessage("Chọn một lịch đã học để đánh giá");
      return;
    }
    await rateStudentTeacher(ratingBookingId, Number(ratingValue), ratingComment);
    setMessage("Đã gửi đánh giá");
    setRatingBookingId("");
    setRatingComment("");
    setRatingValue("5");
    loadAll();
  };

  const handleRegisterExtra = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerStudentExtra(extraType, Number(extraHours));
    setMessage("Đã đăng ký thêm giờ");
    loadAll();
  };

  const handleRetake = async (sessionId: string, fallbackPart: ExamRetakePart) => {
    await registerStudentRetake(sessionId, retakeParts[sessionId] ?? fallbackPart);
    setMessage("Đã đăng ký thi lại");
    loadAll();
  };

  return (
    <AppLayout
      title="Học viên"
      sidebarItems={studentSidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={setActiveTab}
    >
      <div className="student-page">
        {message && <div className="alert alert-success alert-dismissible fade show mt-2">{message}</div>}
        <Row className="g-3 mb-4">
          <Col lg="5">
            <Card className="content-card student-summary-card h-100">
              <CardHeader className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="fw-semibold">Thông tin cá nhân</div>
                {missingBasicInfo && <Badge color="warning">Cần bổ sung</Badge>}
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleUpdateProfile}>
                  <FormGroup>
                    <Label>Họ tên</Label>
                    <Input
                      value={profileForm.fullName}
                      onChange={(e) => handleProfileFormChange("fullName", e.target.value)}
                      placeholder="Nhập họ tên"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ngày sinh</Label>
                    <Input
                      type="date"
                      value={profileForm.dob}
                      onChange={(e) => handleProfileFormChange("dob", e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Điện thoại</Label>
                    <Input
                      value={profileForm.phone}
                      onChange={(e) => handleProfileFormChange("phone", e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">Lưu thông tin</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg="7">
            <Card className="content-card student-summary-card h-100">
              <CardHeader className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div className="fw-semibold">Các khóa học và hồ sơ</div>
                {profile && <Badge color="primary">{profile.courseStatus?.replace(/_/g, " ")}</Badge>}
              </CardHeader>
              <CardBody>
                {profile ? (
                  <>
                    <Row className="g-3 student-summary-grid mb-3">
                      <Col md="6"><div className="student-summary-item"><div className="text-muted small">Ngày nộp Khám Sức Khỏe</div><div className="fw-semibold">{profile.healthCheckSubmitted ? formatDate(profile.healthCheckSubmittedDate) : "Chưa nộp"}</div></div></Col>
                      <Col md="6"><div className="student-summary-item"><div className="text-muted small">Hồ sơ</div><div className="fw-semibold">{profile.registrationFormSubmitted && profile.photoSubmitted ? "Đã đủ đơn và ảnh" : "Cần bổ sung"}</div></div></Col>
                    </Row>
                    {courseEnrollments.length === 0 ? (
                      <EmptyState message="Chưa có khóa học" />
                    ) : (
                      <div className="d-flex flex-column gap-3">
                        {courseEnrollments.map((course, index) => (
                          <div className="student-summary-item" key={course.id ?? `${course.coursePackage}-${index}`}>
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                              <div className="fw-semibold">{course.coursePackage || "—"}</div>
                              <div className="d-flex gap-2 flex-wrap">
                                {course.primaryCourse && <Badge color="secondary">Khóa chính</Badge>}
                                {course.courseStatus && <StatusBadge status={course.courseStatus} />}
                              </div>
                            </div>
                            <Row className="g-2">
                              <Col md="6"><div className="text-muted small">Ngày nộp hồ sơ</div><div>{formatDate(course.applicationDate)}</div></Col>
                              <Col md="6"><div className="text-muted small">Ngày khai giảng</div><div>{formatDate(course.openingDate)}</div></Col>
                              <Col md="6"><div className="text-muted small">Ngày bế giảng</div><div>{formatDate(course.closingDate)}</div></Col>
                              <Col md="6"><div className="text-muted small">Ngày thanh lý hồ sơ</div><div>{formatDate(course.settlementDate)}</div></Col>
                              <Col md="6"><div className="text-muted small">Nhận bằng</div><div>{course.certificateReceivedDate ? formatDate(course.certificateReceivedDate) : "Chưa có thông tin"}</div></Col>
                              <Col md="6"><div className="text-muted small">Học phí khóa</div><div>{Number(course.totalFee ?? 0).toLocaleString("vi-VN")} đ</div></Col>
                            </Row>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <EmptyState message="Chưa có thông tin khóa học" />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {profile?.tuitionReminder && (
          <div className="alert alert-warning">
            Học phí còn lại: {Number(profile.remainingFee).toLocaleString("vi-VN")} đ. Vui lòng hoàn tất theo lịch thu phí của trung tâm.
          </div>
        )}

        <Card className="content-card student-workspace-card">
          <CardBody className="py-2">
            <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Card className="mt-3">
                <CardHeader>Tiến độ học</CardHeader>
                <CardBody>
                  {progress.length === 0 ? (
                    <EmptyState message="Chưa có dữ liệu tiến độ" />
                  ) : (
                    <>
                      <Nav tabs className="student-tabs progress-step-tabs">
                        {progressModules.map((module) => (
                          <NavLink
                            key={module}
                            className={activeProgressModule === module ? "active" : ""}
                            onClick={() => setActiveProgressModule(module)}
                          >
                            {moduleLabels[module]}
                          </NavLink>
                        ))}
                      </Nav>
                      <div className="student-progress-panel mt-3">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                          <div>
                            <div className="fw-semibold">{moduleLabels[activeProgressModule]}</div>
                            <small className="text-muted">Theo dõi từng bước trong lộ trình đào tạo</small>
                          </div>
                          {activeProgress && <StatusBadge status={activeProgress.status} />}
                        </div>
                        {activeProgress ? (
                          <Row className="g-3 student-summary-grid">
                            <Col md="3"><div className="student-summary-item"><div className="text-muted small">Giờ đã học</div><div className="fw-semibold">{activeProgress.completedHours ?? 0}/{activeProgress.requiredHours ?? 0}</div></div></Col>
                            <Col md="3"><div className="student-summary-item"><div className="text-muted small">Km đã học</div><div className="fw-semibold">{activeProgress.totalKm ?? 0}</div></div></Col>
                            <Col md="3"><div className="student-summary-item"><div className="text-muted small">Km còn lại</div><div className="fw-semibold">{activeProgress.remainingKm ?? 0}</div></div></Col>
                            <Col md="3"><div className="student-summary-item"><div className="text-muted small">Tổng phút</div><div className="fw-semibold">{activeProgress.totalMinutes ?? 0}</div></div></Col>
                          </Row>
                        ) : (
                          <EmptyState message={`Chưa có dữ liệu ${moduleLabels[activeProgressModule].toLowerCase()}`} />
                        )}
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </TabPane>

            <TabPane tabId="2">
              <Row className="mt-3 g-3">
                <Col lg="7">
                  <Card>
                    <CardHeader>Chọn loại lịch</CardHeader>
                    <CardBody>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {sessionTypes.map((item) => (
                          <Button
                            key={item.value}
                            color={sessionType === item.value ? "primary" : "light"}
                            outline={sessionType !== item.value}
                            onClick={() => setSessionType(item.value)}
                          >
                            {item.label}
                          </Button>
                        ))}
                      </div>
                      {safeSlots.length === 0 ? (
                        <EmptyState message="Không có lịch trống" />
                      ) : (
                        <Table responsive hover className="mb-0 student-stacked-table">
                          <thead>
                            <tr>
                              <th>Thời gian</th>
                              <th>Giáo viên</th>
                              <th>Xe</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {safeSlots.map((slot) => (
                              <tr key={slot.id}>
                                <td data-label="Thời gian">
                                  <div>{new Date(slot.startTime).toLocaleString("vi-VN")}</div>
                                  <small className="text-muted">{new Date(slot.endTime).toLocaleTimeString("vi-VN")}</small>
                                </td>
                                <td data-label="Giáo viên">{slot.teacher ? `${slot.teacher.firstName ?? ""} ${slot.teacher.lastName ?? ""}`.trim() : "Chưa phân"}</td>
                                <td data-label="Xe">{slot.vehicle?.licensePlate ?? "—"}</td>
                                <td data-label="" className="text-end">
                                  <Button color="primary" size="sm" onClick={() => handleBookSlot(slot.id)}>Đặt lịch</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="5">
                  <Card className="mb-3">
                    <CardHeader>Đánh giá giáo viên</CardHeader>
                    <CardBody>
                      <Form onSubmit={handleRateTeacher}>
                        <FormGroup>
                          <Label>Lịch đã hoàn thành</Label>
                          <Input type="select" value={ratingBookingId} onChange={(e) => setRatingBookingId(e.target.value)}>
                            <option value="">-- Chọn lịch --</option>
                            {bookingOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                          </Input>
                        </FormGroup>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>Số sao</Label>
                              <Input type="number" min={1} max={5} value={ratingValue} onChange={(e) => setRatingValue(e.target.value)} />
                            </FormGroup>
                          </Col>
                          <Col md="8">
                            <FormGroup>
                              <Label>Nhận xét</Label>
                              <Input value={ratingComment} onChange={(e) => setRatingComment(e.target.value)} />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Button color="primary" type="submit">Gửi đánh giá</Button>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="mb-3">
                    <CardHeader>Lịch đã đặt</CardHeader>
                    <CardBody className="p-0">
                      {bookings.length === 0 ? (
                        <EmptyState message="Chưa có lịch đã đặt" />
                      ) : (
                        <Table responsive className="mb-0 student-stacked-table">
                          <thead><tr><th>Loại</th><th>Thời gian</th><th>Trạng thái</th><th></th></tr></thead>
                          <tbody>
                            {bookings.map((booking) => (
                              <tr key={booking.id}>
                                <td data-label="Loại">{booking.slot?.sessionType?.replace(/_/g, " ")}</td>
                                <td data-label="Thời gian">{booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleString("vi-VN") : "—"}</td>
                                <td data-label="Trạng thái"><StatusBadge status={booking.status} /></td>
                                <td data-label="" className="text-end">
                                  <Button color="secondary" size="sm" outline onClick={() => handleCancelBooking(booking.id)}>Hủy</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                  <Card className="mb-3">
                    <CardHeader>Đăng ký thêm giờ</CardHeader>
                    <CardBody>
                      <Form onSubmit={handleRegisterExtra}>
                        <FormGroup>
                          <Label>Loại</Label>
                          <Input type="select" value={extraType} onChange={(e) => setExtraType(e.target.value as StudentExtraType)}>
                            <option value="DUONG_TRUONG">Thực hành đường trường</option>
                            <option value="SA_HINH_THO">Sa hình thô</option>
                            <option value="SA_HINH_CAM_UNG_TAP">Sa hình cảm ứng tập</option>
                            <option value="SA_HINH_CAM_UNG_THI">Sa hình cảm ứng thi</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <Label>Số giờ</Label>
                          <Input type="number" min={1} value={extraHours} onChange={(e) => setExtraHours(e.target.value)} />
                        </FormGroup>
                        <Button color="primary" type="submit">Đăng ký</Button>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>Đăng ký thêm gần đây</CardHeader>
                    <CardBody className="p-0">
                      {extras.length === 0 ? (
                        <EmptyState message="Chưa có đăng ký thêm giờ" />
                      ) : (
                        <Table responsive className="mb-0 student-stacked-table">
                          <thead><tr><th>Loại</th><th>Giờ</th><th>Phí</th></tr></thead>
                          <tbody>
                            {extras.map((item) => (
                              <tr key={item.id}>
                                <td data-label="Loại">{item.extraType.replace(/_/g, " ")}</td>
                                <td data-label="Giờ">{item.hours ?? "—"}</td>
                                <td data-label="Phí">{item.fee ? Number(item.fee).toLocaleString("vi-VN") : "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="3">
              <Row className="mt-3 g-3">
                <Col lg="4">
                  <Card>
                    <CardHeader>Tổng phí</CardHeader>
                    <CardBody>
                      <div className="text-muted">Đã đóng</div>
                      <div className="fs-4 fw-semibold">{profile ? Number(profile.paidFee).toLocaleString("vi-VN") : 0} đ</div>
                      <div className="text-muted mt-3">Còn lại</div>
                      <div className="fs-4 fw-semibold">{profile ? Number(profile.remainingFee).toLocaleString("vi-VN") : 0} đ</div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8">
                  <Card>
                    <CardHeader>Lịch sử thanh toán</CardHeader>
                    <CardBody className="p-0">
                      {payments.length === 0 ? (
                        <EmptyState message="Chưa có giao dịch" />
                      ) : (
                        <Table responsive hover className="mb-0 student-stacked-table">
                          <thead>
                            <tr>
                              <th>Loại</th>
                              <th>Số tiền</th>
                              <th>Thời gian</th>
                              <th>Ghi chú</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((item) => (
                              <tr key={item.id}>
                                <td data-label="Loại">{paymentLabels[item.paymentType] ?? item.paymentType}</td>
                                <td data-label="Số tiền">{Number(item.amount).toLocaleString("vi-VN")} đ</td>
                                <td data-label="Thời gian">{new Date(item.paidAt).toLocaleString("vi-VN")}</td>
                                <td data-label="Ghi chú">{item.note || "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="4">
              <Row className="mt-3 g-3">
                <Col lg="4">
                  <Card>
                    <CardHeader>Hướng dẫn Thi Sát Hạch</CardHeader>
                    <CardBody>
                      {satHachInstructions ? (
                        <div
                          className="rich-text-content"
                          dangerouslySetInnerHTML={{ __html: sanitizeRichText(satHachInstructions) }}
                        />
                      ) : (
                        <EmptyState message="Chưa có hướng dẫn" />
                      )}
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8">
                  <Card>
                    <CardHeader>Lịch thi và kết quả</CardHeader>
                    <CardBody className="p-0">
                      {exams.length === 0 ? (
                        <EmptyState message="Chưa có lịch thi" />
                      ) : (
                        <Table responsive hover className="mb-0 student-stacked-table">
                          <thead>
                            <tr>
                              <th>Loại</th>
                              <th>Ngày thi</th>
                              <th>Hướng dẫn</th>
                              <th>Kết quả</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {exams.map((exam) => (
                              <tr key={exam.id}>
                                <td data-label="Loại">{examLabels[exam.examSession.examType] ?? exam.examSession.examType}</td>
                                <td data-label="Ngày thi">{new Date(exam.examSession.examDate).toLocaleString("vi-VN")}</td>
                                <td data-label="Hướng dẫn">
                                  {exam.examSession.instructions ? (
                                    <div
                                      className="rich-text-inline"
                                      dangerouslySetInnerHTML={{ __html: sanitizeRichText(exam.examSession.instructions) }}
                                    />
                                  ) : "—"}
                                </td>
                                <td data-label="Kết quả">{exam.passed == null ? "Chưa có" : exam.passed ? "Đạt" : "Không đạt"}</td>
                                <td data-label="" className="text-end">
                                  {exam.passed === false && !exam.retake && (
                                    <div className="d-flex gap-2 justify-content-end flex-wrap">
                                      <Input
                                        bsSize="sm"
                                        type="select"
                                        style={{ maxWidth: 180 }}
                                        value={retakeParts[exam.examSession.id] ?? (exam.examSession.examType === "TOT_NGHIEP" ? "TOT_NGHIEP" : "LY_THUYET")}
                                        onChange={(e) => setRetakeParts({ ...retakeParts, [exam.examSession.id]: e.target.value as ExamRetakePart })}
                                      >
                                        {(exam.examSession.examType === "TOT_NGHIEP"
                                          ? ["TOT_NGHIEP"]
                                          : ["LY_THUYET", "MO_PHONG", "SA_HINH", "DUONG_TRUONG"]
                                        ).map((part) => (
                                          <option key={part} value={part}>{retakePartLabels[part as ExamRetakePart]}</option>
                                        ))}
                                      </Input>
                                      <Button
                                        color="warning"
                                        size="sm"
                                        onClick={() => handleRetake(exam.examSession.id, exam.examSession.examType === "TOT_NGHIEP" ? "TOT_NGHIEP" : "LY_THUYET")}
                                      >
                                        Thi lại
                                      </Button>
                                    </div>
                                  )}
                                  {exam.retake && exam.retakeFee && (
                                    <span>{exam.retakePart ? retakePartLabels[exam.retakePart as ExamRetakePart] : "Thi lại"}: {Number(exam.retakeFee).toLocaleString("vi-VN")} đ</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
};

export default StudentPage;
