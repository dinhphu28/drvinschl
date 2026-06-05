import { Card, CardBody, CardTitle } from "reactstrap";

const MobileOnlyPage = () => (
  <div className="vh-100 d-flex align-items-center justify-content-center">
    <Card className="text-center" style={{ maxWidth: 400 }}>
      <CardBody>
        <CardTitle tag="h4">Ứng dụng di động</CardTitle>
        <p>Học viên sử dụng ứng dụng di động. Vui lòng tải app tại thư mục <code>mobile/</code>.</p>
      </CardBody>
    </Card>
  </div>
);

export default MobileOnlyPage;
