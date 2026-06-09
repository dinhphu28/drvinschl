# ERD

## Tổng Quan

Tài liệu này mô tả thiết kế dữ liệu mức logic cho hệ thống quản lý trung tâm đào tạo lái xe.

Thiết kế ưu tiên:

- Dễ triển khai với PostgreSQL
- Dễ mở rộng
- Có audit log
- Có soft delete
- Phù hợp REST API
- Phù hợp RBAC

------

# 1. Quy Ước Chung

## 1.1 Primary Key

Tất cả bảng sử dụng:

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

Không xóa vật lý các dữ liệu quan trọng như:

- Học viên
- Thanh toán
- Kết quả thi
- Lịch học
- Lương
- Xe
- Bảo dưỡng

Sử dụng `deleted_at`.

------

# 2. Identity & Access

## users

Lưu tài khoản đăng nhập.

| Column        | Type         | Note             |
| ------------- | ------------ | ---------------- |
| id            | UUID         | PK               |
| username      | VARCHAR(100) | UNIQUE           |
| password_hash | TEXT         |                  |
| full_name     | VARCHAR(255) |                  |
| phone         | VARCHAR(20)  |                  |
| email         | VARCHAR(255) | NULL             |
| status        | VARCHAR(30)  | ACTIVE, INACTIVE |
| created_at    | TIMESTAMP    |                  |
| updated_at    | TIMESTAMP    |                  |

------

## roles

| Column | Type         | Note   |
| ------ | ------------ | ------ |
| id     | UUID         | PK     |
| code   | VARCHAR(50)  | UNIQUE |
| name   | VARCHAR(255) |        |

------

## permissions

| Column | Type         | Note   |
| ------ | ------------ | ------ |
| id     | UUID         | PK     |
| code   | VARCHAR(100) | UNIQUE |
| name   | VARCHAR(255) |        |

------

## user_roles

| Column  | Type | Note        |
| ------- | ---- | ----------- |
| user_id | UUID | FK users.id |
| role_id | UUID | FK roles.id |

Primary key:

```sql
PRIMARY KEY (user_id, role_id)
```

------

## role_permissions

| Column        | Type | Note              |
| ------------- | ---- | ----------------- |
| role_id       | UUID | FK roles.id       |
| permission_id | UUID | FK permissions.id |

Primary key:

```sql
PRIMARY KEY (role_id, permission_id)
```

------

# 3. Student

## students

| Column       | Type         | Note                |
| ------------ | ------------ | ------------------- |
| id           | UUID         | PK                  |
| user_id      | UUID         | FK users.id, UNIQUE |
| student_code | VARCHAR(50)  | UNIQUE              |
| full_name    | VARCHAR(255) |                     |
| dob          | DATE         |                     |
| phone        | VARCHAR(20)  |                     |
| address      | TEXT         | NULL                |
| status       | VARCHAR(30)  |                     |
| created_at   | TIMESTAMP    |                     |
| updated_at   | TIMESTAMP    |                     |
| deleted_at   | TIMESTAMP    | NULL                |

Status:

- NEW
- ACTIVE
- WAITING_EXAM
- COMPLETED
- CANCELLED

------

## student_documents

| Column        | Type        | Note           |
| ------------- | ----------- | -------------- |
| id            | UUID        | PK             |
| student_id    | UUID        | FK students.id |
| document_type | VARCHAR(50) |                |
| file_url      | TEXT        |                |
| uploaded_at   | TIMESTAMP   |                |

Document type:

- APPLICATION_FORM
- PHOTO
- HEALTH_CERTIFICATE
- CONTRACT

------

# 4. Course & Enrollment

## course_packages

| Column             | Type          | Note             |
| ------------------ | ------------- | ---------------- |
| id                 | UUID          | PK               |
| code               | VARCHAR(50)   | UNIQUE           |
| name               | VARCHAR(255)  |                  |
| price              | NUMERIC(15,2) |                  |
| basic_hours        | INT           |                  |
| cabin_hours        | INT           |                  |
| dat_km_required    | INT           |                  |
| dat_hours_required | INT           |                  |
| yard_hours         | INT           |                  |
| status             | VARCHAR(30)   | ACTIVE, INACTIVE |

------

## enrollments

| Column            | Type        | Note                  |
| ----------------- | ----------- | --------------------- |
| id                | UUID        | PK                    |
| student_id        | UUID        | FK students.id        |
| course_package_id | UUID        | FK course_packages.id |
| enrollment_date   | DATE        |                       |
| start_date        | DATE        | NULL                  |
| end_date          | DATE        | NULL                  |
| status            | VARCHAR(30) |                       |

Status:

- NEW
- ACTIVE
- COMPLETED
- CANCELLED

------

# 5. Payment

## payments

| Column         | Type          | Note                |
| -------------- | ------------- | ------------------- |
| id             | UUID          | PK                  |
| student_id     | UUID          | FK students.id      |
| enrollment_id  | UUID          | FK enrollments.id   |
| amount         | NUMERIC(15,2) |                     |
| payment_type   | VARCHAR(50)   |                     |
| payment_method | VARCHAR(50)   | CASH, BANK_TRANSFER |
| paid_at        | TIMESTAMP     |                     |
| note           | TEXT          | NULL                |
| created_by     | UUID          | FK users.id         |

Payment type:

- TUITION_1
- TUITION_2
- TUITION_FINAL
- EXTRA_PRACTICE
- RETAKE_EXAM

------

## refunds

| Column      | Type          | Note           |
| ----------- | ------------- | -------------- |
| id          | UUID          | PK             |
| payment_id  | UUID          | FK payments.id |
| amount      | NUMERIC(15,2) |                |
| reason      | TEXT          |                |
| refunded_at | TIMESTAMP     |                |
| created_by  | UUID          | FK users.id    |

------

# 6. Scheduling

## bookings

Yêu cầu đặt lịch từ học viên.

| Column        | Type        | Note              |
| ------------- | ----------- | ----------------- |
| id            | UUID        | PK                |
| student_id    | UUID        | FK students.id    |
| enrollment_id | UUID        | FK enrollments.id |
| booking_type  | VARCHAR(50) |                   |
| desired_date  | DATE        |                   |
| start_time    | TIME        |                   |
| end_time      | TIME        |                   |
| status        | VARCHAR(30) |                   |
| created_at    | TIMESTAMP   |                   |

Booking type:

- BASIC
- CABIN
- DAT
- YARD
- SENSOR_YARD

Status:

- PENDING
- CONFIRMED
- CANCELLED
- REJECTED
- COMPLETED

------

## schedules

Lịch đã được giáo vụ xác nhận.

| Column        | Type        | Note                 |
| ------------- | ----------- | -------------------- |
| id            | UUID        | PK                   |
| booking_id    | UUID        | FK bookings.id, NULL |
| student_id    | UUID        | FK students.id       |
| teacher_id    | UUID        | FK teachers.id, NULL |
| vehicle_id    | UUID        | FK vehicles.id, NULL |
| cabin_id      | UUID        | FK cabins.id, NULL   |
| schedule_type | VARCHAR(50) |                      |
| schedule_date | DATE        |                      |
| start_time    | TIME        |                      |
| end_time      | TIME        |                      |
| status        | VARCHAR(30) |                      |
| created_by    | UUID        | FK users.id          |

Status:

- PLANNED
- CONFIRMED
- IN_PROGRESS
- COMPLETED
- CANCELLED

------

## schedule_change_logs

| Column      | Type      | Note            |
| ----------- | --------- | --------------- |
| id          | UUID      | PK              |
| schedule_id | UUID      | FK schedules.id |
| changed_by  | UUID      | FK users.id     |
| old_value   | JSONB     |                 |
| new_value   | JSONB     |                 |
| reason      | TEXT      | NULL            |
| changed_at  | TIMESTAMP |                 |

------

# 7. Training

## training_sessions

| Column           | Type        | Note                 |
| ---------------- | ----------- | -------------------- |
| id               | UUID        | PK                   |
| schedule_id      | UUID        | FK schedules.id      |
| student_id       | UUID        | FK students.id       |
| teacher_id       | UUID        | FK teachers.id, NULL |
| vehicle_id       | UUID        | FK vehicles.id, NULL |
| session_type     | VARCHAR(50) |                      |
| started_at       | TIMESTAMP   |                      |
| ended_at         | TIMESTAMP   | NULL                 |
| duration_minutes | INT         | NULL                 |
| status           | VARCHAR(30) |                      |

Session type:

- BASIC
- CABIN
- DAT
- YARD
- SENSOR_YARD

------

## dat_session_details

| Column              | Type          | Note                        |
| ------------------- | ------------- | --------------------------- |
| training_session_id | UUID          | PK, FK training_sessions.id |
| start_km            | NUMERIC(10,2) |                             |
| end_km              | NUMERIC(10,2) |                             |
| dat_start_image_url | TEXT          | NULL                        |
| dat_end_image_url   | TEXT          | NULL                        |

------

## teacher_ratings

| Column              | Type      | Note                    |
| ------------------- | --------- | ----------------------- |
| id                  | UUID      | PK                      |
| student_id          | UUID      | FK students.id          |
| teacher_id          | UUID      | FK teachers.id          |
| training_session_id | UUID      | FK training_sessions.id |
| rating              | INT       | 1-5                     |
| comment             | TEXT      | NULL                    |
| created_at          | TIMESTAMP |                         |

Unique:

```sql
UNIQUE (student_id, training_session_id)
```

------

# 8. Examination

## exams

| Column    | Type        | Note                |
| --------- | ----------- | ------------------- |
| id        | UUID        | PK                  |
| exam_type | VARCHAR(50) | GRADUATION, LICENSE |
| exam_date | DATE        |                     |
| location  | TEXT        | NULL                |
| status    | VARCHAR(30) |                     |

------

## exam_registrations

| Column        | Type        | Note           |
| ------------- | ----------- | -------------- |
| id            | UUID        | PK             |
| exam_id       | UUID        | FK exams.id    |
| student_id    | UUID        | FK students.id |
| status        | VARCHAR(30) |                |
| registered_at | TIMESTAMP   |                |

Status:

- REGISTERED
- PASSED
- FAILED
- ABSENT

------

## exam_results

| Column               | Type        | Note                     |
| -------------------- | ----------- | ------------------------ |
| id                   | UUID        | PK                       |
| exam_registration_id | UUID        | FK exam_registrations.id |
| result_status        | VARCHAR(30) | PASS, FAIL               |
| note                 | TEXT        | NULL                     |
| updated_by           | UUID        | FK users.id              |
| updated_at           | TIMESTAMP   |                          |

------

## exam_section_results

| Column         | Type          | Note               |
| -------------- | ------------- | ------------------ |
| id             | UUID          | PK                 |
| exam_result_id | UUID          | FK exam_results.id |
| section        | VARCHAR(50)   |                    |
| score          | NUMERIC(10,2) | NULL               |
| status         | VARCHAR(30)   | PASS, FAIL         |

Section:

- THEORY
- SIMULATION
- YARD
- ROAD

------

## retake_registrations

| Column         | Type          | Note           |
| -------------- | ------------- | -------------- |
| id             | UUID          | PK             |
| student_id     | UUID          | FK students.id |
| failed_section | VARCHAR(50)   |                |
| fee_amount     | NUMERIC(15,2) |                |
| status         | VARCHAR(30)   |                |
| created_at     | TIMESTAMP     |                |

------

# 9. Teacher & HR

## employees

Dùng cho nhân viên nội bộ.

| Column        | Type         | Note                |
| ------------- | ------------ | ------------------- |
| id            | UUID         | PK                  |
| user_id       | UUID         | FK users.id, UNIQUE |
| employee_code | VARCHAR(50)  | UNIQUE              |
| full_name     | VARCHAR(255) |                     |
| phone         | VARCHAR(20)  |                     |
| position      | VARCHAR(50)  |                     |
| area_id       | UUID         | FK areas.id, NULL   |
| status        | VARCHAR(30)  | ACTIVE, INACTIVE    |

Position:

- SALES
- ACCOUNTANT
- EDUCATION_STAFF
- EXAM_STAFF
- AREA_MANAGER
- ADMIN
- DIRECTOR

------

## teachers

| Column             | Type        | Note                    |
| ------------------ | ----------- | ----------------------- |
| id                 | UUID        | PK                      |
| employee_id        | UUID        | FK employees.id, UNIQUE |
| teacher_code       | VARCHAR(50) | UNIQUE                  |
| default_vehicle_id | UUID        | FK vehicles.id, NULL    |
| status             | VARCHAR(30) | ACTIVE, INACTIVE        |

------

## teacher_attendances

| Column          | Type        | Note           |
| --------------- | ----------- | -------------- |
| id              | UUID        | PK             |
| teacher_id      | UUID        | FK teachers.id |
| attendance_date | DATE        |                |
| check_in_at     | TIMESTAMP   | NULL           |
| check_out_at    | TIMESTAMP   | NULL           |
| status          | VARCHAR(30) |                |

------

## leave_requests

| Column      | Type        | Note              |
| ----------- | ----------- | ----------------- |
| id          | UUID        | PK                |
| employee_id | UUID        | FK employees.id   |
| leave_date  | DATE        |                   |
| reason      | TEXT        |                   |
| status      | VARCHAR(30) |                   |
| approved_by | UUID        | FK users.id, NULL |
| approved_at | TIMESTAMP   | NULL              |

Status:

- PENDING
- APPROVED
- REJECTED

------

# 10. Vehicle

## vehicles

| Column       | Type         | Note                          |
| ------------ | ------------ | ----------------------------- |
| id           | UUID         | PK                            |
| plate_number | VARCHAR(30)  | UNIQUE                        |
| model        | VARCHAR(100) | NULL                          |
| brand        | VARCHAR(100) | NULL                          |
| status       | VARCHAR(30)  | ACTIVE, MAINTENANCE, INACTIVE |

------

## vehicle_documents

| Column        | Type        | Note           |
| ------------- | ----------- | -------------- |
| id            | UUID        | PK             |
| vehicle_id    | UUID        | FK vehicles.id |
| document_type | VARCHAR(50) |                |
| expiry_date   | DATE        |                |
| file_url      | TEXT        | NULL           |

Document type:

- REGISTRATION
- TRAINING_LICENSE
- INSURANCE
- MORTGAGE_RECORD
- OWNERSHIP

------

## vehicle_usages

| Column       | Type          | Note           |
| ------------ | ------------- | -------------- |
| id           | UUID          | PK             |
| vehicle_id   | UUID          | FK vehicles.id |
| teacher_id   | UUID          | FK teachers.id |
| usage_date   | DATE          |                |
| odo_start    | NUMERIC(12,2) |                |
| odo_end      | NUMERIC(12,2) | NULL           |
| started_at   | TIMESTAMP     |                |
| ended_at     | TIMESTAMP     | NULL           |
| clean_status | VARCHAR(30)   | NULL           |
| image_url    | TEXT          | NULL           |

------

## fuel_logs

| Column            | Type          | Note           |
| ----------------- | ------------- | -------------- |
| id                | UUID          | PK             |
| vehicle_id        | UUID          | FK vehicles.id |
| teacher_id        | UUID          | FK teachers.id |
| liters            | NUMERIC(10,2) |                |
| amount            | NUMERIC(15,2) | NULL           |
| receipt_image_url | TEXT          | NULL           |
| fueled_at         | TIMESTAMP     |                |

------

## maintenance_requests

| Column       | Type        | Note              |
| ------------ | ----------- | ----------------- |
| id           | UUID        | PK                |
| vehicle_id   | UUID        | FK vehicles.id    |
| requested_by | UUID        | FK users.id       |
| description  | TEXT        |                   |
| status       | VARCHAR(30) |                   |
| approved_by  | UUID        | FK users.id, NULL |
| approved_at  | TIMESTAMP   | NULL              |

------

## maintenance_records

| Column           | Type          | Note           |
| ---------------- | ------------- | -------------- |
| id               | UUID          | PK             |
| vehicle_id       | UUID          | FK vehicles.id |
| maintenance_date | DATE          |                |
| description      | TEXT          |                |
| cost             | NUMERIC(15,2) | NULL           |
| created_by       | UUID          | FK users.id    |

------

# 11. Payroll

## salary_rules

| Column      | Type          | Note             |
| ----------- | ------------- | ---------------- |
| id          | UUID          | PK               |
| code        | VARCHAR(50)   | UNIQUE           |
| name        | VARCHAR(255)  |                  |
| multiplier  | NUMERIC(5,2)  |                  |
| base_amount | NUMERIC(15,2) | NULL             |
| status      | VARCHAR(30)   | ACTIVE, INACTIVE |

Rule code:

- WEEKDAY
- WEEKEND
- NIGHT
- SENSOR_PRACTICE
- EXAM

------

## salary_calculations

| Column       | Type          | Note            |
| ------------ | ------------- | --------------- |
| id           | UUID          | PK              |
| employee_id  | UUID          | FK employees.id |
| month        | INT           |                 |
| year         | INT           |                 |
| total_amount | NUMERIC(15,2) |                 |
| status       | VARCHAR(30)   |                 |

Status:

- DRAFT
- SUBMITTED
- APPROVED
- REJECTED
- PAID

------

## salary_items

| Column                | Type          | Note                      |
| --------------------- | ------------- | ------------------------- |
| id                    | UUID          | PK                        |
| salary_calculation_id | UUID          | FK salary_calculations.id |
| salary_rule_id        | UUID          | FK salary_rules.id        |
| quantity              | NUMERIC(10,2) |                           |
| unit_amount           | NUMERIC(15,2) |                           |
| amount                | NUMERIC(15,2) |                           |

------

## salary_approvals

| Column                | Type        | Note                      |
| --------------------- | ----------- | ------------------------- |
| id                    | UUID        | PK                        |
| salary_calculation_id | UUID        | FK salary_calculations.id |
| approved_by           | UUID        | FK users.id               |
| approved_at           | TIMESTAMP   |                           |
| status                | VARCHAR(30) | APPROVED, REJECTED        |
| note                  | TEXT        | NULL                      |

------

# 12. Configuration

## areas

Chi nhánh/khu vực.

| Column  | Type         | Note             |
| ------- | ------------ | ---------------- |
| id      | UUID         | PK               |
| code    | VARCHAR(50)  | UNIQUE           |
| name    | VARCHAR(255) |                  |
| address | TEXT         | NULL             |
| status  | VARCHAR(30)  | ACTIVE, INACTIVE |

------

## fee_configs

| Column      | Type          | Note             |
| ----------- | ------------- | ---------------- |
| id          | UUID          | PK               |
| config_type | VARCHAR(50)   |                  |
| code        | VARCHAR(50)   |                  |
| name        | VARCHAR(255)  |                  |
| amount      | NUMERIC(15,2) |                  |
| status      | VARCHAR(30)   | ACTIVE, INACTIVE |

Config type:

- EXTRA_PRACTICE
- RETAKE_EXAM
- YARD_PRACTICE
- SENSOR_YARD

------

## system_settings

| Column      | Type         | Note   |
| ----------- | ------------ | ------ |
| id          | UUID         | PK     |
| key         | VARCHAR(100) | UNIQUE |
| value       | TEXT         |        |
| description | TEXT         | NULL   |

------

# 13. Notification

## notifications

| Column            | Type         | Note        |
| ----------------- | ------------ | ----------- |
| id                | UUID         | PK          |
| recipient_user_id | UUID         | FK users.id |
| title             | VARCHAR(255) |             |
| content           | TEXT         |             |
| notification_type | VARCHAR(50)  |             |
| status            | VARCHAR(30)  |             |
| created_at        | TIMESTAMP    |             |
| read_at           | TIMESTAMP    | NULL        |

------

# 14. Audit Log

## audit_logs

| Column      | Type         | Note        |
| ----------- | ------------ | ----------- |
| id          | UUID         | PK          |
| actor_id    | UUID         | FK users.id |
| action      | VARCHAR(100) |             |
| entity_type | VARCHAR(100) |             |
| entity_id   | UUID         |             |
| old_value   | JSONB        | NULL        |
| new_value   | JSONB        | NULL        |
| created_at  | TIMESTAMP    |             |

------

# 15. Quan Hệ Chính

```text
users 1--1 students
users 1--1 employees
employees 1--1 teachers

students 1--N enrollments
students 1--N student_documents
students 1--N payments
students 1--N bookings
students 1--N schedules
students 1--N training_sessions
students 1--N exam_registrations

course_packages 1--N enrollments

bookings 1--0..1 schedules
schedules 1--0..1 training_sessions

teachers 1--N schedules
teachers 1--N training_sessions
teachers 1--N vehicle_usages
teachers 1--N fuel_logs

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
employees 1--N salary_calculations
salary_calculations 1--N salary_items
salary_calculations 1--N salary_approvals
```

------

# 16. Index Đề Xuất

## students

```sql
CREATE INDEX idx_students_phone ON students(phone);
CREATE INDEX idx_students_student_code ON students(student_code);
CREATE INDEX idx_students_status ON students(status);
```

## bookings

```sql
CREATE INDEX idx_bookings_student_id ON bookings(student_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(desired_date);
```

## schedules

```sql
CREATE INDEX idx_schedules_student_id ON schedules(student_id);
CREATE INDEX idx_schedules_teacher_id ON schedules(teacher_id);
CREATE INDEX idx_schedules_vehicle_id ON schedules(vehicle_id);
CREATE INDEX idx_schedules_date ON schedules(schedule_date);
```

## training_sessions

```sql
CREATE INDEX idx_training_sessions_student_id ON training_sessions(student_id);
CREATE INDEX idx_training_sessions_teacher_id ON training_sessions(teacher_id);
CREATE INDEX idx_training_sessions_type ON training_sessions(session_type);
```

## payments

```sql
CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX idx_payments_paid_at ON payments(paid_at);
```

## vehicles

```sql
CREATE INDEX idx_vehicles_plate_number ON vehicles(plate_number);
CREATE INDEX idx_vehicles_status ON vehicles(status);
```

------

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

------

# 18. Ghi Chú Thiết Kế

## 18.1 Không nên gộp Student và User

`users` chỉ phục vụ đăng nhập.

`students` chứa dữ liệu nghiệp vụ học viên.

## 18.2 Không nên gộp Employee và Teacher

Không phải nhân viên nào cũng là giáo viên.

Giáo viên là một loại nhân viên có nghiệp vụ riêng:

- Lịch dạy
- ODO
- Xăng
- Giờ dạy
- Lương theo giờ

## 18.3 Booking khác Schedule

`bookings` là yêu cầu đặt lịch.

`schedules` là lịch đã được giáo vụ xác nhận và phân công.

## 18.4 Schedule khác TrainingSession

`schedules` là kế hoạch.

`training_sessions` là buổi học thực tế đã diễn ra.

## 18.5 Payment không được xóa

Thanh toán là dữ liệu tài chính, chỉ được hủy/hoàn bằng giao dịch đối ứng.

## 18.6 ExamResult nên tách ExamSectionResult

Vì thi sát hạch có nhiều phần:

- Lý thuyết
- Mô phỏng
- Sa hình
- Đường trường

Học viên có thể rớt từng phần và đăng ký thi lại từng phần.