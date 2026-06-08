import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, Table, TabContent, TabPane, Badge, Button } from "reactstrap";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import api from "../api/axios";

const statLabels: Record<string, string> = {
  totalStudents: "Tổng học viên", completedCourses: "Hoàn thành khóa",
  passedExams: "Thi đạt", failedExams: "Thi không đạt",
  passRate: "Tỷ lệ thi đạt", completionRate: "Tỷ lệ hoàn thành",
};

interface ExamStat {
  examType: string; total: number; passed: number; failed: number; passRate: number;
}
interface CompletionStat {
  month: string; year: number; completed: number; rate: number;
}
interface SalaryRecord {
  id: string; teacherName: string; month: string; year: number;
  baseSalary: number; bonus: number; total: number;
  adminApproved: boolean; directorApproved: boolean;
}
const examTypeLabels: Record<string, string> = {
  LY_THUYET: "Lý thuyết", MO_PHONG: "Mô phỏng", SA_HINH: "Sa hình", DUONG_TRUONG: "Đường trường",
};
const DirectorPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [message, setMessage] = useState("");
  const [overview, setOverview] = useState<Record<string, number>>({});
  const [examStats, setExamStats] = useState<ExamStat[]>([]);
  const [completionStats, setCompletionStats] = useState<CompletionStat[]>([]);
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);

  const flash = (m: string) => { setMessage(m); setTimeout(() => setMessage(""), 3000); };

  useEffect(() => {
    api.get<Record<string, number>>("/director/overview").then((res) => setOverview(res.data));
  }, []);
  useEffect(() => {
    api.get<ExamStat[]>("/director/exam-stats").then((res) => setExamStats(res.data)).catch(() => {});
  }, []);
  useEffect(() => {
    api.get<CompletionStat[]>("/director/completion-stats").then((res) => setCompletionStats(res.data)).catch(() => {});
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
    <AppLayout title="Giám đốc — Tổng quan">
      {message && <div className={`alert ${message.startsWith("Không") ? "alert-danger" : "alert-success"} alert-dismissible fade show mt-2`}>{message}</div>}
      <Card className="mb-4">
        <CardBody className="py-2">
          <Nav tabs>
            <NavItem><NavLink className={activeTab === "1" ? "active" : ""} onClick={() => toggle("1")}>Tổng quan</NavLink></NavItem>
            <NavItem><NavLink className={activeTab === "2" ? "active" : ""} onClick={() => toggle("2")}>Thi sát hạch</NavLink></NavItem>
            <NavItem><NavLink className={activeTab === "3" ? "active" : ""} onClick={() => toggle("3")}>Hoàn thành khóa</NavLink></NavItem>
            <NavItem><NavLink className={activeTab === "4" ? "active" : ""} onClick={() => toggle("4")}>Duyệt lương</NavLink></NavItem>
          </Nav>
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
                  {!examStats.length ? <div className="p-4 text-muted">Chưa có dữ liệu</div> : (
                    <Table responsive hover className="mb-0">
                      <thead>
                        <tr><th>Loại thi</th><th>Tổng số</th><th>Đạt</th><th>Không đạt</th><th>Tỷ lệ đạt</th></tr>
                      </thead>
                      <tbody>
                        {examStats.map((s) => (
                          <tr key={s.examType}>
                            <td><strong>{examTypeLabels[s.examType] ?? s.examType}</strong></td>
                            <td>{s.total}</td>
                            <td><Badge color="success">{s.passed}</Badge></td>
                            <td><Badge color="danger">{s.failed}</Badge></td>
                            <td>
                              <span className={s.passRate >= 50 ? "text-success" : "text-danger"}><strong>{s.passRate.toFixed(1)}%</strong></span>
                              <div className="progress mt-1" style={{ height: "6px" }}>
                                <div className="progress-bar bg-success" style={{ width: `${s.passRate}%` }} />
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
                  {!completionStats.length ? <div className="p-4 text-muted">Chưa có dữ liệu</div> : (
                    <Table responsive hover className="mb-0">
                      <thead>
                        <tr><th>Tháng</th><th>Số hoàn thành</th><th>Tỷ lệ hoàn thành</th></tr>
                      </thead>
                      <tbody>
                        {completionStats.map((s, i) => (
                          <tr key={i}>
                            <td>{s.month}/{s.year}</td>
                            <td><strong>{s.completed}</strong></td>
                            <td>
                              <span className={s.rate >= 50 ? "text-success" : "text-warning"}><strong>{s.rate.toFixed(1)}%</strong></span>
                              <div className="progress mt-1" style={{ height: "6px" }}>
                                <div className={`progress-bar ${s.rate >= 50 ? "bg-success" : "bg-warning"}`} style={{ width: `${Math.min(s.rate, 100)}%` }} />
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
                          <tr key={s.id} className={s.directorApproved ? "table-success" : ""}>
                            <td><strong>{s.teacherName}</strong></td>
                            <td>{s.month}/{s.year}</td>
                            <td>{Number(s.baseSalary).toLocaleString()} đ</td>
                            <td>{Number(s.bonus).toLocaleString()} đ</td>
                            <td><strong>{Number(s.total).toLocaleString()} đ</strong></td>
                            <td><Badge color={s.adminApproved ? "success" : "warning"}>{s.adminApproved ? "Đã duyệt" : "Chờ duyệt"}</Badge></td>
                            <td>
                              {s.directorApproved
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
