# REST API Specification

## Tổng Quan

Base URL:

```http
/api/v1
```

Authentication:

```http
Authorization: Bearer <access_token>
```

Response chuẩn:

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

Error:

```json
{
  "success": false,
  "error_code": "VALIDATION_ERROR",
  "message": "Phone already exists"
}
```

------

# Authentication

## POST /auth/login

Đăng nhập hệ thống.

Request:

```json
{
  "username": "nguyenvana",
  "password": "123456"
}
```

Response:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

------

## POST /auth/refresh

Làm mới access token.

------

## POST /auth/logout

Đăng xuất.

## PUT /auth/change-password

Người dùng đổi mật khẩu sau khi đăng nhập.

Request:

```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

## PUT /users/{id}/reset-password

Admin reset mật khẩu cho người dùng.

Request:

```json
{
  "newPassword": "string"
}
```

------

# Student

## GET /students

Danh sách học viên.

Filter:

```http
GET /students?page=1&size=20&keyword=phu
```

------

## POST /students

Tạo học viên.

------

## GET /students/{id}

Chi tiết học viên.

------

## PUT /students/{id}

Cập nhật học viên.

------

## GET /students/{id}/progress

Tiến độ học tập.

Response:

```json
{
  "basicHours": 4,
  "cabinHours": 2,
  "datKm": 450,
  "datRequiredKm": 810,
  "yardHours": 8
}
```

------

# Student Documents

## GET /students/{id}/documents

------

## POST /students/{id}/documents

Upload hồ sơ.

Multipart.

------

# Enrollment

## POST /enrollments

Tạo đăng ký khóa học.

------

## GET /enrollments/{id}

Chi tiết đăng ký.

------

## PUT /enrollments/{id}/status

Thay đổi trạng thái.

------

# Payment

## GET /payments

Tra cứu thanh toán.

------

## POST /payments

Thu học phí.

------

## POST /payments/{id}/refund

Hoàn học phí.

------

## GET /students/{id}/payments

Lịch sử thanh toán.

------

# Booking

## GET /bookings/available-slots

Xem lịch trống.

Ví dụ:

```http
GET /bookings/available-slots
?type=DAT
&date=2026-06-01
```

------

## POST /bookings

Đặt lịch học.

------

## GET /bookings/my-bookings

Học viên xem lịch đã đặt.

------

## DELETE /bookings/{id}

Hủy lịch.

------

# Schedule

## GET /schedules

Danh sách lịch.

------

## POST /schedules

Giáo vụ xác nhận lịch.

------

## PUT /schedules/{id}/assign-teacher

Phân giáo viên.

------

## PUT /schedules/{id}/assign-vehicle

Phân xe.

------

## PUT /schedules/{id}/reschedule

Đổi lịch.

------

# Training Session

## POST /training-sessions

Tạo buổi học thực tế.

------

## GET /training-sessions/{id}

Chi tiết buổi học.

------

## PUT /training-sessions/{id}/start

Bắt đầu buổi học.

------

## PUT /training-sessions/{id}/finish

Kết thúc buổi học.

------

# DAT Session

## POST /training-sessions/{id}/dat

Ghi nhận DAT.

Request:

```json
{
  "startKm": 100,
  "endKm": 130
}
```

------

## POST /training-sessions/{id}/dat-images

Upload ảnh DAT.

------

# Teacher Rating

## POST /teacher-ratings

Đánh giá giáo viên.

Request:

```json
{
  "sessionId": "...",
  "rating": 5,
  "comment": "Rất nhiệt tình"
}
```

------

# Examination

## GET /exams

Danh sách kỳ thi.

------

## POST /exams

Tạo kỳ thi.

------

## POST /exams/{id}/registrations

Đăng ký học viên.

------

## GET /exams/{id}/registrations

Danh sách dự thi.

------

# Exam Result

## POST /exam-results

Nhập kết quả thi.

------

## GET /students/{id}/exam-results

Tra cứu kết quả.

------

# Retake

## POST /retake-registrations

Đăng ký thi lại.

------

## GET /retake-registrations

Danh sách thi lại.

------

# Teacher

## GET /teachers

Danh sách giáo viên.

------

## GET /teachers/{id}/schedules

Lịch dạy.

------

## GET /teachers/{id}/statistics

Thống kê giờ dạy.

------

# Attendance

## POST /teacher-attendances/check-in

Điểm danh.

------

## POST /teacher-attendances/check-out

Kết thúc ngày làm việc.

------

# Leave Request

## POST /leave-requests

Tạo đơn nghỉ phép.

------

## GET /leave-requests

Danh sách đơn.

------

## PUT /leave-requests/{id}/approve

Duyệt nghỉ phép.

------

## PUT /leave-requests/{id}/reject

Từ chối nghỉ phép.

------

# Vehicle

## GET /vehicles

Danh sách xe.

------

## POST /vehicles

Tạo xe.

------

## GET /vehicles/{id}

Chi tiết xe.

------

## PUT /vehicles/{id}

Cập nhật xe.

------

# Vehicle Usage

## POST /vehicle-usages/start

Khai báo ODO đi.

------

## POST /vehicle-usages/end

Khai báo ODO về.

------

# Fuel

## POST /fuel-logs

Khai báo đổ xăng.

Multipart:

- image
- liters

------

# Maintenance

## POST /maintenance-requests

Tạo yêu cầu bảo dưỡng.

------

## PUT /maintenance-requests/{id}/approve

Duyệt bảo dưỡng.

------

## POST /maintenance-records

Ghi nhận bảo dưỡng.

------

# Employee

## GET /employees

Danh sách nhân viên.

------

## POST /employees

Tạo nhân viên.

------

## PUT /employees/{id}

Cập nhật nhân viên.

------

# Salary

## GET /salary-calculations

Danh sách bảng lương.

------

## POST /salary-calculations/generate

Sinh bảng lương.

------

## GET /salary-calculations/{id}

Chi tiết lương.

------

## PUT /salary-calculations/{id}/submit

Gửi duyệt.

------

## PUT /salary-calculations/{id}/approve

Duyệt lương.

------

# Notification

## GET /notifications

Danh sách thông báo.

------

## PUT /notifications/{id}/read

Đánh dấu đã đọc.

------

# Dashboard

## GET /dashboard/admin

Dashboard quản trị.

------

## GET /dashboard/director

Dashboard giám đốc.

------

# Audit Log

## GET /audit-logs

Tra cứu lịch sử thao tác.

Filter:

```http
GET /audit-logs
?entityType=STUDENT
&entityId=xxx
```

------

# Configuration

## GET /course-packages

------

## POST /course-packages

------

## PUT /course-packages/{id}

------

## GET /fee-configs

------

## PUT /fee-configs/{id}

------

## GET /system-settings

------

## PUT /system-settings/{id}