import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import Layout from "../components/Layout";
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

  useEffect(() => {
    api.get<Student[]>("/sales/students").then((res) => setStudents(res.data));
  }, []);

  return (
    <Layout title="Kinh Doanh">
      <Card>
        <CardBody>
          <CardTitle tag="h4">Học viên phụ trách</CardTitle>
          <Table striped>
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
                  <td>{s.fullName}</td>
                  <td>{s.phone}</td>
                  <td>{s.coursePackage}</td>
                  <td>{s.courseStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default SalesPage;
