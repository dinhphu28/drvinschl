import { Card, CardBody, CardTitle } from "reactstrap";
import Layout from "../components/Layout";

const ExamOpsPage = () => (
  <Layout title="Giáo Vụ Thi">
    <Card>
      <CardBody>
        <CardTitle tag="h4">Quản lý thi</CardTitle>
        <ul>
          <li>Lập danh sách thi tốt nghiệp / sát hạch</li>
          <li>Cập nhật lịch thi</li>
          <li>Cập nhật kết quả</li>
          <li>Quản lý thi lại</li>
        </ul>
      </CardBody>
    </Card>
  </Layout>
);

export default ExamOpsPage;
