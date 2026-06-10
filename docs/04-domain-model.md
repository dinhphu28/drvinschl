# Domain Model

## Tổng Quan

Hệ thống được chia thành các Domain chính:

1. Student Management
2. Enrollment & Course
3. Payment
4. Scheduling
5. Training
6. Examination
7. Teacher Management
8. Vehicle Management
9. HR & Payroll
10. Administration

------

# 1. Identity & Access

## User

Đại diện tài khoản đăng nhập hệ thống.

### Thuộc tính

- id
- username
- password_hash
- full_name
- phone
- email
- status

### Quan hệ

- belongs to Role

------

## Role

### Thuộc tính

- id
- code
- name

Ví dụ:

- STUDENT
- TEACHER
- ACCOUNTANT
- SALES
- ADMIN

------

## Permission

### Thuộc tính

- id
- code
- name

------

# 2. Student Domain

## Student

Đại diện học viên.

### Thuộc tính

- id
- student_code
- full_name
- dob
- phone
- address
- created_at

### Quan hệ

- has one User
- has many StudentDocuments
- has many Payments
- has many Bookings
- has many TrainingSessions
- has many ExamAttempts

------

## StudentDocument

### Thuộc tính

- id
- student_id
- document_type
- file_url
- uploaded_at

### document_type

- HEALTH_CERTIFICATE
- PHOTO
- APPLICATION_FORM

------

# 3. Course Domain

## CoursePackage

Gói đào tạo.

### Thuộc tính

- id
- code
- name
- price

Ví dụ:

- A1
- A
- B_MT
- B_AT
- C1

------

## Enrollment

Đăng ký khóa học.

### Thuộc tính

- id
- student_id
- package_id
- enrollment_date
- status

### status

- NEW
- ACTIVE
- COMPLETED
- CANCELLED

------

# 4. Payment Domain

## Payment

### Thuộc tính

- id
- student_id
- amount
- payment_type
- paid_at

### payment_type

- TUITION_1
- TUITION_2
- TUITION_FINAL
- EXTRA_PRACTICE
- RETAKE_EXAM

------

## Refund

### Thuộc tính

- id
- payment_id
- amount
- reason
- refunded_at

------

# 5. Scheduling Domain

## Schedule

Đại diện lịch học chính thức của học viên.

Lịch được tạo ngay sau khi học viên đặt thành công và không cần giáo vụ xác nhận, tuy nhiên giáo vụ cần sắp xếp giáo viên và xe cho lịch học này.
Lịch có thể được giáo vụ điều chỉnh, phân công giáo viên, phân công xe hoặc hủy nếu cần thiết.

### Thuộc tính

- id
- student_id
- enrollment_id
- teacher_id
- vehicle_id
- cabin_id
- schedule_type
- schedule_date
- start_time
- end_time
- status
- created_by
- created_at

### schedule_type

- BASIC
- CABIN
- DAT
- YARD
- SENSOR_YARD

### status

- BOOKED
- CANCELLED
- IN_PROGRESS
- TEACHER_COMPLETED
- STUDENT_CONFIRMED
- COMPLETED

### Quan hệ

- belongs to Student
- belongs to Enrollment
- optionally belongs to Teacher
- optionally belongs to Vehicle
- optionally belongs to Cabin
- has zero or one TrainingSession

------

## ScheduleChangeLog

Lưu lịch sử thay đổi lịch.

### Thuộc tính

- id
- schedule_id
- changed_by
- old_value
- new_value
- reason
- changed_at

------

# 6. Training Domain

## TrainingSession

Buổi học thực tế.

### Thuộc tính

- id
- student_id
- teacher_id
- vehicle_id
- schedule_id
- session_type
- started_at
- ended_at

------

## BasicSession

4 giờ cơ bản.

### Thuộc tính

- training_session_id

------

## CabinSession

### Thuộc tính

- training_session_id
- duration_minutes

------

## DATSession

### Thuộc tính

- training_session_id
- km
- duration_minutes
- note
- start_image_url
- end_image_url

### Ghi chú

- Dữ liệu DAT được nhập tay.
- start_image_url là optional.
- end_image_url là optional.
- Không tích hợp thiết bị DAT trong phiên bản đầu tiên.

------

## YardSession

### Thuộc tính

- training_session_id

------

## TeacherRating

### Thuộc tính

- id
- student_id
- teacher_id
- session_id
- rating
- comment

------

# 7. Examination Domain

## Exam

### Thuộc tính

- id
- exam_type
- exam_date

### exam_type

- GRADUATION
- LICENSE

------

## ExamRegistration

### Thuộc tính

- id
- student_id
- exam_id

------

## ExamResult

### Thuộc tính

- id
- registration_id
- result_status

### result_status

- PASS
- FAIL

------

## ExamSectionResult

### Thuộc tính

- id
- exam_result_id
- section
- score
- status

### section

- THEORY
- SIMULATION
- YARD
- ROAD

------

## RetakeRegistration

### Thuộc tính

- id
- student_id
- failed_section
- fee

------

# 8. Teacher Domain

## Teacher

### Thuộc tính

- id
- employee_code
- full_name
- phone

------

## Attendance

### Thuộc tính

- id
- teacher_id
- check_in_at

------

## LeaveRequest

### Thuộc tính

- id
- teacher_id
- leave_date
- reason
- status

------

# 9. Vehicle Domain

## Vehicle

### Thuộc tính

- id
- plate_number
- model
- status

------

## VehicleDocument

### Thuộc tính

- id
- vehicle_id
- document_type
- expiry_date

------

## FuelLog

### Thuộc tính

- id
- vehicle_id
- teacher_id
- liters
- receipt_image
- created_at

------

## VehicleUsage

### Thuộc tính

- id
- vehicle_id
- teacher_id
- usage_date
- started_at
- ended_at
- odo_start
- odo_end
- start_image_url
- end_image_url
- clean_status

### Ghi chú

- start_image_url bắt buộc khi bắt đầu sử dụng xe.
- odo_start optional.
- odo_end optional.
- Nếu nhập cả odo_start và odo_end thì odo_end phải lớn hơn hoặc bằng odo_start.

------

## MaintenanceRequest

### Thuộc tính

- id
- vehicle_id
- teacher_id
- description
- status

------

## MaintenanceRecord

### Thuộc tính

- id
- vehicle_id
- maintenance_date
- cost
- description

------

# 10. Payroll Domain

## SalaryRule

### Thuộc tính

- id
- code
- multiplier

Ví dụ:

- WEEKDAY
- WEEKEND
- NIGHT
- SENSOR
- EXAM

------

## TeachingHourSummary

Tổng hợp giờ dạy của giáo viên trong tháng.

### Thuộc tính

- id
- teacher_id
- month
- year
- weekday_hours
- weekend_hours
- night_hours
- sensor_practice_hours
- sensor_exam_hours
- status

### status

- DRAFT
- SUBMITTED
- APPROVED
- REJECTED

### Ghi chú

Phiên bản đầu tiên chỉ tổng hợp giờ dạy, chưa tính tiền lương tự động.

------

## SalaryApproval

### Thuộc tính

- id
- salary_id
- approved_by
- approved_at

------

# 11. Notification Domain

## Notification

### Thuộc tính

- id
- recipient_id
- title
- content
- status

------

# 12. Audit Domain

## AuditLog

### Thuộc tính

- id
- actor_id
- action
- entity_type
- entity_id
- created_at

------

# Aggregate Root

## Student Aggregate

Root:

- Student

Children:

- StudentDocument
- Enrollment
- Payment
- Booking
- TrainingSession
- ExamRegistration

------

## Teacher Aggregate

Root:

- Teacher

Children:

- Attendance
- LeaveRequest
- SalaryCalculation

------

## Vehicle Aggregate

Root:

- Vehicle

Children:

- VehicleDocument
- FuelLog
- VehicleUsage
- MaintenanceRequest
- MaintenanceRecord

------

## Exam Aggregate

Root:

- Exam

Children:

- ExamRegistration
- ExamResult
- ExamSectionResult
