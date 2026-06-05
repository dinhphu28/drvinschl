import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import Layout from "../components/Layout";
import api from "../api/axios";

const DirectorPage = () => {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    api.get<Record<string, number>>("/director/overview").then((res) => setStats(res.data));
  }, []);

  return (
    <Layout title="Giám Đốc">
      <Row>
        {Object.entries(stats).map(([key, value]) => (
          <Col md="3" key={key} className="mb-3">
            <Card>
              <CardBody>
                <CardTitle tag="h6">{key}</CardTitle>
                <h3>{value}</h3>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default DirectorPage;
