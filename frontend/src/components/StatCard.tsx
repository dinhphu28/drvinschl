import { Card, CardBody } from "reactstrap";

interface StatCardProps {
  label: string;
  value: number | string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color = "#1a237e" }) => (
  <Card className="stat-card">
    <CardBody>
      <div className="stat-card-label">{label}</div>
      <p className="stat-card-value" style={{ color }}>{value}</p>
    </CardBody>
  </Card>
);

export default StatCard;
