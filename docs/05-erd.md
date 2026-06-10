# ERD

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Quy Ước Chung

## 1.1 Primary Key

Tất cả bảng chính sử dụng:

```sql
id UUID PRIMARY KEY
```

## 1.2 Audit Columns

Các bảng nghiệp vụ nên có:

```sql
created_at TIMESTAMP NOT NULL
updated_at TIMESTAMP NOT NULL
created_by UUID NULL
updated_by UUID NULL
deleted_at TIMESTAMP NULL
```

## 1.3 Soft Delete

Dữ liệu nghiệp vụ chỉ được soft delete bằng `deleted_at`.

Audit log không được xóa.

---

# 2. Identity & Access

## users

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| username | VARCHAR(100) | UNIQUE |
| password_hash | TEXT |  |
| full_name | VARCHAR(255) |  |
| phone | VARCHAR(20) | NULL |
| email | VARCHAR(255) | NULL |
| status | VARCHAR(30) | ACTIVE, INACTIVE |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Ghi chú:

- Tài khoản học viên do Admin hoặc Kế toán tạo thủ công.
- Username học viên mặc định là họ tên viết liền không dấu.
- Mật khẩu mặc định là số điện thoại, nhưng phải lưu dạng hash.

---

## roles

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(50) | UNIQUE |
| name | VARCHAR(255) |  |

---

## permissions

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(100) | UNIQUE |
| name | VARCHAR(255) |  |

---

## user_roles

| Column | Type | Note |
|---|---|---|
| user_id | UUID | FK users.id |
| role_id | UUID | FK roles.id |

Primary key:

```sql
PRIMARY KEY (user_id, role_id)
```

---

## role_permissions

| Column | Type | Note |
|---|---|---|
| role_id | UUID | FK roles.id |
| permission_id | UUID | FK permissions.id |

Primary key:

```sql
PRIMARY KEY (role_id, permission_id)
```

---

# 3. Student

## students

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK users.id, UNIQUE |
| student_code | VARCHAR(50) | UNIQUE |
| full_name | VARCHAR(255) |  |
| dob | DATE | NULL |
| phone | VARCHAR(20) |  |
| address | TEXT | NULL |
| status | VARCHAR(30) |  |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Status:

- NEW
- ACTIVE
- COMPLETED
- CANCELLED

---

## student_documents

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| student_id | UUID | FK students.id |
| document_name | VARCHAR(255) |  |
| document_type | VARCHAR(50) | NULL |
| file_url | TEXT | NULL |
| note | TEXT | NULL |
| uploaded_by | UUID | FK users.id |
| uploaded_at | TIMESTAMP |  |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Ghi chú:

- `file_url` cho phép NULL.
- `note` cho phép NULL.
- Một hồ sơ có thể chỉ có ghi chú, chỉ có file, hoặc có cả hai.
- Hồ sơ hoàn thiện do Kinh doanh đánh dấu thủ công.

---

# 4. Course & Enrollment

## course_packages

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(50) | UNIQUE |
| name | VARCHAR(255) |  |
| price | NUMERIC(15,2) |  |
| basic_hours | INT | NULL |
| cabin_hours | INT | NULL |
| dat_km_required | INT | NULL |
| dat_hours_required | INT | NULL |
| yard_hours | INT | NULL |
| status | VARCHAR(30) | ACTIVE, INACTIVE |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

---

## enrollments

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| student_id | UUID | FK students.id |
| course_package_id | UUID | FK course_packages.id |
| enrollment_date | DATE |  |
| start_date | DATE | NULL |
| end_date | DATE | NULL |
| status | VARCHAR(30) |  |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Status:

- NEW
- ACTIVE
- COMPLETED
- CANCELLED

Ghi chú:

- Một học viên có thể có nhiều enrollment.

---

# 5. Payment

## payment_plans

Cấu hình đợt thanh toán.

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| course_package_id | UUID | FK course_packages.id, NULL |
| name | VARCHAR(255) |  |
| amount | NUMERIC(15,2) | NULL |
| percentage | NUMERIC(5,2) | NULL |
| due_rule | TEXT | NULL |
| display_order | INT |  |
| status | VARCHAR(30) | ACTIVE, INACTIVE |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |

---

## payments

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| student_id | UUID | FK students.id |
| enrollment_id | UUID | FK enrollments.id |
| amount | NUMERIC(15,2) |  |
| payment_type | VARCHAR(50) |  |
| payment_method | VARCHAR(50) | CASH, BANK_TRANSFER |
| paid_at | TIMESTAMP |  |
| note | TEXT | NULL |
| created_by | UUID | FK users.id |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Payment type:

- TUITION
- EXTRA_PRACTICE
- RETAKE_EXAM
- GRADUATION_RETAKE
- OTHER

Ghi chú:

- Không cho thanh toán vượt công nợ.
- Không xóa vật lý payment.

---

## payment_receipts

Phiếu thu thanh toán.

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| payment_id | UUID | FK payments.id |
| receipt_no | VARCHAR(50) | UNIQUE |
| pdf_url | TEXT | NULL |
| issued_at | TIMESTAMP |  |
| issued_by | UUID | FK users.id |

Ghi chú:

- Hệ thống cần hỗ trợ in phiếu thu.
- Hệ thống cần hỗ trợ xuất PDF phiếu thu.

---

## refunds

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| payment_id | UUID | FK payments.id |
| amount | NUMERIC(15,2) |  |
| reason | TEXT |  |
| refunded_at | TIMESTAMP |  |
| created_by | UUID | FK users.id |
| created_at | TIMESTAMP |  |

Ghi chú:

- Cho phép hoàn phí một phần.
- Refund amount không được lớn hơn số tiền còn có thể hoàn.

---

# 6. Scheduling

> Decision:
>
> Học viên đặt lịch không cần giáo vụ xác nhận.
> Vì vậy, lịch học chính thức được lưu trực tiếp trong bảng `schedules`.
> Bảng `bookings` không bắt buộc trong MVP.

## schedules

Lịch học chính thức của học viên.

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| student_id | UUID | FK students.id |
| enrollment_id | UUID | FK enrollments.id |
| teacher_id | UUID | FK teachers.id, NULL |
| vehicle_id | UUID | FK vehicles.id, NULL |
| cabin_id | UUID | NULL, reserved for cabin machine |
| schedule_type | VARCHAR(50) | BASIC, CABIN, DAT, YARD, SENSOR_YARD |
| schedule_date | DATE |  |
| start_time | TIME |  |
| end_time | TIME |  |
| status | VARCHAR(30) |  |
| created_by | UUID | FK users.id |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Status:

- BOOKED
- CANCELLED
- IN_PROGRESS
- TEACHER_COMPLETED
- STUDENT_CONFIRMED
- COMPLETED

---

## schedule_change_logs

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| schedule_id | UUID | FK schedules.id |
| changed_by | UUID | FK users.id |
| old_value | JSONB |  |
| new_value | JSONB |  |
| reason | TEXT | NULL |
| changed_at | TIMESTAMP |  |

---

# 7. Training

## training_sessions

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| schedule_id | UUID | FK schedules.id |
| student_id | UUID | FK students.id |
| teacher_id | UUID | FK teachers.id, NULL |
| vehicle_id | UUID | FK vehicles.id, NULL |
| session_type | VARCHAR(50) | BASIC, CABIN, DAT, YARD, SENSOR_YARD |
| started_at | TIMESTAMP | NULL |
| ended_at | TIMESTAMP | NULL |
| duration_minutes | INT | NULL |
| status | VARCHAR(30) |  |
| note | TEXT | NULL |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

Status:

- SCHEDULED
- IN_PROGRESS
- TEACHER_COMPLETED
- STUDENT_CONFIRMED
- COMPLETED
- CANCELLED

---

## dat_session_details

| Column | Type | Note |
|---|---|---|
| training_session_id | UUID | PK, FK training_sessions.id |
| km | NUMERIC(10,2) | NULL |
| duration_minutes | INT | NULL |
| note | TEXT | NULL |
| dat_start_image_url | TEXT | NULL |
| dat_end_image_url | TEXT | NULL |

Ghi chú:

- Dữ liệu DAT nhập tay.
- Ảnh DAT không bắt buộc.

---

## teacher_ratings

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| student_id | UUID | FK students.id |
| teacher_id | UUID | FK teachers.id |
| training_session_id | UUID | FK training_sessions.id |
| rating | INT | 1-5 |
| comment | TEXT | NULL |
| created_at | TIMESTAMP |  |

Unique:

```sql
UNIQUE (student_id, training_session_id)
```

---

# 8. Examination

## exams

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| exam_type | VARCHAR(50) | GRADUATION, LICENSE |
| exam_date | DATE |  |
| location | TEXT | NULL |
| status | VARCHAR(30) |  |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

---

## exam_registrations

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| exam_id | UUID | FK exams.id |
| student_id | UUID | FK students.id |
| enrollment_id | UUID | FK enrollments.id |
| eligibility_confirmed_by | UUID | FK users.id, NULL |
| eligibility_confirmed_at | TIMESTAMP | NULL |
| status | VARCHAR(30) |  |
| registered_at | TIMESTAMP |  |

Status:

- REGISTERED
- PASSED
- FAILED
- ABSENT

Ghi chú:

- Điều kiện đủ thi do Giáo vụ thi xác nhận thủ công.

---

## exam_results

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| exam_registration_id | UUID | FK exam_registrations.id |
| result_status | VARCHAR(30) | PASS, FAIL, ABSENT |
| note | TEXT | NULL |
| updated_by | UUID | FK users.id |
| updated_at | TIMESTAMP |  |

---

## exam_section_results

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| exam_result_id | UUID | FK exam_results.id |
| section | VARCHAR(50) | THEORY, SIMULATION, YARD, ROAD |
| score | NUMERIC(10,2) | NULL |
| status | VARCHAR(30) | PASS, FAIL, ABSENT |

---

## retake_registrations

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| student_id | UUID | FK students.id |
| enrollment_id | UUID | FK enrollments.id |
| failed_section | VARCHAR(50) | THEORY, SIMULATION, YARD, ROAD |
| fee_amount | NUMERIC(15,2) |  |
| status | VARCHAR(30) |  |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |

---

# 9. Employee & Teacher

## areas

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| code | VARCHAR(50) | UNIQUE |
| name | VARCHAR(255) |  |
| address | TEXT | NULL |
| status | VARCHAR(30) | ACTIVE, INACTIVE |

---

## employees

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK users.id, UNIQUE |
| employee_code | VARCHAR(50) | UNIQUE |
| full_name | VARCHAR(255) |  |
| phone | VARCHAR(20) |  |
| position | VARCHAR(50) |  |
| area_id | UUID | FK areas.id, NULL |
| status | VARCHAR(30) | ACTIVE, INACTIVE |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

---

## teachers

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK employees.id, UNIQUE |
| teacher_code | VARCHAR(50) | UNIQUE |
| status | VARCHAR(30) | ACTIVE, INACTIVE |

Ghi chú:

- Không gán cố định xe cho giáo viên trong MVP.

---

## teacher_attendances

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| teacher_id | UUID | FK teachers.id |
| attendance_date | DATE |  |
| check_in_at | TIMESTAMP | NULL |
| check_out_at | TIMESTAMP | NULL |
| status | VARCHAR(30) |  |

---

# 10. Vehicle

## vehicles

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| plate_number | VARCHAR(30) | UNIQUE |
| model | VARCHAR(100) | NULL |
| brand | VARCHAR(100) | NULL |
| status | VARCHAR(30) | ACTIVE, MAINTENANCE, INACTIVE |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |
| deleted_at | TIMESTAMP | NULL |

---

## vehicle_documents

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| vehicle_id | UUID | FK vehicles.id |
| document_type | VARCHAR(50) |  |
| expiry_date | DATE |  |
| file_url | TEXT | NULL |

Document type:

- REGISTRATION
- TRAINING_LICENSE
- INSURANCE
- MORTGAGE_RECORD
- OWNERSHIP

---

## vehicle_usages

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| vehicle_id | UUID | FK vehicles.id |
| teacher_id | UUID | FK teachers.id |
| usage_date | DATE |  |
| odo_start | NUMERIC(12,2) | NULL |
| odo_end | NUMERIC(12,2) | NULL |
| started_at | TIMESTAMP |  |
| ended_at | TIMESTAMP | NULL |
| start_image_url | TEXT | NOT NULL |
| end_image_url | TEXT | NULL |
| clean_status | VARCHAR(30) | NULL |

Ghi chú:

- Ảnh xe trước khi sử dụng là bắt buộc.
- ODO đầu/cuối không bắt buộc.
- Nếu có cả ODO đầu và ODO cuối thì ODO cuối phải lớn hơn hoặc bằng ODO đầu.

---

## fuel_logs

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| vehicle_id | UUID | FK vehicles.id |
| teacher_id | UUID | FK teachers.id |
| liters | NUMERIC(10,2) |  |
| amount | NUMERIC(15,2) | NULL |
| receipt_image_url | TEXT | NULL |
| fueled_at | TIMESTAMP |  |
| note | TEXT | NULL |

---

## maintenance_requests

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| vehicle_id | UUID | FK vehicles.id |
| requested_by | UUID | FK users.id |
| description | TEXT |  |
| status | VARCHAR(30) | PENDING, APPROVED, REJECTED |
| approved_by | UUID | FK users.id, NULL |
| approved_at | TIMESTAMP | NULL |
| rejected_reason | TEXT | NULL |
| created_at | TIMESTAMP |  |

---

## maintenance_records

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| vehicle_id | UUID | FK vehicles.id |
| maintenance_date | DATE |  |
| description | TEXT |  |
| cost | NUMERIC(15,2) | NULL |
| parts_replaced | TEXT | NULL |
| created_by | UUID | FK users.id |
| created_at | TIMESTAMP |  |

---

# 11. Leave

## leave_requests

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK employees.id |
| leave_date | DATE |  |
| reason | TEXT |  |
| status | VARCHAR(30) | PENDING, APPROVED, REJECTED |
| approved_by | UUID | FK users.id, NULL |
| approved_at | TIMESTAMP | NULL |
| rejected_reason | TEXT | NULL |
| created_at | TIMESTAMP |  |

---

## leave_policies

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| max_leave_days_per_month | INT | NULL means unlimited |
| minimum_available_teachers | INT | NULL |
| is_minimum_teacher_rule_enforced | BOOLEAN | DEFAULT false |
| updated_at | TIMESTAMP |  |
| updated_by | UUID | FK users.id |

---

# 12. Teaching Hour Summary

## teaching_hour_summaries

Tổng hợp giờ dạy giáo viên theo tháng.

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| teacher_id | UUID | FK teachers.id |
| month | INT |  |
| year | INT |  |
| weekday_hours | NUMERIC(10,2) | DEFAULT 0 |
| weekend_hours | NUMERIC(10,2) | DEFAULT 0 |
| night_hours | NUMERIC(10,2) | DEFAULT 0 |
| sensor_practice_hours | NUMERIC(10,2) | DEFAULT 0 |
| sensor_exam_hours | NUMERIC(10,2) | DEFAULT 0 |
| status | VARCHAR(30) | DRAFT, SUBMITTED, APPROVED, REJECTED |
| submitted_at | TIMESTAMP | NULL |
| approved_by | UUID | FK users.id, NULL |
| approved_at | TIMESTAMP | NULL |
| rejected_reason | TEXT | NULL |
| created_at | TIMESTAMP |  |
| updated_at | TIMESTAMP |  |

Ghi chú:

- MVP chỉ tổng hợp giờ.
- Chưa tính tiền lương tự động.

---

# 13. Notification

## notifications

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| recipient_user_id | UUID | FK users.id |
| title | VARCHAR(255) |  |
| content | TEXT |  |
| notification_type | VARCHAR(50) |  |
| status | VARCHAR(30) | UNREAD, READ |
| created_at | TIMESTAMP |  |
| read_at | TIMESTAMP | NULL |

---

# 14. Audit Log

## audit_logs

| Column | Type | Note |
|---|---|---|
| id | UUID | PK |
| actor_id | UUID | FK users.id |
| action | VARCHAR(100) |  |
| entity_type | VARCHAR(100) |  |
| entity_id | UUID |  |
| old_value | JSONB | NULL |
| new_value | JSONB | NULL |
| created_at | TIMESTAMP |  |

Ghi chú:

- Không có `deleted_at`.
- Audit log không được xóa.

---

# 15. Quan Hệ Chính

```text
users 1--1 students
users 1--1 employees
employees 1--1 teachers

students 1--N enrollments
students 1--N student_documents
students 1--N payments
students 1--N schedules
students 1--N training_sessions
students 1--N exam_registrations

course_packages 1--N enrollments
course_packages 1--N payment_plans

schedules 1--0..1 training_sessions
schedules 1--N schedule_change_logs

teachers 1--N schedules
teachers 1--N training_sessions
teachers 1--N teacher_attendances
teachers 1--N vehicle_usages
teachers 1--N fuel_logs
teachers 1--N teaching_hour_summaries

vehicles 1--N schedules
vehicles 1--N training_sessions
vehicles 1--N vehicle_documents
vehicles 1--N vehicle_usages
vehicles 1--N fuel_logs
vehicles 1--N maintenance_requests
vehicles 1--N maintenance_records

exams 1--N exam_registrations
exam_registrations 1--1 exam_results
exam_results 1--N exam_section_results

employees 1--N leave_requests
```

---

# 16. Index Đề Xuất

```sql
CREATE INDEX idx_students_phone ON students(phone);
CREATE INDEX idx_students_student_code ON students(student_code);
CREATE INDEX idx_students_status ON students(status);

CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

CREATE INDEX idx_schedules_student_id ON schedules(student_id);
CREATE INDEX idx_schedules_teacher_id ON schedules(teacher_id);
CREATE INDEX idx_schedules_vehicle_id ON schedules(vehicle_id);
CREATE INDEX idx_schedules_date ON schedules(schedule_date);
CREATE INDEX idx_schedules_status ON schedules(status);

CREATE INDEX idx_training_sessions_student_id ON training_sessions(student_id);
CREATE INDEX idx_training_sessions_teacher_id ON training_sessions(teacher_id);
CREATE INDEX idx_training_sessions_type ON training_sessions(session_type);

CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX idx_payments_paid_at ON payments(paid_at);

CREATE INDEX idx_vehicles_plate_number ON vehicles(plate_number);
CREATE INDEX idx_vehicles_status ON vehicles(status);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
```

---

# 17. Unique Constraints Quan Trọng

```sql
ALTER TABLE users
ADD CONSTRAINT uq_users_username UNIQUE (username);

ALTER TABLE students
ADD CONSTRAINT uq_students_user_id UNIQUE (user_id);

ALTER TABLE students
ADD CONSTRAINT uq_students_student_code UNIQUE (student_code);

ALTER TABLE employees
ADD CONSTRAINT uq_employees_user_id UNIQUE (user_id);

ALTER TABLE teachers
ADD CONSTRAINT uq_teachers_employee_id UNIQUE (employee_id);

ALTER TABLE vehicles
ADD CONSTRAINT uq_vehicles_plate_number UNIQUE (plate_number);

ALTER TABLE teacher_ratings
ADD CONSTRAINT uq_teacher_ratings_student_session
UNIQUE (student_id, training_session_id);
```
