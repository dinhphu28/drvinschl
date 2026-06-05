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
  slot: { sessionType: string; startTime: string; endTime: string };
}

const OpsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Booking[]>("/ops/bookings")
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout title="Giáo vụ">
      <Card className="content-card">
        <CardHeader>Lịch học viên ({bookings.length})</CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <EmptyState message="Đang tải..." />
          ) : bookings.length === 0 ? (
            <EmptyState message="Chưa có lịch đặt nào. Học viên đặt lịch qua app di động." />
          ) : (
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Học viên</th>
                  <th>Loại buổi</th>
                  <th>Bắt đầu</th>
                  <th>Kết thúc</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.student?.fullName}</strong></td>
                    <td>{b.slot?.sessionType?.replace(/_/g, " ")}</td>
                    <td>{b.slot?.startTime ? new Date(b.slot.startTime).toLocaleString("vi-VN") : "—"}</td>
                    <td>{b.slot?.endTime ? new Date(b.slot.endTime).toLocaleString("vi-VN") : "—"}</td>
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

export default OpsPage;
