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
  rateStudentTeacher,
  registerStudentExtra,
  registerStudentRetake,
  type StudentSessionType,
} from "../api/student";

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
  totalFee: number;
  paidFee: number;
  remainingFee: number;
  courseStatus: string;
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

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [exams, setExams] = useState<ExamRegistration[]>([]);
  const [extras, setExtras] = useState<ExtraRegistration[]>([]);
  const [sessionType, setSessionType] = useState<StudentSessionType>("CO_BAN_4H");
  const [ratingBookingId, setRatingBookingId] = useState("");
  const [ratingValue, setRatingValue] = useState("5");
  const [ratingComment, setRatingComment] = useState("");
  const [extraType, setExtraType] = useState<"DUONG_TRUONG" | "SA_HINH">("DUONG_TRUONG");
  const [extraHours, setExtraHours] = useState("1");
  const [message, setMessage] = useState("");

  const loadAll = () => {
    getStudentProfile().then((r) => setProfile(r.data)).catch(() => setProfile(null));
    getStudentProgress().then((r) => setProgress(r.data)).catch(() => setProgress([]));
    getStudentPayments().then((r) => setPayments(r.data)).catch(() => setPayments([]));
    getStudentBookings().then((r) => setBookings(r.data)).catch(() => setBookings([]));
    getStudentExams().then((r) => setExams(r.data)).catch(() => setExams([]));
    getStudentExtraRegistrations().then((r) => setExtras(r.data)).catch(() => setExtras([]));
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    getAvailableStudentSlots(sessionType).then((r) => setSlots(r.data)).catch(() => setSlots([]));
  }, [sessionType]);

  const bookingOptions = useMemo(
    () => bookings.map((booking) => ({
      value: booking.id,
      label: `${booking.slot?.sessionType?.replace(/_/g, " ")} - ${new Date(booking.slot?.startTime).toLocaleString("vi-VN")}`,
    })),
    [bookings],
  );

  const handleBookSlot = async (slotId: string) => {
    await bookStudentSlot(slotId);
    setMessage("Đã đặt lịch học");
    loadAll();
    getAvailableStudentSlots(sessionType).then((r) => setSlots(r.data)).catch(() => setSlots([]));
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

  const handleRetake = async (sessionId: string) => {
    await registerStudentRetake(sessionId);
    setMessage("Đã đăng ký thi lại");
    loadAll();
  };

  return (
    <AppLayout title="Học viên">
      <div className="student-page">
        {message && <div className="alert alert-success alert-dismissible fade show mt-2">{message}</div>}
        <Card className="mb-4 content-card student-summary-card">
          <CardHeader className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <div className="fw-semibold">Tổng quan học viên</div>
              <small className="text-muted">Toàn bộ quy trình học, lịch, học phí và thi đều ở web.</small>
            </div>
            {profile && <Badge color="primary">{profile.courseStatus?.replace(/_/g, " ")}</Badge>}
          </CardHeader>
          <CardBody>
            {profile ? (
              <Row className="g-3 student-summary-grid">
                <Col md="4"><div className="student-summary-item"><div className="text-muted small">Họ tên</div><div className="fw-semibold">{profile.fullName}</div></div></Col>
                <Col md="4"><div className="student-summary-item"><div className="text-muted small">Khóa học</div><div className="fw-semibold">{profile.coursePackage || "—"}</div></div></Col>
                <Col md="4"><div className="student-summary-item"><div className="text-muted small">Điện thoại</div><div className="fw-semibold">{profile.phone || "—"}</div></div></Col>
                <Col md="4"><div className="student-summary-item"><div className="text-muted small">Đã đóng</div><div className="fw-semibold">{Number(profile.paidFee).toLocaleString("vi-VN")} đ</div></div></Col>
                <Col md="4"><div className="student-summary-item"><div className="text-muted small">Còn lại</div><div className="fw-semibold">{Number(profile.remainingFee).toLocaleString("vi-VN")} đ</div></div></Col>
                <Col md="4"><div className="student-summary-item"><div className="text-muted small">Ngày khai giảng</div><div className="fw-semibold">{profile.openingDate ? new Date(profile.openingDate).toLocaleDateString("vi-VN") : "—"}</div></div></Col>
              </Row>
            ) : (
              <EmptyState message="Chưa có thông tin học viên" />
            )}
          </CardBody>
        </Card>

        <Card className="content-card student-workspace-card">
          <CardBody className="py-2">
            <Nav tabs className="student-tabs">
              <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => setActiveTab("1")}>Tiến độ</NavLink>
              <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => setActiveTab("2")}>Đặt lịch</NavLink>
              <NavLink className={activeTab === "3" ? "active" : ""} onClick={() => setActiveTab("3")}>Học phí</NavLink>
              <NavLink className={activeTab === "4" ? "active" : ""} onClick={() => setActiveTab("4")}>Thi</NavLink>
            </Nav>
            <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Card className="mt-3">
                <CardHeader>Tiến độ học</CardHeader>
                <CardBody className="p-0">
                  {progress.length === 0 ? (
                    <EmptyState message="Chưa có dữ liệu tiến độ" />
                  ) : (
                    <Table responsive hover className="mb-0 student-stacked-table">
                      <thead>
                        <tr>
                          <th>Module</th>
                          <th>Trạng thái</th>
                          <th>Giờ</th>
                          <th>Km</th>
                          <th>Phút</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progress.map((item) => (
                          <tr key={item.id}>
                            <td data-label="Module"><strong>{moduleLabels[item.module] ?? item.module}</strong></td>
                            <td data-label="Trạng thái"><StatusBadge status={item.status} /></td>
                            <td data-label="Giờ">{item.completedHours}/{item.requiredHours}</td>
                            <td data-label="Km">{item.remainingKm ?? "—"}</td>
                            <td data-label="Phút">{item.totalMinutes ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
                      {slots.length === 0 ? (
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
                            {slots.map((slot) => (
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
                          <Input type="select" value={extraType} onChange={(e) => setExtraType(e.target.value as "DUONG_TRUONG" | "SA_HINH")}>
                            <option value="DUONG_TRUONG">Đường trường</option>
                            <option value="SA_HINH">Sa hình</option>
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
                                <td data-label="Hướng dẫn">{exam.examSession.instructions || "—"}</td>
                                <td data-label="Kết quả">{exam.passed == null ? "Chưa có" : exam.passed ? "Đạt" : "Không đạt"}</td>
                                <td data-label="" className="text-end">
                                  {exam.passed === false && !exam.retake && (
                                    <Button color="warning" size="sm" onClick={() => handleRetake(exam.examSession.id)}>Thi lại</Button>
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
