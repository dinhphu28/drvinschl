import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

interface Booking {
  id: string;
  status: string;
  student: { fullName: string };
  slot: { startTime: string; sessionType: string };
}

const TeacherPage = () => {
  const [schedule, setSchedule] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Booking[]>("/teachers/schedule")
      .then((res) => setSchedule(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout title="Giáo viên">
      <Card className="content-card">
        <CardHeader>Lịch dạy ({schedule.length})</CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <EmptyState message="Đang tải..." />
          ) : schedule.length === 0 ? (
            <EmptyState message="Chưa có buổi dạy nào được phân công." />
          ) : (
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Học viên</th>
                  <th>Loại</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.student?.fullName}</strong></td>
                    <td>{b.slot?.sessionType?.replace(/_/g, " ")}</td>
                    <td>{b.slot?.startTime ? new Date(b.slot.startTime).toLocaleString("vi-VN") : "—"}</td>
                    <td><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default TeacherPage;
