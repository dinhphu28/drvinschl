import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import Layout from "../components/Layout";
import api from "../api/axios";

interface Booking {
  id: string;
  status: string;
  student: { fullName: string };
  slot: { startTime: string; sessionType: string };
}

const TeacherPage = () => {
  const [schedule, setSchedule] = useState<Booking[]>([]);

  useEffect(() => {
    api.get<Booking[]>("/teachers/schedule").then((res) => setSchedule(res.data));
  }, []);

  return (
    <Layout title="Giáo Viên">
      <Card>
        <CardBody>
          <CardTitle tag="h4">Lịch dạy</CardTitle>
          <Table striped>
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
                  <td>{b.student?.fullName}</td>
                  <td>{b.slot?.sessionType}</td>
                  <td>{b.slot?.startTime}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default TeacherPage;
