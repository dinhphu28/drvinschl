import { useEffect, useState } from "react";
import { FormText, Input } from "reactstrap";
import api from "../api/axios";

interface StaffOption {
  id: number;
  username: string;
  email?: string;
  fullName: string;
  role: string;
}

interface StaffPickerProps {
  value: string;
  onChange: (id: string, staff?: StaffOption) => void;
  role?: string;
  required?: boolean;
}

const StaffPicker = ({ value, onChange, role = "GIAO_VIEN", required }: StaffPickerProps) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<StaffOption[]>([]);
  const [selected, setSelected] = useState<StaffOption | undefined>();

  useEffect(() => {
    const handle = window.setTimeout(() => {
      api.get<StaffOption[]>("/staff-lookup", { params: { role, q: query } })
        .then((res) => setOptions(res.data))
        .catch(() => setOptions([]));
    }, 250);
    return () => window.clearTimeout(handle);
  }, [query, role]);

  return (
    <>
      <Input
        className="mb-2"
        placeholder="Tìm theo username, tên hoặc email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Input
        type="select"
        value={value}
        required={required}
        onChange={(e) => {
          const staff = options.find((item) => String(item.id) === e.target.value);
          setSelected(staff);
          onChange(e.target.value, staff);
        }}
      >
        <option value="">-- Chọn nhân sự --</option>
        {options.map((staff) => (
          <option key={staff.id} value={staff.id}>
            {staff.fullName || staff.username} ({staff.username})
          </option>
        ))}
      </Input>
      <FormText>{selected ? `Đã chọn: ${selected.fullName || selected.username}` : "Nhập từ khóa để lọc danh sách."}</FormText>
    </>
  );
};

export default StaffPicker;
