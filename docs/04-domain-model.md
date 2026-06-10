# Domain Model

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Tổng Quan

Hệ thống được chia thành các domain chính:

1. Identity & Access
2. Student Management
3. Course & Enrollment
4. Document Management
5. Payment
6. Scheduling
7. Training
8. Examination
9. Teacher & Employee
10. Vehicle
11. Leave Management
12. Teaching Hour Summary
13. Notification
14. Report
15. Audit

---

# 2. Identity & Access Domain

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

### Ghi chú

- Tài khoản học viên do Admin hoặc Kế toán tạo thủ công.
- Username học viên mặc định là họ tên viết liền không dấu.
- Mật khẩu mặc định là số điện thoại.
- Người dùng được đổi mật khẩu.
- Quên mật khẩu tự động không thuộc MVP.

---

## Role

### Thuộc tính

- id
- code
- name

Ví dụ:

- STUDENT
- TEACHER
- SALES
- ACCOUNTANT
- EDUCATION_STAFF
- EXAM_STAFF
- AREA_MANAGER
- ADMIN
- DIRECTOR

---

## Permission

### Thuộc tính

- id
- code
- name

---

# 3. Student Domain

## Student

Đại diện học viên.

### Thuộc tính

- id
- user_id
- student_code
- full_name
- dob
- phone
- address
- status

### Quan hệ

- has one User
- has many Enrollments
- has many StudentDocuments
- has many Payments
- has many Schedules
- has many TrainingSessions
- has many ExamRegistrations

---

## StudentDocument

Đại diện một hồ sơ hoặc ghi chú hồ sơ của học viên.

### Thuộc tính

- id
- student_id
- document_name
- document_type
- file_url
- note
- uploaded_by
- uploaded_at

### Ghi chú

- `file_url` optional.
- `note` optional.
- Hồ sơ có thể chỉ có ghi chú, chỉ có file, hoặc có cả hai.
- Hồ sơ hoàn thiện do Kinh doanh đánh dấu thủ công.

---

# 4. Course & Enrollment Domain

## CoursePackage

Gói đào tạo.

### Thuộc tính

- id
- code
- name
- price
- basic_hours
- cabin_hours
- dat_km_required
- dat_hours_required
- yard_hours
- status

Ví dụ:

- A
- A1
- B_MT
- B_AT
- C1

---

## Enrollment

Đăng ký khóa học của học viên.

### Thuộc tính

- id
- student_id
- course_package_id
- enrollment_date
- start_date
- end_date
- status

### status

- NEW
- ACTIVE
- COMPLETED
- CANCELLED

### Ghi chú

Một học viên có thể có nhiều Enrollment.

---

# 5. Payment Domain

## Payment

Giao dịch thanh toán.

### Thuộc tính

- id
- student_id
- enrollment_id
- amount
- payment_type
- payment_method
- paid_at
- note
- created_by

### payment_type

- TUITION
- EXTRA_PRACTICE
- RETAKE_EXAM
- GRADUATION_RETAKE
- OTHER

### Ghi chú

- Không cho thanh toán vượt công nợ.
- Không xóa vật lý giao dịch thanh toán.

---

## PaymentPlan

Cấu hình đợt thanh toán cho gói học hoặc enrollment.

### Thuộc tính

- id
- course_package_id
- name
- amount
- percentage
- due_rule
- display_order
- status

---

## Refund

Giao dịch hoàn phí.

### Thuộc tính

- id
- payment_id
- amount
- reason
- refunded_at
- created_by

### Ghi chú

Cho phép hoàn phí một phần.

---

## PaymentReceipt

Phiếu thu thanh toán.

### Thuộc tính

- id
- payment_id
- receipt_no
- pdf_url
- issued_at
- issued_by

---

# 6. Scheduling Domain

## Schedule

Đại diện lịch học chính thức của học viên.

Lịch được tạo ngay sau khi học viên đặt thành công và không cần giáo vụ xác nhận.

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

---

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

---

# 7. Training Domain

## TrainingSession

Buổi học thực tế.

### Thuộc tính

- id
- schedule_id
- student_id
- teacher_id
- vehicle_id
- session_type
- started_at
- ended_at
- duration_minutes
- status
- note

### session_type

- BASIC
- CABIN
- DAT
- YARD
- SENSOR_YARD

### status

- SCHEDULED
- IN_PROGRESS
- TEACHER_COMPLETED
- STUDENT_CONFIRMED
- COMPLETED
- CANCELLED

---

## DATSessionDetail

Chi tiết buổi học DAT.

### Thuộc tính

- training_session_id
- km
- duration_minutes
- note
- start_image_url
- end_image_url

### Ghi chú

- Dữ liệu DAT được nhập tay.
- start_image_url optional.
- end_image_url optional.
- Không tích hợp thiết bị DAT trong phiên bản đầu tiên.

---

## TeacherRating

Đánh giá giáo viên sau buổi học.

### Thuộc tính

- id
- student_id
- teacher_id
- training_session_id
- rating
- comment
- created_at

### Ghi chú

- Rating từ 1 đến 5.
- Một học viên chỉ được đánh giá một buổi học một lần.
- Hệ thống tính điểm trung bình của giáo viên.

---

# 8. Examination Domain

## Exam

Kỳ thi.

### Thuộc tính

- id
- exam_type
- exam_date
- location
- status

### exam_type

- GRADUATION
- LICENSE

---

## ExamRegistration

Danh sách học viên tham gia kỳ thi.

### Thuộc tính

- id
- exam_id
- student_id
- enrollment_id
- eligibility_confirmed_by
- eligibility_confirmed_at
- status
- registered_at

### Ghi chú

Điều kiện thi được Giáo vụ thi xác nhận thủ công.

---

## ExamResult

Kết quả thi tổng.

### Thuộc tính

- id
- exam_registration_id
- result_status
- note
- updated_by
- updated_at

### result_status

- PASS
- FAIL
- ABSENT

---

## ExamSectionResult

Kết quả từng phần thi sát hạch.

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

---

## RetakeRegistration

Đăng ký thi lại.

### Thuộc tính

- id
- student_id
- enrollment_id
- failed_section
- fee_amount
- status
- created_at

### Ghi chú

Thi lại tính theo từng phần chưa đạt.

---

# 9. Teacher & Employee Domain

## Employee

Nhân viên nội bộ.

### Thuộc tính

- id
- user_id
- employee_code
- full_name
- phone
- position
- area_id
- status

---

## Teacher

Giáo viên.

### Thuộc tính

- id
- employee_id
- teacher_code
- status

### Ghi chú

Một xe không gán cố định cho giáo viên trong MVP.

---

## TeacherAttendance

Chấm công giáo viên.

### Thuộc tính

- id
- teacher_id
- attendance_date
- check_in_at
- check_out_at
- status

---

# 10. Vehicle Domain

## Vehicle

Xe tập lái.

### Thuộc tính

- id
- plate_number
- model
- brand
- status

---

## VehicleDocument

Giấy tờ xe.

### Thuộc tính

- id
- vehicle_id
- document_type
- expiry_date
- file_url

---

## VehicleUsage

Lịch sử sử dụng xe.

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

---

## FuelLog

Khai báo nhiên liệu.

### Thuộc tính

- id
- vehicle_id
- teacher_id
- liters
- amount
- receipt_image_url
- fueled_at
- note

---

## MaintenanceRequest

Đề xuất bảo dưỡng.

### Thuộc tính

- id
- vehicle_id
- requested_by
- description
- status
- approved_by
- approved_at

### Ghi chú

Bảo dưỡng có một cấp duyệt trong MVP.

---

## MaintenanceRecord

Lịch sử bảo dưỡng.

### Thuộc tính

- id
- vehicle_id
- maintenance_date
- description
- cost
- parts_replaced
- created_by

---

# 11. Leave Domain

## LeaveRequest

Yêu cầu nghỉ phép.

### Thuộc tính

- id
- employee_id
- leave_date
- reason
- status
- approved_by
- approved_at
- rejected_reason

### status

- PENDING
- APPROVED
- REJECTED

---

## LeavePolicy

Cấu hình nghỉ phép.

### Thuộc tính

- id
- max_leave_days_per_month
- minimum_available_teachers
- is_minimum_teacher_rule_enforced

### Ghi chú

- Mặc định max_leave_days_per_month là unlimited.
- Khi duyệt nghỉ phép, hệ thống kiểm tra số lượng giáo viên tối thiểu còn lại.

---

# 12. Teaching Hour Summary Domain

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
- submitted_at
- approved_by
- approved_at
- rejected_reason

### status

- DRAFT
- SUBMITTED
- APPROVED
- REJECTED

### Ghi chú

Phiên bản đầu tiên chỉ tổng hợp giờ dạy, chưa tính tiền lương tự động.

---

# 13. Notification Domain

## Notification

Thông báo trong ứng dụng.

### Thuộc tính

- id
- recipient_user_id
- title
- content
- notification_type
- status
- created_at
- read_at

### Ghi chú

MVP chỉ hỗ trợ in-app notification.

---

# 14. Report Domain

Báo cáo MVP gồm:

- Học viên đã hoàn thành khóa học.
- Kết quả thi sát hạch của tất cả học viên.
- Thông tin xe.
- Thông tin nhân viên.
- Lương hoặc bảng tổng hợp giờ dạy.

---

# 15. Audit Domain

## AuditLog

### Thuộc tính

- id
- actor_id
- action
- entity_type
- entity_id
- old_value
- new_value
- created_at

### Ghi chú

Audit log không được xóa.

---

# 16. Aggregate Roots Đề Xuất

## Student Aggregate

Root:

- Student

Children:

- Enrollment
- StudentDocument
- Payment
- Schedule
- TrainingSession
- ExamRegistration

## Schedule Aggregate

Root:

- Schedule

Children:

- ScheduleChangeLog
- TrainingSession

## Teacher Aggregate

Root:

- Teacher

Children:

- TeacherAttendance
- LeaveRequest
- TeachingHourSummary

## Vehicle Aggregate

Root:

- Vehicle

Children:

- VehicleDocument
- VehicleUsage
- FuelLog
- MaintenanceRequest
- MaintenanceRecord

## Exam Aggregate

Root:

- Exam

Children:

- ExamRegistration
- ExamResult
- ExamSectionResult
