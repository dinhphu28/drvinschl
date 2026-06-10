# Implementation Plan

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0
Status: Draft

---

# 1. Mục Đích

Tài liệu này mô tả kế hoạch triển khai hệ thống quản lý trung tâm đào tạo lái xe theo từng giai đoạn.

Tài liệu dùng để:

* Chia nhỏ phạm vi triển khai
* Ước lượng công việc
* Theo dõi tiến độ
* Trao đổi với khách hàng
* Làm input cho task breakdown
* Giúp AI Agent hiểu thứ tự triển khai hợp lý

---

# 2. Nguyên Tắc Triển Khai

## 2.1 Ưu Tiên Luồng Nghiệp Vụ Chính

Triển khai trước các luồng chính:

```text
Học viên
→ Hồ sơ
→ Học phí
→ Đặt lịch
→ Buổi học
→ Thi
→ Nhận bằng
```

Các chức năng báo cáo, dashboard nâng cao, audit log chi tiết có thể triển khai sau.

---

## 2.2 Không Triển Khai Theo Màn Hình Trước

Không nên bắt đầu bằng cách code từng màn hình riêng lẻ.

Nên triển khai theo thứ tự:

```text
Database
→ Backend Domain
→ REST API
→ Web Admin
→ Mobile/Học viên
→ Reports
→ Optimization
```

---

## 2.3 Ưu Tiên Tính Đúng Trước Tính Đẹp

Trong giai đoạn đầu, hệ thống cần ưu tiên:

* Đúng nghiệp vụ
* Lưu dữ liệu chính xác
* Phân quyền đúng
* Có thể kiểm thử được
* Có thể demo được luồng chính

UI có thể cải thiện sau.

---

# 3. Phạm Vi Triển Khai Tổng Thể

Hệ thống gồm các nhóm chức năng chính:

1. Authentication & Authorization
2. Student Management
3. Document Management
4. Course & Enrollment
5. Payment Management
6. Booking & Scheduling
7. Training Session Management
8. Exam Management
9. Teacher Management
10. Vehicle Management
11. HR & Leave Management
12. Payroll
13. Notification
14. Reports & Dashboard
15. Audit Log
16. System Configuration

---

# 4. Giai Đoạn Triển Khai

# Phase 0: Project Setup

## Mục tiêu

Chuẩn bị nền tảng kỹ thuật cho dự án.

## Công việc

* Tạo repository structure
* Cấu hình backend project
* Cấu hình frontend project
* Cấu hình database
* Cấu hình Docker Compose
* Cấu hình migration tool
* Cấu hình authentication base
* Cấu hình logging
* Cấu hình error response chuẩn
* Cấu hình validation chuẩn

## Kết quả bàn giao

* Backend chạy được
* Frontend chạy được
* Database chạy được
* Có thể gọi health check API
* Có cấu trúc code ban đầu

## Ưu tiên

High

---

# Phase 1: Identity & Access Control

## Mục tiêu

Triển khai đăng nhập, tài khoản, vai trò và phân quyền.

## Chức năng

* Đăng nhập
* Đăng xuất
* Refresh token nếu có
* Quản lý user
* Quản lý role
* Quản lý permission
* Gán role cho user
* Kiểm tra quyền theo API

## Backend

* `users`
* `roles`
* `permissions`
* `user_roles`
* `role_permissions`
* JWT authentication
* Password hashing
* Role-based access control

## Frontend

* Login screen
* User management screen
* Role management screen
* Permission matrix screen
* Protected route

## API chính

```http
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET /users
POST /users
PUT /users/{id}
GET /roles
POST /roles
PUT /roles/{id}/permissions
```

## Kết quả bàn giao

* Người dùng đăng nhập được.
* Người dùng chỉ truy cập được chức năng đúng quyền.
* Admin quản lý được tài khoản và phân quyền.

## Ưu tiên

High

---

# Phase 2: Student, Course & Enrollment

## Mục tiêu

Triển khai nền tảng quản lý học viên và khóa học.

## Chức năng

* Tạo học viên
* Cập nhật học viên
* Tra cứu học viên
* Xem chi tiết học viên
* Quản lý gói học
* Đăng ký khóa học
* Theo dõi trạng thái học viên

## Backend

* `students`
* `course_packages`
* `enrollments`

## Frontend

* Student list
* Student detail
* Create/edit student
* Course package configuration
* Enrollment section

## API chính

```http
GET /students
POST /students
GET /students/{id}
PUT /students/{id}
GET /course-packages
POST /course-packages
PUT /course-packages/{id}
POST /enrollments
GET /enrollments/{id}
```

## Kết quả bàn giao

* Có thể tạo học viên.
* Có thể chọn gói học cho học viên.
* Có thể xem danh sách và chi tiết học viên.
* Có thể quản lý gói học.

## Ưu tiên

High

---

# Phase 3: Student Documents

## Mục tiêu

Triển khai quản lý hồ sơ học viên.

## Chức năng

* Upload hồ sơ học viên
* Xem danh sách hồ sơ
* Xóa hoặc thay thế hồ sơ
* Đánh dấu hồ sơ hoàn thiện
* Theo dõi ngày nộp giấy khám sức khỏe

## Backend

* `student_documents`
* File storage service
* Document type configuration nếu cần

## Frontend

* Student document tab
* File upload component
* Document completeness status

## API chính

```http
GET /students/{id}/documents
POST /students/{id}/documents
DELETE /students/{id}/documents/{documentId}
PUT /students/{id}/documents/completion-status
```

## Kết quả bàn giao

* Có thể lưu hồ sơ học viên.
* Có thể kiểm tra hồ sơ đầy đủ hoặc thiếu.
* Có thể cập nhật trạng thái hồ sơ.

## Ưu tiên

High

---

# Phase 4: Payment Management

## Mục tiêu

Triển khai quản lý học phí, công nợ và hoàn phí.

## Chức năng

* Ghi nhận học phí
* Xem lịch sử thanh toán
* Xem công nợ học viên
* Ghi nhận phí học thêm
* Ghi nhận phí thi lại
* Hoàn phí
* Cấu hình phí

## Backend

* `payments`
* `refunds`
* `fee_configs`

## Frontend

* Payment list
* Create payment
* Student payment tab
* Refund screen
* Fee configuration screen

## API chính

```http
GET /payments
POST /payments
GET /students/{id}/payments
POST /payments/{id}/refund
GET /fee-configs
POST /fee-configs
PUT /fee-configs/{id}
```

## Kết quả bàn giao

* Kế toán ghi nhận được học phí.
* Học viên xem được học phí đã đóng và còn lại.
* Có thể hoàn phí.
* Có thể cấu hình các loại phí.

## Ưu tiên

High

---

# Phase 5: Booking & Scheduling

## Mục tiêu

Triển khai đặt lịch học và phân công lịch.

## Chức năng

* Học viên xem lịch trống
* Học viên đặt lịch
* Học viên xem lịch của mình
* Giáo vụ tiếp nhận booking
* Giáo vụ xác nhận booking
* Giáo vụ phân công giáo viên
* Giáo vụ phân công xe
* Giáo vụ phân công cabin nếu có
* Giáo vụ đổi lịch hoặc hủy lịch
* Ghi lịch sử thay đổi lịch

## Backend

* `bookings`
* `schedules`
* `schedule_change_logs`

## Frontend Admin

* Booking management
* Schedule calendar
* Schedule assignment

## Frontend Student

* Available schedule
* Booking confirmation
* My schedule

## API chính

```http
GET /bookings/available-slots
POST /bookings
GET /bookings
PUT /bookings/{id}/confirm
PUT /bookings/{id}/reject
GET /schedules
POST /schedules
PUT /schedules/{id}/assign-teacher
PUT /schedules/{id}/assign-vehicle
PUT /schedules/{id}/reschedule
DELETE /bookings/{id}
```

## Kết quả bàn giao

* Học viên đặt được lịch.
* Giáo vụ xử lý được lịch.
* Hệ thống chống trùng lịch giáo viên, xe, học viên.
* Lịch hiển thị trên calendar.

## Ưu tiên

High

---

# Phase 6: Training Session Management

## Mục tiêu

Triển khai ghi nhận buổi học thực tế.

## Chức năng

* Giáo viên xem lịch dạy
* Giáo viên bắt đầu buổi học
* Giáo viên kết thúc buổi học
* Ghi nhận 4H cơ bản
* Ghi nhận cabin
* Ghi nhận DAT
* Ghi nhận sa hình
* Upload ảnh DAT
* Tính tổng giờ học
* Tính tổng KM DAT
* Học viên đánh giá giáo viên

## Backend

* `training_sessions`
* `dat_session_details`
* `teacher_ratings`

## Frontend Teacher

* Teacher dashboard
* Teaching schedule
* Report training session
* DAT report

## Frontend Student

* Session detail
* Teacher rating
* Learning progress
* DAT progress

## API chính

```http
GET /teachers/me/schedules
POST /training-sessions
GET /training-sessions/{id}
PUT /training-sessions/{id}/start
PUT /training-sessions/{id}/finish
POST /training-sessions/{id}/dat-images
POST /teacher-ratings
GET /students/{id}/progress
GET /students/me/progress
```

## Kết quả bàn giao

* Giáo viên ghi nhận được buổi học.
* Học viên xem được tiến độ học.
* DAT tính được KM và thời gian.
* Học viên đánh giá được giáo viên.

## Ưu tiên

High

---

# Phase 7: Exam Management

## Mục tiêu

Triển khai thi tốt nghiệp, thi sát hạch và thi lại.

## Chức năng

* Tạo kỳ thi tốt nghiệp
* Lập danh sách thi tốt nghiệp
* Cập nhật kết quả thi tốt nghiệp
* Tạo kỳ thi sát hạch
* Lập danh sách thi sát hạch
* Cập nhật kết quả 4 phần thi sát hạch
* Học viên xem lịch thi
* Học viên xem kết quả thi
* Học viên đăng ký thi lại phần chưa đạt
* Ghi nhận phí thi lại

## Backend

* `exams`
* `exam_registrations`
* `exam_results`
* `exam_section_results`
* `retake_registrations`

## Frontend Admin

* Exam list
* Exam registration
* Exam result
* Retake registration

## Frontend Student

* Exam schedule
* Exam result
* Retake registration

## API chính

```http
GET /exams
POST /exams
GET /exams/{id}/registrations
POST /exams/{id}/registrations
POST /exam-results
PUT /exam-results/{id}
GET /students/{id}/exam-results
GET /students/me/exam-results
POST /retake-registrations
GET /retake-registrations
```

## Kết quả bàn giao

* Quản lý được kỳ thi.
* Nhập được kết quả thi.
* Học viên xem được kết quả.
* Học viên đăng ký thi lại được.

## Ưu tiên

High

---

# Phase 8: Teacher, Vehicle Usage & Fuel

## Mục tiêu

Triển khai nghiệp vụ giáo viên, xe, ODO và xăng.

## Chức năng

* Quản lý giáo viên
* Giáo viên điểm danh
* Giáo viên khai báo ODO đi
* Giáo viên khai báo ODO về
* Giáo viên upload hình tình trạng xe
* Giáo viên khai báo đổ xăng
* Kế toán xem dữ liệu xăng
* Quản lý xem lịch sử sử dụng xe

## Backend

* `employees`
* `teachers`
* `teacher_attendances`
* `vehicles`
* `vehicle_usages`
* `fuel_logs`

## Frontend Admin

* Teacher list
* Teacher detail
* Teacher attendance
* Vehicle list
* Vehicle detail
* Fuel logs

## Frontend Teacher

* Check in
* Vehicle usage
* Fuel report

## API chính

```http
GET /teachers
GET /teachers/{id}
GET /teacher-attendances
POST /teacher-attendances/check-in
POST /teacher-attendances/check-out
GET /vehicles
POST /vehicles
GET /vehicles/{id}
POST /vehicle-usages/start
POST /vehicle-usages/end
GET /fuel-logs
POST /fuel-logs
```

## Kết quả bàn giao

* Giáo viên điểm danh được.
* Xe ghi nhận được ODO đi/về.
* Hệ thống theo dõi được xăng.
* Quản lý xem được hoạt động xe.

## Ưu tiên

High

---

# Phase 9: Vehicle Documents & Maintenance

## Mục tiêu

Triển khai quản lý giấy tờ xe, bảo dưỡng và thay thế phụ tùng.

## Chức năng

* Quản lý giấy tờ xe
* Theo dõi ngày hết hạn giấy tờ
* Giáo viên gửi đề xuất bảo dưỡng
* Quản lý duyệt đề xuất bảo dưỡng
* Ghi nhận lịch sử bảo dưỡng
* Ghi nhận chi phí bảo dưỡng

## Backend

* `vehicle_documents`
* `maintenance_requests`
* `maintenance_records`

## Frontend Admin

* Vehicle documents
* Maintenance requests
* Maintenance records
* Vehicle report

## Frontend Teacher

* Maintenance request

## API chính

```http
GET /vehicles/{id}/documents
POST /vehicles/{id}/documents
PUT /vehicles/{id}/documents/{documentId}
GET /maintenance-requests
POST /maintenance-requests
PUT /maintenance-requests/{id}/approve
PUT /maintenance-requests/{id}/reject
GET /maintenance-records
POST /maintenance-records
```

## Kết quả bàn giao

* Quản lý được giấy tờ xe.
* Theo dõi được xe sắp hết hạn giấy tờ.
* Giáo viên gửi được đề xuất bảo dưỡng.
* Quản lý duyệt được bảo dưỡng.
* Ghi nhận được lịch sử bảo dưỡng.

## Ưu tiên

Medium

---

# Phase 10: HR & Leave Management

## Mục tiêu

Triển khai quản lý nhân sự và nghỉ phép.

## Chức năng

* Quản lý nhân viên
* Quản lý chức danh
* Quản lý khu vực
* Giáo viên gửi yêu cầu nghỉ phép
* Quản lý duyệt hoặc từ chối nghỉ phép
* Cấu hình quy tắc nghỉ phép

## Backend

* `employees`
* `areas`
* `leave_requests`
* `system_settings`

## Frontend Admin

* Employee list
* Employee detail
* Leave request management
* Area management

## Frontend Teacher

* Leave request

## API chính

```http
GET /employees
POST /employees
PUT /employees/{id}
GET /areas
POST /areas
GET /leave-requests
POST /leave-requests
PUT /leave-requests/{id}/approve
PUT /leave-requests/{id}/reject
GET /system-settings
PUT /system-settings/{id}
```

## Kết quả bàn giao

* Quản lý được nhân viên.
* Giáo viên gửi được nghỉ phép.
* Quản lý duyệt được nghỉ phép.
* Áp dụng được quy tắc nghỉ phép cơ bản.

## Ưu tiên

Medium

---

# Phase 11: Payroll

## Mục tiêu

Triển khai tính lương, gửi duyệt và duyệt lương.

## Chức năng

* Cấu hình quy tắc lương
* Tổng hợp giờ dạy
* Sinh bảng lương
* Xem chi tiết bảng lương
* Gửi duyệt lương
* Giám đốc duyệt hoặc từ chối lương

## Backend

* `salary_rules`
* `salary_calculations`
* `salary_items`
* `salary_approvals`

## Frontend Admin

* Salary dashboard
* Salary detail
* Salary rule configuration

## Frontend Director

* Salary approval

## API chính

```http
GET /salary-rules
POST /salary-rules
PUT /salary-rules/{id}
GET /salary-calculations
POST /salary-calculations/generate
GET /salary-calculations/{id}
PUT /salary-calculations/{id}/submit
PUT /salary-calculations/{id}/approve
PUT /salary-calculations/{id}/reject
```

## Kết quả bàn giao

* Hệ thống tính được lương cơ bản.
* Admin gửi duyệt được bảng lương.
* Giám đốc duyệt hoặc từ chối được bảng lương.

## Ưu tiên

Medium

---

# Phase 12: Notification

## Mục tiêu

Triển khai hệ thống thông báo nội bộ.

## Chức năng

* Tạo thông báo học phí
* Tạo thông báo lịch học
* Tạo thông báo lịch thi
* Tạo thông báo kết quả thi
* Tạo thông báo nghỉ phép
* Tạo thông báo bảo dưỡng
* Người dùng xem thông báo
* Đánh dấu đã đọc

## Backend

* `notifications`

## Frontend

* Notification center
* Notification icon
* Mobile notification screen

## API chính

```http
GET /notifications
PUT /notifications/{id}/read
POST /notifications
```

## Kết quả bàn giao

* Người dùng xem được thông báo.
* Hệ thống tạo được thông báo cho các sự kiện chính.

## Ưu tiên

Medium

---

# Phase 13: Reports & Dashboards

## Mục tiêu

Triển khai báo cáo và dashboard.

## Chức năng

* Báo cáo học viên
* Báo cáo doanh thu
* Báo cáo công nợ
* Báo cáo kết quả thi
* Báo cáo giáo viên
* Báo cáo xe
* Dashboard quản lý
* Dashboard giám đốc

## Backend

* Report queries
* Aggregation services
* Export nếu cần

## Frontend

* Student report
* Revenue report
* Exam report
* Teacher report
* Vehicle report
* Director dashboard

## API chính

```http
GET /reports/students
GET /reports/revenue
GET /reports/debts
GET /reports/exams
GET /reports/teachers
GET /reports/vehicles
GET /dashboard/admin
GET /dashboard/director
```

## Kết quả bàn giao

* Quản lý xem được báo cáo vận hành.
* Giám đốc xem được dashboard tổng quan.
* Kế toán xem được báo cáo doanh thu và công nợ.

## Ưu tiên

Medium

---

# Phase 14: Audit Log

## Mục tiêu

Triển khai audit log cho các thao tác quan trọng.

## Chức năng

* Ghi log tạo/sửa/xóa dữ liệu quan trọng
* Ghi log thay đổi học phí
* Ghi log cập nhật kết quả thi
* Ghi log điều chỉnh lịch học
* Ghi log duyệt lương
* Ghi log phân quyền
* Tra cứu audit log

## Backend

* `audit_logs`
* Audit interceptor/aspect
* Manual audit service cho nghiệp vụ quan trọng

## Frontend

* Audit log screen
* Audit tab trong student detail
* Audit filter

## API chính

```http
GET /audit-logs
GET /audit-logs?entityType=STUDENT&entityId={id}
```

## Kết quả bàn giao

* Có thể truy vết thao tác quan trọng.
* Admin tra cứu được lịch sử thay đổi.

## Ưu tiên

Medium

---

# 5. Milestone Đề Xuất

## Milestone 1: Nền Tảng Và Học Viên

Bao gồm:

* Phase 0
* Phase 1
* Phase 2
* Phase 3

Kết quả:

* Đăng nhập được.
* Phân quyền cơ bản.
* Quản lý học viên.
* Quản lý hồ sơ.
* Quản lý gói học.

---

## Milestone 2: Học Phí Và Đặt Lịch

Bao gồm:

* Phase 4
* Phase 5

Kết quả:

* Kế toán thu học phí.
* Học viên xem công nợ.
* Học viên đặt lịch.
* Giáo vụ xử lý lịch.

---

## Milestone 3: Đào Tạo Và Thi Cử

Bao gồm:

* Phase 6
* Phase 7

Kết quả:

* Giáo viên ghi nhận buổi học.
* Học viên xem tiến độ.
* Quản lý thi tốt nghiệp.
* Quản lý thi sát hạch.
* Đăng ký thi lại.

---

## Milestone 4: Giáo Viên, Xe Và Bảo Dưỡng

Bao gồm:

* Phase 8
* Phase 9
* Phase 10

Kết quả:

* Giáo viên điểm danh.
* Theo dõi xe, ODO, xăng.
* Quản lý giấy tờ xe.
* Quản lý bảo dưỡng.
* Quản lý nghỉ phép.

---

## Milestone 5: Lương, Báo Cáo Và Hoàn Thiện

Bao gồm:

* Phase 11
* Phase 12
* Phase 13
* Phase 14

Kết quả:

* Tính lương.
* Duyệt lương.
* Thông báo.
* Dashboard.
* Báo cáo.
* Audit log.

---

# 6. Thứ Tự Triển Khai Kỹ Thuật Đề Xuất

## 6.1 Backend

Thứ tự triển khai backend:

```text
1. Database migration
2. Base entity & audit fields
3. Authentication
4. RBAC
5. Student module
6. Course & enrollment module
7. Document module
8. Payment module
9. Booking module
10. Schedule module
11. Training session module
12. Exam module
13. Teacher module
14. Vehicle module
15. HR module
16. Payroll module
17. Notification module
18. Report module
19. Audit log
```

---

## 6.2 Frontend Admin

Thứ tự triển khai Web Admin:

```text
1. Login
2. Layout
3. Sidebar
4. Protected route
5. Student list
6. Student detail
7. Course package configuration
8. Student documents
9. Payment management
10. Booking management
11. Schedule calendar
12. Training session detail
13. Exam management
14. Teacher management
15. Vehicle management
16. Leave management
17. Payroll
18. Reports
19. Admin configuration
```

---

## 6.3 Student App

Thứ tự triển khai học viên:

```text
1. Login
2. Dashboard
3. Profile
4. Learning progress
5. Tuition
6. Available schedule
7. Booking confirmation
8. My schedule
9. Session detail
10. Teacher rating
11. Exam schedule
12. Exam result
13. Retake registration
14. Certificate status
15. Notifications
```

---

## 6.4 Teacher App/Web

Thứ tự triển khai giáo viên:

```text
1. Login
2. Teacher dashboard
3. Teaching schedule
4. Check in
5. Vehicle usage start
6. Report training session
7. DAT report
8. Vehicle usage end
9. Fuel report
10. Leave request
11. Maintenance request
```

---

# 7. Rủi Ro Triển Khai

## 7.1 Rủi Ro Requirement Chưa Rõ

Một số nghiệp vụ cần khách hàng xác nhận thêm:

* Quy tắc đặt lịch
* Quy tắc hủy lịch
* Điều kiện đủ để thi tốt nghiệp
* Điều kiện đủ để thi sát hạch
* Công thức tính lương
* Quy tắc tính hoa hồng kinh doanh
* Quy tắc nghỉ phép
* Quy trình bảo dưỡng xe
* Quy tắc thông báo

## 7.2 Rủi Ro Tích Hợp Ngoài

Hiện tại chưa đưa vào phạm vi mặc định:

* SMS
* Zalo
* Payment gateway
* DAT device integration
* Government system integration

Nếu cần tích hợp, phải tách thành phase riêng.

## 7.3 Rủi Ro Báo Cáo

Báo cáo thường phát sinh thêm sau khi khách hàng dùng thử.

Nên triển khai báo cáo cơ bản trước, sau đó bổ sung theo nhu cầu thực tế.

## 7.4 Rủi Ro Dữ Liệu

Các dữ liệu tài chính và kết quả thi cần audit log đầy đủ.

Không nên xóa vật lý các dữ liệu này.

---

# 8. Các Điểm Cần Xác Nhận Với Khách Hàng

## 8.1 Đặt Lịch

* Học viên được đặt trước bao nhiêu ngày?
* Có được hủy lịch không?
* Hủy trước bao nhiêu giờ?
* Có giới hạn số lịch đang giữ không?
* Giáo vụ có bắt buộc xác nhận lịch không?
* Lịch có cần tự động gán giáo viên/xe không?

## 8.2 Học Phí

* Học phí chia thành mấy đợt?
* Điều kiện nhắc học phí là gì?
* Có cho phép thanh toán dư không?
* Có cho phép hoàn phí một phần không?
* Phiếu thu có cần xuất file không?

## 8.3 Đào Tạo

* Điều kiện hoàn thành 4H cơ bản là gì?
* Điều kiện hoàn thành cabin là gì?
* DAT cần tối thiểu bao nhiêu KM?
* DAT cần tối thiểu bao nhiêu giờ?
* Sa hình tính theo giờ hay buổi?

## 8.4 Thi

* Điều kiện đủ thi tốt nghiệp là gì?
* Điều kiện đủ thi sát hạch là gì?
* Thi lại tính phí theo từng phần hay theo lượt?
* Học viên có được đăng ký thi lại trực tiếp không hay phải giáo vụ xác nhận?

## 8.5 Lương

* Công thức tính lương giáo viên cụ thể?
* Giờ ngày thường tính thế nào?
* Giờ cuối tuần tính thế nào?
* Giờ đêm tính thế nào?
* Giờ thi tính thế nào?
* Có phụ cấp hoặc thưởng không?

## 8.6 Xe

* Xe có gán cố định cho giáo viên không?
* Có bắt buộc chụp hình xe trước khi đi không?
* Có quy tắc cảnh báo hết hạn giấy tờ không?
* Bảo dưỡng có cần nhiều cấp duyệt không?

---

# 9. Definition of Done

Một chức năng được xem là hoàn thành khi:

* Database migration đã có.
* API đã triển khai.
* Validation đã có.
* Phân quyền đã áp dụng.
* Frontend gọi được API.
* Có xử lý loading, error, empty state.
* Có test dữ liệu cơ bản.
* Có audit log nếu là nghiệp vụ quan trọng.
* Có cập nhật tài liệu nếu thay đổi nghiệp vụ.

---

# 10. Ghi Chú

## 10.1 Không Nên Làm Báo Cáo Quá Sớm

Báo cáo phụ thuộc dữ liệu thực tế. Nếu làm báo cáo quá sớm, sau này dễ phải sửa.

Ưu tiên hoàn thiện dữ liệu nghiệp vụ trước.

---

## 10.2 Nên Demo Theo Luồng

Demo với khách hàng nên đi theo luồng:

```text
Tạo học viên
→ Thu học phí
→ Đặt lịch
→ Phân lịch
→ Ghi nhận buổi học
→ Cập nhật thi
→ Xem tiến độ
```

Không nên demo từng màn hình rời rạc.

---

## 10.3 Nên Khóa Scope Theo Milestone

Mỗi milestone nên có danh sách chức năng rõ ràng.

Các yêu cầu phát sinh nên đưa vào backlog hoặc phase sau để tránh ảnh hưởng tiến độ.
