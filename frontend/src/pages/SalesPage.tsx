import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

interface Student {
  id: string;
  fullName: string;
  phone: string;
  coursePackage: string;
  courseStatus: string;
}

const SalesPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Student[]>("/sales/students")
      .then((res) => setStudents(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout title="Kinh doanh">
      <Card className="content-card">
        <CardHeader>Học viên phụ trách ({students.length})</CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <EmptyState message="Đang tải..." />
          ) : students.length === 0 ? (
            <EmptyState message="Chưa có học viên nào được phân công. Ghi nhận hợp đồng để gán học viên." />
          ) : (
            <Table responsive hover className="mb-0">
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Điện thoại</th>
                  <th>Khóa học</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.fullName}</strong></td>
                    <td>{s.phone}</td>
                    <td>{s.coursePackage ?? "—"}</td>
                    <td><StatusBadge status={s.courseStatus} /></td>
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

export default SalesPage;
