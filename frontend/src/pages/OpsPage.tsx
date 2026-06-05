import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import Layout from "../components/Layout";
import api from "../api/axios";

interface Booking {
  id: string;
  status: string;
  student: { fullName: string };
  slot: { sessionType: string; startTime: string };
}

const OpsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api.get<Booking[]>("/ops/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <Layout title="Giáo Vụ">
      <Card>
        <CardBody>
          <CardTitle tag="h4">Lịch học viên</CardTitle>
          <Table striped>
            <thead>
              <tr>
                <th>Học viên</th>
                <th>Loại buổi</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
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

export default OpsPage;
