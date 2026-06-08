import { useEffect, useState } from "react";
import {
  Card, CardBody, CardHeader, Table, Button,
  Form, FormGroup, Label, Input, Row, Col, TabContent, TabPane, Nav, NavLink,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

interface Student {
  id: string;
  fullName: string;
  phone: string;
  coursePackage: string;
  courseStatus: string;
}

interface Contract {
  id: string;
  studentId: string;
  studentName: string;
  appointmentDate: string;
  signedDate: string;
  contractAmount: number;
  commission: number;
  dossierRegistrationForm: boolean;
  dossierPhoto: boolean;
  dossierHealthCheck: boolean;
  dossierFee: boolean;
}

interface CommissionRow {
  month: string;
  year: number;
  totalCommission: number;
  contractCount: number;
}

const SalesPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  //Học viên
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  useEffect(() => {
    api.get<Student[]>("/sales/students")
      .then((res) => setStudents(res.data))
      .finally(() => setStudentsLoading(false));
  }, []);

  const handleRemindFee = async (studentId: string) => {
    try {
      await api.post(`/sales/students/${studentId}/remind-fee`);
      alert("Đã gửi nhắc đóng phí");
    } catch {
      alert("Không thể gửi nhắc nhở");
    }
  };

  const handleRemindHealth = async (studentId: string) => {
    try {
      await api.post(`/sales/students/${studentId}/remind-health`);
      alert("Đã gửi nhắc nộp khám sức khỏe");
    } catch {
      alert("Không thể gửi nhắc nhở");
    }
  };

  //Hợp đồng
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractsLoading, setContractsLoading] = useState(true);
  const [contractForm, setContractForm] = useState({
    studentId: "",
    appointmentDate: "",
    signedDate: "",
    contractAmount: "",
  });

  useEffect(() => {
    api.get<Contract[]>("/sales/contracts")
      .then((res) => setContracts(res.data))
      .finally(() => setContractsLoading(false));
  }, []);

  const createContract = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/sales/contracts", {
        ...contractForm,
        contractAmount: Number(contractForm.contractAmount),
      });
      setContractForm({ studentId: "", appointmentDate: "", signedDate: "", contractAmount: "" });
      api.get<Contract[]>("/sales/contracts").then((res) => setContracts(res.data));
      alert("Đã tạo hợp đồng");
    } catch {
      alert("Không thể tạo hợp đồng");
    }
  };

  //Hồ sơ
  const [dossierForm, setDossierForm] = useState({
    studentId: "",
    registrationForm: false,
    photo: false,
    healthCheck: false,
    fee: false,
  });

  const updateDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/sales/students/${dossierForm.studentId}/dossier`, {
        registrationForm: dossierForm.registrationForm,
        photo: dossierForm.photo,
        healthCheck: dossierForm.healthCheck,
        fee: dossierForm.fee,
      });
      setDossierForm({ studentId: "", registrationForm: false, photo: false, healthCheck: false, fee: false });
      alert("Đã cập nhật hồ sơ");
    } catch {
      alert("Không thể cập nhật hồ sơ");
    }
  };

  //Hoa hồng
  const [commissions, setCommissions] = useState<CommissionRow[]>([]);
  const [commissionsLoading, setCommissionsLoading] = useState(true);

  useEffect(() => {
    api.get<CommissionRow[]>("/sales/commissions/monthly")
      .then((res) => setCommissions(res.data))
      .finally(() => setCommissionsLoading(false));
  }, []);

  const totalCommission = commissions.reduce((sum, c) => sum + c.totalCommission, 0);

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <AppLayout title="Kinh doanh">
      <Card className="content-card">
        <CardHeader tag="div">
          <Nav tabs>
            <NavLink
              className={activeTab === "1" ? "active" : ""}
              onClick={() => toggleTab("1")}
            >
              Học viên
            </NavLink>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => toggleTab("2")}
            >
              Hợp đồng
            </NavLink>
            <NavLink
              className={activeTab === "3" ? "active" : ""}
              onClick={() => toggleTab("3")}
            >
              Hồ sơ
            </NavLink>
            <NavLink
              className={activeTab === "4" ? "active" : ""}
              onClick={() => toggleTab("4")}
            >
              Hoa hồng
            </NavLink>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent activeTab={activeTab}>

            {/* Học viên */}
            <TabPane tabId="1">
              <h5 className="mb-3">Học viên phụ trách ({students.length})</h5>
              {studentsLoading ? (
                <EmptyState message="Đang tải..." />
              ) : students.length === 0 ? (
                <EmptyState message="Chưa có học viên nào được phân công. Ghi nhận hợp đồng để gán học viên." />
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Họ tên</th>
                      <th>Điện thoại</th>
                      <th>Khóa học</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id}>
                        <td><strong>{s.fullName}</strong></td>
                        <td>{s.phone}</td>
                        <td>{s.coursePackage ?? "—"}</td>
                        <td><StatusBadge status={s.courseStatus} /></td>
                        <td>
                          <Button color="warning" size="sm" className="me-1" onClick={() => handleRemindFee(s.id)}>
                            Nhắc đóng phí
                          </Button>
                          <Button color="info" size="sm" onClick={() => handleRemindHealth(s.id)}>
                            Nhắc nộp khám sức khỏe
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TabPane>

            {/* Hợp đồng */}
            <TabPane tabId="2">
              <h5 className="mb-3">Tạo hợp đồng mới</h5>
              <Form onSubmit={createContract} className="mb-4">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>ID học viên</Label>
                      <Input
                        value={contractForm.studentId}
                        onChange={(e) => setContractForm({ ...contractForm, studentId: e.target.value })}
                        placeholder="UUID học viên"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Số tiền hợp đồng</Label>
                      <Input
                        type="number"
                        value={contractForm.contractAmount}
                        onChange={(e) => setContractForm({ ...contractForm, contractAmount: e.target.value })}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Ngày hẹn</Label>
                      <Input
                        type="datetime-local"
                        value={contractForm.appointmentDate}
                        onChange={(e) => setContractForm({ ...contractForm, appointmentDate: e.target.value })}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Ngày ký</Label>
                      <Input
                        type="date"
                        value={contractForm.signedDate}
                        onChange={(e) => setContractForm({ ...contractForm, signedDate: e.target.value })}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" type="submit">Tạo hợp đồng</Button>
              </Form>

              <h5 className="mb-3">Danh sách hợp đồng ({contracts.length})</h5>
              {contractsLoading ? (
                <EmptyState message="Đang tải..." />
              ) : contracts.length === 0 ? (
                <EmptyState message="Chưa có hợp đồng nào" />
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Học viên</th>
                      <th>Ngày hẹn</th>
                      <th>Ngày ký</th>
                      <th>Số tiền</th>
                      <th>Hoa hồng</th>
                      <th>ĐK</th>
                      <th>Ảnh</th>
                      <th>KS</th>
                      <th>Phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((c) => (
                      <tr key={c.id}>
                        <td><strong>{c.studentName}</strong></td>
                        <td>{c.appointmentDate ? new Date(c.appointmentDate).toLocaleString("vi-VN") : "—"}</td>
                        <td>{c.signedDate}</td>
                        <td>{Number(c.contractAmount).toLocaleString()} đ</td>
                        <td>{Number(c.commission).toLocaleString()} đ</td>
                        <td>{c.dossierRegistrationForm ? "✅" : "❌"}</td>
                        <td>{c.dossierPhoto ? "✅" : "❌"}</td>
                        <td>{c.dossierHealthCheck ? "✅" : "❌"}</td>
                        <td>{c.dossierFee ? "✅" : "❌"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TabPane>

            {/* Hồ sơ */}
            <TabPane tabId="3">
              <h5 className="mb-3">Cập nhật hồ sơ học viên</h5>
              <Form onSubmit={updateDossier}>
                <FormGroup>
                  <Label>ID học viên</Label>
                  <Input
                    value={dossierForm.studentId}
                    onChange={(e) => setDossierForm({ ...dossierForm, studentId: e.target.value })}
                    placeholder="UUID học viên"
                    required
                  />
                </FormGroup>
                <div className="my-3">
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      checked={dossierForm.registrationForm}
                      onChange={(e) => setDossierForm({ ...dossierForm, registrationForm: e.target.checked })}
                      id="dossier-registrationForm"
                    />
                    <Label check htmlFor="dossier-registrationForm">Đơn đăng ký</Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      checked={dossierForm.photo}
                      onChange={(e) => setDossierForm({ ...dossierForm, photo: e.target.checked })}
                      id="dossier-photo"
                    />
                    <Label check htmlFor="dossier-photo">Ảnh hồ sơ</Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      checked={dossierForm.healthCheck}
                      onChange={(e) => setDossierForm({ ...dossierForm, healthCheck: e.target.checked })}
                      id="dossier-healthCheck"
                    />
                    <Label check htmlFor="dossier-healthCheck">Khám sức khỏe</Label>
                  </div>
                  <div className="form-check">
                    <Input
                      type="checkbox"
                      checked={dossierForm.fee}
                      onChange={(e) => setDossierForm({ ...dossierForm, fee: e.target.checked })}
                      id="dossier-fee"
                    />
                    <Label check htmlFor="dossier-fee">Đã đóng phí</Label>
                  </div>
                </div>
                <Button color="primary" type="submit">Cập nhật hồ sơ</Button>
              </Form>
            </TabPane>

            {/* Hoa hồng */}
            <TabPane tabId="4">
              <h5 className="mb-3">Tổng hoa hồng theo tháng</h5>
              <div className="mb-3 p-3 bg-light rounded">
                <strong>Tổng cộng: </strong>
                {totalCommission.toLocaleString()} đ ({commissions.length} tháng)
              </div>
              {commissionsLoading ? (
                <EmptyState message="Đang tải..." />
              ) : commissions.length === 0 ? (
                <EmptyState message="Chưa có dữ liệu hoa hồng" />
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Tháng</th>
                      <th>Số hợp đồng</th>
                      <th>Tổng hoa hồng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissions.map((c, idx) => (
                      <tr key={idx}>
                        <td>{c.month}/{c.year}</td>
                        <td>{c.contractCount}</td>
                        <td><strong>{c.totalCommission.toLocaleString()} đ</strong></td>
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

export default SalesPage;
