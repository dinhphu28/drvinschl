import { useEffect, useState } from "react";
import {
  Badge, Button, Card, CardBody, CardHeader, Col, Form, FormGroup,
  Input, Label, Nav, NavItem, NavLink, Row, Table, TabContent, TabPane,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import api from "../api/axios";

interface CoursePackage {
  id: string; name: string; price: number;
  theoryHours: number; simulationHours: number; basic4hHours: number;
  cabinHours: number; datHours: number; datKm: number;
  saHinhHours: number; active: boolean;
}
interface SystemConfig { configKey: string; configValue: string; description: string; }
interface UserRecord { id: string; username: string; email: string; firstName: string; lastName: string; role: string; }
interface ScheduleDraft {
  module: string;
  dayPattern: string;
  startTime: string;
  endTime: string;
  location: string;
  notes: string;
}

const emptyPkg = { name: "", price: 0, theoryHours: 0, simulationHours: 0, basic4hHours: 0, cabinHours: 0, datHours: 0, datKm: 0, saHinhHours: 0, active: true };
const retakeFeeKeys = [
  { value: "THI_LAI_LY_THUYET", label: "Lý thuyết" }, { value: "THI_LAI_MO_PHONG", label: "Mô phỏng" },
  { value: "THI_LAI_SA_HINH", label: "Sa hình" }, { value: "THI_LAI_DUONG_TRUONG", label: "Đường trường" },
];
const extraHourKeys = [
  { value: "GIA_GIO_DUONG_TRUONG", label: "Đường trường" }, { value: "GIA_GIO_SA_HINH", label: "Sa hình" },
];
const scheduleModules = [
  { value: "LY_THUYET", label: "Lý thuyết" }, { value: "MO_PHONG", label: "Mô phỏng" },
];
const emptyScheduleDraft: ScheduleDraft = {
  module: "",
  dayPattern: "",
  startTime: "",
  endTime: "",
  location: "",
  notes: "",
};
const roleEntries = [
  { value: "KINH_DOANH", label: "Kinh doanh" }, { value: "KE_TOAN", label: "Kế toán" },
  { value: "GIAO_VU_KHU_VUC", label: "Giáo vụ khu vực" }, { value: "GIAO_VU_SA_HINH", label: "Giáo vụ sa hình" },
  { value: "GIAO_VU_THI", label: "Giáo vụ thi" }, { value: "GIAO_VIEN", label: "Giáo viên" },
  { value: "QUAN_LY_KHU_VUC", label: "Quản lý khu vực" }, { value: "GIAM_DOC", label: "Giám đốc" }, { value: "ADMIN", label: "Admin" },
];
const AdminPage = () => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [pkgForm, setPkgForm] = useState(emptyPkg);
  const [editingPkgId, setEditingPkg] = useState<string | null>(null);
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [retakeForm, setRetakeForm] = useState({ key: "", value: "", description: "" });
  const [extraHourForm, setExtraHourForm] = useState({ key: "", value: "", description: "" });
  const [leaveForm, setLeaveForm] = useState({ key: "", value: "", description: "" });
  const [scheduleForm, setScheduleForm] = useState<ScheduleDraft>(emptyScheduleDraft);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", firstName: "", lastName: "", password: "", role: "KINH_DOANH" });

  const flash = (m: string) => { setMessage(m); setTimeout(() => setMessage(""), 3000); };
  const loadPackages = () => api.get<CoursePackage[]>("/admin/course-packages").then((r) => setPackages(r.data));
  const loadConfigs = () => api.get<SystemConfig[]>("/admin/configs").then((r) => setConfigs(r.data));
  const loadUsers = () => api.get<UserRecord[]>("/admin/users").then((r) => setUsers(r.data)).catch(() => setUsers([]));
  useEffect(() => { loadPackages(); }, []);
  useEffect(() => { loadConfigs(); }, []);
  useEffect(() => { loadUsers(); }, []);
  const toggle = (t: string) => { if (activeTab !== t) setActiveTab(t); };
  const startEditPkg = (p: CoursePackage) => {
    setPkgForm({ name: p.name, price: p.price, theoryHours: p.theoryHours, simulationHours: p.simulationHours, basic4hHours: p.basic4hHours, cabinHours: p.cabinHours, datHours: p.datHours, datKm: p.datKm, saHinhHours: p.saHinhHours, active: p.active });
    setEditingPkg(p.id);
  };
  const cancelEditPkg = () => { setPkgForm(emptyPkg); setEditingPkg(null); };
  const submitPkg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPkgId) {
        await api.put(`/admin/course-packages/${editingPkgId}`, pkgForm);
        flash("Cập nhật gói học thành công");
      } else {
        await api.post("/admin/course-packages", pkgForm);
        flash("Tạo gói học thành công");
      }
      setPkgForm(emptyPkg); setEditingPkg(null); loadPackages();
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const deactivatePkg = async (id: string) => {
    try { await api.delete(`/admin/course-packages/${id}`); flash("Vô hiệu hóa gói học thành công"); loadPackages(); } catch { flash("Đã xảy ra lỗi"); }
  };
  const submitRetake = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/admin/configs/retake-fee", null, { params: { key: retakeForm.key, value: retakeForm.value, description: retakeForm.description } });
      flash("Cập nhật phí thi lại thành công"); loadConfigs();
      setRetakeForm({ key: "", value: "", description: "" });
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const submitExtraHour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/admin/configs/extra-hour-price", null, { params: { key: extraHourForm.key, value: extraHourForm.value, description: extraHourForm.description } });
      flash("Cập nhật giá giờ học thêm thành công"); loadConfigs();
      setExtraHourForm({ key: "", value: "", description: "" });
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const submitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/admin/configs/leave-workflow", null, { params: { key: leaveForm.key, value: leaveForm.value, description: leaveForm.description } });
      flash("Cập nhật quy trình thành công"); loadConfigs();
      setLeaveForm({ key: "", value: "", description: "" });
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const submitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!scheduleForm.module) { flash("Vui lòng chọn module"); return; }
      if (!scheduleForm.dayPattern.trim() || !scheduleForm.startTime.trim() || !scheduleForm.endTime.trim()) {
        flash("Vui lòng điền ngày và khung giờ"); return;
      }
      if (scheduleForm.startTime >= scheduleForm.endTime) {
        flash("Giờ bắt đầu phải trước giờ kết thúc"); return;
      }
      const scheduleInfo = {
        day: scheduleForm.dayPattern.trim(),
        time: `${scheduleForm.startTime} - ${scheduleForm.endTime}`,
        location: scheduleForm.location.trim() || undefined,
        notes: scheduleForm.notes.trim() || undefined,
      };
      await api.post("/admin/theory-schedule", {
        module: scheduleForm.module,
        scheduleInfo: JSON.stringify(scheduleInfo),
      });
      flash("Cập nhật lịch lý thuyết thành công");
      setScheduleForm(emptyScheduleDraft);
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const schedulePreview = (() => {
    if (!scheduleForm.module && !scheduleForm.dayPattern && !scheduleForm.startTime && !scheduleForm.endTime && !scheduleForm.location && !scheduleForm.notes) {
      return "{\n  \"day\": \"Mon-Fri\",\n  \"time\": \"08:00 - 12:00\",\n  \"location\": \"Phòng LT-01\",\n  \"notes\": \"\"\n}";
    }
    return JSON.stringify({
      day: scheduleForm.dayPattern.trim(),
      time: `${scheduleForm.startTime || "08:00"} - ${scheduleForm.endTime || "12:00"}`,
      location: scheduleForm.location.trim() || undefined,
      notes: scheduleForm.notes.trim() || undefined,
    }, null, 2);
  })();
  const loadScheduleTemplate = (template: Partial<ScheduleDraft>) => {
    setScheduleForm((prev) => ({ ...prev, ...template }));
  };
  const renderConfigValue = (config: SystemConfig) => {
    if (!config.configKey.startsWith("SCHEDULE_")) {
      return config.configValue;
    }
    try {
      const parsed = JSON.parse(config.configValue) as { day?: string; time?: string; location?: string; notes?: string };
      const parts = [
        parsed.day ? `Ngày: ${parsed.day}` : null,
        parsed.time ? `Giờ: ${parsed.time}` : null,
        parsed.location ? `Địa điểm: ${parsed.location}` : null,
        parsed.notes ? `Ghi chú: ${parsed.notes}` : null,
      ].filter(Boolean);
      return parts.length > 0 ? parts.join(" | ") : config.configValue;
    } catch {
      return config.configValue;
    }
  };
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", newUser);
      flash("Tạo tài khoản thành công");
      setNewUser({ username: "", email: "", firstName: "", lastName: "", password: "", role: "KINH_DOANH" });
      loadUsers();
    } catch { flash("Không thể tạo tài khoản"); }
  };
  return (
    <AppLayout title="Quản trị hệ thống">
      {message && <div className={`alert ${message.startsWith("Không") ? "alert-danger" : "alert-success"} alert-dismissible fade show mt-2`}>{message}</div>}
      <Card className="mb-4">
        <CardBody className="py-2">
          <Nav tabs>
            <NavItem><NavLink className={activeTab === "1" ? "active" : ""} onClick={() => toggle("1")}>Gói học</NavLink></NavItem>
            <NavItem><NavLink className={activeTab === "2" ? "active" : ""} onClick={() => toggle("2")}>Cấu hình hệ thống</NavLink></NavItem>
            <NavItem><NavLink className={activeTab === "3" ? "active" : ""} onClick={() => toggle("3")}>Quản lý người dùng</NavLink></NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col lg="5" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>{editingPkgId ? "Chỉnh sửa gói học" : "Tạo gói học mới"}</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitPkg}>
                        <FormGroup><Label>Tên gói</Label><Input value={pkgForm.name} onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Giá (VNĐ)</Label><Input type="number" value={pkgForm.price} onChange={(e) => setPkgForm({ ...pkgForm, price: Number(e.target.value) })} required /></FormGroup>
                        <Row>
                          <Col><FormGroup><Label>Tiết lý thuyết</Label><Input type="number" value={pkgForm.theoryHours} onChange={(e) => setPkgForm({ ...pkgForm, theoryHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>Tiết mô phỏng</Label><Input type="number" value={pkgForm.simulationHours} onChange={(e) => setPkgForm({ ...pkgForm, simulationHours: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col><FormGroup><Label>Cơ bản 4h</Label><Input type="number" value={pkgForm.basic4hHours} onChange={(e) => setPkgForm({ ...pkgForm, basic4hHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>Hộp số sàn</Label><Input type="number" value={pkgForm.cabinHours} onChange={(e) => setPkgForm({ ...pkgForm, cabinHours: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col><FormGroup><Label>DAT giờ</Label><Input type="number" value={pkgForm.datHours} onChange={(e) => setPkgForm({ ...pkgForm, datHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>DAT km</Label><Input type="number" value={pkgForm.datKm} onChange={(e) => setPkgForm({ ...pkgForm, datKm: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <FormGroup><Label>Sa hình giờ</Label><Input type="number" value={pkgForm.saHinhHours} onChange={(e) => setPkgForm({ ...pkgForm, saHinhHours: Number(e.target.value) })} /></FormGroup>
                        <FormGroup check><Label check><Input type="checkbox" checked={pkgForm.active} onChange={(e) => setPkgForm({ ...pkgForm, active: e.target.checked })} /> Hoạt động</Label></FormGroup>
                        <Row>
                          <Col><Button color="primary" type="submit">{editingPkgId ? "Cập nhật" : "Tạo gói"}</Button></Col>
                          {editingPkgId && <Col><Button color="secondary" onClick={cancelEditPkg}>Hủy</Button></Col>}
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="7" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Danh sách gói học</CardHeader>
                    <CardBody className="p-0">
                      {packages.length === 0 ? <EmptyState message="Chưa có gói học nào" /> : (
                        <Table responsive hover className="mb-0">
                          <thead><tr><th>Tên gói</th><th>Giá</th><th>Lý thuyết</th><th>DAT</th><th>Sa hình</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                          <tbody>
                            {packages.map((p) => (
                              <tr key={p.id}>
                                <td><strong>{p.name}</strong></td>
                                <td>{Number(p.price).toLocaleString()} đ</td>
                                <td>{p.theoryHours}h</td>
                                <td>{p.datHours}h / {p.datKm}km</td>
                                <td>{p.saHinhHours}h</td>
                                <td><Badge color={p.active ? "success" : "secondary"}>{p.active ? "Hoạt động" : "Tắt"}</Badge></td>
                                <td>
                                  <Button color="info" size="sm" className="me-1" onClick={() => startEditPkg(p)}>Sửa</Button>
                                  <Button color="danger" size="sm" onClick={() => deactivatePkg(p.id)}>Tắt</Button>
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
            <TabPane tabId="2">
              <Row>
                <Col lg="6" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Danh sách cấu hình</CardHeader>
                    <CardBody className="p-0">
                      {configs.length === 0 ? <EmptyState message="Chưa có cấu hình" /> : (
                        <Table responsive className="mb-0">
                          <thead><tr><th>Khóa</th><th>Giá trị</th><th>Mô tả</th></tr></thead>
                          <tbody>{configs.map((c) => (
                            <tr key={c.configKey}><td><code>{c.configKey}</code></td><td>{renderConfigValue(c)}</td><td>{c.description}</td></tr>
                          ))}</tbody>
                        </Table>
                      )}
                    </CardBody>
                  </Card>
                  <Card className="content-card">
                    <CardHeader>Lịch lý thuyết</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitSchedule}>
                        <FormGroup><Label>Module</Label>
                          <Input type="select" value={scheduleForm.module} onChange={(e) => setScheduleForm({ ...scheduleForm, module: e.target.value })} required>
                            <option value="">-- Chọn module --</option>
                            {scheduleModules.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                          </Input>
                        </FormGroup>
                        <Row>
                          <Col md="6">
                            <FormGroup><Label>Ngày áp dụng</Label>
                              <Input
                                value={scheduleForm.dayPattern}
                                onChange={(e) => setScheduleForm({ ...scheduleForm, dayPattern: e.target.value })}
                                placeholder="Mon-Fri, T2-T6, hoặc T7-CN"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup><Label>Giờ bắt đầu</Label>
                              <Input
                                type="time"
                                value={scheduleForm.startTime}
                                onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup><Label>Giờ kết thúc</Label>
                              <Input
                                type="time"
                                value={scheduleForm.endTime}
                                onChange={(e) => setScheduleForm({ ...scheduleForm, endTime: e.target.value })}
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <FormGroup><Label>Địa điểm / phòng học</Label>
                          <Input
                            value={scheduleForm.location}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                            placeholder="Phòng LT-01, Cơ sở Quận 1..."
                          />
                        </FormGroup>
                        <FormGroup><Label>Ghi chú</Label>
                          <Input
                            type="textarea"
                            rows={2}
                            value={scheduleForm.notes}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                            placeholder="Nếu có thông tin bổ sung cho học viên"
                          />
                        </FormGroup>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <Button type="button" color="light" onClick={() => loadScheduleTemplate({ dayPattern: "Mon-Fri", startTime: "08:00", endTime: "12:00", location: "Phòng LT-01" })}>Mẫu sáng</Button>
                          <Button type="button" color="light" onClick={() => loadScheduleTemplate({ dayPattern: "Mon-Fri", startTime: "13:30", endTime: "17:00", location: "Phòng LT-02" })}>Mẫu chiều</Button>
                          <Button type="button" color="light" onClick={() => loadScheduleTemplate({ dayPattern: "T7-CN", startTime: "18:00", endTime: "20:30", location: "Phòng LT-03", notes: "Lớp cuối tuần" })}>Mẫu cuối tuần</Button>
                          <Button type="button" color="secondary" outline onClick={() => setScheduleForm(emptyScheduleDraft)}>Xóa form</Button>
                        </div>
                        <FormGroup>
                          <Label>Xem trước JSON</Label>
                          <pre style={{
                            margin: 0,
                            padding: "12px 14px",
                            borderRadius: 8,
                            background: "var(--bs-light)",
                            border: "1px solid var(--bs-border-color)",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            fontSize: 13,
                          }}>{schedulePreview}</pre>
                        </FormGroup>
                        <small className="text-muted d-block mb-3">Dữ liệu sẽ được lưu dưới dạng JSON như phần xem trước, nhưng người nhập chỉ cần điền theo form.</small>
                        <Button color="primary" type="submit">Lưu lịch</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Phí thi lại</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitRetake}>
                        <FormGroup><Label>Loại phí</Label>
                          <Input type="select" value={retakeForm.key} onChange={(e) => setRetakeForm({ ...retakeForm, key: e.target.value })} required>
                            <option value="">-- Chọn loại phí --</option>
                            {retakeFeeKeys.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                          </Input>
                        </FormGroup>
                        <FormGroup><Label>Giá trị (VNĐ)</Label><Input type="number" value={retakeForm.value} onChange={(e) => setRetakeForm({ ...retakeForm, value: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Mô tả</Label><Input value={retakeForm.description} onChange={(e) => setRetakeForm({ ...retakeForm, description: e.target.value })} /></FormGroup>
                        <Button color="primary" type="submit">Lưu</Button>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="content-card">
                    <CardHeader>Giá giờ học thêm</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitExtraHour}>
                        <FormGroup><Label>Loại phí</Label>
                          <Input type="select" value={extraHourForm.key} onChange={(e) => setExtraHourForm({ ...extraHourForm, key: e.target.value })} required>
                            <option value="">-- Chọn loại phí --</option>
                            {extraHourKeys.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                          </Input>
                        </FormGroup>
                        <FormGroup><Label>Giá trị (VNĐ/giờ)</Label><Input type="number" value={extraHourForm.value} onChange={(e) => setExtraHourForm({ ...extraHourForm, value: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Mô tả</Label><Input value={extraHourForm.description} onChange={(e) => setExtraHourForm({ ...extraHourForm, description: e.target.value })} /></FormGroup>
                        <Button color="primary" type="submit">Lưu</Button>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="content-card">
                    <CardHeader>Quy trình</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitLeave}>
                        <FormGroup><Label>Khóa</Label><Input value={leaveForm.key} onChange={(e) => setLeaveForm({ ...leaveForm, key: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Giá trị</Label><Input value={leaveForm.value} onChange={(e) => setLeaveForm({ ...leaveForm, value: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Mô tả</Label><Input value={leaveForm.description} onChange={(e) => setLeaveForm({ ...leaveForm, description: e.target.value })} /></FormGroup>
                        <Button color="primary" type="submit">Lưu</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col lg="5" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Tạo tài khoản người dùng</CardHeader>
                    <CardBody>
                      <Form onSubmit={createUser}>
                        <FormGroup><Label>Username</Label><Input value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Email</Label><Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required /></FormGroup>
                        <Row>
                          <Col><FormGroup><Label>Họ</Label><Input value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} required /></FormGroup></Col>
                          <Col><FormGroup><Label>Tên</Label><Input value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} /></FormGroup></Col>
                        </Row>
                        <FormGroup><Label>Mật khẩu</Label><Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Vai trò</Label>
                          <Input type="select" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                            {roleEntries.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                          </Input>
                        </FormGroup>
                        <Button color="primary" block type="submit">Tạo tài khoản</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="7" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Danh sách người dùng</CardHeader>
                    <CardBody className="p-0">
                      {users.length === 0 ? <EmptyState message="Chưa có người dùng nào" /> : (
                        <Table responsive hover className="mb-0">
                          <thead><tr><th>Username</th><th>Họ tên</th><th>Email</th><th>Vai trò</th></tr></thead>
                          <tbody>
                            {users.map((u) => (
                              <tr key={u.id}>
                                <td>{u.username}</td>
                                <td>{u.firstName} {u.lastName}</td>
                                <td>{u.email}</td>
                                <td><Badge color="primary">{roleEntries.find((r) => r.value === u.role)?.label ?? u.role}</Badge></td>
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
    </AppLayout>
  );
};
export default AdminPage;
