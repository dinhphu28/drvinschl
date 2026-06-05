import { useEffect, useState } from "react";
import {
  Card, CardBody, CardHeader, Row, Col,
  Form, FormGroup, Label, Input, Button, Table, Alert,
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

const AccountingPage = () => {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [message, setMessage] = useState("");

  const [studentForm, setStudentForm] = useState({
    username: "", email: "", password: "", fullName: "", phone: "", dob: "", coursePackage: "B2", totalFee: "15000000",
  });

  const [paymentForm, setPaymentForm] = useState({
    studentId: "", paymentType: "HOC_PHI", amount: "", note: "",
  });

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

  return (
    <AppLayout title="Kế toán">
      {message && <Alert color="info" className="mb-3">{message}</Alert>}

      <Row>
        <Col lg="6" className="mb-3">
          <Card className="content-card">
            <CardHeader>Tạo tài khoản học viên</CardHeader>
            <CardBody>
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
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" className="mb-3">
          <Card className="content-card">
            <CardHeader>Thu học phí</CardHeader>
            <CardBody>
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
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card className="content-card">
        <CardHeader>Bảng lương</CardHeader>
        <CardBody className="p-0">
          {salaries.length === 0 ? (
            <EmptyState message="Chưa có dữ liệu lương" />
          ) : (
            <Table responsive hover className="mb-0">
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
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default AccountingPage;
