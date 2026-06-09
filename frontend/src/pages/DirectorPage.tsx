import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table, TabContent, TabPane, Badge, Button } from "reactstrap";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import api from "../api/axios";

const statLabels: Record<string, string> = {
  totalStudents: "Tổng học viên", completedCourses: "Hoàn thành khóa",
  passedExams: "Thi đạt", failedExams: "Thi không đạt",
  passRate: "Tỷ lệ thi đạt", completionRate: "Tỷ lệ hoàn thành",
};

interface ExamStatsResponse {
  passRateByType: Record<string, number>;
  totalExamsByMonth: Record<string, number>;
}
interface CompletionStatsResponse {
  totalCompletedByMonth: Record<string, number>;
  completionRate: number;
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
const examTypeLabels: Record<string, string> = {
  TOT_NGHIEP: "Thi tốt nghiệp", SAT_HACH: "Thi sát hạch",
  LY_THUYET: "Lý thuyết", MO_PHONG: "Mô phỏng", SA_HINH: "Sa hình", DUONG_TRUONG: "Đường trường",
};
const directorSidebarItems = [
  { id: "1", label: "Tổng quan" },
  { id: "2", label: "Thi sát hạch" },
  { id: "3", label: "Hoàn thành khóa" },
  { id: "4", label: "Duyệt lương" },
];
const DirectorPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [message, setMessage] = useState("");
  const [overview, setOverview] = useState<Record<string, number>>({});
  const [examStats, setExamStats] = useState<ExamStatsResponse | null>(null);
  const [completionStats, setCompletionStats] = useState<CompletionStatsResponse | null>(null);
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);

  const flash = (m: string) => { setMessage(m); setTimeout(() => setMessage(""), 3000); };

  useEffect(() => {
    api.get<Record<string, number>>("/director/overview").then((res) => setOverview(res.data));
  }, []);
  useEffect(() => {
    api.get<ExamStatsResponse>("/director/exam-stats").then((res) => setExamStats(res.data)).catch(() => {});
  }, []);
  useEffect(() => {
    api.get<CompletionStatsResponse>("/director/completion-stats").then((res) => setCompletionStats(res.data)).catch(() => {});
  }, []);
  useEffect(() => {
    loadSalaries();
  }, []);
  const loadSalaries = () => {
    api.get<SalaryRecord[]>("/director/salaries/pending").then((res) => setSalaries(res.data)).catch(() => {});
  };
  const toggle = (t: string) => { if (activeTab !== t) setActiveTab(t); };
  const approveSalary = async (id: string) => {
    try {
      await api.put(`/director/salaries/${id}/approve`);
      flash("Duyệt lương thành công");
      setSalaries(salaries.filter((s) => s.id !== id));
      loadSalaries();
    } catch { flash("Không thể duyệt lương"); }
  };
  return (
    <AppLayout
      title="Giám đốc - Tổng quan"
      sidebarItems={directorSidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={toggle}
    >
      {message && <div className={`alert ${message.startsWith("Không") ? "alert-danger" : "alert-success"} alert-dismissible fade show mt-2`}>{message}</div>}
      <Card className="content-card">
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                {Object.entries(overview).map(([key, value]) => (
                  <Col md="3" sm="6" key={key} className="mb-3">
                    <StatCard label={statLabels[key] ?? key} value={value} color={key === "failedExams" ? "#c62828" : key === "passedExams" ? "#2e7d32" : key === "passRate" || key === "completionRate" ? "#e65100" : "#1a237e"} />
                  </Col>
                ))}
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Card className="content-card">
                <CardHeader>Thống kê thi sát hạch</CardHeader>
                <CardBody className="p-0">
                  {!examStats || Object.keys(examStats.passRateByType).length === 0 ? <div className="p-4 text-muted">Chưa có dữ liệu</div> : (
                    <Table responsive hover className="mb-0">
                      <thead>
                        <tr><th>Loại thi</th><th>Tỷ lệ đạt</th></tr>
                      </thead>
                      <tbody>
                        {Object.entries(examStats.passRateByType).map(([examType, passRate]) => (
                          <tr key={examType}>
                            <td><strong>{examTypeLabels[examType] ?? examType}</strong></td>
                            <td>
                              <span className={passRate >= 50 ? "text-success" : "text-danger"}><strong>{Number(passRate).toFixed(1)}%</strong></span>
                              <div className="progress mt-1" style={{ height: "6px" }}>
                                <div className="progress-bar bg-success" style={{ width: `${passRate}%` }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="3">
              <Card className="content-card">
                <CardHeader>Thống kê hoàn thành khóa theo tháng</CardHeader>
                <CardBody className="p-0">
                  {!completionStats ? <div className="p-4 text-muted">Chưa có dữ liệu</div> : (
                    <Table responsive hover className="mb-0">
                      <thead>
                        <tr><th>Tháng</th><th>Số hoàn thành</th><th>Tỷ lệ hoàn thành</th></tr>
                      </thead>
                      <tbody>
                        {Object.entries(completionStats.totalCompletedByMonth).map(([month, completed]) => (
                          <tr key={month}>
                            <td>{month}</td>
                            <td><strong>{completed}</strong></td>
                            <td>
                              <span className={completionStats.completionRate >= 50 ? "text-success" : "text-warning"}><strong>{Number(completionStats.completionRate).toFixed(1)}%</strong></span>
                              <div className="progress mt-1" style={{ height: "6px" }}>
                                <div className={`progress-bar ${completionStats.completionRate >= 50 ? "bg-success" : "bg-warning"}`} style={{ width: `${Math.min(completionStats.completionRate, 100)}%` }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </TabPane>
            <TabPane tabId="4">
              <Card className="content-card">
                <CardHeader>Đơn đề nghị lương — Duyệt</CardHeader>
                <CardBody className="p-0">
                  {!salaries.length ? <div className="p-4 text-muted">Không có đơn lương cần duyệt</div> : (
                    <Table responsive hover className="mb-0">
                      <thead>
                        <tr><th>Họ tên GV</th><th>Tháng</th><th>Lương cơ bản</th><th>Thưởng</th><th>Tổng</th><th>Admin duyệt</th><th>Thao tác</th></tr>
                      </thead>
                      <tbody>
                        {salaries.map((s) => (
                          <tr key={s.id} className={s.approvedByDirector ? "table-success" : ""}>
                            <td><strong>{`${s.teacher?.firstName ?? ""} ${s.teacher?.lastName ?? ""}`.trim() || s.teacher?.username || "—"}</strong></td>
                            <td>{s.month}</td>
                            <td>{Number(s.baseSalary).toLocaleString()} đ</td>
                            <td>{Number(s.bonus).toLocaleString()} đ</td>
                            <td><strong>{Number(s.totalAmount).toLocaleString()} đ</strong></td>
                            <td><Badge color={s.approvedByAdmin ? "success" : "warning"}>{s.approvedByAdmin ? "Đã duyệt" : "Chờ duyệt"}</Badge></td>
                            <td>
                              {s.approvedByDirector
                                ? <Badge color="success">Giám đốc đã duyệt</Badge>
                                : <Button color="success" size="sm" onClick={() => approveSalary(s.id)}>Duyệt</Button>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </AppLayout>
  );
};
export default DirectorPage;
