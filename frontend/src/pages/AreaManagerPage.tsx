import { useEffect, useState } from "react";
import {
  Card, CardBody, CardHeader, Table, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Row, Col,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import StaffPicker from "../components/StaffPicker";
import api from "../api/axios";

/* ── types ── */

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  teacher: { firstName: string };
}
interface LeaveWorkflowConfig {
  maxTeachersOffPerDay: number;
  minimumAdvanceDays: number;
  maxConsecutiveDays: number;
  requireReason: boolean;
  approvalSteps: string;
  notes: string;
}

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  currentOdo: number;
  active: boolean;
  registrationExpiry?: string;
  learnerLicenseExpiry?: string;
  insuranceExpiry?: string;
  monthlyStats?: Record<string, unknown>;
}

interface MaintenanceRequest {
  id: string;
  maintenanceDate: string;
  description?: string;
  cost?: number;
  approved: boolean;
  vehicle?: { licensePlate?: string; model?: string };
}

interface Salary {
  id: string;
  teacherId: number;
  month: string;
  baseSalary: number;
  bonus: number;
  total: number;
}

const TabLeave = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [workflow, setWorkflow] = useState<LeaveWorkflowConfig | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get<LeaveRequest[]>("/area-manager/leave-requests").then((r) => setLeaves(r.data));
    api.get<LeaveWorkflowConfig>("/area-manager/leave-workflow").then((r) => setWorkflow(r.data)).catch(() => setWorkflow(null));
  }, []);

  const handleApprove = (id: string, approved: boolean) => {
    api.put(`/area-manager/leave-requests/${id}?approved=${approved}`)
      .then(() => {
        setMsg(approved ? "Đã duyệt yêu cầu nghỉ phép" : "Đã từ chối yêu cầu nghỉ phép");
        setLeaves((prev) => prev.map((l) =>
          l.id === id ? { ...l, status: approved ? "APPROVED" : "REJECTED" } : l,
        ));
      })
      .catch((err) => setMsg(err?.response?.data?.error || "Không thể xử lý yêu cầu nghỉ phép"));
  };

  return (
    <Row className="g-3">
      <Col lg="4">
        <Card className="content-card">
          <CardHeader>Quy trình nghỉ phép</CardHeader>
          <CardBody>
            {workflow ? (
              <>
                <div className="small text-muted">GV nghỉ tối đa / ngày</div>
                <div className="fw-semibold mb-2">{workflow.maxTeachersOffPerDay}</div>
                <div className="small text-muted">Báo trước tối thiểu</div>
                <div className="fw-semibold mb-2">{workflow.minimumAdvanceDays} ngày</div>
                <div className="small text-muted">Nghỉ liên tiếp tối đa</div>
                <div className="fw-semibold mb-2">{workflow.maxConsecutiveDays} ngày</div>
                <div className="small text-muted">Các bước duyệt</div>
                <div className="mb-2">{workflow.approvalSteps}</div>
                <div className="small text-muted">Ghi chú</div>
                <div>{workflow.notes}</div>
              </>
            ) : <EmptyState message="Chưa có quy trình" />}
          </CardBody>
        </Card>
      </Col>
      <Col lg="8">
        <Card className="content-card">
          <CardHeader>Yêu cầu nghỉ phép ({leaves.length})</CardHeader>
          <CardBody className="p-0">
            {leaves.length === 0 ? (
              <EmptyState message="Không có yêu cầu nghỉ phép nào" />
            ) : (
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>Giáo viên</th>
                    <th>Từ</th>
                    <th>Đến</th>
                    <th>Lý do</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((l) => (
                    <tr key={l.id}>
                      <td>{l.teacher?.firstName}</td>
                      <td>{l.startDate}</td>
                      <td>{l.endDate}</td>
                      <td>{l.reason}</td>
                      <td><StatusBadge status={l.status} /></td>
                      <td>
                        <Button
                          color="success" size="sm" className="me-1"
                          disabled={l.status !== "PENDING"}
                          onClick={() => handleApprove(l.id, true)}
                        >
                          Duyệt
                        </Button>
                        <Button
                          color="danger" size="sm"
                          disabled={l.status !== "PENDING"}
                          onClick={() => handleApprove(l.id, false)}
                        >
                          Từ chối
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
        {msg && <div className="alert alert-info" role="alert">{msg}</div>}
      </Col>
    </Row>
  );
};

const TabMaintenance = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [msg, setMsg] = useState("");

  const loadRequests = () => {
    api.get<MaintenanceRequest[]>("/area-manager/maintenance")
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleSubmit = (id: string, approved: boolean) => {
    api.put(`/area-manager/maintenance/${id}?approved=${approved}`)
      .then(() => {
        setMsg(`Đã ${approved ? "duyệt" : "từ chối"} yêu cầu bảo dưỡng`);
        setRequests((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => { setMsg("Lỗi khi xử lý yêu cầu bảo dưỡng"); });
  };

  return (
    <Card className="content-card">
      <CardHeader>Yêu cầu bảo dưỡng phương tiện</CardHeader>
      <CardBody className="p-0">
        {requests.length === 0 ? (
          <EmptyState message="Không có yêu cầu bảo dưỡng đang chờ" />
        ) : (
          <Table responsive hover className="mb-0">
            <thead><tr><th>Xe</th><th>Ngày</th><th>Nội dung</th><th>Chi phí</th><th></th></tr></thead>
            <tbody>
              {requests.map((item) => (
                <tr key={item.id}>
                  <td>{item.vehicle?.licensePlate || "—"}</td>
                  <td>{item.maintenanceDate}</td>
                  <td>{item.description || "—"}</td>
                  <td>{item.cost ? Number(item.cost).toLocaleString("vi-VN") : "—"} đ</td>
                  <td>
                    <Button color="success" size="sm" className="me-2" onClick={() => handleSubmit(item.id, true)}>Duyệt</Button>
                    <Button color="danger" size="sm" onClick={() => handleSubmit(item.id, false)}>Từ chối</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {msg && <div className="alert alert-info mt-3" role="alert">{msg}</div>}
      </CardBody>
    </Card>
  );
};

const TabSalary = () => {
  const [teacherId, setTeacherId] = useState("");
  const [month, setMonth] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [msg, setMsg] = useState("");
  const [salaries, setSalaries] = useState<Salary[]>([]);

  const handleCreate = () => {
    if (!teacherId || !month || !baseSalary) {
      setMsg("Vui lòng điền đầy đủ Giáo viên ID, Tháng và Lương cơ bản");
      return;
    }
    const params = new URLSearchParams({
      teacherId, month, baseSalary,
      ...(bonus ? { bonus } : {}),
    });
    api.post(`/area-manager/salaries?${params.toString()}`)
      .then((r) => {
        setMsg(`Tạo thành công bảng lương cho tháng ${month}`);
        if (r.data) setSalaries((prev) => [r.data, ...prev]);
        setTeacherId(""); setMonth(""); setBaseSalary(""); setBonus("");
      })
      .catch(() => { setMsg("Lỗi khi tạo bảng lương"); });
  };

  return (
    <Card className="content-card">
      <CardHeader>Tính lương cho giáo viên</CardHeader>
      <CardBody>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label>Giáo viên</Label>
              <StaffPicker value={teacherId} onChange={(id) => setTeacherId(id)} required />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Tháng</Label>
              <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Lương cơ bản</Label>
              <Input type="number" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} placeholder="0" />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Thưởng (tùy chọn)</Label>
              <Input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder="0" />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" className="mt-2" onClick={handleCreate}>Tính và tạo lương</Button>
        {msg && <div className="alert alert-info mt-3" role="alert">{msg}</div>}
        {salaries.length > 0 && (
          <div className="mt-4">
            <h6>Bảng lương đã tạo</h6>
            <Table responsive hover size="sm">
              <thead><tr><th>ID</th><th>Giáo viên ID</th><th>Tháng</th><th>Cơ bản</th><th>Thưởng</th><th>Tổng</th></tr></thead>
              <tbody>
                {salaries.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id.slice(0, 8)}</td>
                    <td>{s.teacherId}</td>
                    <td>{s.month}</td>
                    <td>{Number(s.baseSalary).toLocaleString("vi-VN")} ₫</td>
                    <td>{Number(s.bonus).toLocaleString("vi-VN")} ₫</td>
                    <td><strong>{Number(s.total).toLocaleString("vi-VN")} ₫</strong></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

const TabVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    api.get<Vehicle[]>("/area-manager/vehicles").then((r) => setVehicles(r.data));
  }, []);

  const filtered = filterActive === null ? vehicles : vehicles.filter((v) => v.active === filterActive);

  return (
    <>
      <Card className="content-card">
        <CardHeader>
          <Row>
            <Col className="text-truncate">Danh sách phương tiện ({filtered.length})</Col>
            <Col xs="auto">
              <Button
                color={filterActive === true ? "success" : "secondary"} size="sm" className="me-1"
                onClick={() => setFilterActive(true)}
              >Hoạt động</Button>
              <Button
                color={filterActive === false ? "danger" : "secondary"} size="sm" className="me-1"
                onClick={() => setFilterActive(false)}
              >Ngừng hoạt động</Button>
              {filterActive !== null && (
                <Button color="secondary" size="sm" onClick={() => setFilterActive(null)}>Tất cả</Button>
              )}
            </Col>
          </Row>
        </CardHeader>
        <CardBody className="p-0">
          {filtered.length === 0 ? (
            <EmptyState message="Không có xe nào" />
          ) : (
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Biển số</th>
                  <th>Model</th>
                  <th>ODO</th>
                  <th>HSLX</th>
                  <th> GPLH</th>
                  <th>Bảo hiểm</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id} className="clickable-row" onClick={() => setSelectedVehicle(v)}>
                    <td><strong>{v.licensePlate}</strong></td>
                    <td>{v.model ?? "—"}</td>
                    <td>{v.currentOdo?.toLocaleString() ?? "—"} km</td>
                    <td>{v.registrationExpiry ?? "—"}</td>
                    <td>{v.learnerLicenseExpiry ?? "—"}</td>
                    <td>{v.insuranceExpiry ?? "—"}</td>
                    <td><StatusBadge status={v.active ? "active" : "inactive"} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={!!selectedVehicle} toggle={() => setSelectedVehicle(null)} size="lg">
        <ModalHeader toggle={() => setSelectedVehicle(null)}>
          Chi tiết xe {selectedVehicle?.licensePlate}
        </ModalHeader>
        <ModalBody>
          {selectedVehicle && (
            <dl className="row">
              <dt className="col-sm-4">Biển số</dt>
              <dd className="col-sm-8"><strong>{selectedVehicle.licensePlate}</strong></dd>
              <dt className="col-sm-4">Model</dt>
              <dd className="col-sm-8">{selectedVehicle.model ?? "—"}</dd>
              <dt className="col-sm-4">ODO hiện tại</dt>
              <dd className="col-sm-8">{selectedVehicle.currentOdo?.toLocaleString() ?? "—"} km</dd>
              <dt className="col-sm-4">Trạng thái</dt>
              <dd className="col-sm-8"><StatusBadge status={selectedVehicle.active ? "active" : "inactive"} /></dd>
              <dt className="col-sm-4">Hết sức lưu hành</dt>
              <dd className="col-sm-8">{selectedVehicle.registrationExpiry ?? "—"}</dd>
              <dt className="col-sm-4">Hết GPLH</dt>
              <dd className="col-sm-8">{selectedVehicle.learnerLicenseExpiry ?? "—"}</dd>
              <dt className="col-sm-4">Hết bảo hiểm</dt>
              <dd className="col-sm-8">{selectedVehicle.insuranceExpiry ?? "—"}</dd>
              {selectedVehicle.monthlyStats && (
                <>
                  <dt className="col-sm-4">Thống kê tháng</dt>
                  <dd className="col-sm-8">
                    <pre className="bg-light p-2 rounded" style={{ fontSize: "0.85rem", maxHeight: 200, overflow: "auto" }}>
                      {JSON.stringify(selectedVehicle.monthlyStats, null, 2)}
                    </pre>
                  </dd>
                </>
              )}
            </dl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setSelectedVehicle(null)}>Đóng</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const tabItems = [
  { id: "leave", label: "Duyệt nghỉ phép", component: TabLeave },
  { id: "maintenance", label: "Duyệt bảo dưỡng", component: TabMaintenance },
  { id: "salary", label: "Tính lương", component: TabSalary },
  { id: "vehicles", label: "Quản lý xe", component: TabVehicles },
];

const AreaManagerPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabItems[activeTab].component;

  return (
    <AppLayout
      title="Quản lý khu vực"
      sidebarItems={tabItems.map(({ id, label }) => ({ id, label }))}
      activeSidebarItem={tabItems[activeTab].id}
      onSidebarItemClick={(id) => {
        const index = tabItems.findIndex((item) => item.id === id);
        if (index >= 0) setActiveTab(index);
      }}
    >
      <ActiveComponent />
    </AppLayout>
  );
};

export default AreaManagerPage;
