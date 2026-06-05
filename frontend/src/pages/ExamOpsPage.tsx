import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table, Row, Col } from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import api from "../api/axios";

interface ExamSession {
  id: string;
  examType: string;
  examDate: string;
  location: string;
}

const ExamOpsPage = () => {
  const [totNghiep, setTotNghiep] = useState<ExamSession[]>([]);
  const [satHach, setSatHach] = useState<ExamSession[]>([]);

  useEffect(() => {
    api.get<ExamSession[]>("/exams?type=TOT_NGHIEP").then((r) => setTotNghiep(r.data));
    api.get<ExamSession[]>("/exams?type=SAT_HACH").then((r) => setSatHach(r.data));
  }, []);

  const ExamTable = ({ sessions, title }: { sessions: ExamSession[]; title: string }) => (
    <Card className="content-card">
      <CardHeader>{title} ({sessions.length})</CardHeader>
      <CardBody className="p-0">
        {sessions.length === 0 ? (
          <EmptyState message={`Chưa có lịch ${title.toLowerCase()}`} />
        ) : (
          <Table responsive hover className="mb-0">
            <thead><tr><th>Ngày thi</th><th>Địa điểm</th><th>Loại</th></tr></thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{new Date(s.examDate).toLocaleString("vi-VN")}</td>
                  <td>{s.location ?? "—"}</td>
                  <td>{s.examType}</td>
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
      <Row>
        <Col lg="6"><ExamTable sessions={totNghiep} title="Thi tốt nghiệp" /></Col>
        <Col lg="6"><ExamTable sessions={satHach} title="Thi sát hạch" /></Col>
      </Row>
    </AppLayout>
  );
};

export default ExamOpsPage;
