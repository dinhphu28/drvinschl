import { Card, CardBody, CardTitle } from "reactstrap";
import Layout from "../components/Layout";

const AccountingPage = () => (
  <Layout title="Kế Toán">
    <Card>
      <CardBody>
        <CardTitle tag="h4">Quản lý học phí</CardTitle>
        <ul>
          <li>Tạo tài khoản học viên</li>
          <li>Thu học phí / Hoàn phí</li>
          <li>Theo dõi xăng theo ngày/tháng</li>
          <li>Ghi nhận phí học thêm / thi lại</li>
          <li>Hiển thị lương</li>
        </ul>
      </CardBody>
    </Card>
  </Layout>
);

export default AccountingPage;
