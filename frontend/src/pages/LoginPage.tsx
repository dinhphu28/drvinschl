import React, { useState } from "react";
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
import { login } from "../api/auth";
import { useAuth } from "../context/useAuth";

const LoginPage: React.FC = () => {
  const { setAccessToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ username, password });
      setAccessToken(res.data.data.accessToken);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle tag="h4" className="text-center mb-4">
                Sign in
              </CardTitle>

              {error && <Alert color="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label>Username</Label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <Button color="primary" block>
                  Login
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
