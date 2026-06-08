import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import api from "../api/axios";

interface ExamSession {
  id: string;
  examType: string;
  examDate: string;
  location: string;
  instructions?: string;
}

const ExamOpsPage = () => {
  const [totNghiep, setTotNghiep] = useState<ExamSession[]>([]);
  const [satHach, setSatHach] = useState<ExamSession[]>([]);
  const [message, setMessage] = useState("");
  const [sessionForm, setSessionForm] = useState({ examType: "TOT_NGHIEP", examDate: "", location: "", instructions: "" });
  const [instructionDrafts, setInstructionDrafts] = useState<Record<string, string>>({});

  const loadSessions = () => {
    api.get<ExamSession[]>("/exams?type=TOT_NGHIEP").then((r) => setTotNghiep(r.data));
    api.get<ExamSession[]>("/exams?type=SAT_HACH").then((r) => setSatHach(r.data));
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const createSession = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/exams", {
      ...sessionForm,
      examDate: sessionForm.examDate,
      instructions: sessionForm.instructions || undefined,
    });
    setMessage("Đã tạo lịch thi");
    setSessionForm({ examType: "TOT_NGHIEP", examDate: "", location: "", instructions: "" });
    loadSessions();
  };

  const updateInstructions = async (session: ExamSession) => {
    const instructions = instructionDrafts[session.id] ?? session.instructions ?? "";
    await api.put(`/exams/${session.id}/instructions`, null, { params: { instructions } });
    setMessage("Đã cập nhật hướng dẫn thi");
    loadSessions();
  };

  const ExamTable = ({ sessions, title }: { sessions: ExamSession[]; title: string }) => (
    <Card className="content-card">
      <CardHeader>{title} ({sessions.length})</CardHeader>
      <CardBody className="p-0">
        {sessions.length === 0 ? (
          <EmptyState message={`Chưa có lịch ${title.toLowerCase()}`} />
        ) : (
          <Table responsive hover className="mb-0">
            <thead><tr><th>Ngày thi</th><th>Địa điểm</th><th>Loại</th><th>Hướng dẫn</th><th></th></tr></thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{new Date(s.examDate).toLocaleString("vi-VN")}</td>
                  <td>{s.location ?? "—"}</td>
                  <td>{s.examType}</td>
                  <td>
                    <Input
                      type="textarea"
                      rows={2}
                      value={instructionDrafts[s.id] ?? s.instructions ?? ""}
                      onChange={(e) => setInstructionDrafts({ ...instructionDrafts, [s.id]: e.target.value })}
                    />
                  </td>
                  <td><Button color="primary" size="sm" onClick={() => updateInstructions(s)}>Lưu</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );

  return (
    <AppLayout title="Giáo vụ thi">
      {message && <div className="alert alert-success">{message}</div>}
      <Card className="content-card mb-3">
        <CardHeader>Tạo lịch thi</CardHeader>
        <CardBody>
          <Form onSubmit={createSession}>
            <Row>
              <Col md="3">
                <FormGroup><Label>Loại kỳ thi</Label>
                  <Input type="select" value={sessionForm.examType} onChange={(e) => setSessionForm({ ...sessionForm, examType: e.target.value })}>
                    <option value="TOT_NGHIEP">Thi tốt nghiệp</option>
                    <option value="SAT_HACH">Thi sát hạch</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3"><FormGroup><Label>Ngày giờ thi</Label><Input type="datetime-local" value={sessionForm.examDate} onChange={(e) => setSessionForm({ ...sessionForm, examDate: e.target.value })} required /></FormGroup></Col>
              <Col md="3"><FormGroup><Label>Địa điểm</Label><Input value={sessionForm.location} onChange={(e) => setSessionForm({ ...sessionForm, location: e.target.value })} /></FormGroup></Col>
              <Col md="3"><FormGroup><Label>Hướng dẫn</Label><Input value={sessionForm.instructions} onChange={(e) => setSessionForm({ ...sessionForm, instructions: e.target.value })} /></FormGroup></Col>
            </Row>
            <Button color="primary" type="submit">Tạo lịch</Button>
          </Form>
        </CardBody>
      </Card>
      <Row>
        <Col lg="6"><ExamTable sessions={totNghiep} title="Thi tốt nghiệp" /></Col>
        <Col lg="6"><ExamTable sessions={satHach} title="Thi sát hạch" /></Col>
      </Row>
    </AppLayout>
  );
};

export default ExamOpsPage;
