import { useEffect, useRef, useState } from "react";
import {
  Badge, Button, Card, CardBody, CardHeader, Col, Form, FormGroup,
  Input, Label, Row, Table, TabContent, TabPane,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import api from "../api/axios";
import { sanitizeRichText } from "../utils/richText";

interface CoursePackage {
  id: string; name: string; price: number;
  theoryHours: number; simulationHours: number; basic4hHours: number;
  cabinHours: number; datHours: number; datKm: number;
  saHinhHours: number; practicalRoadHours: number; rawYardHours: number;
  sensorPracticeHours: number; sensorExamHours: number; active: boolean;
}
interface SystemConfig { configKey: string; configValue: string; description: string; }
interface UserRecord { id: string; username: string; email: string; firstName: string; lastName: string; role: string; }
interface VehicleRecord {
  id: string;
  licensePlate: string;
  model?: string;
  registrationExpiry?: string;
  learnerLicenseExpiry?: string;
  insuranceExpiry?: string;
  mortgageInfo?: string;
  ownershipInfo?: string;
  currentOdo?: number;
  active: boolean;
}
interface SalaryRecord {
  id: string;
  teacher?: { firstName?: string; lastName?: string; username?: string };
  month: string;
  baseSalary: number;
  bonus: number;
  totalAmount: number;
  approvedByAdmin: boolean;
  approvedByDirector: boolean;
}
interface ScheduleDraft {
  module: string;
  dayPattern: string;
  startTime: string;
  endTime: string;
  location: string;
  notes: string;
}
interface LeaveWorkflowConfig {
  maxTeachersOffPerDay: number;
  minimumAdvanceDays: number;
  maxConsecutiveDays: number;
  requireReason: boolean;
  approvalSteps: string;
  notes: string;
}
const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? value : []);

const packageNameOptions = ["A", "A1", "B Số Sàn", "B Tự Động", "C1"];
const adminSidebarItems = [
  { id: "1", label: "Gói học" },
  { id: "2", label: "Cấu hình hệ thống" },
  { id: "3", label: "Quản lý người dùng" },
  { id: "4", label: "Quản lý xe" },
  { id: "5", label: "Tính lương" },
];
const emptyPkg = {
  name: "B Số Sàn",
  price: 0,
  theoryHours: 0,
  simulationHours: 0,
  basic4hHours: 0,
  cabinHours: 0,
  datHours: 0,
  datKm: 0,
  saHinhHours: 0,
  practicalRoadHours: 0,
  rawYardHours: 0,
  sensorPracticeHours: 0,
  sensorExamHours: 0,
  active: true,
};
const retakeFeeKeys = [
  { value: "THI_LAI_TOT_NGHIEP", label: "Thi lại tốt nghiệp" },
  { value: "THI_LAI_SAT_HACH", label: "Thi lại sát hạch" },
  { value: "THI_LAI_LY_THUYET", label: "Thi lại lý thuyết" },
  { value: "THI_LAI_MO_PHONG", label: "Thi lại mô phỏng" },
  { value: "THI_LAI_SA_HINH", label: "Thi lại sa hình" },
  { value: "THI_LAI_DUONG_TRUONG", label: "Thi lại đường trường" },
];
const extraHourKeys = [
  { value: "GIA_GIO_DUONG_TRUONG", label: "Thực hành đường trường" },
  { value: "GIA_GIO_SA_HINH_THO", label: "Sa hình thô" },
  { value: "GIA_GIO_SA_HINH_CAM_UNG_TAP", label: "Sa hình cảm ứng tập" },
  { value: "GIA_GIO_SA_HINH_CAM_UNG_THI", label: "Sa hình cảm ứng thi" },
];
const satHachInstructionsKey = "SAT_HACH_INSTRUCTIONS_RICH_TEXT";
const configLabels = [...retakeFeeKeys, ...extraHourKeys].reduce<Record<string, string>>((acc, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});
configLabels[satHachInstructionsKey] = "Hướng dẫn Thi Sát Hạch";
configLabels.LEAVE_WORKFLOW_CONFIG = "Quy trình nghỉ phép";
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
const emptyVehicleForm = {
  licensePlate: "",
  model: "",
  registrationExpiry: "",
  learnerLicenseExpiry: "",
  insuranceExpiry: "",
  mortgageInfo: "",
  ownershipInfo: "",
  currentOdo: "0",
  active: true,
};
const defaultSatHachInstructions = `<h3>Hướng dẫn Thi Sát Hạch</h3>
<p>Học viên theo dõi lịch thi, giấy tờ cần mang theo và yêu cầu dự thi theo thông báo mới nhất của trung tâm.</p>
<ul>
  <li>Có mặt đúng giờ theo lịch thi được phân công.</li>
  <li>Mang CCCD/giấy tờ tùy thân hợp lệ và hồ sơ theo yêu cầu.</li>
  <li>Tuân thủ hướng dẫn của cán bộ coi thi và giáo vụ thi.</li>
</ul>`;
const defaultLeaveWorkflow: LeaveWorkflowConfig = {
  maxTeachersOffPerDay: 1,
  minimumAdvanceDays: 1,
  maxConsecutiveDays: 3,
  requireReason: true,
  approvalSteps: "Giáo viên gửi yêu cầu -> Quản lý khu vực kiểm tra lịch -> Duyệt hoặc từ chối",
  notes: "Không duyệt nếu đã có giáo viên khác nghỉ cùng ngày, trừ khi Giám đốc quyết định ngoài hệ thống.",
};
const roleEntries = [
  { value: "KINH_DOANH", label: "Kinh doanh" }, { value: "KE_TOAN", label: "Kế toán" },
  { value: "GIAO_VU_KHU_VUC", label: "Giáo vụ khu vực" }, { value: "GIAO_VU_SA_HINH", label: "Giáo vụ sa hình" },
  { value: "GIAO_VU_THI", label: "Giáo vụ thi" }, { value: "GIAO_VIEN", label: "Giáo viên" },
  { value: "QUAN_LY_KHU_VUC", label: "Quản lý khu vực" }, { value: "GIAM_DOC", label: "Giám đốc" }, { value: "ADMIN", label: "Admin" },
];
const AdminPage = () => {
  const instructionsRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [pkgForm, setPkgForm] = useState(emptyPkg);
  const [editingPkgId, setEditingPkg] = useState<string | null>(null);
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [retakeForm, setRetakeForm] = useState({ key: "", value: "", description: "" });
  const [extraHourForm, setExtraHourForm] = useState({ key: "", value: "", description: "" });
  const [leaveWorkflow, setLeaveWorkflow] = useState<LeaveWorkflowConfig>(defaultLeaveWorkflow);
  const [satHachInstructions, setSatHachInstructions] = useState(defaultSatHachInstructions);
  const [scheduleForm, setScheduleForm] = useState<ScheduleDraft>(emptyScheduleDraft);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [newUser, setNewUser] = useState({ username: "", email: "", firstName: "", lastName: "", password: "", role: "KINH_DOANH" });
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [vehicleForm, setVehicleForm] = useState(emptyVehicleForm);
  const [salaryMonth, setSalaryMonth] = useState(new Date().toISOString().slice(0, 7));
  const [salaryBase, setSalaryBase] = useState("8000000");
  const [salaryBonus, setSalaryBonus] = useState("0");
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);

  const flash = (m: string) => { setMessage(m); setTimeout(() => setMessage(""), 3000); };
  const loadPackages = () => api.get<CoursePackage[]>("/admin/course-packages").then((r) => setPackages(r.data));
  const loadConfigs = () => api.get<SystemConfig[]>("/admin/configs").then((r) => setConfigs(r.data));
  const loadLeaveWorkflow = () => api.get<LeaveWorkflowConfig>("/admin/configs/leave-workflow").then((r) => setLeaveWorkflow(r.data));
  const loadUsers = () => api.get<UserRecord[]>("/admin/users").then((r) => setUsers(r.data)).catch(() => setUsers([]));
  const loadVehicles = () => api.get<VehicleRecord[]>("/vehicles").then((r) => setVehicles(r.data)).catch(() => setVehicles([]));
  const loadSalaries = () =>
    api.get<SalaryRecord[]>("/admin/salaries", { params: { month: salaryMonth } })
      .then((r) => setSalaries(asArray<SalaryRecord>(r.data)))
      .catch(() => setSalaries([]));
  useEffect(() => { loadPackages(); }, []);
  useEffect(() => { loadConfigs(); }, []);
  useEffect(() => { loadLeaveWorkflow(); }, []);
  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { loadVehicles(); }, []);
  useEffect(() => { loadSalaries(); }, [salaryMonth]);
  useEffect(() => {
    const config = configs.find((item) => item.configKey === satHachInstructionsKey);
    if (config?.configValue) {
      setSatHachInstructions(config.configValue);
    }
  }, [configs]);
  const toggle = (t: string) => { if (activeTab !== t) setActiveTab(t); };
  const startEditPkg = (p: CoursePackage) => {
    setPkgForm({
      name: p.name,
      price: p.price,
      theoryHours: p.theoryHours ?? 0,
      simulationHours: p.simulationHours ?? 0,
      basic4hHours: p.basic4hHours ?? 0,
      cabinHours: p.cabinHours ?? 0,
      datHours: p.datHours ?? 0,
      datKm: p.datKm ?? 0,
      saHinhHours: p.saHinhHours ?? 0,
      practicalRoadHours: p.practicalRoadHours ?? 0,
      rawYardHours: p.rawYardHours ?? 0,
      sensorPracticeHours: p.sensorPracticeHours ?? 0,
      sensorExamHours: p.sensorExamHours ?? 0,
      active: p.active,
    });
    setEditingPkg(p.id);
  };
  const cancelEditPkg = () => { setPkgForm(emptyPkg); setEditingPkg(null); };
  const submitPkg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPkgId) {
        await api.put(`/admin/course-packages/${editingPkgId}`, { ...pkgForm, saHinhHours: pkgForm.rawYardHours + pkgForm.sensorPracticeHours + pkgForm.sensorExamHours });
        flash("Cập nhật gói học thành công");
      } else {
        await api.post("/admin/course-packages", { ...pkgForm, saHinhHours: pkgForm.rawYardHours + pkgForm.sensorPracticeHours + pkgForm.sensorExamHours });
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
  const submitLeaveWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...leaveWorkflow,
        maxTeachersOffPerDay: Number(leaveWorkflow.maxTeachersOffPerDay),
        minimumAdvanceDays: Number(leaveWorkflow.minimumAdvanceDays),
        maxConsecutiveDays: Number(leaveWorkflow.maxConsecutiveDays),
      };
      const res = await api.put<LeaveWorkflowConfig>("/admin/configs/leave-workflow/policy", payload);
      setLeaveWorkflow(res.data);
      flash("Cập nhật quy trình nghỉ phép thành công"); loadConfigs();
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const submitSatHachInstructions = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/admin/configs/${satHachInstructionsKey}/rich-text`, {
        content: sanitizeRichText(satHachInstructions),
        description: "Hướng dẫn Thi Sát Hạch cho học viên",
      });
      flash("Cập nhật hướng dẫn Thi Sát Hạch thành công");
      loadConfigs();
    } catch { flash("Đã xảy ra lỗi"); }
  };
  const wrapInstructionSelection = (before: string, after = before) => {
    const textarea = instructionsRef.current;
    if (!textarea) {
      setSatHachInstructions((current) => `${current}${before}${after}`);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const fallbackText = "Nội dung";
    const selected = satHachInstructions.slice(start, end);
    const replacement = `${before}${selected || fallbackText}${after}`;
    const next = `${satHachInstructions.slice(0, start)}${replacement}${satHachInstructions.slice(end)}`;
    setSatHachInstructions(next);
    window.setTimeout(() => {
      textarea.focus();
      const selectionStart = start + before.length;
      textarea.setSelectionRange(selectionStart, selectionStart + (selected || fallbackText).length);
    }, 0);
  };
  const insertInstructionBlock = (html: string) => {
    setSatHachInstructions((current) => `${current.trim()}\n${html}`.trim());
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
    if (config.configKey === satHachInstructionsKey) {
      return "Rich text";
    }
    if (config.configKey === "LEAVE_WORKFLOW_CONFIG") {
      try {
        const parsed = JSON.parse(config.configValue) as LeaveWorkflowConfig;
        return `Tối đa ${parsed.maxTeachersOffPerDay} GV nghỉ/ngày | Báo trước ${parsed.minimumAdvanceDays} ngày | Tối đa ${parsed.maxConsecutiveDays} ngày`;
      } catch {
        return "Quy trình nghỉ phép";
      }
    }
    if (!config.configKey.startsWith("SCHEDULE_")) {
      return configLabels[config.configKey] && !Number.isNaN(Number(config.configValue))
        ? `${Number(config.configValue).toLocaleString("vi-VN")} đ`
        : config.configValue;
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
  const createVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/vehicles", {
        ...vehicleForm,
        registrationExpiry: vehicleForm.registrationExpiry || undefined,
        learnerLicenseExpiry: vehicleForm.learnerLicenseExpiry || undefined,
        insuranceExpiry: vehicleForm.insuranceExpiry || undefined,
        currentOdo: Number(vehicleForm.currentOdo || 0),
      });
      flash("Tạo xe thành công");
      setVehicleForm(emptyVehicleForm);
      loadVehicles();
    } catch { flash("Không thể tạo xe"); }
  };
  const calculateAllSalaries = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<SalaryRecord[]>("/admin/salaries/calculate-all", null, {
        params: { month: salaryMonth, baseSalary: salaryBase, bonus: salaryBonus || undefined },
      });
      setSalaries(asArray<SalaryRecord>(res.data));
      flash("Đã tính lương cho tất cả giáo viên");
    } catch (err: any) {
      flash(err?.response?.data?.error || "Không thể tính lương");
    }
  };
  const submitSalariesForDirector = async () => {
    try {
      const res = await api.put<SalaryRecord[]>("/admin/salaries/submit", null, { params: { month: salaryMonth } });
      setSalaries(asArray<SalaryRecord>(res.data));
      flash("Đã gửi lương chờ Giám đốc duyệt");
    } catch (err: any) {
      flash(err?.response?.data?.error || "Không thể gửi duyệt lương");
    }
  };
  const safeSalaries = asArray<SalaryRecord>(salaries);
  const salarySummary = safeSalaries.reduce((acc, item) => acc + Number(item.totalAmount || 0), 0);
  return (
    <AppLayout
      title="Quản trị hệ thống"
      sidebarItems={adminSidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={toggle}
    >
      {message && <div className={`alert ${message.startsWith("Không") ? "alert-danger" : "alert-success"} alert-dismissible fade show mt-2`}>{message}</div>}
      <Card className="content-card">
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col lg="5" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>{editingPkgId ? "Chỉnh sửa gói học" : "Tạo gói học mới"}</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitPkg}>
                        <FormGroup><Label>Hạng / gói học</Label>
                          <Input type="select" value={pkgForm.name} onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })} required>
                            {packageNameOptions.map((name) => <option key={name} value={name}>{name}</option>)}
                          </Input>
                        </FormGroup>
                        <FormGroup><Label>Giá (VNĐ)</Label><Input type="number" value={pkgForm.price} onChange={(e) => setPkgForm({ ...pkgForm, price: Number(e.target.value) })} required /></FormGroup>
                        <Row>
                          <Col><FormGroup><Label>Tiết lý thuyết</Label><Input type="number" value={pkgForm.theoryHours} onChange={(e) => setPkgForm({ ...pkgForm, theoryHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>Giờ mô phỏng</Label><Input type="number" value={pkgForm.simulationHours} onChange={(e) => setPkgForm({ ...pkgForm, simulationHours: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col><FormGroup><Label>Cơ bản 4h</Label><Input type="number" value={pkgForm.basic4hHours} onChange={(e) => setPkgForm({ ...pkgForm, basic4hHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>Cabin</Label><Input type="number" value={pkgForm.cabinHours} onChange={(e) => setPkgForm({ ...pkgForm, cabinHours: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col><FormGroup><Label>DAT giờ</Label><Input type="number" value={pkgForm.datHours} onChange={(e) => setPkgForm({ ...pkgForm, datHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>DAT km</Label><Input type="number" value={pkgForm.datKm} onChange={(e) => setPkgForm({ ...pkgForm, datKm: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col><FormGroup><Label>Thực hành đường trường</Label><Input type="number" value={pkgForm.practicalRoadHours} onChange={(e) => setPkgForm({ ...pkgForm, practicalRoadHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>Sa hình thô</Label><Input type="number" value={pkgForm.rawYardHours} onChange={(e) => setPkgForm({ ...pkgForm, rawYardHours: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col><FormGroup><Label>Sa hình cảm ứng tập</Label><Input type="number" value={pkgForm.sensorPracticeHours} onChange={(e) => setPkgForm({ ...pkgForm, sensorPracticeHours: Number(e.target.value) })} /></FormGroup></Col>
                          <Col><FormGroup><Label>Sa hình cảm ứng thi</Label><Input type="number" value={pkgForm.sensorExamHours} onChange={(e) => setPkgForm({ ...pkgForm, sensorExamHours: Number(e.target.value) })} /></FormGroup></Col>
                        </Row>
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
                          <thead><tr><th>Gói</th><th>Giá</th><th>Lý thuyết</th><th>Thực hành</th><th>Sa hình</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                          <tbody>
                            {packages.map((p) => (
                              <tr key={p.id}>
                                <td><strong>{p.name}</strong></td>
                                <td>{Number(p.price).toLocaleString()} đ</td>
                                <td>{p.theoryHours}h, mô phỏng {p.simulationHours}h</td>
                                <td>Đường trường {p.practicalRoadHours ?? p.datHours}h, Cabin {p.cabinHours}h, DAT {p.datHours}h/{p.datKm}km</td>
                                <td>Thô {p.rawYardHours ?? p.saHinhHours}h, CƯ tập {p.sensorPracticeHours ?? 0}h, CƯ thi {p.sensorExamHours ?? 0}h</td>
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
                            <tr key={c.configKey}><td>{configLabels[c.configKey] ?? <code>{c.configKey}</code>}</td><td>{renderConfigValue(c)}</td><td>{c.description}</td></tr>
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
                    <CardHeader>Quy trình nghỉ phép</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitLeaveWorkflow}>
                        <Row>
                          <Col md="4"><FormGroup><Label>GV nghỉ tối đa / ngày</Label><Input type="number" min={1} value={leaveWorkflow.maxTeachersOffPerDay} onChange={(e) => setLeaveWorkflow({ ...leaveWorkflow, maxTeachersOffPerDay: Number(e.target.value) })} required /></FormGroup></Col>
                          <Col md="4"><FormGroup><Label>Báo trước tối thiểu (ngày)</Label><Input type="number" min={0} value={leaveWorkflow.minimumAdvanceDays} onChange={(e) => setLeaveWorkflow({ ...leaveWorkflow, minimumAdvanceDays: Number(e.target.value) })} required /></FormGroup></Col>
                          <Col md="4"><FormGroup><Label>Số ngày nghỉ liên tiếp tối đa</Label><Input type="number" min={1} value={leaveWorkflow.maxConsecutiveDays} onChange={(e) => setLeaveWorkflow({ ...leaveWorkflow, maxConsecutiveDays: Number(e.target.value) })} required /></FormGroup></Col>
                        </Row>
                        <FormGroup check className="mb-3">
                          <Label check><Input type="checkbox" checked={leaveWorkflow.requireReason} onChange={(e) => setLeaveWorkflow({ ...leaveWorkflow, requireReason: e.target.checked })} /> Bắt buộc nhập lý do</Label>
                        </FormGroup>
                        <FormGroup><Label>Các bước duyệt</Label><Input type="textarea" rows={2} value={leaveWorkflow.approvalSteps} onChange={(e) => setLeaveWorkflow({ ...leaveWorkflow, approvalSteps: e.target.value })} required /></FormGroup>
                        <FormGroup><Label>Ghi chú quy định</Label><Input type="textarea" rows={3} value={leaveWorkflow.notes} onChange={(e) => setLeaveWorkflow({ ...leaveWorkflow, notes: e.target.value })} required /></FormGroup>
                        <Button color="primary" type="submit">Lưu quy trình</Button>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="content-card">
                    <CardHeader>Hướng dẫn Thi Sát Hạch</CardHeader>
                    <CardBody>
                      <Form onSubmit={submitSatHachInstructions}>
                        <div className="rich-text-toolbar mb-2">
                          <Button type="button" color="light" size="sm" onClick={() => wrapInstructionSelection("<strong>", "</strong>")}>B</Button>
                          <Button type="button" color="light" size="sm" onClick={() => wrapInstructionSelection("<em>", "</em>")}>I</Button>
                          <Button type="button" color="light" size="sm" onClick={() => wrapInstructionSelection("<h3>", "</h3>")}>H3</Button>
                          <Button type="button" color="light" size="sm" onClick={() => wrapInstructionSelection("<p>", "</p>")}>P</Button>
                          <Button type="button" color="light" size="sm" onClick={() => insertInstructionBlock("<ul>\n  <li>Nội dung</li>\n</ul>")}>UL</Button>
                          <Button type="button" color="light" size="sm" onClick={() => insertInstructionBlock("<ol>\n  <li>Nội dung</li>\n</ol>")}>OL</Button>
                        </div>
                        <FormGroup>
                          <Label>Nội dung rich text</Label>
                          <Input
                            innerRef={instructionsRef}
                            type="textarea"
                            rows={10}
                            value={satHachInstructions}
                            onChange={(e) => setSatHachInstructions(e.target.value)}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Xem trước cho học viên</Label>
                          <div
                            className="rich-text-preview"
                            dangerouslySetInnerHTML={{ __html: sanitizeRichText(satHachInstructions) }}
                          />
                        </FormGroup>
                        <Button color="primary" type="submit">Lưu hướng dẫn</Button>
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
            <TabPane tabId="4">
              <Row>
                <Col lg="5" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Tạo xe</CardHeader>
                    <CardBody>
                      <Form onSubmit={createVehicle}>
                        <Row>
                          <Col md="6"><FormGroup><Label>Biển số</Label><Input value={vehicleForm.licensePlate} onChange={(e) => setVehicleForm({ ...vehicleForm, licensePlate: e.target.value })} required /></FormGroup></Col>
                          <Col md="6"><FormGroup><Label>Model</Label><Input value={vehicleForm.model} onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col md="4"><FormGroup><Label>Đăng kiểm</Label><Input type="date" value={vehicleForm.registrationExpiry} onChange={(e) => setVehicleForm({ ...vehicleForm, registrationExpiry: e.target.value })} /></FormGroup></Col>
                          <Col md="4"><FormGroup><Label>GPTL</Label><Input type="date" value={vehicleForm.learnerLicenseExpiry} onChange={(e) => setVehicleForm({ ...vehicleForm, learnerLicenseExpiry: e.target.value })} /></FormGroup></Col>
                          <Col md="4"><FormGroup><Label>Bảo hiểm</Label><Input type="date" value={vehicleForm.insuranceExpiry} onChange={(e) => setVehicleForm({ ...vehicleForm, insuranceExpiry: e.target.value })} /></FormGroup></Col>
                        </Row>
                        <Row>
                          <Col md="6"><FormGroup><Label>Biên bản thế chấp</Label><Input value={vehicleForm.mortgageInfo} onChange={(e) => setVehicleForm({ ...vehicleForm, mortgageInfo: e.target.value })} /></FormGroup></Col>
                          <Col md="6"><FormGroup><Label>Chủ quyền xe</Label><Input value={vehicleForm.ownershipInfo} onChange={(e) => setVehicleForm({ ...vehicleForm, ownershipInfo: e.target.value })} /></FormGroup></Col>
                        </Row>
                        <FormGroup><Label>ODO hiện tại</Label><Input type="number" value={vehicleForm.currentOdo} onChange={(e) => setVehicleForm({ ...vehicleForm, currentOdo: e.target.value })} /></FormGroup>
                        <FormGroup check className="mb-3"><Label check><Input type="checkbox" checked={vehicleForm.active} onChange={(e) => setVehicleForm({ ...vehicleForm, active: e.target.checked })} /> Đang hoạt động</Label></FormGroup>
                        <Button color="primary" type="submit">Tạo xe</Button>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="7" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Danh sách xe</CardHeader>
                    <CardBody className="p-0">
                      {vehicles.length === 0 ? <EmptyState message="Chưa có xe nào" /> : (
                        <Table responsive hover className="mb-0">
                          <thead><tr><th>Biển số</th><th>Model</th><th>Đăng kiểm</th><th>GPTL</th><th>Bảo hiểm</th><th>ODO</th><th>Trạng thái</th></tr></thead>
                          <tbody>
                            {vehicles.map((vehicle) => (
                              <tr key={vehicle.id}>
                                <td><strong>{vehicle.licensePlate}</strong></td>
                                <td>{vehicle.model || "—"}</td>
                                <td>{vehicle.registrationExpiry || "—"}</td>
                                <td>{vehicle.learnerLicenseExpiry || "—"}</td>
                                <td>{vehicle.insuranceExpiry || "—"}</td>
                                <td>{vehicle.currentOdo?.toLocaleString("vi-VN") ?? "—"}</td>
                                <td><Badge color={vehicle.active ? "success" : "secondary"}>{vehicle.active ? "Hoạt động" : "Tắt"}</Badge></td>
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
            <TabPane tabId="5">
              <Row>
                <Col lg="4" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Tính lương toàn hệ thống</CardHeader>
                    <CardBody>
                      <Form onSubmit={calculateAllSalaries}>
                        <FormGroup><Label>Tháng lương</Label><Input type="month" value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)} required /></FormGroup>
                        <FormGroup><Label>Lương cơ bản mặc định</Label><Input type="number" value={salaryBase} onChange={(e) => setSalaryBase(e.target.value)} required /></FormGroup>
                        <FormGroup><Label>Thưởng mặc định</Label><Input type="number" value={salaryBonus} onChange={(e) => setSalaryBonus(e.target.value)} /></FormGroup>
                        <Button color="primary" type="submit" className="me-2">Tính cho tất cả GV</Button>
                        <Button color="success" type="button" onClick={submitSalariesForDirector} disabled={salaries.length === 0}>Gửi Giám đốc duyệt</Button>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="content-card">
                    <CardHeader>Tổng hợp</CardHeader>
                    <CardBody>
                      <div className="text-muted small">Số bảng lương</div>
                      <div className="fs-4 fw-semibold">{salaries.length}</div>
                      <div className="text-muted small mt-3">Tổng lương tháng</div>
                      <div className="fs-4 fw-semibold">{salarySummary.toLocaleString("vi-VN")} đ</div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8" className="mb-3">
                  <Card className="content-card">
                    <CardHeader>Bảng lương giáo viên</CardHeader>
                    <CardBody className="p-0">
                      {salaries.length === 0 ? <EmptyState message="Chưa có bảng lương cho tháng này" /> : (
                        <Table responsive hover className="mb-0">
                          <thead><tr><th>Giáo viên</th><th>Tháng</th><th>Lương cơ bản</th><th>Thưởng</th><th>Tổng</th><th>Admin</th><th>Giám đốc</th></tr></thead>
                          <tbody>
                            {salaries.map((salary) => (
                              <tr key={salary.id}>
                                <td><strong>{`${salary.teacher?.firstName ?? ""} ${salary.teacher?.lastName ?? ""}`.trim() || salary.teacher?.username || "—"}</strong></td>
                                <td>{salary.month}</td>
                                <td>{Number(salary.baseSalary || 0).toLocaleString("vi-VN")} đ</td>
                                <td>{Number(salary.bonus || 0).toLocaleString("vi-VN")} đ</td>
                                <td><strong>{Number(salary.totalAmount || 0).toLocaleString("vi-VN")} đ</strong></td>
                                <td><Badge color={salary.approvedByAdmin ? "success" : "warning"}>{salary.approvedByAdmin ? "Đã gửi" : "Đang kiểm tra"}</Badge></td>
                                <td><Badge color={salary.approvedByDirector ? "success" : "secondary"}>{salary.approvedByDirector ? "Đã duyệt" : "Chờ duyệt"}</Badge></td>
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
