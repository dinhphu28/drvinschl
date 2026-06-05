import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { login, loginWithGoogle } from "../api/auth";
import { useAuth } from "../context/useAuth";

const LoginPage: React.FC = () => {
  const { setAccessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      setAccessToken(res.data.accessToken);
    } catch {
      setError("Invalid credentials");
    }
  };

  const handleGoogleCallback = async (res: GoogleCredentialResponse) => {
    try {
      const result = await loginWithGoogle(res.credential);
      setAccessToken(result.data.accessToken);
    } catch {
      setError("Google login failed");
    }
  };

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
    <Container className="vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h4" className="text-center mb-4">
                Login
              </CardTitle>

              {error && <Alert color="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>

                <Button color="primary" block>
                  Login
                </Button>
              </Form>

              <hr />

              <div id="googleBtn" />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
