# Screen Specification

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Mục Đích

Tài liệu này mô tả danh sách màn hình chính của hệ thống, bao gồm:

- Mục đích màn hình.
- Vai trò được truy cập.
- Thành phần hiển thị.
- Hành động người dùng.
- API liên quan.
- Quyền truy cập.
- Ghi chú nghiệp vụ.

---

# 2. Authentication Screens

## SCR-AUTH-001 Login

### Purpose

Cho phép người dùng đăng nhập hệ thống.

### Route

```text
/login
```

### Components

Fields:

- Username.
- Password.

Buttons:

- Đăng nhập.

### APIs

```http
POST /auth/login
```

---

## SCR-AUTH-002 Change Password

### Purpose

Cho phép người dùng đổi mật khẩu sau khi đăng nhập.

### Route

```text
/change-password
```

### APIs

```http
PUT /auth/change-password
```

---

## SCR-AUTH-003 Forgot Password

### Status

Not included in MVP.

### Note

Phiên bản đầu tiên chưa hỗ trợ quên mật khẩu tự động.

Người dùng cần liên hệ Admin để reset mật khẩu.

---

# 3. Admin Screens

## SCR-ADM-001 Admin Dashboard

### Purpose

Hiển thị tổng quan vận hành.

### APIs

```http
GET /dashboard/admin
GET /notifications
```

---

## SCR-ADM-002 Student List

### Purpose

Quản lý danh sách học viên.

### Components

Search fields:

- Mã học viên.
- Họ tên.
- Số điện thoại.
- Trạng thái.

Table columns:

- Mã học viên.
- Họ tên.
- Số điện thoại.
- Khóa học.
- Trạng thái.
- Thao tác.

### APIs

```http
GET /students
POST /students
```

---

## SCR-ADM-003 Student Detail

### Purpose

Hiển thị chi tiết học viên.

### Tabs

- Tổng quan.
- Hồ sơ.
- Khóa học.
- Học phí.
- Lịch học.
- Tiến độ học.
- Thi tốt nghiệp.
- Thi sát hạch.
- Nhận bằng.
- Audit log.

### APIs

```http
GET /students/{id}
GET /students/{id}/progress
GET /students/{id}/payments
GET /students/{id}/documents
GET /students/{id}/exam-results
GET /audit-logs?entityType=STUDENT&entityId={id}
```

---

## SCR-ADM-004 Student Documents

### Purpose

Quản lý hồ sơ học viên.

### Notes

- File optional.
- Ghi chú optional.
- Kinh doanh đánh dấu hồ sơ hoàn thiện thủ công.

### APIs

```http
GET /students/{id}/documents
POST /students/{id}/documents
PUT /students/{id}/documents/completion-status
```

---

## SCR-ADM-005 Payment List

### Purpose

Quản lý thanh toán.

### Actions

- Tạo thanh toán.
- Hoàn phí.
- In phiếu thu.
- Xuất PDF phiếu thu.

### APIs

```http
GET /payments
POST /payments
POST /payments/{id}/refund
GET /payments/{id}/receipt
GET /payments/{id}/receipt/pdf
```

---

## SCR-ADM-006 Schedule Management

### Purpose

Giáo vụ theo dõi và điều phối lịch học.

Lịch học viên đặt không cần giáo vụ xác nhận, nhưng giáo vụ có thể:

- Xem lịch.
- Phân công giáo viên.
- Phân công xe.
- Điều chỉnh lịch.
- Hủy lịch nếu có quyền.

### APIs

```http
GET /schedules
PUT /schedules/{id}/assign-teacher
PUT /schedules/{id}/assign-vehicle
PUT /schedules/{id}/reschedule
```

---

## SCR-ADM-007 Schedule Calendar

### Purpose

Hiển thị lịch học dạng ngày/tuần/tháng.

### APIs

```http
GET /schedules
GET /teachers
GET /vehicles
```

---

## SCR-ADM-008 Exam Management

### Purpose

Quản lý thi tốt nghiệp và thi sát hạch.

### APIs

```http
GET /exams
POST /exams
GET /exams/{id}/registrations
POST /exam-results
```

---

## SCR-ADM-009 Teacher Management

### Purpose

Quản lý giáo viên, lịch dạy, chấm công và đánh giá.

### APIs

```http
GET /teachers
GET /teachers/{id}
GET /teacher-attendances
GET /teachers/{id}/ratings/summary
```

---

## SCR-ADM-010 Vehicle Management

### Purpose

Quản lý xe, giấy tờ, nhiên liệu và bảo dưỡng.

### APIs

```http
GET /vehicles
GET /vehicles/{id}
GET /fuel-logs
GET /maintenance-requests
```

---

## SCR-ADM-011 Employee Management

### Purpose

Quản lý nhân viên.

### APIs

```http
GET /employees
POST /employees
PUT /employees/{id}
```

---

## SCR-ADM-012 Leave Request Management

### Purpose

Quản lý nghỉ phép.

### APIs

```http
GET /leave-requests
PUT /leave-requests/{id}/approve
PUT /leave-requests/{id}/reject
```

---

## SCR-ADM-013 Teaching Hour Summary

### Purpose

Quản lý bảng tổng hợp giờ dạy.

### Ghi chú

Phiên bản đầu tiên chỉ tổng hợp giờ dạy, chưa tính tiền lương tự động.

### APIs

```http
GET /teaching-hour-summaries
POST /teaching-hour-summaries/generate
PUT /teaching-hour-summaries/{id}/submit
PUT /teaching-hour-summaries/{id}/approve
PUT /teaching-hour-summaries/{id}/reject
```

---

## SCR-ADM-014 Configuration

### Purpose

Quản lý cấu hình hệ thống.

### Sections

- Gói học.
- Đợt thanh toán.
- Phí học thêm.
- Phí thi lại.
- Quy tắc nghỉ phép.
- Vai trò và phân quyền.
- Hướng dẫn thi sát hạch.

---

## SCR-ADM-015 Reports MVP

### Purpose

Báo cáo MVP.

### Reports

- Học viên đã hoàn thành khóa học.
- Kết quả thi sát hạch của tất cả học viên.
- Thông tin xe.
- Thông tin nhân viên.
- Lương hoặc bảng tổng hợp giờ dạy.

### Ghi chú

Không yêu cầu xuất Excel/PDF báo cáo trong MVP.

---

## SCR-ADM-016 Audit Logs

### Purpose

Tra cứu audit log.

---

# 4. Student Screens

## SCR-MOB-001 Student Dashboard

### Purpose

Hiển thị tổng quan thông tin học viên.

### Components

- Thông tin học viên.
- Tiến độ học.
- Lịch học sắp tới.
- Thông báo.

### APIs

```http
GET /students/me
GET /students/me/progress
GET /schedules/my-schedules
GET /notifications
```

---

## SCR-MOB-002 Learning Progress

### Purpose

Học viên theo dõi tiến độ học.

---

## SCR-MOB-003 Tuition

### Purpose

Học viên xem học phí, đã đóng và còn lại.

### APIs

```http
GET /students/me/payments
```

---

## SCR-MOB-004 Available Schedule

### Purpose

Học viên xem lịch trống và đặt lịch.

### APIs

```http
GET /schedules/available-slots
POST /schedules
```

---

## SCR-MOB-005 My Schedule

### Purpose

Học viên xem lịch của mình.

### Actions

- Xem chi tiết.
- Hủy lịch trước giờ bắt đầu.

### APIs

```http
GET /schedules/my-schedules
DELETE /schedules/{id}
```

---

## SCR-MOB-006 Session Detail

### Purpose

Học viên xem chi tiết buổi học.

### Actions

- Xác nhận buổi học sau khi giáo viên hoàn thành.
- Đánh giá giáo viên.

---

## SCR-MOB-007 Teacher Rating

### Purpose

Học viên đánh giá giáo viên sau buổi học.

---

## SCR-MOB-008 Exam Result

### Purpose

Học viên xem kết quả thi và đăng ký thi lại.

---

## SCR-MOB-009 Certificate Status

### Purpose

Học viên xem trạng thái nhận bằng.

---

## SCR-MOB-010 Notifications

### Purpose

Học viên xem thông báo trong ứng dụng.

---

# 5. Teacher Screens

## SCR-TEA-001 Teacher Dashboard

### Purpose

Giáo viên xem tổng quan công việc trong ngày.

---

## SCR-TEA-002 Teaching Schedule

### Purpose

Giáo viên xem lịch dạy hiện tại và tương lai.

---

## SCR-TEA-003 Check In / Vehicle Start

### Purpose

Giáo viên điểm danh và bắt đầu sử dụng xe.

### Validation

- Ảnh xe trước khi sử dụng là bắt buộc.
- ODO đi không bắt buộc.
- Nếu nhập ODO thì phải là số hợp lệ.

### APIs

```http
POST /teacher-attendances/check-in
POST /vehicle-usages/start
```

---

## SCR-TEA-004 Report Training Session

### Purpose

Giáo viên báo cáo buổi học.

### Validation

- Thời gian kết thúc phải lớn hơn thời gian bắt đầu.
- KM phải là số hợp lệ nếu có nhập.
- Ảnh DAT không bắt buộc.

### APIs

```http
PUT /training-sessions/{id}/start
PUT /training-sessions/{id}/teacher-complete
PUT /training-sessions/{id}/dat
POST /training-sessions/{id}/dat-images
```

---

## SCR-TEA-005 Fuel Report

### Purpose

Giáo viên khai báo đổ xăng.

---

## SCR-TEA-006 Leave Request

### Purpose

Giáo viên gửi yêu cầu nghỉ phép.

---

## SCR-TEA-007 Maintenance Request

### Purpose

Giáo viên gửi đề xuất bảo dưỡng xe.

---

# 6. Common Components

## CMP-001 Data Table

Có pagination, sorting, filtering, row actions.

## CMP-002 Search Filter

Có text input, select box, date range, reset và submit.

## CMP-003 Confirm Dialog

Dùng cho hành động quan trọng.

## CMP-004 File Upload

Dùng cho hồ sơ, giấy tờ xe, ảnh xe, ảnh DAT, hóa đơn xăng.

## CMP-005 Status Badge

Hiển thị trạng thái nghiệp vụ.
