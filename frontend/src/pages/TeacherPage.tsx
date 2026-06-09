import { useEffect, useMemo, useState } from "react";
import {
  Alert, Button, Card, CardBody, CardHeader, Col, Form, FormGroup,
  Input, Label, Nav, NavLink, Row, Table,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import VehiclePicker from "../components/VehiclePicker";
import api from "../api/axios";

interface Booking {
  id: string;
  status: string;
  student: { fullName: string };
  slot: { startTime: string; endTime?: string; sessionType: string; vehicle?: { id: string; licensePlate: string } };
}

const TeacherPage = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [schedule, setSchedule] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [reportForm, setReportForm] = useState({ bookingId: "", type: "CO_BAN_4H", start: "", end: "", km: "", durationMinutes: "", datScreenshot: "" });
  const [departureForm, setDepartureForm] = useState({ vehicleId: "", odoDeparture: "", isClean: true, cleanPhotoUrl: "", departureTime: "" });
  const [returnForm, setReturnForm] = useState({ vehicleId: "", odoReturn: "", returnTime: "" });
  const [fuelForm, setFuelForm] = useState({ vehicleId: "", date: new Date().toISOString().slice(0, 10), liters: "", receiptUrl: "", amount: "" });
  const [leaveForm, setLeaveForm] = useState({ start: "", end: "", reason: "" });
  const [maintenanceForm, setMaintenanceForm] = useState({ vehicleId: "", maintenanceDate: new Date().toISOString().slice(0, 10), description: "", cost: "" });

  const loadData = () => {
    setLoading(true);
    api.get<Booking[]>("/teachers/schedule")
      .then((res) => setSchedule(res.data))
      .finally(() => setLoading(false));
    api.get<Record<string, unknown>>("/teachers/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch(() => setStats({}));
  };

  useEffect(() => {
    loadData();
  }, []);

  const bookingOptions = useMemo(() => schedule.map((booking) => ({
    value: booking.id,
    label: `${booking.student?.fullName || "Học viên"} - ${booking.slot?.sessionType?.replace(/_/g, " ")} - ${booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleString("vi-VN") : ""}`,
    type: booking.slot?.sessionType || "CO_BAN_4H",
  })), [schedule]);

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post(`/teachers/sessions/${reportForm.bookingId}/report`, null, {
      params: {
        type: reportForm.type,
        start: reportForm.start,
        end: reportForm.end,
        km: reportForm.km || undefined,
        durationMinutes: reportForm.durationMinutes || undefined,
        datScreenshot: reportForm.datScreenshot || undefined,
      },
    });
    setMessage("Đã gửi báo cáo buổi học");
    setReportForm({ bookingId: "", type: "CO_BAN_4H", start: "", end: "", km: "", durationMinutes: "", datScreenshot: "" });
    loadData();
  };

  const submitDeparture = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post(`/teachers/vehicles/${departureForm.vehicleId}/departure`, null, {
      params: {
        odoDeparture: departureForm.odoDeparture,
        isClean: departureForm.isClean,
        cleanPhotoUrl: departureForm.cleanPhotoUrl || undefined,
        departureTime: departureForm.departureTime,
      },
    });
    setMessage("Đã ghi nhận xe đi");
    setDepartureForm({ vehicleId: "", odoDeparture: "", isClean: true, cleanPhotoUrl: "", departureTime: "" });
  };

  const submitReturn = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post(`/teachers/vehicles/${returnForm.vehicleId}/return`, null, {
      params: { odoReturn: returnForm.odoReturn, returnTime: returnForm.returnTime },
    });
    setMessage("Đã ghi nhận xe về");
    setReturnForm({ vehicleId: "", odoReturn: "", returnTime: "" });
  };

  const submitFuel = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/teachers/fuel", null, {
      params: {
        vehicleId: fuelForm.vehicleId,
        date: fuelForm.date,
        liters: fuelForm.liters,
        receiptUrl: fuelForm.receiptUrl || undefined,
        amount: fuelForm.amount || undefined,
      },
    });
    setMessage("Đã ghi nhận đổ xăng");
    setFuelForm({ vehicleId: "", date: new Date().toISOString().slice(0, 10), liters: "", receiptUrl: "", amount: "" });
  };

  const submitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/teachers/leave", null, { params: leaveForm });
    setMessage("Đã gửi yêu cầu nghỉ phép");
    setLeaveForm({ start: "", end: "", reason: "" });
  };

  const submitMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post(`/teachers/vehicles/${maintenanceForm.vehicleId}/maintenance-request`, null, {
      params: {
        maintenanceDate: maintenanceForm.maintenanceDate,
        description: maintenanceForm.description,
        cost: maintenanceForm.cost || undefined,
      },
    });
    setMessage("Đã gửi đề xuất bảo dưỡng");
    setMaintenanceForm({ vehicleId: "", maintenanceDate: new Date().toISOString().slice(0, 10), description: "", cost: "" });
  };

  return (
    <AppLayout title="Giáo viên">
      {message && <Alert color="success" dismissible onClose={() => setMessage("")}>{message}</Alert>}
      <Card className="content-card mb-3">
        <CardBody>
          <Row className="g-3">
            <Col md="3"><div className="fw-semibold">Tổng giờ tháng</div><div>{Number(stats.totalHours ?? 0).toLocaleString("vi-VN")}</div></Col>
            <Col md="3"><div className="fw-semibold">Tổng KM</div><div>{Number(stats.totalKm ?? 0).toLocaleString("vi-VN")}</div></Col>
            <Col md="3"><div className="fw-semibold">Lít xăng</div><div>{Number(stats.totalFuelLiters ?? 0).toLocaleString("vi-VN")}</div></Col>
            <Col md="3"><div className="fw-semibold">Buổi dạy</div><div>{schedule.length}</div></Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="content-card">
        <CardHeader>
          <Nav tabs>
            <NavLink className={activeTab === "schedule" ? "active" : ""} onClick={() => setActiveTab("schedule")}>Lịch dạy</NavLink>
            <NavLink className={activeTab === "report" ? "active" : ""} onClick={() => setActiveTab("report")}>Báo cáo buổi học</NavLink>
            <NavLink className={activeTab === "vehicle" ? "active" : ""} onClick={() => setActiveTab("vehicle")}>Xe & xăng</NavLink>
            <NavLink className={activeTab === "leave" ? "active" : ""} onClick={() => setActiveTab("leave")}>Nghỉ phép</NavLink>
            <NavLink className={activeTab === "maintenance" ? "active" : ""} onClick={() => setActiveTab("maintenance")}>Bảo dưỡng</NavLink>
          </Nav>
        </CardHeader>
        <CardBody>
          {activeTab === "schedule" && (
            loading ? <EmptyState message="Đang tải..." /> : schedule.length === 0 ? <EmptyState message="Chưa có buổi dạy nào được phân công." /> : (
              <Table responsive hover className="mb-0">
                <thead><tr><th>Học viên</th><th>Loại</th><th>Thời gian</th><th>Xe</th><th>Trạng thái</th></tr></thead>
                <tbody>
                  {schedule.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.student?.fullName}</strong></td>
                      <td>{b.slot?.sessionType?.replace(/_/g, " ")}</td>
                      <td>{b.slot?.startTime ? new Date(b.slot.startTime).toLocaleString("vi-VN") : "—"}</td>
                      <td>{b.slot?.vehicle?.licensePlate || "—"}</td>
                      <td><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
          )}

          {activeTab === "report" && (
            <Form onSubmit={submitReport}>
              <FormGroup><Label>Buổi học</Label>
                <Input type="select" value={reportForm.bookingId} onChange={(e) => {
                  const selected = bookingOptions.find((item) => item.value === e.target.value);
                  setReportForm({ ...reportForm, bookingId: e.target.value, type: selected?.type || reportForm.type });
                }} required>
                  <option value="">-- Chọn buổi học --</option>
                  {bookingOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </Input>
              </FormGroup>
              <Row>
                <Col md="3"><FormGroup><Label>Loại</Label><Input value={reportForm.type} readOnly /></FormGroup></Col>
                <Col md="3"><FormGroup><Label>Bắt đầu</Label><Input type="datetime-local" value={reportForm.start} onChange={(e) => setReportForm({ ...reportForm, start: e.target.value })} required /></FormGroup></Col>
                <Col md="3"><FormGroup><Label>Kết thúc</Label><Input type="datetime-local" value={reportForm.end} onChange={(e) => setReportForm({ ...reportForm, end: e.target.value })} required /></FormGroup></Col>
                <Col md="3"><FormGroup><Label>Phút</Label><Input type="number" value={reportForm.durationMinutes} onChange={(e) => setReportForm({ ...reportForm, durationMinutes: e.target.value })} /></FormGroup></Col>
              </Row>
              <Row>
                <Col md="4"><FormGroup><Label>KM</Label><Input type="number" value={reportForm.km} onChange={(e) => setReportForm({ ...reportForm, km: e.target.value })} /></FormGroup></Col>
                <Col md="8"><FormGroup><Label>Ảnh/màn hình DAT URL</Label><Input value={reportForm.datScreenshot} onChange={(e) => setReportForm({ ...reportForm, datScreenshot: e.target.value })} /></FormGroup></Col>
              </Row>
              <Button color="primary" type="submit">Gửi báo cáo</Button>
            </Form>
          )}

          {activeTab === "vehicle" && (
            <Row>
              <Col lg="6">
                <h6>Xe đi</h6>
                <Form onSubmit={submitDeparture}>
                  <FormGroup><Label>Xe</Label><VehiclePicker value={departureForm.vehicleId} onChange={(vehicleId) => setDepartureForm({ ...departureForm, vehicleId })} required /></FormGroup>
                  <FormGroup><Label>Thời gian đi</Label><Input type="datetime-local" value={departureForm.departureTime} onChange={(e) => setDepartureForm({ ...departureForm, departureTime: e.target.value })} required /></FormGroup>
                  <FormGroup><Label>ODO đi</Label><Input type="number" value={departureForm.odoDeparture} onChange={(e) => setDepartureForm({ ...departureForm, odoDeparture: e.target.value })} required /></FormGroup>
                  <FormGroup check className="mb-3"><Label check><Input type="checkbox" checked={departureForm.isClean} onChange={(e) => setDepartureForm({ ...departureForm, isClean: e.target.checked })} /> Xe sạch theo hình giáo viên gửi</Label></FormGroup>
                  <FormGroup><Label>URL hình xe</Label><Input value={departureForm.cleanPhotoUrl} onChange={(e) => setDepartureForm({ ...departureForm, cleanPhotoUrl: e.target.value })} placeholder="Dán URL hình xe" /></FormGroup>
                  <Button color="primary" type="submit">Ghi xe đi</Button>
                </Form>
              </Col>
              <Col lg="6">
                <h6>Xe về / xăng</h6>
                <Form onSubmit={submitReturn} className="mb-3">
                  <FormGroup><Label>Xe</Label><VehiclePicker value={returnForm.vehicleId} onChange={(vehicleId) => setReturnForm({ ...returnForm, vehicleId })} required /></FormGroup>
                  <FormGroup><Label>Thời gian về</Label><Input type="datetime-local" value={returnForm.returnTime} onChange={(e) => setReturnForm({ ...returnForm, returnTime: e.target.value })} required /></FormGroup>
                  <FormGroup><Label>ODO về</Label><Input type="number" value={returnForm.odoReturn} onChange={(e) => setReturnForm({ ...returnForm, odoReturn: e.target.value })} required /></FormGroup>
                  <Button color="secondary" type="submit">Ghi xe về</Button>
                </Form>
                <Form onSubmit={submitFuel}>
                  <FormGroup><Label>Xe</Label><VehiclePicker value={fuelForm.vehicleId} onChange={(vehicleId) => setFuelForm({ ...fuelForm, vehicleId })} required /></FormGroup>
                  <Row>
                    <Col md="4"><FormGroup><Label>Ngày</Label><Input type="date" value={fuelForm.date} onChange={(e) => setFuelForm({ ...fuelForm, date: e.target.value })} required /></FormGroup></Col>
                    <Col md="4"><FormGroup><Label>Lít</Label><Input type="number" value={fuelForm.liters} onChange={(e) => setFuelForm({ ...fuelForm, liters: e.target.value })} required /></FormGroup></Col>
                    <Col md="4"><FormGroup><Label>Số tiền</Label><Input type="number" value={fuelForm.amount} onChange={(e) => setFuelForm({ ...fuelForm, amount: e.target.value })} /></FormGroup></Col>
                  </Row>
                  <FormGroup><Label>URL hóa đơn</Label><Input value={fuelForm.receiptUrl} onChange={(e) => setFuelForm({ ...fuelForm, receiptUrl: e.target.value })} /></FormGroup>
                  <Button color="success" type="submit">Ghi xăng</Button>
                </Form>
              </Col>
            </Row>
          )}

          {activeTab === "leave" && (
            <Form onSubmit={submitLeave}>
              <Row>
                <Col md="4"><FormGroup><Label>Từ ngày</Label><Input type="date" value={leaveForm.start} onChange={(e) => setLeaveForm({ ...leaveForm, start: e.target.value })} required /></FormGroup></Col>
                <Col md="4"><FormGroup><Label>Đến ngày</Label><Input type="date" value={leaveForm.end} onChange={(e) => setLeaveForm({ ...leaveForm, end: e.target.value })} required /></FormGroup></Col>
                <Col md="4"><FormGroup><Label>Lý do</Label><Input value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} required /></FormGroup></Col>
              </Row>
              <Button color="primary" type="submit">Gửi yêu cầu</Button>
            </Form>
          )}

          {activeTab === "maintenance" && (
            <Form onSubmit={submitMaintenance}>
              <FormGroup><Label>Xe</Label><VehiclePicker value={maintenanceForm.vehicleId} onChange={(vehicleId) => setMaintenanceForm({ ...maintenanceForm, vehicleId })} required /></FormGroup>
              <Row>
                <Col md="4"><FormGroup><Label>Ngày đề xuất</Label><Input type="date" value={maintenanceForm.maintenanceDate} onChange={(e) => setMaintenanceForm({ ...maintenanceForm, maintenanceDate: e.target.value })} required /></FormGroup></Col>
                <Col md="4"><FormGroup><Label>Chi phí dự kiến</Label><Input type="number" value={maintenanceForm.cost} onChange={(e) => setMaintenanceForm({ ...maintenanceForm, cost: e.target.value })} /></FormGroup></Col>
                <Col md="4"><FormGroup><Label>Nội dung</Label><Input value={maintenanceForm.description} onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })} required /></FormGroup></Col>
              </Row>
              <Button color="primary" type="submit">Gửi đề xuất</Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default TeacherPage;
