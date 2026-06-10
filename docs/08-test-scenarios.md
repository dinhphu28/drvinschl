# Test Scenarios

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Mục Đích

Tài liệu này mô tả các kịch bản kiểm thử chính cho hệ thống.

---

# 2. Authentication

## TS-001 Đăng Nhập Thành Công

### Priority

High

### Steps

1. Mở màn hình đăng nhập.
2. Nhập username hợp lệ.
3. Nhập password hợp lệ.
4. Chọn đăng nhập.

### Expected Result

- Người dùng đăng nhập thành công.
- Hệ thống chuyển đến màn hình phù hợp với vai trò.

---

## TS-002 Đổi Mật Khẩu Thành Công

### Priority

High

### Steps

1. Người dùng đăng nhập.
2. Mở màn hình đổi mật khẩu.
3. Nhập mật khẩu cũ.
4. Nhập mật khẩu mới.
5. Xác nhận.

### Expected Result

- Mật khẩu được cập nhật.
- Người dùng có thể đăng nhập bằng mật khẩu mới.

---

## TS-003 Admin Reset Mật Khẩu

### Priority

High

### Steps

1. Admin mở màn hình người dùng.
2. Chọn người dùng.
3. Chọn reset mật khẩu.
4. Nhập mật khẩu mới.
5. Xác nhận.

### Expected Result

- Mật khẩu được reset.
- Audit log được tạo.

---

# 3. Học Viên

## TS-004 Tạo Học Viên Thành Công

### Priority

High

### Expected Result

- Học viên được tạo.
- Học viên có thể được gắn nhiều enrollment.

---

## TS-005 Đăng Ký Nhiều Khóa Cho Một Học Viên

### Priority

High

### Steps

1. Tạo học viên.
2. Tạo enrollment thứ nhất.
3. Tạo enrollment thứ hai cho cùng học viên.

### Expected Result

- Cả hai enrollment được tạo.
- Mỗi enrollment được quản lý độc lập.

---

## TS-006 Hủy Khóa Học

### Priority

High

### Expected Result

- Enrollment chuyển sang trạng thái `CANCELLED`.

---

# 4. Hồ Sơ

## TS-007 Tạo Hồ Sơ Chỉ Có Ghi Chú

### Priority

High

### Steps

1. Mở tab hồ sơ học viên.
2. Tạo hồ sơ mới.
3. Nhập tên hồ sơ và ghi chú.
4. Không upload file.
5. Lưu.

### Expected Result

- Hồ sơ được tạo thành công.

---

## TS-008 Tạo Hồ Sơ Chỉ Có File

### Priority

Medium

### Expected Result

- Hồ sơ được tạo thành công.

---

## TS-009 Kinh Doanh Đánh Dấu Hồ Sơ Hoàn Thiện

### Priority

High

### Expected Result

- Hồ sơ chuyển sang trạng thái hoàn thiện.
- Hệ thống không tự động kiểm tra đủ file.

---

# 5. Học Phí

## TS-010 Ghi Nhận Thanh Toán Thành Công

### Priority

High

### Expected Result

- Payment được tạo.
- Công nợ được cập nhật.
- Audit log được tạo.

---

## TS-011 Không Cho Thanh Toán Dư

### Priority

High

### Preconditions

- Học viên còn nợ 1.000.000.

### Steps

1. Kế toán nhập thanh toán 1.500.000.
2. Chọn lưu.

### Expected Result

- Hệ thống từ chối.
- Hiển thị lỗi thanh toán vượt công nợ.

---

## TS-012 Hoàn Phí Một Phần

### Priority

High

### Expected Result

- Refund được tạo.
- Số tiền hoàn không vượt số tiền đã thanh toán.
- Audit log được tạo.

---

## TS-013 In Phiếu Thu

### Priority

High

### Preconditions

- Có giao dịch thanh toán thành công.

### Expected Result

- Hệ thống hiển thị phiếu thu.
- Phiếu thu có thông tin học viên, số tiền, ngày thanh toán và người thu.

---

## TS-014 Xuất PDF Phiếu Thu

### Priority

High

### Preconditions

- Có giao dịch thanh toán thành công.

### Expected Result

- Hệ thống sinh file PDF phiếu thu.
- File PDF có thể tải về.

---

# 6. Đặt Lịch

## TS-015 Học Viên Xem Lịch Trống

### Priority

High

### Expected Result

- Hệ thống hiển thị khung giờ còn trống.
- Không hiển thị khung giờ đã bị chiếm.

---

## TS-016 Học Viên Đặt Lịch Không Cần Giáo Vụ Xác Nhận

### Priority

High

### Preconditions

- Có khung giờ trống.
- Học viên không có lịch trùng thời gian.

### Steps

1. Học viên mở màn hình đặt lịch.
2. Chọn loại lịch.
3. Chọn khung giờ.
4. Xác nhận đặt lịch.

### Expected Result

- Hệ thống tạo lịch ngay.
- Lịch có trạng thái `BOOKED`.
- Không cần giáo vụ xác nhận.

---

## TS-017 Không Cho Đặt Lịch Trùng Thời Gian

### Priority

High

### Expected Result

- Hệ thống từ chối đặt lịch.
- Hiển thị lỗi trùng lịch.

---

## TS-018 Hủy Lịch Trước Giờ Bắt Đầu

### Priority

High

### Expected Result

- Lịch chuyển sang trạng thái `CANCELLED`.

---

## TS-019 Không Cho Hủy Lịch Sau Giờ Bắt Đầu

### Priority

High

### Expected Result

- Hệ thống từ chối hủy lịch.

---

## TS-020 Giáo Vụ Phân Công Giáo Viên Thủ Công

### Priority

Medium

### Expected Result

- Giáo viên được gán vào lịch.
- Không cho gán nếu giáo viên bị trùng lịch.

---

## TS-021 Giáo Vụ Phân Công Xe Thủ Công

### Priority

Medium

### Expected Result

- Xe được gán vào lịch.
- Không cho gán nếu xe bị trùng lịch.

---

# 7. Đào Tạo

## TS-022 Giáo Viên Hoàn Thành Buổi Học

### Priority

High

### Expected Result

- Buổi học chuyển sang trạng thái `TEACHER_COMPLETED`.

---

## TS-023 Học Viên Xác Nhận Buổi Học

### Priority

High

### Expected Result

- Buổi học chuyển sang trạng thái `STUDENT_CONFIRMED` hoặc `COMPLETED` theo cấu hình.

---

## TS-024 Hoàn Thành DAT Không Có Ảnh

### Priority

High

### Preconditions

- Có buổi học DAT.

### Steps

1. Giáo viên mở buổi học DAT.
2. Nhập KM.
3. Nhập thời gian học.
4. Không upload ảnh DAT.
5. Chọn hoàn thành buổi học.

### Expected Result

- Hệ thống vẫn cho hoàn thành buổi DAT.
- DAT được ghi nhận bằng dữ liệu nhập tay.
- Ảnh DAT không bắt buộc.

---

## TS-025 Học Viên Đánh Giá Giáo Viên

### Priority

Medium

### Expected Result

- Đánh giá được lưu.
- Điểm trung bình giáo viên được cập nhật.

---

# 8. Thi

## TS-026 Giáo Vụ Thi Xác Nhận Đủ Điều Kiện Thi Tốt Nghiệp

### Priority

High

### Expected Result

- Học viên được thêm vào danh sách thi tốt nghiệp.

---

## TS-027 Cập Nhật Kết Quả Thi Tốt Nghiệp

### Priority

High

### Expected Result

- Kết quả được lưu.
- Audit log được tạo.

---

## TS-028 Cập Nhật Kết Quả Thi Sát Hạch Theo 4 Phần

### Priority

High

### Expected Result

- Kết quả từng phần được lưu.
- Kết quả tổng được xác định.

---

## TS-029 Học Viên Đăng Ký Thi Lại Theo Từng Phần

### Priority

High

### Expected Result

- Chỉ các phần chưa đạt được phép đăng ký thi lại.

---

# 9. Xe

## TS-030 Giáo Viên Bắt Đầu Sử Dụng Xe Không Nhập ODO

### Priority

High

### Steps

1. Giáo viên mở màn hình check-in xe.
2. Chọn xe.
3. Upload hình xe.
4. Không nhập ODO đi.
5. Xác nhận.

### Expected Result

- Hệ thống cho phép bắt đầu sử dụng xe.
- Hình xe được lưu.
- ODO đi để trống.

---

## TS-031 Không Cho Bắt Đầu Sử Dụng Xe Khi Thiếu Hình Xe

### Priority

High

### Expected Result

- Hệ thống từ chối.
- Hiển thị lỗi hình xe bắt buộc.

---

## TS-032 Giáo Viên Kết Thúc Sử Dụng Xe Không Nhập ODO

### Priority

Medium

### Expected Result

- Hệ thống cho phép kết thúc sử dụng xe.
- ODO về để trống.

---

## TS-033 Kiểm Tra ODO Nếu Có Nhập Đủ ODO Đi Và ODO Về

### Priority

Medium

### Preconditions

- Vehicle usage có ODO đi.

### Steps

1. Mở màn hình nhập ODO về.
2. Nhập ODO về nhỏ hơn ODO đi.
3. Lưu.

### Expected Result

- Hệ thống từ chối lưu.
- Hiển thị lỗi ODO về phải lớn hơn hoặc bằng ODO đi.

---

## TS-034 Giáo Viên Khai Báo Đổ Xăng

### Priority

Medium

### Expected Result

- Fuel log được tạo.
- Dữ liệu xăng xuất hiện trong báo cáo xe.

---

## TS-035 Duyệt Đề Xuất Bảo Dưỡng Một Cấp

### Priority

Medium

### Expected Result

- Đề xuất chuyển sang `APPROVED`.
- Audit log được tạo.

---

# 10. Nghỉ Phép

## TS-036 Gửi Yêu Cầu Nghỉ Phép

### Priority

Medium

### Expected Result

- Leave request được tạo ở trạng thái `PENDING`.

---

## TS-037 Kiểm Tra Giáo Viên Tối Thiểu Khi Duyệt Nghỉ

### Priority

Medium

### Expected Result

- Hệ thống cảnh báo hoặc từ chối theo cấu hình.

---

# 11. Tổng Hợp Giờ Dạy

## TS-038 Sinh Bảng Tổng Hợp Giờ Dạy

### Priority

High

### Expected Result

- Hệ thống tạo bảng tổng hợp giờ dạy.
- Dữ liệu được nhóm theo:
  - T2-T6.
  - T7-CN.
  - Đêm.
  - Cảm ứng tập.
  - Cảm ứng thi.
- Hệ thống chưa tính tiền lương tự động.

---

## TS-039 Gửi Bảng Tổng Hợp Giờ Dạy Chờ Duyệt

### Priority

High

### Expected Result

- Bảng tổng hợp chuyển sang trạng thái `SUBMITTED`.

---

## TS-040 Giám Đốc Duyệt Bảng Tổng Hợp Giờ Dạy

### Priority

High

### Expected Result

- Bảng tổng hợp chuyển sang trạng thái `APPROVED`.
- Audit log được tạo.

---

# 12. Báo Cáo MVP

## TS-041 Báo Cáo Học Viên Hoàn Thành

## TS-042 Báo Cáo Kết Quả Thi Sát Hạch

## TS-043 Báo Cáo Thông Tin Xe

## TS-044 Báo Cáo Thông Tin Nhân Viên

## TS-045 Báo Cáo Lương/Bảng Tổng Hợp Giờ Dạy

---

# 13. Audit Log

## TS-046 Ghi Audit Khi Cập Nhật Học Viên

## TS-047 Ghi Audit Khi Thu Học Phí

## TS-048 Ghi Audit Khi Hoàn Phí

## TS-049 Ghi Audit Khi Cập Nhật Kết Quả Thi

## TS-050 Ghi Audit Khi Reset Mật Khẩu

---

# 14. Test Data Đề Xuất

## Người dùng

| Role | Username mẫu |
|---|---|
| Học viên | student01 |
| Giáo viên | teacher01 |
| Kế toán | accountant01 |
| Giáo vụ | education01 |
| Giáo vụ thi | exam01 |
| Quản lý khu vực | manager01 |
| Admin | admin01 |
| Giám đốc | director01 |

## Học viên

| Mã | Trạng thái |
|---|---|
| HV001 | Mới tạo |
| HV002 | Đã hoàn thiện hồ sơ |
| HV003 | Đang học DAT |
| HV004 | Chờ thi tốt nghiệp |
| HV005 | Chờ thi sát hạch |
| HV006 | Thi sát hạch không đạt |
| HV007 | Hoàn thành khóa học |
