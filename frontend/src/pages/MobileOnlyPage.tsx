import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const MobileOnlyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <Card className="login-card">
        <CardBody className="p-4 text-center">
          <h3 style={{ color: "#1a237e" }}>Ứng dụng di động</h3>
          <p className="text-muted mb-4">
            Tài khoản học viên sử dụng ứng dụng di động trong thư mục <code>mobile/</code>.
          </p>
          <Button color="primary" onClick={() => { logout(); navigate("/login"); }}>
            Đăng nhập tài khoản nhân viên
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default MobileOnlyPage;
