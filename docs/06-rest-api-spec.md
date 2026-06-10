# REST API Specification

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Tổng Quan

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

Error chuẩn:

```json
{
  "success": false,
  "error_code": "VALIDATION_ERROR",
  "message": "Validation failed"
}
```

---

# 2. Authentication

## POST /auth/login

Đăng nhập hệ thống.

Request:

```json
{
  "username": "nguyenvana",
  "password": "0909000000"
}
```

---

## POST /auth/logout

Đăng xuất.

---

## POST /auth/refresh

Làm mới access token nếu hệ thống sử dụng refresh token.

---

## PUT /auth/change-password

Người dùng đổi mật khẩu sau khi đăng nhập.

Request:

```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

---

## POST /auth/forgot-password

Không thuộc MVP.

Trong phiên bản đầu tiên, người dùng liên hệ Admin để reset mật khẩu.

---

# 3. User, Role, Permission

## GET /users

Danh sách người dùng.

---

## POST /users

Tạo tài khoản người dùng.

Ghi chú:

- Admin có thể tạo mọi loại tài khoản.
- Kế toán có thể tạo tài khoản học viên nếu được phân quyền.

---

## PUT /users/{id}

Cập nhật tài khoản.

---

## PUT /users/{id}/reset-password

Admin reset mật khẩu cho người dùng.

Request:

```json
{
  "newPassword": "string"
}
```

---

## GET /roles

Danh sách vai trò.

---

## POST /roles

Tạo vai trò.

---

## PUT /roles/{id}/permissions

Cập nhật quyền của vai trò.

---

# 4. Student

## GET /students

Danh sách học viên.

Query:

```http
GET /students?page=1&size=20&keyword=phu&status=ACTIVE
```

---

## POST /students

Tạo học viên.

---

## GET /students/{id}

Chi tiết học viên.

---

## PUT /students/{id}

Cập nhật học viên.

---

## DELETE /students/{id}

Soft delete học viên.

---

## GET /students/{id}/progress

Tiến độ học tập của học viên.

---

## GET /students/me

Học viên xem thông tin của mình.

---

## GET /students/me/progress

Học viên xem tiến độ của mình.

---

# 5. Student Document

## GET /students/{id}/documents

Danh sách hồ sơ học viên.

---

## POST /students/{id}/documents

Tạo hồ sơ học viên.

Multipart hoặc JSON.

Ghi chú:

- `file` optional.
- `note` optional.
- Ít nhất một trong hai giá trị `file` hoặc `note` phải có.

---

## PUT /students/{id}/documents/{documentId}

Cập nhật hồ sơ.

---

## DELETE /students/{id}/documents/{documentId}

Soft delete hồ sơ.

---

## PUT /students/{id}/documents/completion-status

Kinh doanh đánh dấu hồ sơ hoàn thiện.

Request:

```json
{
  "completed": true,
  "note": "Đã kiểm tra hồ sơ"
}
```

---

# 6. Course & Enrollment

## GET /course-packages

Danh sách gói học.

---

## POST /course-packages

Tạo gói học.

---

## PUT /course-packages/{id}

Cập nhật gói học.

---

## POST /enrollments

Đăng ký khóa học cho học viên.

Request:

```json
{
  "studentId": "uuid",
  "coursePackageId": "uuid",
  "enrollmentDate": "2026-06-10"
}
```

---

## GET /students/{id}/enrollments

Danh sách khóa học của học viên.

---

## PUT /enrollments/{id}/cancel

Hủy đăng ký khóa học.

---

# 7. Payment

## GET /payments

Tra cứu thanh toán.

---

## POST /payments

Ghi nhận thanh toán.

Request:

```json
{
  "studentId": "uuid",
  "enrollmentId": "uuid",
  "amount": 1000000,
  "paymentType": "TUITION",
  "paymentMethod": "CASH",
  "paidAt": "2026-06-10T09:00:00",
  "note": "Đợt 1"
}
```

Ghi chú:

- Không cho thanh toán vượt công nợ.

---

## GET /students/{id}/payments

Lịch sử thanh toán của học viên.

---

## POST /payments/{id}/refund

Hoàn phí một phần hoặc toàn phần.

Request:

```json
{
  "amount": 500000,
  "reason": "Học viên hủy khóa"
}
```

---

## GET /payments/{id}/receipt

Xem phiếu thu.

---

## POST /payments/{id}/receipt

Sinh phiếu thu.

---

## GET /payments/{id}/receipt/pdf

Tải PDF phiếu thu.

---

# 8. Payment Plan & Fee Config

## GET /payment-plans

Danh sách cấu hình đợt thanh toán.

---

## POST /payment-plans

Tạo cấu hình đợt thanh toán.

---

## PUT /payment-plans/{id}

Cập nhật cấu hình đợt thanh toán.

---

## GET /fee-configs

Danh sách cấu hình phí.

---

## POST /fee-configs

Tạo cấu hình phí.

---

## PUT /fee-configs/{id}

Cập nhật cấu hình phí.

---

# 9. Schedule

## GET /schedules/available-slots

Học viên xem lịch trống.

Query:

```http
GET /schedules/available-slots?type=DAT&date=2026-06-01
```

---

## POST /schedules

Học viên đặt lịch.

Ghi chú:

- Không cần giáo vụ xác nhận.
- Hệ thống tạo lịch ngay nếu không xung đột.

Request:

```json
{
  "enrollmentId": "uuid",
  "scheduleType": "DAT",
  "scheduleDate": "2026-06-01",
  "startTime": "08:00",
  "endTime": "10:00"
}
```

---

## GET /schedules

Danh sách lịch.

---

## GET /schedules/{id}

Chi tiết lịch.

---

## DELETE /schedules/{id}

Học viên hủy lịch.

Chỉ được hủy trước giờ bắt đầu lịch.

---

## GET /schedules/my-schedules

Học viên xem lịch của mình.

---

## PUT /schedules/{id}/assign-teacher

Giáo vụ phân công giáo viên thủ công.

Request:

```json
{
  "teacherId": "uuid"
}
```

---

## PUT /schedules/{id}/assign-vehicle

Giáo vụ phân công xe thủ công.

Request:

```json
{
  "vehicleId": "uuid"
}
```

---

## PUT /schedules/{id}/reschedule

Giáo vụ hoặc người có quyền điều chỉnh lịch.

---

# 10. Training Session

## POST /training-sessions

Tạo buổi học thực tế từ lịch.

---

## GET /training-sessions/{id}

Chi tiết buổi học.

---

## PUT /training-sessions/{id}/start

Bắt đầu buổi học.

---

## PUT /training-sessions/{id}/teacher-complete

Giáo viên đánh dấu hoàn thành buổi học.

---

## PUT /training-sessions/{id}/student-confirm

Học viên xác nhận buổi học.

---

## PUT /training-sessions/{id}/complete

Hoàn tất buổi học sau khi đủ trạng thái cần thiết.

---

## PUT /training-sessions/{id}/dat

Ghi nhận dữ liệu DAT nhập tay.

Request:

```json
{
  "km": 20,
  "durationMinutes": 60,
  "note": "Học DAT buổi 1"
}
```

Ghi chú:

- Không tích hợp thiết bị DAT.
- Ảnh DAT không bắt buộc.

---

## POST /training-sessions/{id}/dat-images

Upload ảnh DAT nếu có.

Multipart:

- startImage optional.
- endImage optional.

---

# 11. Teacher Rating

## POST /teacher-ratings

Học viên đánh giá giáo viên.

Request:

```json
{
  "trainingSessionId": "uuid",
  "rating": 5,
  "comment": "Giáo viên hướng dẫn rõ ràng"
}
```

---

## GET /teachers/{id}/ratings/summary

Điểm đánh giá trung bình của giáo viên.

---

# 12. Examination

## GET /exams

Danh sách kỳ thi.

---

## POST /exams

Tạo kỳ thi.

---

## GET /exams/{id}/registrations

Danh sách học viên tham gia kỳ thi.

---

## POST /exams/{id}/registrations

Thêm học viên vào kỳ thi.

Ghi chú:

- Điều kiện đủ thi do Giáo vụ thi xác nhận thủ công.

---

## POST /exam-results

Nhập kết quả thi.

---

## PUT /exam-results/{id}

Cập nhật kết quả thi.

---

## GET /students/{id}/exam-results

Tra cứu kết quả thi của học viên.

---

## GET /students/me/exam-results

Học viên xem kết quả thi của mình.

---

## POST /retake-registrations

Đăng ký thi lại.

---

## GET /retake-registrations

Danh sách đăng ký thi lại.

---

# 13. Teacher & Attendance

## GET /teachers

Danh sách giáo viên.

---

## GET /teachers/{id}

Chi tiết giáo viên.

---

## GET /teachers/me/schedules

Giáo viên xem lịch dạy của mình.

---

## GET /teachers/me/statistics

Thống kê giờ dạy của giáo viên.

---

## POST /teacher-attendances/check-in

Giáo viên điểm danh.

---

## POST /teacher-attendances/check-out

Giáo viên kết thúc ngày làm việc.

---

# 14. Vehicle

## GET /vehicles

Danh sách xe.

---

## POST /vehicles

Tạo xe.

---

## GET /vehicles/{id}

Chi tiết xe.

---

## PUT /vehicles/{id}

Cập nhật xe.

---

## GET /vehicles/{id}/documents

Danh sách giấy tờ xe.

---

## POST /vehicles/{id}/documents

Thêm giấy tờ xe.

---

# 15. Vehicle Usage & Fuel

## POST /vehicle-usages/start

Giáo viên bắt đầu sử dụng xe.

Request:

```json
{
  "vehicleId": "uuid",
  "odoStart": 10000,
  "startImageUrl": "string"
}
```

Ghi chú:

- `startImageUrl` bắt buộc.
- `odoStart` optional.

---

## POST /vehicle-usages/end

Giáo viên kết thúc sử dụng xe.

Request:

```json
{
  "vehicleUsageId": "uuid",
  "odoEnd": 10050,
  "endImageUrl": "string"
}
```

Ghi chú:

- `odoEnd` optional.
- Nếu có `odoStart` và `odoEnd`, hệ thống kiểm tra `odoEnd >= odoStart`.

---

## GET /fuel-logs

Danh sách khai báo nhiên liệu.

---

## POST /fuel-logs

Khai báo đổ xăng.

---

# 16. Maintenance

## GET /maintenance-requests

Danh sách đề xuất bảo dưỡng.

---

## POST /maintenance-requests

Tạo đề xuất bảo dưỡng.

---

## PUT /maintenance-requests/{id}/approve

Duyệt đề xuất bảo dưỡng.

---

## PUT /maintenance-requests/{id}/reject

Từ chối đề xuất bảo dưỡng.

---

## GET /maintenance-records

Lịch sử bảo dưỡng.

---

## POST /maintenance-records

Ghi nhận bảo dưỡng.

---

# 17. Employee & Leave

## GET /employees

Danh sách nhân viên.

---

## POST /employees

Tạo nhân viên.

---

## PUT /employees/{id}

Cập nhật nhân viên.

---

## GET /leave-requests

Danh sách nghỉ phép.

---

## POST /leave-requests

Tạo yêu cầu nghỉ phép.

---

## PUT /leave-requests/{id}/approve

Duyệt nghỉ phép.

---

## PUT /leave-requests/{id}/reject

Từ chối nghỉ phép.

---

## GET /leave-policies

Xem cấu hình nghỉ phép.

---

## PUT /leave-policies/{id}

Cập nhật cấu hình nghỉ phép.

---

# 18. Teaching Hour Summary

## GET /teaching-hour-summaries

Danh sách bảng tổng hợp giờ dạy.

---

## POST /teaching-hour-summaries/generate

Sinh bảng tổng hợp giờ dạy theo tháng.

Request:

```json
{
  "month": 6,
  "year": 2026
}
```

---

## GET /teaching-hour-summaries/{id}

Chi tiết bảng tổng hợp giờ dạy.

---

## PUT /teaching-hour-summaries/{id}/submit

Gửi Giám đốc duyệt.

---

## PUT /teaching-hour-summaries/{id}/approve

Giám đốc duyệt.

---

## PUT /teaching-hour-summaries/{id}/reject

Giám đốc từ chối.

Request:

```json
{
  "reason": "string"
}
```

Ghi chú:

- MVP chỉ tổng hợp giờ.
- Chưa tính tiền lương tự động.

---

# 19. Notification

## GET /notifications

Danh sách thông báo của người dùng.

---

## PUT /notifications/{id}/read

Đánh dấu thông báo đã đọc.

---

## POST /notifications

Tạo thông báo nội bộ.

---

# 20. Reports MVP

## GET /reports/completed-students

Báo cáo học viên đã hoàn thành khóa học.

---

## GET /reports/license-exam-results

Báo cáo kết quả thi sát hạch của tất cả học viên.

---

## GET /reports/vehicles

Báo cáo thông tin xe.

---

## GET /reports/employees

Báo cáo thông tin nhân viên.

---

## GET /reports/teaching-hour-summaries

Báo cáo bảng tổng hợp giờ dạy/lương.

---

# 21. Audit Log

## GET /audit-logs

Tra cứu audit log.

Query:

```http
GET /audit-logs?entityType=STUDENT&entityId=uuid
```
