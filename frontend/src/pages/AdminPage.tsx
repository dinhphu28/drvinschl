import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import api from "../api/axios";

interface CoursePackage {
  id: string;
  name: string;
  price: number;
  theoryHours: number;
  datHours: number;
  active: boolean;
}

interface SystemConfig {
  configKey: string;
  configValue: string;
  description: string;
}

const AdminPage = () => {
  const [packages, setPackages] = useState<CoursePackage[]>([]);
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [message, setMessage] = useState("");

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "KINH_DOANH",
  });

  const load = () => {
    api.get<CoursePackage[]>("/admin/course-packages").then((r) => setPackages(r.data));
    api.get<SystemConfig[]>("/admin/configs").then((r) => setConfigs(r.data));
  };

  useEffect(() => { load(); }, []);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", newUser);
      setMessage("Đã tạo tài khoản thành công");
      setNewUser({ username: "", email: "", firstName: "", lastName: "", password: "", role: "KINH_DOANH" });
    } catch {
      setMessage("Không thể tạo tài khoản");
    }
  };

  return (
    <AppLayout title="Quản trị hệ thống">
      {message && <Alert color="success" className="mb-3">{message}</Alert>}

      <Row>
        <Col lg="7" className="mb-3">
          <Card className="content-card">
            <CardHeader>Gói học</CardHeader>
            <CardBody className="p-0">
              {packages.length === 0 ? (
                <EmptyState message="Chưa có gói học nào" />
              ) : (
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Tên gói</th>
                      <th>Giá</th>
                      <th>Lý thuyết</th>
                      <th>DAT</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((p) => (
                      <tr key={p.id}>
                        <td><strong>{p.name}</strong></td>
                        <td>{Number(p.price).toLocaleString()} đ</td>
                        <td>{p.theoryHours}h</td>
                        <td>{p.datHours}h</td>
                        <td>{p.active ? "✓ Hoạt động" : "Tắt"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>

          <Card className="content-card">
            <CardHeader>Cấu hình hệ thống</CardHeader>
            <CardBody className="p-0">
              {configs.length === 0 ? (
                <EmptyState message="Chưa có cấu hình" />
              ) : (
                <Table responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Khóa</th>
                      <th>Giá trị</th>
                      <th>Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configs.map((c) => (
                      <tr key={c.configKey}>
                        <td><code>{c.configKey}</code></td>
                        <td>{c.configValue}</td>
                        <td>{c.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>

        <Col lg="5">
          <Card className="content-card">
            <CardHeader>Tạo tài khoản người dùng</CardHeader>
            <CardBody>
              <Form onSubmit={createUser}>
                <FormGroup>
                  <Label>Username</Label>
                  <Input value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Họ</Label>
                      <Input value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} required />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label>Tên</Label>
                      <Input value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>Mật khẩu</Label>
                  <Input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
                </FormGroup>
                <FormGroup>
                  <Label>Vai trò</Label>
                  <Input type="select" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                    <option value="KINH_DOANH">Kinh doanh</option>
                    <option value="KE_TOAN">Kế toán</option>
                    <option value="GIAO_VU_KHU_VUC">Giáo vụ khu vực</option>
                    <option value="GIAO_VU_SA_HINH">Giáo vụ sa hình</option>
                    <option value="GIAO_VU_THI">Giáo vụ thi</option>
                    <option value="GIAO_VIEN">Giáo viên</option>
                    <option value="QUAN_LY_KHU_VUC">Quản lý khu vực</option>
                    <option value="GIAM_DOC">Giám đốc</option>
                    <option value="ADMIN">Admin</option>
                  </Input>
                </FormGroup>
                <Button color="primary" block>Tạo tài khoản</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default AdminPage;
