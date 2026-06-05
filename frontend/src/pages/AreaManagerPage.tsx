import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table, Row, Col } from "reactstrap";
import AppLayout from "../components/AppLayout";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import api from "../api/axios";

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  teacher: { firstName: string };
}

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  currentOdo: number;
  active: boolean;
}

const AreaManagerPage = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    api.get<LeaveRequest[]>("/area-manager/leave-requests").then((r) => setLeaves(r.data));
    api.get<Vehicle[]>("/area-manager/vehicles").then((r) => setVehicles(r.data));
  }, []);

  return (
    <AppLayout title="Quản lý khu vực">
      <Row>
        <Col lg="6" className="mb-3">
          <Card className="content-card">
            <CardHeader>Yêu cầu nghỉ phép ({leaves.length})</CardHeader>
            <CardBody className="p-0">
              {leaves.length === 0 ? (
                <EmptyState message="Không có yêu cầu nghỉ phép nào" />
              ) : (
                <Table responsive hover className="mb-0">
                  <thead><tr><th>Giáo viên</th><th>Từ</th><th>Đến</th><th>Lý do</th><th>TT</th></tr></thead>
                  <tbody>
                    {leaves.map((l) => (
                      <tr key={l.id}>
                        <td>{l.teacher?.firstName}</td>
                        <td>{l.startDate}</td>
                        <td>{l.endDate}</td>
                        <td>{l.reason}</td>
                        <td><StatusBadge status={l.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" className="mb-3">
          <Card className="content-card">
            <CardHeader>Xe ({vehicles.length})</CardHeader>
            <CardBody className="p-0">
              {vehicles.length === 0 ? (
                <EmptyState message="Chưa có xe nào trong hệ thống" />
              ) : (
                <Table responsive hover className="mb-0">
                  <thead><tr><th>Biển số</th><th>Model</th><th>ODO</th><th>TT</th></tr></thead>
                  <tbody>
                    {vehicles.map((v) => (
                      <tr key={v.id}>
                        <td><strong>{v.licensePlate}</strong></td>
                        <td>{v.model ?? "—"}</td>
                        <td>{v.currentOdo?.toLocaleString() ?? "—"} km</td>
                        <td>{v.active ? "Hoạt động" : "Ngừng"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default AreaManagerPage;
