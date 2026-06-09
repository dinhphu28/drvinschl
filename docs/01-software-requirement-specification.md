# Software Requirement Specification

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0

Status: Draft

------

# 1. Giới Thiệu

## 1.1 Mục Đích

Tài liệu này mô tả phạm vi, mục tiêu và các yêu cầu nghiệp vụ tổng quát của hệ thống quản lý trung tâm đào tạo lái xe.

Hệ thống nhằm số hóa toàn bộ quy trình đào tạo học viên từ lúc đăng ký khóa học đến khi hoàn thành khóa học và nhận bằng lái xe.

------

## 1.2 Mục Tiêu Hệ Thống

- Quản lý học viên tập trung.
- Quản lý hồ sơ đào tạo.
- Quản lý học phí.
- Quản lý lịch học.
- Quản lý giáo viên.
- Quản lý xe tập lái.
- Quản lý thi cử.
- Quản lý nhân sự.
- Quản lý lương.
- Cung cấp báo cáo và thống kê.

------

## 1.3 Phạm Vi

### Trong phạm vi

- Web Admin
- Mobile App cho học viên
- Quản lý đào tạo
- Quản lý tài chính liên quan học viên
- Quản lý xe
- Quản lý giáo viên
- Quản lý thi cử
- Báo cáo thống kê

### Ngoài phạm vi

- Thanh toán trực tuyến
- Tích hợp ngân hàng
- Ký hợp đồng điện tử
- Hệ thống LMS chuyên biệt
- ERP kế toán

------

# 2. Đối Tượng Sử Dụng

## Học viên

Sử dụng ứng dụng để:

- Theo dõi tiến độ học
- Xem học phí
- Đặt lịch học
- Đăng ký học thêm
- Xem lịch thi
- Xem kết quả thi
- Theo dõi nhận bằng

------

## Kinh doanh

Sử dụng hệ thống để:

- Tư vấn khách hàng
- Quản lý học viên phụ trách
- Theo dõi hồ sơ
- Theo dõi hoa hồng

------

## Kế toán

Sử dụng hệ thống để:

- Thu học phí
- Hoàn học phí
- Theo dõi công nợ
- Theo dõi chi phí nhiên liệu

------

## Giáo vụ

Sử dụng hệ thống để:

- Xử lý lịch học
- Phân công giáo viên
- Phân công xe
- Theo dõi tiến độ đào tạo

------

## Giáo viên

Sử dụng hệ thống để:

- Xem lịch dạy
- Điểm danh
- Ghi nhận buổi học
- Báo cáo nhiên liệu
- Đề xuất nghỉ phép

------

## Quản lý khu vực

Sử dụng hệ thống để:

- Quản lý giáo viên
- Duyệt nghỉ phép
- Theo dõi hoạt động đào tạo

------

## Quản trị hệ thống

Sử dụng hệ thống để:

- Quản lý tài khoản
- Quản lý phân quyền
- Quản lý cấu hình

------

## Giám đốc

Sử dụng hệ thống để:

- Theo dõi hoạt động trung tâm
- Theo dõi kết quả đào tạo
- Phê duyệt lương

------

# 3. Quy Trình Nghiệp Vụ Tổng Thể

## Quy trình học viên

Khách hàng

→ Đăng ký khóa học

→ Hoàn thiện hồ sơ

→ Thanh toán học phí

→ Học lý thuyết

→ Học mô phỏng

→ Học thực hành

→ Thi tốt nghiệp

→ Thi sát hạch

→ Nhận bằng

→ Hoàn thành khóa học

------

## Quy trình đào tạo

Học viên đặt lịch

→ Giáo vụ xử lý

→ Phân công giáo viên

→ Phân công xe

→ Thực hiện buổi học

→ Ghi nhận kết quả học tập

------

## Quy trình thi

Đủ điều kiện thi

→ Lập danh sách thi

→ Thông báo lịch thi

→ Thi

→ Cập nhật kết quả

→ Thi lại (nếu cần)

------

# 4. Các Phân Hệ Chính

## Phân hệ Quản lý Học viên

Quản lý toàn bộ thông tin học viên và quá trình học tập.

------

## Phân hệ Hồ sơ

Quản lý hồ sơ đào tạo và giấy tờ liên quan.

------

## Phân hệ Học phí

Quản lý các khoản thu, hoàn phí và công nợ.

------

## Phân hệ Lịch học

Quản lý đặt lịch và phân bổ lịch đào tạo.

------

## Phân hệ Đào tạo

Quản lý quá trình học:

- Lý thuyết
- Mô phỏng
- Cabin
- DAT
- Sa hình

------

## Phân hệ Thi cử

Quản lý:

- Thi tốt nghiệp
- Thi sát hạch
- Thi lại

------

## Phân hệ Giáo viên

Quản lý:

- Lịch dạy
- Chấm công
- Giờ dạy

------

## Phân hệ Xe

Quản lý:

- Xe tập lái
- Giấy tờ xe
- ODO
- Nhiên liệu
- Bảo dưỡng

------

## Phân hệ Nhân sự

Quản lý:

- Nhân viên
- Nghỉ phép

------

## Phân hệ Lương

Quản lý:

- Công thức lương
- Bảng lương
- Phê duyệt lương

------

## Phân hệ Báo cáo

Cung cấp các báo cáo:

- Học viên
- Doanh thu
- Thi cử
- Giáo viên
- Xe

------

# 5. Yêu Cầu Phi Chức Năng

## Bảo mật

- Đăng nhập bằng tài khoản và mật khẩu.
- Phân quyền theo vai trò.
- Lưu audit log các thao tác quan trọng.

------

## Hiệu năng

- Hỗ trợ tối thiểu 500 người dùng đồng thời.
- Thời gian phản hồi dưới 3 giây đối với các thao tác thông thường.

------

## Khả dụng

- Hệ thống hoạt động 24/7.
- Sao lưu dữ liệu định kỳ.

------

## Khả năng mở rộng

- Hỗ trợ mở rộng nhiều chi nhánh.
- Hỗ trợ mở rộng thêm loại khóa học mới.

------

# 6. Tiêu Chí Nghiệm Thu

Hệ thống được xem là hoàn thành khi:

- Toàn bộ chức năng trong phạm vi được triển khai.
- Dữ liệu được lưu trữ chính xác.
- Quy trình nghiệp vụ vận hành đúng.
- Phân quyền hoạt động chính xác.
- Báo cáo hoạt động chính xác.
- Người dùng có thể sử dụng hệ thống trong môi trường thực tế.

------

# 7. Danh Sách Tài Liệu Liên Quan

- 02-functional-requirements.md
- 03-business-rules.md
- 04-use-cases.md
- 05-domain-model.md
- 06-erd.md
- 07-rest-api-spec.md
- 08-screen-specification.md
- 09-test-scenarios.md