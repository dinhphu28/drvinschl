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

## Booking

Yêu cầu đặt lịch của học viên.

### Thuộc tính

- id
- student_id
- booking_type
- schedule_date
- start_time
- end_time
- status

### booking_type

- BASIC
- CABIN
- DAT
- YARD
- SENSOR

------

## Schedule

Lịch đã được giáo vụ xác nhận.

### Thuộc tính

- id
- booking_id
- teacher_id
- vehicle_id
- status

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
- start_km
- end_km
- duration_minutes
- start_image
- end_image

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
- odo_start
- odo_end
- started_at
- ended_at

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

## SalaryCalculation

### Thuộc tính

- id
- teacher_id
- month
- year
- total_amount

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