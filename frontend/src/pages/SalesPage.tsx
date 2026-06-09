import { useEffect, useState } from "react";
import {
  Card, CardBody, Table, Button,
  Form, FormGroup, Label, Input, Row, Col, TabContent, TabPane,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import StudentPicker from "../components/StudentPicker";
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

interface SalesContractUpdateRequest {
  appointmentDate?: string | null;
  signedDate?: string | null;
  contractAmount?: number | null;
}

interface SalesContractCreateRequest {
  studentId: string;
  appointmentDate?: string | null;
  signedDate?: string | null;
  contractAmount?: number | null;
  commissionAmount?: number | null;
}

const salesSidebarItems = [
  { id: "1", label: "Học viên" },
  { id: "2", label: "Hợp đồng" },
  { id: "3", label: "Hồ sơ" },
  { id: "4", label: "Hoa hồng" },
];

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? value : []);

const SalesPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [message, setMessage] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractsLoading, setContractsLoading] = useState(true);
  const [editingContractId, setEditingContractId] = useState("");
  const [contractForm, setContractForm] = useState({
    studentId: "",
    appointmentDate: "",
    signedDate: "",
    contractAmount: "",
  });

  const [dossierForm, setDossierForm] = useState({
    studentId: "",
    registrationForm: false,
    photo: false,
    healthCheck: false,
    fee: false,
  });

  const [commissions, setCommissions] = useState<CommissionRow[]>([]);
  const [commissionsLoading, setCommissionsLoading] = useState(true);

  const loadStudents = () => {
    setStudentsLoading(true);
    api.get<Student[]>("/sales/students")
      .then((res) => setStudents(asArray<Student>(res.data)))
      .catch(() => setStudents([]))
      .finally(() => setStudentsLoading(false));
  };

  const loadContracts = () => {
    setContractsLoading(true);
    api.get<Contract[]>("/sales/contracts")
      .then((res) => setContracts(asArray<Contract>(res.data)))
      .catch(() => setContracts([]))
      .finally(() => setContractsLoading(false));
  };

  const loadCommissions = () => {
    setCommissionsLoading(true);
    api.get<CommissionRow[]>("/sales/commissions/monthly")
      .then((res) => setCommissions(asArray<CommissionRow>(res.data)))
      .catch(() => setCommissions([]))
      .finally(() => setCommissionsLoading(false));
  };

  useEffect(() => {
    loadStudents();
    loadContracts();
    loadCommissions();
  }, []);

  const flash = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3000);
  };

  const handleRemindFee = async (studentId: string) => {
    try {
      await api.post(`/sales/students/${studentId}/remind-fee`);
      flash("Đã gửi nhắc đóng phí");
    } catch {
      flash("Không thể gửi nhắc nhở");
    }
  };

  const handleRemindHealth = async (studentId: string) => {
    try {
      await api.post(`/sales/students/${studentId}/remind-health`);
      flash("Đã gửi nhắc nộp khám sức khỏe");
    } catch {
      flash("Không thể gửi nhắc nhở");
    }
  };

  const createContract = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingContractId) {
        const payload: SalesContractUpdateRequest = {
          appointmentDate: contractForm.appointmentDate || null,
          signedDate: contractForm.signedDate || null,
          contractAmount: contractForm.contractAmount ? Number(contractForm.contractAmount) : null,
        };
        await api.put(`/sales/contracts/${editingContractId}`, payload);
        flash("Đã cập nhật hợp đồng");
      } else {
        const payload: SalesContractCreateRequest = {
          studentId: contractForm.studentId,
          appointmentDate: contractForm.appointmentDate,
          signedDate: contractForm.signedDate,
          contractAmount: contractForm.contractAmount ? Number(contractForm.contractAmount) : null,
        };
        await api.post(`/sales/contracts`, payload);
        flash("Đã tạo hợp đồng");
      }
      setEditingContractId("");
      setContractForm({ studentId: "", appointmentDate: "", signedDate: "", contractAmount: "" });
      loadStudents();
      loadContracts();
    } catch (err: any) {
      flash(err?.response?.data?.error || (editingContractId ? "Không thể cập nhật hợp đồng" : "Không thể tạo hợp đồng"));
    }
  };

  const startEditContract = (contract: Contract) => {
    setEditingContractId(contract.id);
    setContractForm({
      studentId: contract.studentId,
      appointmentDate: contract.appointmentDate ? contract.appointmentDate.slice(0, 16) : "",
      signedDate: contract.signedDate ? contract.signedDate.slice(0, 10) : "",
      contractAmount: String(contract.contractAmount ?? ""),
    });
    setActiveTab("2");
  };

  const cancelEditContract = () => {
    setEditingContractId("");
    setContractForm({ studentId: "", appointmentDate: "", signedDate: "", contractAmount: "" });
  };

  const updateDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/sales/students/${dossierForm.studentId}/dossier`, null, {
        params: {
          registrationForm: dossierForm.registrationForm,
          photo: dossierForm.photo,
          healthCheck: dossierForm.healthCheck,
          fee: dossierForm.fee,
        },
      });
      setDossierForm({ studentId: "", registrationForm: false, photo: false, healthCheck: false, fee: false });
      flash("Đã cập nhật hồ sơ");
      loadStudents();
      loadContracts();
    } catch {
      flash("Không thể cập nhật hồ sơ");
    }
  };

  const totalCommission = asArray<CommissionRow>(commissions).reduce((sum, c) => sum + Number(c.totalCommission || 0), 0);

  return (
    <AppLayout
      title="Kinh doanh"
      sidebarItems={salesSidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={setActiveTab}
    >
      <Card className="content-card">
        <CardBody>
          {message && <div className={`alert ${message.startsWith("Không") ? "alert-danger" : "alert-success"}`}>{message}</div>}
          <TabContent activeTab={activeTab}>
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

            <TabPane tabId="2">
              <h5 className="mb-3">{editingContractId ? "Cập nhật hợp đồng" : "Tạo hợp đồng mới"}</h5>
              <Form onSubmit={createContract} className="mb-4">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Học viên</Label>
                      <StudentPicker value={contractForm.studentId} onChange={(studentId) => setContractForm({ ...contractForm, studentId })} required={!editingContractId} />
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
                <div className="d-flex gap-2">
                  <Button color="primary" type="submit">{editingContractId ? "Cập nhật hợp đồng" : "Tạo hợp đồng"}</Button>
                  {editingContractId && <Button color="secondary" type="button" outline onClick={cancelEditContract}>Hủy</Button>}
                </div>
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((c) => (
                      <tr key={c.id}>
                        <td><strong>{c.studentName}</strong></td>
                        <td>{c.appointmentDate ? new Date(c.appointmentDate).toLocaleString("vi-VN") : "—"}</td>
                        <td>{c.signedDate ? new Date(c.signedDate).toLocaleDateString("vi-VN") : "—"}</td>
                        <td>{Number(c.contractAmount ?? 0).toLocaleString()} đ</td>
                        <td>{Number(c.commission ?? 0).toLocaleString()} đ</td>
                        <td>{c.dossierRegistrationForm ? "✅" : "❌"}</td>
                        <td>{c.dossierPhoto ? "✅" : "❌"}</td>
                        <td>{c.dossierHealthCheck ? "✅" : "❌"}</td>
                        <td>{c.dossierFee ? "✅" : "❌"}</td>
                        <td>
                          <Button color="info" size="sm" onClick={() => startEditContract(c)}>Sửa</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </TabPane>

            <TabPane tabId="3">
              <h5 className="mb-3">Cập nhật hồ sơ học viên</h5>
              <Form onSubmit={updateDossier}>
                <FormGroup>
                  <Label>Học viên</Label>
                  <StudentPicker value={dossierForm.studentId} onChange={(studentId) => setDossierForm({ ...dossierForm, studentId })} required />
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
