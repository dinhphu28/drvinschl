import { Card, CardBody, CardTitle } from "reactstrap";
import Layout from "../components/Layout";

const AreaManagerPage = () => (
  <Layout title="Quản Lý Khu Vực">
    <Card>
      <CardBody>
        <CardTitle tag="h4">Quản lý khu vực</CardTitle>
        <ul>
          <li>Theo dõi điểm danh giáo viên</li>
          <li>Theo dõi xe</li>
          <li>Duyệt nghỉ phép / bảo dưỡng</li>
          <li>Tính lương giáo viên</li>
        </ul>
      </CardBody>
    </Card>
  </Layout>
);

export default AreaManagerPage;
