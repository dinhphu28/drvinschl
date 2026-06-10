# Screen Specification

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0
Status: Draft

---

# 1. Mục Đích

Tài liệu này mô tả danh sách màn hình chính của hệ thống, bao gồm:

* Mục đích màn hình
* Vai trò được truy cập
* Thành phần hiển thị
* Hành động người dùng
* API liên quan
* Quyền truy cập
* Ghi chú nghiệp vụ

Tài liệu này dùng cho:

* Frontend triển khai giao diện
* Backend đối chiếu API cần cung cấp
* QA viết test scenario
* AI Agent sinh UI component
* Khách hàng review luồng thao tác

---

# 2. Quy Ước Chung

## 2.1 Screen ID

Quy ước đặt mã màn hình:

```text
SCR-ADM-xxx: Màn hình Web Admin
SCR-MOB-xxx: Màn hình Mobile/Học viên
SCR-AUTH-xxx: Màn hình xác thực
SCR-RPT-xxx: Màn hình báo cáo
```

---

## 2.2 Layout Chung Web Admin

Web Admin gồm:

* Sidebar menu
* Header
* Breadcrumb
* Content area
* Notification icon
* User profile menu

---

## 2.3 Layout Chung Mobile Học Viên

Mobile học viên gồm:

* Bottom navigation
* Dashboard
* Progress tabs
* Notification screen
* Profile screen

---

# 3. Navigation Tổng Thể

## 3.1 Admin Navigation

```text
Login
↓
Admin Dashboard
↓
Student Management
↓
Booking Management
↓
Schedule Management
↓
Training Management
↓
Exam Management
↓
Teacher Management
↓
Vehicle Management
↓
Employee Management
↓
Payroll Management
↓
Reports
↓
System Configuration
```

---

## 3.2 Student Navigation

```text
Login
↓
Student Dashboard
↓
Learning Progress
↓
Book Schedule
↓
My Schedule
↓
Session Detail
↓
Rate Teacher
↓
Exam Schedule
↓
Exam Result
↓
Certificate Status
```

---

# 4. Authentication Screens

## SCR-AUTH-001 Login

### Purpose

Cho phép người dùng đăng nhập hệ thống.

### Actors

* Học viên
* Kinh doanh
* Kế toán
* Giáo vụ
* Giáo viên
* Quản lý khu vực
* Quản trị hệ thống
* Giám đốc

### Route

```text
/login
```

### Components

#### Login Form

Fields:

* Username
* Password

Buttons:

* Đăng nhập
* Quên mật khẩu

### Actions

#### Login

API:

```http
POST /auth/login
```

Request:

```json
{
  "username": "string",
  "password": "string"
}
```

### Validation

* Username bắt buộc.
* Password bắt buộc.
* Nếu sai tài khoản hoặc mật khẩu, hiển thị lỗi.

### Permissions

Public.

---

## SCR-AUTH-002 Forgot Password

### Purpose

Cho phép người dùng yêu cầu đặt lại mật khẩu.

### Route

```text
/forgot-password
```

### Components

Fields:

* Username hoặc số điện thoại

Buttons:

* Gửi yêu cầu
* Quay lại đăng nhập

### Actions

API:

```http
POST /auth/forgot-password
```

### Validation

* Username hoặc số điện thoại bắt buộc.

---

# 5. Web Admin Screens

# 5.1 Dashboard

## SCR-ADM-001 Admin Dashboard

### Purpose

Hiển thị tổng quan vận hành hệ thống.

### Actors

* Quản trị hệ thống
* Quản lý khu vực
* Giám đốc

### Route

```text
/admin/dashboard
```

### Components

#### Summary Cards

Hiển thị:

* Tổng học viên
* Học viên đang học
* Học viên hoàn thành
* Lịch học hôm nay
* Lịch thi sắp tới
* Xe đang hoạt động
* Đơn nghỉ phép chờ duyệt
* Lương chờ duyệt

#### Charts

* Doanh thu theo tháng
* Kết quả thi
* Số lượng học viên theo trạng thái

#### Recent Activities

Hiển thị các thao tác gần đây.

### APIs

```http
GET /dashboard/admin
GET /notifications
```

### Permissions

* ROLE_ADMIN
* ROLE_AREA_MANAGER
* ROLE_DIRECTOR

---

# 5.2 Student Management

## SCR-ADM-002 Student List

### Purpose

Quản lý danh sách học viên.

### Actors

* Kinh doanh
* Kế toán
* Giáo vụ
* Quản trị hệ thống

### Route

```text
/admin/students
```

### Components

#### Search Area

Fields:

* Mã học viên
* Họ tên
* Số điện thoại
* Khóa học
* Trạng thái

Buttons:

* Tìm kiếm
* Làm mới
* Tạo học viên

#### Data Table

Columns:

* Mã học viên
* Họ tên
* Số điện thoại
* Khóa học
* Trạng thái hồ sơ
* Trạng thái học phí
* Tiến độ học
* Trạng thái học viên
* Thao tác

Actions:

* Xem chi tiết
* Cập nhật
* Xem học phí
* Xem tiến độ

### APIs

```http
GET /students
POST /students
GET /course-packages
```

### Permissions

* ROLE_SALES
* ROLE_ACCOUNTANT
* ROLE_EDUCATION_STAFF
* ROLE_ADMIN

---

## SCR-ADM-003 Student Detail

### Purpose

Hiển thị chi tiết hồ sơ học viên.

### Route

```text
/admin/students/{id}
```

### Components

#### Student Profile

Hiển thị:

* Mã học viên
* Họ tên
* Ngày sinh
* Số điện thoại
* Địa chỉ
* Khóa học
* Ngày khai giảng
* Ngày bế giảng
* Ngày thanh lý hồ sơ
* Trạng thái

#### Tabs

* Tổng quan
* Hồ sơ
* Học phí
* Lịch học
* Tiến độ học
* Thi tốt nghiệp
* Thi sát hạch
* Nhận bằng
* Audit log

### APIs

```http
GET /students/{id}
GET /students/{id}/progress
GET /students/{id}/payments
GET /students/{id}/documents
GET /students/{id}/exam-results
GET /audit-logs?entityType=STUDENT&entityId={id}
```

### Permissions

* ROLE_SALES
* ROLE_ACCOUNTANT
* ROLE_EDUCATION_STAFF
* ROLE_EXAM_STAFF
* ROLE_ADMIN

---

## SCR-ADM-004 Create/Edit Student

### Purpose

Tạo mới hoặc cập nhật học viên.

### Route

```text
/admin/students/new
/admin/students/{id}/edit
```

### Components

#### Student Form

Fields:

* Họ tên
* Ngày sinh
* Số điện thoại
* Địa chỉ
* Gói học
* Ngày khai giảng
* Ghi chú

Buttons:

* Lưu
* Hủy

### APIs

```http
POST /students
PUT /students/{id}
GET /course-packages
```

### Validation

* Họ tên bắt buộc.
* Số điện thoại bắt buộc.
* Số điện thoại không được trùng.
* Gói học bắt buộc.

### Permissions

* ROLE_SALES
* ROLE_ACCOUNTANT
* ROLE_ADMIN

---

## SCR-ADM-005 Student Documents

### Purpose

Quản lý hồ sơ giấy tờ của học viên.

### Route

```text
/admin/students/{id}/documents
```

### Components

#### Document List

Columns:

* Loại hồ sơ
* File
* Ngày upload
* Trạng thái
* Người upload
* Thao tác

Document types:

* Đơn học lái xe
* Hình học viên
* Giấy khám sức khỏe
* Hợp đồng
* Hồ sơ thanh lý

Actions:

* Upload
* Xem file
* Xóa file
* Đánh dấu hoàn thiện

### APIs

```http
GET /students/{id}/documents
POST /students/{id}/documents
DELETE /students/{id}/documents/{documentId}
```

### Permissions

* ROLE_SALES
* ROLE_ACCOUNTANT
* ROLE_EDUCATION_STAFF
* ROLE_ADMIN

---

# 5.3 Payment Management

## SCR-ADM-006 Payment List

### Purpose

Tra cứu và quản lý thanh toán học viên.

### Route

```text
/admin/payments
```

### Components

#### Filter

Fields:

* Học viên
* Mã học viên
* Loại thanh toán
* Phương thức thanh toán
* Từ ngày
* Đến ngày

#### Table

Columns:

* Mã giao dịch
* Học viên
* Loại phí
* Số tiền
* Phương thức
* Ngày thanh toán
* Người ghi nhận
* Thao tác

Actions:

* Xem chi tiết
* Hoàn phí

### APIs

```http
GET /payments
POST /payments
POST /payments/{id}/refund
```

### Permissions

* ROLE_ACCOUNTANT
* ROLE_ADMIN

---

## SCR-ADM-007 Create Payment

### Purpose

Ghi nhận khoản thanh toán của học viên.

### Route

```text
/admin/payments/new
```

### Components

Fields:

* Học viên
* Loại thanh toán
* Số tiền
* Phương thức thanh toán
* Ngày thanh toán
* Ghi chú

Payment types:

* Học phí lần 1
* Học phí lần 2
* Học phí cuối
* Học thêm
* Thi lại

Buttons:

* Lưu thanh toán
* Hủy

### APIs

```http
POST /payments
GET /students
```

### Validation

* Học viên bắt buộc.
* Loại thanh toán bắt buộc.
* Số tiền phải lớn hơn 0.
* Ngày thanh toán bắt buộc.

### Permissions

* ROLE_ACCOUNTANT

---

## SCR-ADM-008 Refund Payment

### Purpose

Ghi nhận hoàn phí.

### Route

```text
/admin/payments/{id}/refund
```

### Components

Fields:

* Số tiền hoàn
* Lý do hoàn
* Ngày hoàn

Buttons:

* Xác nhận hoàn phí
* Hủy

### APIs

```http
POST /payments/{id}/refund
```

### Validation

* Số tiền hoàn phải lớn hơn 0.
* Số tiền hoàn không được lớn hơn số tiền đã thanh toán.
* Lý do hoàn bắt buộc.

### Permissions

* ROLE_ACCOUNTANT
* ROLE_ADMIN

---

# 5.4 Booking & Schedule Management

## SCR-ADM-009 Booking Management

### Purpose

Giáo vụ tiếp nhận và xử lý lịch học viên đã đặt.

### Route

```text
/admin/bookings
```

### Components

#### Filter

Fields:

* Học viên
* Loại lịch
* Ngày học
* Trạng thái

#### Table

Columns:

* Học viên
* Loại lịch
* Ngày học
* Giờ bắt đầu
* Giờ kết thúc
* Trạng thái
* Thao tác

Actions:

* Xem chi tiết
* Xác nhận
* Từ chối
* Phân lịch

### APIs

```http
GET /bookings
PUT /bookings/{id}/confirm
PUT /bookings/{id}/reject
```

### Permissions

* ROLE_EDUCATION_STAFF
* ROLE_ADMIN

---

## SCR-ADM-010 Schedule Calendar

### Purpose

Hiển thị lịch học theo dạng lịch ngày/tuần/tháng.

### Route

```text
/admin/schedules/calendar
```

### Components

#### Calendar View

Views:

* Day
* Week
* Month

Filters:

* Loại lịch
* Giáo viên
* Xe
* Cabin
* Khu vực

Event Information:

* Học viên
* Giáo viên
* Xe
* Loại buổi học
* Trạng thái

### APIs

```http
GET /schedules
GET /teachers
GET /vehicles
```

### Permissions

* ROLE_EDUCATION_STAFF
* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-011 Schedule Assignment

### Purpose

Phân công giáo viên, xe hoặc cabin cho lịch học.

### Route

```text
/admin/schedules/{id}/assignment
```

### Components

Fields:

* Học viên
* Loại lịch
* Ngày học
* Giờ học
* Giáo viên
* Xe
* Cabin
* Ghi chú

Buttons:

* Lưu phân công
* Đổi lịch
* Hủy lịch

### APIs

```http
GET /schedules/{id}
PUT /schedules/{id}/assign-teacher
PUT /schedules/{id}/assign-vehicle
PUT /schedules/{id}/reschedule
```

### Validation

* Một giáo viên không được có hai lịch trùng thời gian.
* Một xe không được có hai lịch trùng thời gian.
* Cabin chỉ áp dụng cho lịch học cabin.
* Xe chỉ áp dụng cho lịch thực hành.

### Permissions

* ROLE_EDUCATION_STAFF
* ROLE_ADMIN

---

# 5.5 Training Management

## SCR-ADM-012 Training Session Detail

### Purpose

Hiển thị chi tiết buổi học thực tế.

### Route

```text
/admin/training-sessions/{id}
```

### Components

#### Session Information

* Học viên
* Giáo viên
* Xe
* Loại buổi học
* Thời gian bắt đầu
* Thời gian kết thúc
* Thời lượng
* Trạng thái

#### DAT Information

Nếu là buổi DAT, hiển thị:

* KM bắt đầu
* KM kết thúc
* Tổng KM
* Ảnh DAT bắt đầu
* Ảnh DAT kết thúc

#### Rating

* Số sao
* Nhận xét của học viên

### APIs

```http
GET /training-sessions/{id}
GET /teacher-ratings?trainingSessionId={id}
```

### Permissions

* ROLE_EDUCATION_STAFF
* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-013 Training Progress

### Purpose

Theo dõi tiến độ đào tạo của học viên.

### Route

```text
/admin/students/{id}/progress
```

### Components

Progress sections:

* Hồ sơ
* Học phí
* Lý thuyết
* Mô phỏng
* 4H cơ bản
* Cabin
* DAT
* Sa hình
* Thi tốt nghiệp
* Thi sát hạch
* Nhận bằng

### APIs

```http
GET /students/{id}/progress
GET /training-sessions?studentId={id}
```

### Permissions

* ROLE_EDUCATION_STAFF
* ROLE_EXAM_STAFF
* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

# 5.6 Exam Management

## SCR-ADM-014 Exam List

### Purpose

Quản lý kỳ thi tốt nghiệp và sát hạch.

### Route

```text
/admin/exams
```

### Components

#### Filter

Fields:

* Loại kỳ thi
* Ngày thi
* Trạng thái

#### Table

Columns:

* Loại kỳ thi
* Ngày thi
* Địa điểm
* Số học viên
* Trạng thái
* Thao tác

Actions:

* Tạo kỳ thi
* Xem danh sách học viên
* Cập nhật kết quả

### APIs

```http
GET /exams
POST /exams
```

### Permissions

* ROLE_EXAM_STAFF
* ROLE_ADMIN

---

## SCR-ADM-015 Exam Registration

### Purpose

Quản lý danh sách học viên tham gia kỳ thi.

### Route

```text
/admin/exams/{id}/registrations
```

### Components

#### Student List

Columns:

* Mã học viên
* Họ tên
* Số điện thoại
* Trạng thái đủ điều kiện
* Trạng thái đăng ký
* Kết quả

Actions:

* Thêm học viên
* Xóa khỏi danh sách
* Cập nhật kết quả

### APIs

```http
GET /exams/{id}/registrations
POST /exams/{id}/registrations
DELETE /exams/{id}/registrations/{registrationId}
```

### Permissions

* ROLE_EXAM_STAFF
* ROLE_ADMIN

---

## SCR-ADM-016 Exam Result

### Purpose

Cập nhật kết quả thi.

### Route

```text
/admin/exams/{id}/results
```

### Components

Fields:

* Học viên
* Kết quả tổng
* Lý thuyết
* Mô phỏng
* Sa hình
* Đường trường
* Ghi chú

Buttons:

* Lưu kết quả
* Hủy

### APIs

```http
POST /exam-results
PUT /exam-results/{id}
```

### Validation

* Kết quả tổng bắt buộc.
* Với thi sát hạch, phải có kết quả từng phần.
* Kết quả không đạt phải xác định phần thi không đạt.

### Permissions

* ROLE_EXAM_STAFF
* ROLE_ADMIN

---

## SCR-ADM-017 Retake Registration

### Purpose

Quản lý học viên đăng ký thi lại.

### Route

```text
/admin/retake-registrations
```

### Components

Columns:

* Học viên
* Phần thi lại
* Phí thi lại
* Trạng thái thanh toán
* Trạng thái đăng ký
* Thao tác

Actions:

* Xác nhận đăng ký
* Ghi nhận phí
* Hủy đăng ký

### APIs

```http
GET /retake-registrations
POST /retake-registrations
POST /payments
```

### Permissions

* ROLE_EXAM_STAFF
* ROLE_ACCOUNTANT
* ROLE_ADMIN

---

# 5.7 Teacher Management

## SCR-ADM-018 Teacher List

### Purpose

Quản lý danh sách giáo viên.

### Route

```text
/admin/teachers
```

### Components

Filter:

* Mã giáo viên
* Họ tên
* Số điện thoại
* Khu vực
* Trạng thái

Table columns:

* Mã giáo viên
* Họ tên
* Số điện thoại
* Khu vực
* Xe phụ trách
* Trạng thái
* Thao tác

### APIs

```http
GET /teachers
POST /teachers
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-019 Teacher Detail

### Purpose

Hiển thị thông tin chi tiết giáo viên.

### Route

```text
/admin/teachers/{id}
```

### Components

Tabs:

* Thông tin cá nhân
* Lịch dạy
* Chấm công
* Giờ dạy
* Đánh giá
* Nghỉ phép
* Xe phụ trách
* Lương

### APIs

```http
GET /teachers/{id}
GET /teachers/{id}/schedules
GET /teachers/{id}/statistics
GET /leave-requests?teacherId={id}
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-020 Teacher Attendance

### Purpose

Theo dõi chấm công giáo viên.

### Route

```text
/admin/teacher-attendances
```

### Components

Filter:

* Giáo viên
* Ngày
* Trạng thái

Table columns:

* Giáo viên
* Ngày
* Check-in
* Check-out
* Trạng thái
* Ghi chú

### APIs

```http
GET /teacher-attendances
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-021 Leave Request Management

### Purpose

Quản lý và phê duyệt nghỉ phép.

### Route

```text
/admin/leave-requests
```

### Components

Table columns:

* Nhân viên
* Ngày nghỉ
* Lý do
* Trạng thái
* Người duyệt
* Thời gian duyệt
* Thao tác

Actions:

* Duyệt
* Từ chối
* Xem chi tiết

### APIs

```http
GET /leave-requests
PUT /leave-requests/{id}/approve
PUT /leave-requests/{id}/reject
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

# 5.8 Vehicle Management

## SCR-ADM-022 Vehicle List

### Purpose

Quản lý danh sách xe.

### Route

```text
/admin/vehicles
```

### Components

Filter:

* Biển số
* Trạng thái
* Khu vực
* Giáo viên phụ trách

Table columns:

* Biển số
* Dòng xe
* Trạng thái
* Giáo viên phụ trách
* Hạn đăng kiểm
* Hạn bảo hiểm
* Tổng KM tháng
* Tổng xăng tháng
* Thao tác

### APIs

```http
GET /vehicles
POST /vehicles
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-023 Vehicle Detail

### Purpose

Hiển thị chi tiết xe.

### Route

```text
/admin/vehicles/{id}
```

### Components

Tabs:

* Thông tin xe
* Giấy tờ xe
* ODO
* Lịch sử sử dụng
* Xăng
* Bảo dưỡng
* Đề xuất bảo dưỡng

### APIs

```http
GET /vehicles/{id}
GET /vehicles/{id}/documents
GET /vehicle-usages?vehicleId={id}
GET /fuel-logs?vehicleId={id}
GET /maintenance-records?vehicleId={id}
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-ADM-024 Vehicle Documents

### Purpose

Quản lý giấy tờ xe.

### Route

```text
/admin/vehicles/{id}/documents
```

### Components

Document types:

* Đăng kiểm
* Giấy phép tập lái
* Bảo hiểm
* Biên bản thế chấp
* Chủ quyền xe

Fields:

* Loại giấy tờ
* Ngày hết hạn
* File đính kèm

### APIs

```http
GET /vehicles/{id}/documents
POST /vehicles/{id}/documents
PUT /vehicles/{id}/documents/{documentId}
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-025 Fuel Logs

### Purpose

Theo dõi lịch sử đổ xăng.

### Route

```text
/admin/fuel-logs
```

### Components

Filter:

* Xe
* Giáo viên
* Từ ngày
* Đến ngày

Table columns:

* Xe
* Giáo viên
* Số lít
* Số tiền
* Hóa đơn
* Ngày đổ

### APIs

```http
GET /fuel-logs
```

### Permissions

* ROLE_ACCOUNTANT
* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

## SCR-ADM-026 Maintenance Request

### Purpose

Quản lý đề xuất bảo dưỡng xe.

### Route

```text
/admin/maintenance-requests
```

### Components

Table columns:

* Xe
* Người đề xuất
* Nội dung
* Trạng thái
* Người duyệt
* Thời gian duyệt
* Thao tác

Actions:

* Duyệt
* Từ chối
* Tạo lịch sử bảo dưỡng

### APIs

```http
GET /maintenance-requests
PUT /maintenance-requests/{id}/approve
PUT /maintenance-requests/{id}/reject
POST /maintenance-records
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN

---

# 5.9 Employee & Payroll

## SCR-ADM-027 Employee List

### Purpose

Quản lý danh sách nhân viên.

### Route

```text
/admin/employees
```

### Components

Filter:

* Mã nhân viên
* Họ tên
* Chức danh
* Khu vực
* Trạng thái

Table columns:

* Mã nhân viên
* Họ tên
* Số điện thoại
* Chức danh
* Khu vực
* Trạng thái
* Thao tác

### APIs

```http
GET /employees
POST /employees
```

### Permissions

* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-ADM-028 Salary Dashboard

### Purpose

Quản lý bảng lương theo tháng.

### Route

```text
/admin/salaries
```

### Components

Filter:

* Tháng
* Năm
* Nhân viên
* Trạng thái

Summary:

* Tổng số nhân viên
* Tổng lương
* Số bảng lương chờ duyệt
* Số bảng lương đã duyệt

Table columns:

* Nhân viên
* Tháng
* Năm
* Tổng giờ
* Tổng lương
* Trạng thái
* Thao tác

Actions:

* Sinh bảng lương
* Xem chi tiết
* Gửi duyệt

### APIs

```http
GET /salary-calculations
POST /salary-calculations/generate
PUT /salary-calculations/{id}/submit
```

### Permissions

* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-ADM-029 Salary Detail

### Purpose

Xem chi tiết bảng lương nhân viên.

### Route

```text
/admin/salaries/{id}
```

### Components

Sections:

* Thông tin nhân viên
* Kỳ lương
* Chi tiết giờ dạy
* Chi tiết phụ cấp
* Tổng tiền
* Lịch sử duyệt

Actions:

* Gửi duyệt
* Duyệt
* Từ chối

### APIs

```http
GET /salary-calculations/{id}
PUT /salary-calculations/{id}/submit
PUT /salary-calculations/{id}/approve
PUT /salary-calculations/{id}/reject
```

### Permissions

* ROLE_ADMIN
* ROLE_DIRECTOR

---

# 5.10 Configuration

## SCR-ADM-030 Course Package Configuration

### Purpose

Cấu hình gói học.

### Route

```text
/admin/config/course-packages
```

### Components

Table columns:

* Mã gói
* Tên gói
* Giá
* Giờ thực hành
* Giờ cabin
* KM DAT yêu cầu
* Giờ sa hình
* Trạng thái
* Thao tác

Actions:

* Tạo gói
* Cập nhật
* Vô hiệu hóa

### APIs

```http
GET /course-packages
POST /course-packages
PUT /course-packages/{id}
```

### Permissions

* ROLE_ADMIN

---

## SCR-ADM-031 Fee Configuration

### Purpose

Cấu hình các loại phí.

### Route

```text
/admin/config/fees
```

### Components

Fee types:

* Học thêm đường trường
* Học thêm sa hình
* Sa hình cảm ứng tập/thi
* Thi lại lý thuyết
* Thi lại mô phỏng
* Thi lại sa hình
* Thi lại đường trường

### APIs

```http
GET /fee-configs
POST /fee-configs
PUT /fee-configs/{id}
```

### Permissions

* ROLE_ADMIN

---

## SCR-ADM-032 User Management

### Purpose

Quản lý tài khoản người dùng.

### Route

```text
/admin/users
```

### Components

Table columns:

* Username
* Họ tên
* Số điện thoại
* Email
* Vai trò
* Trạng thái
* Thao tác

Actions:

* Tạo tài khoản
* Cập nhật
* Khóa tài khoản
* Reset mật khẩu

### APIs

```http
GET /users
POST /users
PUT /users/{id}
PUT /users/{id}/reset-password
```

### Permissions

* ROLE_ADMIN

---

## SCR-ADM-033 Role & Permission Management

### Purpose

Quản lý vai trò và phân quyền.

### Route

```text
/admin/roles
```

### Components

Sections:

* Danh sách vai trò
* Danh sách quyền
* Ma trận quyền theo vai trò

Actions:

* Tạo role
* Cập nhật role
* Gán quyền
* Gỡ quyền

### APIs

```http
GET /roles
POST /roles
PUT /roles/{id}
GET /permissions
PUT /roles/{id}/permissions
```

### Permissions

* ROLE_ADMIN

---

# 5.11 Reports

## SCR-RPT-001 Student Report

### Purpose

Báo cáo học viên.

### Route

```text
/admin/reports/students
```

### Components

Filters:

* Khóa học
* Trạng thái
* Khu vực
* Từ ngày
* Đến ngày

Metrics:

* Tổng học viên
* Học viên đang học
* Học viên hoàn thành
* Học viên hủy

### APIs

```http
GET /reports/students
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-RPT-002 Revenue Report

### Purpose

Báo cáo doanh thu và công nợ.

### Route

```text
/admin/reports/revenue
```

### Components

Metrics:

* Tổng học phí
* Tổng phí học thêm
* Tổng phí thi lại
* Tổng hoàn phí
* Tổng công nợ

Filters:

* Tháng
* Năm
* Khóa học
* Khu vực

### APIs

```http
GET /reports/revenue
GET /reports/debts
```

### Permissions

* ROLE_ACCOUNTANT
* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-RPT-003 Exam Report

### Purpose

Báo cáo kết quả thi.

### Route

```text
/admin/reports/exams
```

### Components

Metrics:

* Số học viên thi
* Số học viên đậu
* Số học viên rớt
* Tỷ lệ đậu
* Số lượt thi lại

Charts:

* Kết quả theo tháng
* Kết quả theo phần thi

### APIs

```http
GET /reports/exams
```

### Permissions

* ROLE_EXAM_STAFF
* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-RPT-004 Vehicle Report

### Purpose

Báo cáo hoạt động xe.

### Route

```text
/admin/reports/vehicles
```

### Components

Metrics:

* Tổng KM
* Tổng lít xăng
* Tổng chi phí xăng
* Số xe đến hạn bảo dưỡng
* Số giấy tờ sắp hết hạn

### APIs

```http
GET /reports/vehicles
```

### Permissions

* ROLE_AREA_MANAGER
* ROLE_ADMIN
* ROLE_DIRECTOR

---

## SCR-RPT-005 Director Dashboard

### Purpose

Dashboard dành cho giám đốc.

### Route

```text
/admin/director-dashboard
```

### Components

Summary:

* Tổng học viên
* Doanh thu
* Công nợ
* Tỷ lệ thi đậu
* Lương chờ duyệt
* Xe cần bảo dưỡng
* Nhân sự đang hoạt động

Actions:

* Xem báo cáo chi tiết
* Duyệt lương

### APIs

```http
GET /dashboard/director
GET /salary-calculations?status=SUBMITTED
```

### Permissions

* ROLE_DIRECTOR

---

# 6. Student Mobile Screens

## SCR-MOB-001 Student Login

### Purpose

Học viên đăng nhập vào ứng dụng.

### Route

```text
/mobile/login
```

### Components

Fields:

* Username
* Password

Buttons:

* Đăng nhập
* Quên mật khẩu

### APIs

```http
POST /auth/login
```

### Permissions

Public.

---

## SCR-MOB-002 Student Dashboard

### Purpose

Hiển thị tổng quan thông tin học viên.

### Route

```text
/mobile/dashboard
```

### Components

#### Profile Summary

Hiển thị:

* Họ tên
* Khóa học
* Trạng thái học viên

#### Progress Summary

Hiển thị tiến độ:

* Hồ sơ
* Học phí
* Lý thuyết
* Mô phỏng
* 4H cơ bản
* Cabin
* DAT
* Sa hình
* Thi tốt nghiệp
* Thi sát hạch
* Nhận bằng

#### Upcoming Schedule

Hiển thị lịch học gần nhất.

#### Notifications

Hiển thị thông báo mới nhất.

### APIs

```http
GET /students/me
GET /students/me/progress
GET /schedules/my-schedules
GET /notifications
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-003 Student Profile

### Purpose

Học viên xem thông tin cá nhân.

### Route

```text
/mobile/profile
```

### Components

Fields display:

* Họ tên
* Ngày sinh
* Số điện thoại
* Khóa học
* Ngày khai giảng
* Ngày bế giảng
* Ngày thanh lý hồ sơ

### APIs

```http
GET /students/me
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-004 Learning Progress

### Purpose

Học viên theo dõi tiến độ học.

### Route

```text
/mobile/progress
```

### Components

Progress tabs:

* Hồ sơ
* Học phí
* Lý thuyết
* Mô phỏng
* 4H cơ bản
* Cabin
* DAT
* Sa hình
* Thi tốt nghiệp
* Thi sát hạch
* Nhận bằng

### APIs

```http
GET /students/me/progress
GET /training-sessions/my-sessions
GET /students/me/exam-results
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-005 Tuition

### Purpose

Học viên xem học phí.

### Route

```text
/mobile/tuition
```

### Components

Summary:

* Tổng học phí
* Đã thanh toán
* Còn lại

Payment history:

* Loại phí
* Số tiền
* Ngày thanh toán
* Ghi chú

### APIs

```http
GET /students/me/payments
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-006 Available Schedule

### Purpose

Học viên xem lịch trống để đặt lịch.

### Route

```text
/mobile/available-schedules
```

### Components

Filters:

* Loại lịch
* Ngày học
* Khu vực

Available slots:

* Ngày
* Giờ bắt đầu
* Giờ kết thúc
* Loại lịch
* Trạng thái

Actions:

* Chọn lịch
* Đặt lịch

### APIs

```http
GET /bookings/available-slots
POST /bookings
```

### Validation

* Chỉ được đặt lịch còn trống.
* Không được đặt lịch trùng thời gian với lịch đã có.

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-007 Booking Confirmation

### Purpose

Xác nhận đặt lịch học.

### Route

```text
/mobile/bookings/confirm
```

### Components

Display:

* Loại lịch
* Ngày học
* Giờ học
* Ghi chú nếu có

Buttons:

* Xác nhận đặt lịch
* Hủy

### APIs

```http
POST /bookings
```

### Success Message

```text
Lịch đã được đặt
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-008 My Schedule

### Purpose

Học viên xem lịch học của mình.

### Route

```text
/mobile/my-schedules
```

### Components

Tabs:

* Sắp tới
* Đã hoàn thành
* Đã hủy

Schedule card:

* Loại lịch
* Ngày học
* Giờ học
* Giáo viên
* Xe hoặc cabin
* Trạng thái

Actions:

* Xem chi tiết
* Hủy lịch nếu còn cho phép

### APIs

```http
GET /schedules/my-schedules
DELETE /bookings/{id}
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-009 Session Detail

### Purpose

Học viên xem chi tiết buổi học.

### Route

```text
/mobile/sessions/{id}
```

### Components

Display:

* Loại buổi học
* Ngày học
* Giáo viên
* Xe
* Thời gian bắt đầu
* Thời gian kết thúc
* Số km nếu có
* Trạng thái

Actions:

* Đánh giá giáo viên nếu buổi học đã hoàn thành

### APIs

```http
GET /training-sessions/{id}
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-010 Teacher Rating

### Purpose

Học viên đánh giá giáo viên sau buổi học.

### Route

```text
/mobile/sessions/{id}/rating
```

### Components

Fields:

* Rating từ 1 đến 5 sao
* Nhận xét

Buttons:

* Gửi đánh giá
* Hủy

### APIs

```http
POST /teacher-ratings
```

### Validation

* Rating bắt buộc.
* Rating chỉ nhận giá trị từ 1 đến 5.
* Mỗi buổi học chỉ được đánh giá một lần.

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-011 DAT Progress

### Purpose

Học viên xem tiến độ DAT.

### Route

```text
/mobile/dat-progress
```

### Components

Summary:

* KM yêu cầu
* KM đã học
* KM còn lại
* Tổng thời gian đã học

Session list:

* Ngày học
* Giáo viên
* KM buổi học
* Thời gian học

### APIs

```http
GET /students/me/progress
GET /training-sessions/my-sessions?type=DAT
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-012 Exam Schedule

### Purpose

Học viên xem lịch thi.

### Route

```text
/mobile/exam-schedule
```

### Components

Sections:

* Lịch thi tốt nghiệp
* Lịch thi sát hạch
* Hướng dẫn thi sát hạch

### APIs

```http
GET /students/me/exams
GET /exam-guides/current
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-013 Exam Result

### Purpose

Học viên xem kết quả thi.

### Route

```text
/mobile/exam-results
```

### Components

Graduation result:

* Ngày thi
* Kết quả
* Ghi chú

License exam result:

* Lý thuyết
* Mô phỏng
* Sa hình
* Đường trường
* Kết quả tổng

Actions:

* Đăng ký thi lại nếu có phần chưa đạt

### APIs

```http
GET /students/me/exam-results
POST /retake-registrations
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-014 Retake Registration

### Purpose

Học viên đăng ký thi lại.

### Route

```text
/mobile/retake-registration
```

### Components

Fields:

* Phần thi lại
* Phí thi lại
* Ghi chú

Buttons:

* Đăng ký thi lại
* Hủy

### APIs

```http
POST /retake-registrations
GET /fee-configs?type=RETAKE_EXAM
```

### Validation

* Chỉ hiển thị phần thi chưa đạt.
* Phí thi lại lấy từ cấu hình hệ thống.

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-015 Certificate Status

### Purpose

Học viên xem trạng thái nhận bằng.

### Route

```text
/mobile/certificate
```

### Components

Display:

* Trạng thái bằng
* Ngày bằng về trung tâm
* Hướng dẫn nhận bằng
* Trạng thái hoàn thành khóa học

### APIs

```http
GET /students/me/certificate-status
```

### Permissions

* ROLE_STUDENT

---

## SCR-MOB-016 Notifications

### Purpose

Học viên xem thông báo.

### Route

```text
/mobile/notifications
```

### Components

Notification list:

* Tiêu đề
* Nội dung
* Thời gian
* Trạng thái đã đọc/chưa đọc

Actions:

* Xem chi tiết
* Đánh dấu đã đọc

### APIs

```http
GET /notifications
PUT /notifications/{id}/read
```

### Permissions

* ROLE_STUDENT

---

# 7. Teacher Mobile/Web Screens

## SCR-TEA-001 Teacher Dashboard

### Purpose

Giáo viên xem tổng quan công việc trong ngày.

### Route

```text
/teacher/dashboard
```

### Components

Summary:

* Lịch dạy hôm nay
* Tổng giờ tháng
* Xe phụ trách
* Thông báo
* Đơn nghỉ phép

### APIs

```http
GET /teachers/me/schedules
GET /teachers/me/statistics
GET /teachers/me/vehicle
GET /notifications
```

### Permissions

* ROLE_TEACHER

---

## SCR-TEA-002 Teaching Schedule

### Purpose

Giáo viên xem lịch dạy.

### Route

```text
/teacher/schedules
```

### Components

Tabs:

* Hôm nay
* Tuần này
* Đã hoàn thành

Schedule card:

* Học viên
* Loại buổi học
* Giờ học
* Xe
* Địa điểm
* Trạng thái

### APIs

```http
GET /teachers/me/schedules
```

### Permissions

* ROLE_TEACHER

---

## SCR-TEA-003 Check In

### Purpose

Giáo viên điểm danh và khai báo xe trước buổi học đầu tiên.

### Route

```text
/teacher/check-in
```

### Components

Fields:

* Xe
* ODO đi
* Tình trạng xe
* Hình ảnh xe

Buttons:

* Điểm danh
* Gửi báo cáo

### APIs

```http
POST /teacher-attendances/check-in
POST /vehicle-usages/start
```

### Validation

* ODO đi bắt buộc.
* Ảnh tình trạng xe bắt buộc nếu cấu hình yêu cầu.
* Giáo viên phải điểm danh trước lịch đầu tiên trong ngày theo quy định.

### Permissions

* ROLE_TEACHER

---

## SCR-TEA-004 Report Training Session

### Purpose

Giáo viên báo cáo buổi học.

### Route

```text
/teacher/sessions/{id}/report
```

### Components

Fields:

* Thời gian bắt đầu
* Thời gian kết thúc
* Số km nếu có
* Ghi chú
* Ảnh DAT bắt đầu
* Ảnh DAT kết thúc

Buttons:

* Lưu báo cáo
* Hoàn thành buổi học

### APIs

```http
PUT /training-sessions/{id}/start
PUT /training-sessions/{id}/finish
POST /training-sessions/{id}/dat-images
```

### Validation

* Buổi DAT bắt buộc có ảnh bắt đầu và kết thúc.
* Thời gian kết thúc phải lớn hơn thời gian bắt đầu.
* KM kết thúc phải lớn hơn hoặc bằng KM bắt đầu.

### Permissions

* ROLE_TEACHER

---

## SCR-TEA-005 Fuel Report

### Purpose

Giáo viên khai báo đổ xăng.

### Route

```text
/teacher/fuel-logs/new
```

### Components

Fields:

* Xe
* Số lít
* Số tiền
* Hóa đơn xăng
* Ngày đổ xăng

Buttons:

* Gửi báo cáo
* Hủy

### APIs

```http
POST /fuel-logs
```

### Validation

* Xe bắt buộc.
* Số lít phải lớn hơn 0.
* Hóa đơn xăng bắt buộc nếu cấu hình yêu cầu.

### Permissions

* ROLE_TEACHER

---

## SCR-TEA-006 Leave Request

### Purpose

Giáo viên gửi yêu cầu nghỉ phép.

### Route

```text
/teacher/leave-requests/new
```

### Components

Fields:

* Ngày nghỉ
* Lý do

Buttons:

* Gửi yêu cầu
* Hủy

### APIs

```http
POST /leave-requests
```

### Validation

* Ngày nghỉ bắt buộc.
* Lý do bắt buộc.

### Permissions

* ROLE_TEACHER

---

## SCR-TEA-007 Maintenance Request

### Purpose

Giáo viên gửi đề xuất bảo dưỡng xe.

### Route

```text
/teacher/maintenance-requests/new
```

### Components

Fields:

* Xe
* Hạng mục cần bảo dưỡng
* Mô tả
* Hình ảnh nếu có

Buttons:

* Gửi đề xuất
* Hủy

### APIs

```http
POST /maintenance-requests
```

### Validation

* Xe bắt buộc.
* Mô tả bắt buộc.

### Permissions

* ROLE_TEACHER

---

# 8. Common Components

## CMP-001 Data Table

### Description

Bảng dữ liệu dùng chung cho các màn hình quản lý.

### Features

* Pagination
* Sorting
* Filtering
* Row actions
* Empty state
* Loading state

---

## CMP-002 Search Filter

### Description

Khu vực tìm kiếm và lọc dữ liệu.

### Features

* Text input
* Select box
* Date range
* Reset filter
* Submit search

---

## CMP-003 Confirm Dialog

### Description

Dialog xác nhận hành động quan trọng.

### Used For

* Xóa dữ liệu
* Hủy lịch
* Hoàn phí
* Duyệt lương
* Duyệt nghỉ phép
* Duyệt bảo dưỡng

---

## CMP-004 File Upload

### Description

Component upload file.

### Used For

* Hồ sơ học viên
* Giấy tờ xe
* Ảnh DAT
* Hóa đơn xăng
* Hình ảnh tình trạng xe

---

## CMP-005 Status Badge

### Description

Hiển thị trạng thái.

### Examples

* ACTIVE
* INACTIVE
* PENDING
* APPROVED
* REJECTED
* COMPLETED
* CANCELLED

---

# 9. Permission Summary

## Student

Có quyền truy cập:

* Student Dashboard
* Profile
* Learning Progress
* Tuition
* Available Schedule
* My Schedule
* Session Detail
* Teacher Rating
* Exam Schedule
* Exam Result
* Retake Registration
* Certificate Status
* Notifications

---

## Teacher

Có quyền truy cập:

* Teacher Dashboard
* Teaching Schedule
* Check In
* Report Training Session
* Fuel Report
* Leave Request
* Maintenance Request

---

## Sales

Có quyền truy cập:

* Student List
* Student Detail
* Create/Edit Student
* Student Documents

---

## Accountant

Có quyền truy cập:

* Student Detail
* Payment List
* Create Payment
* Refund Payment
* Revenue Report
* Fuel Logs

---

## Education Staff

Có quyền truy cập:

* Student Detail
* Booking Management
* Schedule Calendar
* Schedule Assignment
* Training Session Detail
* Training Progress

---

## Exam Staff

Có quyền truy cập:

* Exam List
* Exam Registration
* Exam Result
* Retake Registration
* Exam Report

---

## Area Manager

Có quyền truy cập:

* Admin Dashboard
* Teacher List
* Teacher Detail
* Teacher Attendance
* Leave Request Management
* Vehicle List
* Vehicle Detail
* Maintenance Request
* Reports

---

## Admin

Có quyền truy cập toàn bộ màn hình quản trị trừ các hành động chỉ dành cho Giám đốc nếu có cấu hình riêng.

---

## Director

Có quyền truy cập:

* Director Dashboard
* Reports
* Salary Approval
* Vehicle Report
* Employee Summary

---

# 10. Ghi Chú Thiết Kế

## 10.1 Không thiết kế UI theo database

Screen specification mô tả theo hành vi người dùng, không phải theo bảng dữ liệu.

---

## 10.2 Một màn hình có thể dùng nhiều API

Ví dụ Student Detail dùng:

* Student API
* Payment API
* Document API
* Progress API
* Exam API
* Audit API

---

## 10.3 Một API có thể dùng ở nhiều màn hình

Ví dụ:

```http
GET /students/{id}/progress
```

có thể dùng ở:

* Admin Student Detail
* Admin Training Progress
* Student Mobile Dashboard
* Student Mobile Learning Progress

---

## 10.4 Mobile học viên nên đơn giản hơn Web Admin

Mobile học viên chỉ nên tập trung vào:

* Xem tiến độ
* Xem học phí
* Đặt lịch
* Xem lịch
* Đánh giá giáo viên
* Xem thi cử
* Nhận thông báo

---

## 10.5 Các màn hình báo cáo nên triển khai sau

Các dashboard và báo cáo nên triển khai sau các nghiệp vụ chính:

1. Học viên
2. Học phí
3. Đặt lịch
4. Buổi học
5. Thi cử
6. Xe
7. Lương
8. Báo cáo
