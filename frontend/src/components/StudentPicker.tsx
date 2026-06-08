import { useEffect, useMemo, useState } from "react";
import { FormText, Input } from "reactstrap";
import api from "../api/axios";

export interface StudentLookupOption {
  id: string;
  username: string;
  fullName: string;
  phone?: string;
  coursePackage?: string;
  courseStatus?: string;
}

interface StudentPickerProps {
  value: string;
  onChange: (studentId: string, student?: StudentLookupOption) => void;
  required?: boolean;
  placeholder?: string;
}

const StudentPicker = ({
  value,
  onChange,
  required = false,
  placeholder = "Tìm theo username, họ tên hoặc số điện thoại",
}: StudentPickerProps) => {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState<StudentLookupOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setLoading(true);
      api.get<StudentLookupOption[]>("/student-lookup", { params: { q: query } })
        .then((res) => setStudents(res.data))
        .catch(() => setStudents([]))
        .finally(() => setLoading(false));
    }, 250);

    return () => window.clearTimeout(handle);
  }, [query]);

  const selected = useMemo(
    () => students.find((student) => student.id === value),
    [students, value],
  );

  return (
    <div className="student-picker">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="mb-2"
      />
      <Input
        type="select"
        value={value}
        onChange={(e) => {
          const student = students.find((item) => item.id === e.target.value);
          onChange(e.target.value, student);
        }}
        required={required}
      >
        <option value="">-- Chọn học viên --</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.fullName} ({student.username}) - {student.phone || "không có SĐT"}
          </option>
        ))}
      </Input>
      <FormText>
        {loading
          ? "Đang tìm..."
          : selected
            ? `Đã chọn: ${selected.fullName} - ${selected.coursePackage || "chưa có khóa"}`
            : "Gõ vài ký tự để thu hẹp danh sách."}
      </FormText>
    </div>
  );
};

export default StudentPicker;
