import { Badge } from "reactstrap";

const statusColors: Record<string, string> = {
  DANG_KY: "info",
  DANG_HOC: "primary",
  HOAN_THANH: "success",
  THANH_LY: "secondary",
  PENDING: "warning",
  CONFIRMED: "primary",
  COMPLETED: "success",
  CANCELLED: "danger",
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <Badge color={statusColors[status] ?? "light"} pill>
    {status?.replace(/_/g, " ") ?? "—"}
  </Badge>
);

export default StatusBadge;
