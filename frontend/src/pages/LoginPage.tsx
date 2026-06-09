import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle } from "../api/auth";
import { getCurrentUser } from "../api/user";
import { useAuth } from "../context/useAuth";
import { isStaffRole, roleRoutes } from "../utils/roleRoutes";
import type { UserProfile } from "../types/auth";

const LoginPage: React.FC = () => {
  const { accessToken, setAccessToken, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const redirectStaff = (profile: UserProfile) => {
    setUser(profile);
    navigate(roleRoutes[profile.role], { replace: true });
  };

  const redirectStudent = (profile: UserProfile) => {
    setUser(profile);
    navigate(roleRoutes[profile.role], { replace: true });
  };

  const finishLogin = async (token: string) => {
    setAccessToken(token);
    const profile = await getCurrentUser();
    if (!isStaffRole(profile.data.role)) {
      redirectStudent(profile.data);
      return;
    }
    redirectStaff(profile.data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const res = await login({ loginId, password });
      await finishLogin(res.data.accessToken);
    } catch {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  const handleGoogleCallback = async (res: GoogleCredentialResponse) => {
    setError("");
    setInfo("");
    try {
      const result = await loginWithGoogle(res.credential);
      await finishLogin(result.data.accessToken);
    } catch {
      setError("Đăng nhập Google thất bại");
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    getCurrentUser()
      .then((res) => {
        if (!isStaffRole(res.data.role)) {
          redirectStudent(res.data);
          return;
        }
        redirectStaff(res.data);
      })
      .catch(() => logout());
  }, []);

  useEffect(() => {
    if (!window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: "64761084078-g1h55m22v2jciua78f7t2omcs5qtmhqh.apps.googleusercontent.com",
      callback: handleGoogleCallback,
    });

    const el = document.getElementById("googleBtn");
    if (!el) return;

    window.google.accounts.id.renderButton(el, {
      theme: "outline",
      size: "large",
      width: "100%",
    });
  }, []);

  return (
    <div className="login-page">
      <Card className="login-card">
        <CardBody className="p-4">
          <div className="login-brand">
            <h2>Drvinschl</h2>
            <p>Hệ thống quản lý trường dạy lái xe</p>
          </div>

          {info && <Alert color="info">{info}</Alert>}
          {error && <Alert color="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label>Email hoặc username</Label>
              <Input
                placeholder="admin hoặc admin@drvinschl.local"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <Button color="primary" block className="mt-2" size="lg">
              Đăng nhập
            </Button>
          </Form>

          <hr />

          <div id="googleBtn" />
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
