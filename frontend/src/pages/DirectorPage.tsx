import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import api from "../api/axios";

const statLabels: Record<string, string> = {
  totalStudents: "Tổng học viên",
  completedCourses: "Hoàn thành khóa",
  passedExams: "Thi đạt",
  failedExams: "Thi không đạt",
};

const DirectorPage = () => {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    api.get<Record<string, number>>("/director/overview").then((res) => setStats(res.data));
  }, []);

  return (
    <AppLayout title="Giám đốc — Tổng quan">
      <Row>
        {Object.entries(stats).map(([key, value]) => (
          <Col md="3" sm="6" key={key} className="mb-3">
            <StatCard
              label={statLabels[key] ?? key}
              value={value}
              color={key === "failedExams" ? "#c62828" : key === "passedExams" ? "#2e7d32" : "#1a237e"}
            />
          </Col>
        ))}
      </Row>
    </AppLayout>
  );
};

export default DirectorPage;
