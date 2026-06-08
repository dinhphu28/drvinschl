import { useEffect, useState } from "react";
import {
  Card, CardBody, CardHeader, Row, Col,
  Form, FormGroup, Label, Input, Button, Table, Alert,
  TabContent, TabPane, Nav, NavLink,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import api from "../api/axios";

interface Salary {
  id: string;
  month: string;
  baseSalary: number;
  bonus: number;
  totalAmount: number;
  teacher: { firstName: string };
}

interface FuelRecord {
  id: string;
  vehiclePlate: string;
  teacherName: string;
  date: string;
  liters: number;
  amount: number;
}

interface FuelSummary {
  month: string;
  year: number;
  totalLiters: number;
  totalAmount: number;
  recordCount: number;
}

const AccountingPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [message, setMessage] = useState("");

  //Tạo tài khoản
  const [studentForm, setStudentForm] = useState({
    username: "", email: "", password: "", fullName: "", phone: "", dob: "", coursePackage: "B2", totalFee: "15000000",
  });

  //Thu phí
  const [paymentForm, setPaymentForm] = useState({
    studentId: "", paymentType: "HOC_PHI", amount: "", note: "",
  });

  //Hoàn phí
  const [refundForm, setRefundForm] = useState({
    studentId: "", amount: "", note: "",
  });

  //Xăng
  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([]);
  const [fuelLoading, setFuelLoading] = useState(false);
  const [fuelDateRange, setFuelDateRange] = useState({ start: "", end: "" });
  const [fuelSummary, setFuelSummary] = useState<FuelSummary | null>(null);
  const [summaryParam, setSummaryParam] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });

  //Lương
  const [salaries, setSalaries] = useState<Salary[]>([]);

  useEffect(() => {
    api.get<Salary[]>("/accounting/salaries").then((r) => setSalaries(r.data));
  }, []);

  const createStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/accounting/students", { ...studentForm, totalFee: Number(studentForm.totalFee) });
      setMessage("Đã tạo tài khoản học viên");
    } catch {
      setMessage("Không thể tạo học viên");
    }
  };

  const recordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/accounting/payments", { ...paymentForm, amount: Number(paymentForm.amount) });
      setMessage("Đã ghi nhận thanh toán");
    } catch {
      setMessage("Không thể ghi nhận thanh toán");
    }
  };

  const recordRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/accounting/refunds", { ...refundForm, amount: Number(refundForm.amount) });
      setMessage("Đã ghi nhận hoàn phí");
      setRefundForm({ studentId: "", amount: "", note: "" });
    } catch {
      setMessage("Không thể ghi nhận hoàn phí");
    }
  };

  const loadFuelRecords = async () => {
    setFuelLoading(true);
    try {
      const params = new URLSearchParams();
      if (fuelDateRange.start) params.append("start", fuelDateRange.start);
      if (fuelDateRange.end) params.append("end", fuelDateRange.end);
      const res = await api.get<FuelRecord[]>(`/accounting/fuel?${params.toString()}`);
      setFuelRecords(res.data);
    } catch {
      setMessage("Không thể tải dữ liệu xăng");
    } finally {
      setFuelLoading(false);
    }
  };

  const loadFuelSummary = async () => {
    try {
      const res = await api.get<FuelSummary>(`/accounting/fuel-summary?year=${summaryParam.year}&month=${summaryParam.month}`);
      setFuelSummary(res.data);
    } catch {
      setMessage("Không thể tải tổng hợp xăng");
    }
  };

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <AppLayout title="Kế toán">
      {message && <Alert color="info" className="mb-3" dismissible onClose={() => setMessage("")}>{message}</Alert>}

      <Card className="content-card">
        <CardHeader tag="div">
          <Nav tabs>
            <NavLink
              className={activeTab === "1" ? "active" : ""}
              onClick={() => toggleTab("1")}
            >
              Tạo tài khoản
            </NavLink>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Thu phí
            </NavLink>
            <NavLink
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              Hoàn phí
            </NavLink>
            <NavLink
              className={activeTab === "4" ? "active" : ""}
              onClick={() => toggleTab("4")}
            >
              Xăng
            </NavLink>
            <NavLink
              className={activeTab === "5" ? "active" : ""}
              onClick={() => toggleTab("5")}
            >
              Lương
            </NavLink>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={activeTab}>

            {/* Tạo tài khoản */}
            <TabPane tabId="1">
              <h5 className="mb-3">Tạo tài khoản học viên</h5>
              <Form onSubmit={createStudent}>
                <Row>
                  <Col md="6"><FormGroup><Label>Họ tên</Label><Input value={studentForm.fullName} onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })} required /></FormGroup></Col>
                  <Col md="6"><FormGroup><Label>Điện thoại</Label><Input value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} required /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md="6"><FormGroup><Label>Email</Label><Input type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} required /></FormGroup></Col>
                  <Col md="6"><FormGroup><Label>Username</Label><Input value={studentForm.username} onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })} required /></FormGroup></Col>
                </Row>
                <Row>
                  <Col md="4"><FormGroup><Label>Ngày sinh</Label><Input type="date" value={studentForm.dob} onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })} required /></FormGroup></Col>
                  <Col md="4"><FormGroup><Label>Khóa học</Label><Input value={studentForm.coursePackage} onChange={(e) => setStudentForm({ ...studentForm, coursePackage: e.target.value })} /></FormGroup></Col>
                  <Col md="4"><FormGroup><Label>Học phí</Label><Input type="number" value={studentForm.totalFee} onChange={(e) => setStudentForm({ ...studentForm, totalFee: e.target.value })} /></FormGroup></Col>
                </Row>
                <FormGroup><Label>Mật khẩu</Label><Input type="password" value={studentForm.password} onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })} required /></FormGroup>
                <Button color="primary">Tạo học viên</Button>
              </Form>
            </TabPane>

            {/* Thu phí */}
            <TabPane tabId="2">
              <h5 className="mb-3">Thu học phí</h5>
              <Form onSubmit={recordPayment}>
                <FormGroup><Label>ID học viên (UUID)</Label><Input value={paymentForm.studentId} onChange={(e) => setPaymentForm({ ...paymentForm, studentId: e.target.value })} required /></FormGroup>
                <Row>
                  <Col md="6">
                    <FormGroup><Label>Loại</Label>
                      <Input type="select" value={paymentForm.paymentType} onChange={(e) => setPaymentForm({ ...paymentForm, paymentType: e.target.value })}>
                        <option value="HOC_PHI">Học phí</option>
                        <option value="HOC_THEM">Học thêm</option>
                        <option value="THI_LAI">Thi lại</option>
                        <option value="HOAN_PHI">Hoàn phí</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6"><FormGroup><Label>Số tiền</Label><Input type="number" value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })} required /></FormGroup></Col>
                </Row>
                <FormGroup><Label>Ghi chú</Label><Input value={paymentForm.note} onChange={(e) => setPaymentForm({ ...paymentForm, note: e.target.value })} /></FormGroup>
                <Button color="success">Ghi nhận thanh toán</Button>
              </Form>
            </TabPane>

            {/* Hoàn phí */}
            <TabPane tabId="3">
              <h5 className="mb-3">Hoàn phí</h5>
              <Form onSubmit={recordRefund}>
                <FormGroup><Label>ID học viên</Label><Input value={refundForm.studentId} onChange={(e) => setRefundForm({ ...refundForm, studentId: e.target.value })} required /></FormGroup>
                <FormGroup><Label>Số tiền hoàn</Label><Input type="number" value={refundForm.amount} onChange={(e) => setRefundForm({ ...refundForm, amount: e.target.value })} required /></FormGroup>
                <FormGroup><Label>Ghi chú</Label><Input type="textarea" rows={3} value={refundForm.note} onChange={(e) => setRefundForm({ ...refundForm, note: e.target.value })} /></FormGroup>
                <Button color="danger">Ghi nhận hoàn phí</Button>
              </Form>
            </TabPane>

            {/* Xăng */}
            <TabPane tabId="4">
              <h5 className="mb-3">Phiếu xăng</h5>
              <Row className="align-items-end mb-3">
                <Col md="3">
                  <FormGroup><Label>Từ ngày</Label><Input type="date" value={fuelDateRange.start} onChange={(e) => setFuelDateRange({ ...fuelDateRange, start: e.target.value })} /></FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup><Label>Đến ngày</Label><Input type="date" value={fuelDateRange.end} onChange={(e) => setFuelDateRange({ ...fuelDateRange, end: e.target.value })} /></FormGroup>
                </Col>
                <Col md="2">
                  <Button color="primary" block onClick={loadFuelRecords} disabled={fuelLoading}>
                    {fuelLoading ? "Đang tải..." : "Tải dữ liệu"}
                  </Button>
                </Col>
              </Row>

              {fuelRecords.length > 0 && (
                <Table responsive hover className="mb-4">
                  <thead>
                    <tr>
                      <th>Bảng số</th>
                      <th>Giáo viên</th>
                      <th>Ngày</th>
                      <th>Lít</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fuelRecords.map((r) => (
                      <tr key={r.id}>
                        <td>{r.vehiclePlate}</td>
                        <td>{r.teacherName}</td>
                        <td>{r.date}</td>
                        <td>{r.liters}</td>
                        <td>{Number(r.amount).toLocaleString()} đ</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <h6 className="mb-3">Tổng hợp theo tháng</h6>
              <Row className="align-items-end mb-3">
                <Col md="3">
                  <FormGroup><Label>Năm</Label><Input type="number" value={summaryParam.year} onChange={(e) => setSummaryParam({ ...summaryParam, year: Number(e.target.value) })} /></FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup><Label>Tháng</Label><Input type="number" min={1} max={12} value={summaryParam.month} onChange={(e) => setSummaryParam({ ...summaryParam, month: Number(e.target.value) })} /></FormGroup>
                </Col>
                <Col md="2">
                  <Button color="info" block onClick={loadFuelSummary}>Xem tổng hợp</Button>
                </Col>
              </Row>

              {fuelSummary && (
                <Table hover>
                  <thead>
                    <tr>
                      <th>Tháng/Năm</th>
                      <th>Số phiếu</th>
                      <th>Tổng lít</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{fuelSummary.month}/{fuelSummary.year}</td>
                      <td>{fuelSummary.recordCount}</td>
                      <td>{fuelSummary.totalLiters} lít</td>
                      <td><strong>{Number(fuelSummary.totalAmount).toLocaleString()} đ</strong></td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </TabPane>

            {/* Lương */}
            <TabPane tabId="5">
              <h5 className="mb-3">Bảng lương</h5>
              {salaries.length === 0 ? (
                <EmptyState message="Chưa có dữ liệu lương" />
              ) : (
                <Table responsive hover>
                  <thead><tr><th>Giáo viên</th><th>Tháng</th><th>Lương cơ bản</th><th>Thưởng</th><th>Tổng</th></tr></thead>
                  <tbody>
                    {salaries.map((s) => (
                      <tr key={s.id}>
                        <td>{s.teacher?.firstName}</td>
                        <td>{s.month}</td>
                        <td>{Number(s.baseSalary).toLocaleString()} đ</td>
                        <td>{Number(s.bonus ?? 0).toLocaleString()} đ</td>
                        <td><strong>{Number(s.totalAmount).toLocaleString()} đ</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TabPane>

          </TabContent>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default AccountingPage;
