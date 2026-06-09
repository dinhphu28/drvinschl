import { useEffect, useState } from "react";
import {
  Card, CardBody, Table, Row, Col,
  Form, FormGroup, Label, Input, Button, Alert,
  TabContent, TabPane, Nav, NavLink,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import StudentPicker from "../components/StudentPicker";
import StaffPicker from "../components/StaffPicker";
import VehiclePicker from "../components/VehiclePicker";
import api from "../api/axios";

const SessionTypes = ["CO_BAN_4H", "CABIN", "DAT", "SA_HINH_THO", "SA_HINH_CAM_UNG"];
const opsSidebarItems = [
  { id: "1", label: "Đặt lịch" },
  { id: "2", label: "Tạo lịch" },
  { id: "3", label: "Phân bổ" },
  { id: "4", label: "Cabin" },
  { id: "5", label: "Hoàn thành khóa" },
];

interface Booking {
  id: string;
  status: string;
  student: { fullName: string };
  slot: { sessionType: string; startTime: string; endTime: string };
}

interface TrainingSlot {
  id: string;
  sessionType: string;
  startTime: string;
  endTime: string;
  teacherId?: number;
  teacherName?: string;
  vehicleId?: string;
  vehicle?: { plateNumber: string };
  available: boolean;
}

const OpsPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [message, setMessage] = useState("");

  // Tab 1: Bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [bookingFilter, setBookingFilter] = useState("");

  // Tab 2: Create Slot
  const [slotForm, setSlotForm] = useState({
    sessionType: "CO_BAN_4H", startTime: "", endTime: "",
    teacherId: "", vehicleId: "", available: true,
  });
  const [allSlots, setAllSlots] = useState<TrainingSlot[]>([]);
  const [allSlotsLoading, setAllSlotsLoading] = useState(false);
  const [slotSubTab, setSlotSubTab] = useState("create");
  const [slotFilter, setSlotFilter] = useState({ sessionType: "", dateStart: "", dateEnd: "" });

  // Tab 3: Assign Resources
  const [assignForm, setAssignForm] = useState({ slotId: "", teacherId: "", vehicleId: "" });

  // Tab 4: Cabin
  const [cabinSlots, setCabinSlots] = useState<TrainingSlot[]>([]);
  const [cabinLoading, setCabinLoading] = useState(false);
  const [cabinAssign, setCabinAssign] = useState({ slotId: "", studentId: "" });

  // Tab 5: Complete Course
  const [completeForm, setCompleteForm] = useState({ studentId: "" });

  const toggleTab = (tab: string) => { if (activeTab !== tab) setActiveTab(tab); };

  useEffect(() => {
    loadBookings();
    loadCabinSlots();
  }, []);

  const loadBookings = () => {
    setBookingLoading(true);
    const params = bookingFilter ? { sessionType: bookingFilter } : {};
    api.get<Booking[]>("/ops/bookings", { params })
      .then((res) => setBookings(res.data))
      .finally(() => setBookingLoading(false));
  };

  const loadAllSlots = () => {
    setAllSlotsLoading(true);
    const params: Record<string, string> = {};
    if (slotFilter.sessionType) params.sessionType = slotFilter.sessionType;
    if (slotFilter.dateStart) params.dateStart = slotFilter.dateStart;
    if (slotFilter.dateEnd) params.dateEnd = slotFilter.dateEnd;
    api.get<TrainingSlot[]>("/ops/slots/all", { params })
      .then((res) => setAllSlots(res.data))
      .finally(() => setAllSlotsLoading(false));
  };

  const loadCabinSlots = () => {
    setCabinLoading(true);
    api.get<TrainingSlot[]>("/ops/cabin-slots")
      .then((res) => setCabinSlots(res.data))
      .finally(() => setCabinLoading(false));
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/ops/slots", {
        sessionType: slotForm.sessionType,
        startTime: new Date(slotForm.startTime).toISOString(),
        endTime: new Date(slotForm.endTime).toISOString(),
        teacherId: slotForm.teacherId ? Number(slotForm.teacherId) : undefined,
        vehicleId: slotForm.vehicleId || undefined,
        available: slotForm.available,
      });
      setMessage("Tạo lịch thành công");
      setSlotForm({ sessionType: "CO_BAN_4H", startTime: "", endTime: "", teacherId: "", vehicleId: "", available: true });
    } catch { setMessage("Không thể tạo lịch"); }
  };

  const handleAssignResources = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/ops/slots/${assignForm.slotId}/assign`, {}, {
        params: { teacherId: assignForm.teacherId, vehicleId: assignForm.vehicleId },
      });
      setMessage("Phân bổ tài nguyên thành công");
      setAssignForm({ slotId: "", teacherId: "", vehicleId: "" });
    } catch { setMessage("Không thể phân bổ tài nguyên"); }
  };

  const handleAssignCabinStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/ops/cabin/${cabinAssign.slotId}/assign-student`, {}, {
        params: { studentId: cabinAssign.studentId },
      });
      setMessage("Phân bổ học viên cabin thành công");
      setCabinAssign({ slotId: "", studentId: "" });
      loadCabinSlots();
    } catch { setMessage("Không thể phân bổ học viên cabin"); }
  };

  const handleCompleteCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/ops/students/${completeForm.studentId}/complete`);
      setMessage("Hoàn thành khóa học thành công");
      setCompleteForm({ studentId: "" });
    } catch { setMessage("Không thể hoàn thành khóa học"); }
  };

  const filteredBookings = bookings.filter(
    (b) => !bookingFilter || b.slot?.sessionType === bookingFilter
  );

  return (
    <AppLayout
      title="Giáo vụ"
      sidebarItems={opsSidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={toggleTab}
    >
      {message && <Alert color="success" className="mb-3" dismissible onClose={() => setMessage("")}>{message}</Alert>}

      <Card className="content-card">
        <CardBody>
          <TabContent activeTab={activeTab}>

            {/* Tab 1: Đặt lịch */}
            <TabPane tabId="1">
              <FormGroup className="mb-3">
                <Row className="align-items-end">
                  <Col md="4">
                    <Label>Lọc theo loại buổi</Label>
                    <Input type="select" value={bookingFilter} onChange={(e) => setBookingFilter(e.target.value)}>
                      <option value="">Tất cả</option>
                      {SessionTypes.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                    </Input>
                  </Col>
                  <Col md="2"><Button color="primary" onClick={loadBookings}>Lọc</Button></Col>
                </Row>
              </FormGroup>
              {bookingLoading ? (
                <EmptyState message="Đang tải..." />
              ) : filteredBookings.length === 0 ? (
                <EmptyState message="Chưa có lịch đặt nào" />
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr><th>Học viên</th><th>Loại buổi</th><th>Bắt đầu</th><th>Kết thúc</th><th>Trạng thái</th></tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id}>
                        <td><strong>{b.student?.fullName}</strong></td>
                        <td>{b.slot?.sessionType?.replace(/_/g, " ")}</td>
                        <td>{b.slot?.startTime ? new Date(b.slot.startTime).toLocaleString("vi-VN") : "—"}</td>
                        <td>{b.slot?.endTime ? new Date(b.slot.endTime).toLocaleString("vi-VN") : "—"}</td>
                        <td><StatusBadge status={b.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TabPane>

            {/* Tab 2: Tạo lịch */}
            <TabPane tabId="2">
              <div className="mb-3">
                <Nav tabs>
                  <NavLink className={slotSubTab === "create" ? "active" : ""} onClick={() => setSlotSubTab("create")}>Tạo mới</NavLink>
                  <NavLink className={slotSubTab === "all" ? "active" : ""} onClick={() => { setSlotSubTab("all"); loadAllSlots(); }}>Tất cả lịch</NavLink>
                </Nav>
                <TabContent activeTab={slotSubTab}>
                  <TabPane tabId="create">
                    <Form onSubmit={handleCreateSlot}>
                      <FormGroup>
                        <Label>Loại buổi</Label>
                        <Input type="select" value={slotForm.sessionType} onChange={(e) => setSlotForm({ ...slotForm, sessionType: e.target.value })} required>
                          {SessionTypes.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                        </Input>
                      </FormGroup>
                      <Row>
                        <Col md="6">
                          <FormGroup><Label>Bắt đầu</Label><Input type="datetime-local" value={slotForm.startTime} onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })} required /></FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup><Label>Kết thúc</Label><Input type="datetime-local" value={slotForm.endTime} onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })} required /></FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup><Label>Giáo viên (tùy chọn)</Label><StaffPicker value={slotForm.teacherId} onChange={(teacherId) => setSlotForm({ ...slotForm, teacherId })} /></FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup><Label>Xe (tùy chọn)</Label><VehiclePicker value={slotForm.vehicleId} onChange={(vehicleId) => setSlotForm({ ...slotForm, vehicleId })} /></FormGroup>
                        </Col>
                      </Row>
                      <FormGroup check>
                        <Input type="checkbox" checked={slotForm.available} onChange={(e) => setSlotForm({ ...slotForm, available: e.target.checked })} />
                        <Label className="ml-2">Còn trống</Label>
                      </FormGroup>
                      <Button color="primary">Tạo lịch</Button>
                    </Form>
                  </TabPane>
                  <TabPane tabId="all">
                    <FormGroup className="mb-3">
                      <Row className="align-items-end">
                        <Col md="3"><Label>Loại buổi</Label>
                          <Input type="select" value={slotFilter.sessionType} onChange={(e) => setSlotFilter({ ...slotFilter, sessionType: e.target.value })}>
                            <option value="">Tất cả</option>
                            {SessionTypes.map((t) => <option key={t} value={t}>{t.replace(/_/g, " ")}</option>)}
                          </Input>
                        </Col>
                        <Col md="2"><Label>Từ ngày</Label><Input type="datetime-local" value={slotFilter.dateStart} onChange={(e) => setSlotFilter({ ...slotFilter, dateStart: e.target.value })} /></Col>
                        <Col md="2"><Label>Đến ngày</Label><Input type="datetime-local" value={slotFilter.dateEnd} onChange={(e) => setSlotFilter({ ...slotFilter, dateEnd: e.target.value })} /></Col>
                        <Col md="2"><Button color="primary" onClick={loadAllSlots}>Tìm kiếm</Button></Col>
                      </Row>
                    </FormGroup>
                    {allSlotsLoading ? (
                      <EmptyState message="Đang tải..." />
                    ) : allSlots.length === 0 ? (
                      <EmptyState message="Chưa có lịch nào" />
                    ) : (
                      <Table responsive hover>
                        <thead>
                          <tr><th>ID</th><th>Loại</th><th>Bắt đầu</th><th>Kết thúc</th><th>Giáo viên</th><th>Xe</th><th>Trống</th></tr>
                        </thead>
                        <tbody>
                          {allSlots.map((s) => (
                            <tr key={s.id}>
                              <td><code className="text-truncate" style={{ maxWidth: 120 }}>{s.id}</code></td>
                              <td>{s.sessionType?.replace(/_/g, " ")}</td>
                              <td>{new Date(s.startTime).toLocaleString("vi-VN")}</td>
                              <td>{new Date(s.endTime).toLocaleString("vi-VN")}</td>
                              <td>{s.teacherName || s.teacherId || "—"}</td>
                              <td>{s.vehicle?.plateNumber || s.vehicleId || "—"}</td>
                              <td>{s.available ? "Có" : "Không"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </TabPane>
                </TabContent>
              </div>
            </TabPane>

            {/* Tab 3: Phân bổ */}
            <TabPane tabId="3">
              <Form onSubmit={handleAssignResources}>
                <FormGroup><Label>ID buổi học (UUID)</Label><Input value={assignForm.slotId} onChange={(e) => setAssignForm({ ...assignForm, slotId: e.target.value })} required /></FormGroup>
                <Row>
                  <Col md="6"><FormGroup><Label>Giáo viên</Label><StaffPicker value={assignForm.teacherId} onChange={(teacherId) => setAssignForm({ ...assignForm, teacherId })} required /></FormGroup></Col>
                  <Col md="6"><FormGroup><Label>Xe</Label><VehiclePicker value={assignForm.vehicleId} onChange={(vehicleId) => setAssignForm({ ...assignForm, vehicleId })} required /></FormGroup></Col>
                </Row>
                <Button color="primary">Phân bổ</Button>
              </Form>
            </TabPane>

            {/* Tab 4: Cabin */}
            <TabPane tabId="4">
              <h5 className="mb-3">Lịch cabin trống</h5>
              {cabinLoading ? (
                <EmptyState message="Đang tải..." />
              ) : cabinSlots.length === 0 ? (
                <EmptyState message="Không có lịch cabin trống" />
              ) : (
                <Table responsive hover className="mb-4">
                  <thead><tr><th>ID</th><th>Bắt đầu</th><th>Kết thúc</th><th>Giáo viên</th><th>Xe</th></tr></thead>
                  <tbody>
                    {cabinSlots.map((s) => (
                      <tr key={s.id}>
                        <td><code>{s.id}</code></td>
                        <td>{new Date(s.startTime).toLocaleString("vi-VN")}</td>
                        <td>{new Date(s.endTime).toLocaleString("vi-VN")}</td>
                        <td>{s.teacherName || s.teacherId || "—"}</td>
                        <td>{s.vehicle?.plateNumber || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <h5 className="mb-3">Phân bổ học viên vào cabin</h5>
              <Form onSubmit={handleAssignCabinStudent}>
                <Row>
                  <Col md="6"><FormGroup><Label>ID lịch cabin (UUID)</Label><Input value={cabinAssign.slotId} onChange={(e) => setCabinAssign({ ...cabinAssign, slotId: e.target.value })} required /></FormGroup></Col>
                  <Col md="6"><FormGroup><Label>Học viên</Label><StudentPicker value={cabinAssign.studentId} onChange={(studentId) => setCabinAssign({ ...cabinAssign, studentId })} required /></FormGroup></Col>
                </Row>
                <Button color="primary">Phân bổ</Button>
              </Form>
            </TabPane>

            {/* Tab 5: Hoàn thành khóa */}
            <TabPane tabId="5">
              <Form onSubmit={handleCompleteCourse}>
                <FormGroup><Label>Học viên</Label><StudentPicker value={completeForm.studentId} onChange={(studentId) => setCompleteForm({ studentId })} required /></FormGroup>
                <Button color="primary">Hoàn thành khóa học</Button>
              </Form>
            </TabPane>

          </TabContent>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default OpsPage;
