import { useEffect, useMemo, useState } from "react";
import { FormText, Input } from "reactstrap";
import api from "../api/axios";

interface VehicleOption {
  id: string;
  licensePlate: string;
  model?: string;
  active: boolean;
}

interface VehiclePickerProps {
  value: string;
  onChange: (id: string, vehicle?: VehicleOption) => void;
  required?: boolean;
}

const VehiclePicker = ({ value, onChange, required }: VehiclePickerProps) => {
  const [query, setQuery] = useState("");
  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const selected = vehicles.find((item) => item.id === value);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return vehicles
      .filter((vehicle) => vehicle.active !== false)
      .filter((vehicle) => !term
        || vehicle.licensePlate?.toLowerCase().includes(term)
        || vehicle.model?.toLowerCase().includes(term))
      .slice(0, 20);
  }, [query, vehicles]);

  useEffect(() => {
    api.get<VehicleOption[]>("/vehicles")
      .then((res) => setVehicles(res.data))
      .catch(() => setVehicles([]));
  }, []);

  return (
    <>
      <Input
        className="mb-2"
        placeholder="Tìm theo biển số hoặc dòng xe"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Input
        type="select"
        value={value}
        required={required}
        onChange={(e) => {
          const vehicle = vehicles.find((item) => item.id === e.target.value);
          onChange(e.target.value, vehicle);
        }}
      >
        <option value="">-- Chọn xe --</option>
        {filtered.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.licensePlate}{vehicle.model ? ` - ${vehicle.model}` : ""}
          </option>
        ))}
      </Input>
      <FormText>{selected ? `Đã chọn: ${selected.licensePlate}` : "Nhập từ khóa để lọc danh sách xe."}</FormText>
    </>
  );
};

export default VehiclePicker;
