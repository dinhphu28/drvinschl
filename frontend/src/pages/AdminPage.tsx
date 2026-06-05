import { Card, CardBody, CardTitle } from "reactstrap";
import Layout from "../components/Layout";

const AdminPage = () => (
  <Layout title="Admin">
    <Card>
      <CardBody>
        <CardTitle tag="h4">Cấu hình hệ thống</CardTitle>
        <ul>
          <li>Cấu hình gói học / số giờ học</li>
          <li>Cấu hình giá học thêm / phí thi lại</li>
          <li>Tạo tài khoản người dùng</li>
          <li>Cập nhật lịch lý thuyết / mô phỏng</li>
          <li>Quản lý xe toàn hệ thống</li>
          <li>Gửi phê duyệt lương</li>
        </ul>
      </CardBody>
    </Card>
  </Layout>
);

export default AdminPage;
