# Use Cases

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Tổng Quan

Tài liệu này mô tả danh sách use case chính của hệ thống.

Use case được dùng để:

- Chia nhỏ chức năng.
- Làm input cho task breakdown.
- Làm input cho test scenario.
- Giúp AI Agent hiểu hành vi hệ thống.

---

# 2. Authentication & Account

## UC-001 Đăng Nhập

**Actor**

- Học viên
- Nhân viên
- Giáo viên
- Admin
- Giám đốc

**Mục tiêu**

Người dùng đăng nhập hệ thống bằng username và password.

---

## UC-002 Đổi Mật Khẩu

**Actor**

- Học viên
- Nhân viên
- Giáo viên
- Admin

**Mục tiêu**

Người dùng đổi mật khẩu sau khi đăng nhập.

---

## UC-003 Admin Reset Mật Khẩu

**Actor**

- Admin

**Mục tiêu**

Admin reset mật khẩu cho người dùng khi người dùng quên mật khẩu.

**Ghi chú**

Phiên bản đầu tiên không hỗ trợ quên mật khẩu tự động.

---

## UC-004 Quản Lý Tài Khoản

**Actor**

- Admin
- Kế toán đối với tài khoản học viên

**Mục tiêu**

Tạo, cập nhật, khóa/mở khóa tài khoản người dùng.

---

# 3. Học Viên

## UC-005 Tạo Học Viên

**Actor**

- Kinh doanh
- Kế toán
- Admin

**Mục tiêu**

Tạo hồ sơ học viên mới.

---

## UC-006 Cập Nhật Thông Tin Học Viên

**Actor**

- Kinh doanh
- Kế toán
- Admin

**Mục tiêu**

Cập nhật thông tin học viên.

---

## UC-007 Tra Cứu Học Viên

**Actor**

- Kinh doanh
- Kế toán
- Giáo vụ
- Admin

**Mục tiêu**

Tìm kiếm học viên theo mã, tên, số điện thoại hoặc trạng thái.

---

## UC-008 Xem Chi Tiết Học Viên

**Actor**

- Học viên
- Kinh doanh
- Kế toán
- Giáo vụ
- Admin

**Mục tiêu**

Xem hồ sơ, học phí, tiến độ, lịch học, kết quả thi và nhận bằng.

---

## UC-009 Đăng Ký Khóa Học Cho Học Viên

**Actor**

- Kinh doanh
- Kế toán
- Admin

**Mục tiêu**

Ghi nhận học viên tham gia một gói học.

**Ghi chú**

Một học viên có thể có nhiều đăng ký khóa học.

---

## UC-010 Hủy Khóa Học

**Actor**

- Kinh doanh
- Kế toán
- Admin

**Mục tiêu**

Chuyển đăng ký khóa học sang trạng thái `CANCELLED`.

---

# 4. Hồ Sơ

## UC-011 Tạo Hồ Sơ Học Viên

**Actor**

- Kinh doanh
- Kế toán
- Giáo vụ

**Mục tiêu**

Thêm hồ sơ học viên với file, ghi chú hoặc cả hai.

---

## UC-012 Cập Nhật Hồ Sơ Học Viên

**Actor**

- Kinh doanh
- Kế toán
- Giáo vụ

**Mục tiêu**

Cập nhật file hoặc ghi chú hồ sơ.

---

## UC-013 Đánh Dấu Hồ Sơ Hoàn Thiện

**Actor**

- Kinh doanh

**Mục tiêu**

Nhân viên Kinh doanh đánh dấu hồ sơ học viên hoàn thiện.

**Ghi chú**

Hệ thống không tự động kiểm tra đủ file đính kèm.

---

# 5. Học Phí

## UC-014 Thu Học Phí

**Actor**

- Kế toán

**Mục tiêu**

Ghi nhận thanh toán học phí.

---

## UC-015 Thu Phí Học Thêm

**Actor**

- Kế toán

**Mục tiêu**

Ghi nhận phí học thêm.

---

## UC-016 Thu Phí Thi Lại

**Actor**

- Kế toán

**Mục tiêu**

Ghi nhận phí thi lại.

---

## UC-017 Hoàn Phí

**Actor**

- Kế toán

**Mục tiêu**

Ghi nhận hoàn phí một phần hoặc toàn phần.

---

## UC-018 Xem Công Nợ

**Actor**

- Học viên
- Kế toán

**Mục tiêu**

Xem tổng học phí, đã thanh toán và còn lại.

---

## UC-019 In Phiếu Thu

**Actor**

- Kế toán

**Mục tiêu**

In phiếu thu cho giao dịch thanh toán.

---

## UC-020 Xuất PDF Phiếu Thu

**Actor**

- Kế toán

**Mục tiêu**

Xuất PDF phiếu thu cho giao dịch thanh toán.

---

# 6. Đặt Lịch Và Điều Phối Lịch

## UC-021 Xem Lịch Trống

**Actor**

- Học viên

**Mục tiêu**

Xem các khung giờ còn trống để đặt lịch học.

---

## UC-022 Đặt Lịch Học

**Actor**

- Học viên

**Mục tiêu**

Học viên đặt lịch học.

**Luồng chính**

1. Học viên chọn loại lịch.
2. Học viên chọn ngày và khung giờ.
3. Hệ thống kiểm tra xung đột.
4. Nếu hợp lệ, hệ thống tạo lịch ngay.

**Ghi chú**

Không cần giáo vụ xác nhận.

---

## UC-023 Hủy Lịch Học

**Actor**

- Học viên

**Mục tiêu**

Học viên hủy lịch trước giờ bắt đầu.

---

## UC-024 Điều Phối Lịch Học

**Actor**

- Giáo vụ

**Mục tiêu**

Giáo vụ xem, điều phối, phân công giáo viên, phân công xe hoặc điều chỉnh lịch học khi cần.

**Ghi chú**

Lịch học viên đặt không cần giáo vụ xác nhận để có hiệu lực.

---

## UC-025 Phân Công Giáo Viên Thủ Công

**Actor**

- Giáo vụ

**Mục tiêu**

Phân công giáo viên cho lịch học nếu cần.

---

## UC-026 Phân Công Xe Thủ Công

**Actor**

- Giáo vụ

**Mục tiêu**

Phân công xe cho lịch học nếu cần.

---

## UC-027 Đổi Lịch Học

**Actor**

- Giáo vụ
- Giáo viên gửi yêu cầu

**Mục tiêu**

Điều chỉnh lịch học và lưu lịch sử thay đổi.

---

# 7. Đào Tạo Thực Hành

## UC-028 Giáo Viên Xem Lịch Dạy

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên xem lịch dạy hiện tại và tương lai.

---

## UC-029 Giáo Viên Điểm Danh

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên điểm danh trước khi dạy theo quy định trung tâm.

---

## UC-030 Ghi Nhận Buổi Học

**Actor**

- Giáo viên

**Mục tiêu**

Ghi nhận thông tin buổi học.

---

## UC-031 Hoàn Thành Buổi Học

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên đánh dấu hoàn thành buổi học.

---

## UC-032 Học Viên Xác Nhận Buổi Học

**Actor**

- Học viên

**Mục tiêu**

Học viên xác nhận buổi học sau khi giáo viên hoàn thành.

---

## UC-033 Ghi Nhận DAT

**Actor**

- Giáo viên

**Mục tiêu**

Ghi nhận dữ liệu DAT nhập tay.

**Ghi chú nghiệp vụ**

- Dữ liệu DAT được nhập tay.
- Ảnh DAT không bắt buộc.
- Không tích hợp thiết bị DAT trong phiên bản đầu tiên.

---

## UC-034 Theo Dõi Tiến Độ Học

**Actor**

- Học viên
- Giáo vụ

**Mục tiêu**

Theo dõi giờ học, km DAT, cabin, sa hình và các giai đoạn đào tạo.

---

## UC-035 Đánh Giá Giáo Viên

**Actor**

- Học viên

**Mục tiêu**

Học viên đánh giá giáo viên sau buổi học.

---

# 8. Thi Tốt Nghiệp Và Sát Hạch

## UC-036 Lập Danh Sách Thi Tốt Nghiệp

**Actor**

- Giáo vụ thi

**Mục tiêu**

Giáo vụ thi xác nhận thủ công học viên đủ điều kiện và lập danh sách thi.

---

## UC-037 Cập Nhật Kết Quả Thi Tốt Nghiệp

**Actor**

- Giáo vụ thi

**Mục tiêu**

Cập nhật kết quả thi tốt nghiệp.

---

## UC-038 Lập Danh Sách Thi Sát Hạch

**Actor**

- Giáo vụ thi

**Mục tiêu**

Giáo vụ thi xác nhận thủ công học viên đủ điều kiện và lập danh sách thi sát hạch.

---

## UC-039 Cập Nhật Kết Quả Thi Sát Hạch

**Actor**

- Giáo vụ thi

**Mục tiêu**

Cập nhật kết quả 4 phần thi sát hạch.

---

## UC-040 Đăng Ký Thi Lại

**Actor**

- Học viên

**Mục tiêu**

Học viên đăng ký thi lại các phần thi chưa đạt.

---

# 9. Giáo Viên Và Xe

## UC-041 Chụp Hình Xe Trước Khi Sử Dụng

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên upload hình xe trước khi sử dụng xe.

---

## UC-042 Khai Báo ODO Đi Nếu Có

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên nhập ODO đi nếu có.

---

## UC-043 Khai Báo ODO Về Nếu Có

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên nhập ODO về nếu có.

---

## UC-044 Khai Báo Đổ Xăng

**Actor**

- Giáo viên

**Mục tiêu**

Ghi nhận số lít xăng, chi phí và hóa đơn nếu có.

---

## UC-045 Đề Xuất Bảo Dưỡng

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên gửi đề xuất bảo dưỡng xe.

---

## UC-046 Duyệt Bảo Dưỡng

**Actor**

- Quản lý khu vực

**Mục tiêu**

Duyệt đề xuất bảo dưỡng qua một cấp duyệt.

---

# 10. Nghỉ Phép

## UC-047 Gửi Yêu Cầu Nghỉ Phép

**Actor**

- Giáo viên

**Mục tiêu**

Giáo viên gửi yêu cầu nghỉ phép.

---

## UC-048 Duyệt Nghỉ Phép

**Actor**

- Quản lý khu vực

**Mục tiêu**

Quản lý khu vực duyệt hoặc từ chối nghỉ phép.

---

## UC-049 Cấu Hình Quy Tắc Nghỉ Phép

**Actor**

- Admin

**Mục tiêu**

Cấu hình số ngày nghỉ tối đa và số lượng giáo viên tối thiểu còn lại.

---

# 11. Tổng Hợp Giờ Dạy Và Lương

## UC-050 Tổng Hợp Giờ Dạy Giáo Viên

**Actor**

- Admin
- Quản lý khu vực

**Mục tiêu**

Tổng hợp giờ dạy của giáo viên theo nhóm:

- T2-T6.
- T7-CN.
- Đêm.
- Cảm ứng tập.
- Cảm ứng thi.

**Ghi chú**

Phiên bản đầu tiên chưa tính lương tự động thành tiền.

---

## UC-051 Gửi Duyệt Bảng Tổng Hợp Giờ Dạy

**Actor**

- Admin
- Quản lý khu vực

**Mục tiêu**

Gửi bảng tổng hợp giờ dạy cho Giám đốc duyệt.

---

## UC-052 Duyệt Bảng Tổng Hợp Giờ Dạy

**Actor**

- Giám đốc

**Mục tiêu**

Duyệt hoặc từ chối bảng tổng hợp giờ dạy.

---

# 12. Quản Trị Hệ Thống

## UC-053 Quản Lý Gói Học

## UC-054 Cấu Hình Học Phí

## UC-055 Cấu Hình Đợt Thanh Toán

## UC-056 Cấu Hình Giá Học Thêm

## UC-057 Cấu Hình Phí Thi Lại

## UC-058 Quản Lý Tài Khoản

## UC-059 Quản Lý Vai Trò

## UC-060 Quản Lý Phân Quyền

## UC-061 Cấu Hình Hướng Dẫn Thi Sát Hạch

---

# 13. Báo Cáo MVP

## UC-062 Báo Cáo Học Viên Hoàn Thành

## UC-063 Báo Cáo Kết Quả Thi Sát Hạch

## UC-064 Báo Cáo Thông Tin Xe

## UC-065 Báo Cáo Thông Tin Nhân Viên

## UC-066 Báo Cáo Lương/Bảng Tổng Hợp Giờ Dạy

---

# 14. Thông Báo

## UC-067 Xem Thông Báo

## UC-068 Đánh Dấu Thông Báo Đã Đọc

## UC-069 Gửi Thông Báo Tự Động Trong Ứng Dụng

---

# 15. Audit Log

## UC-070 Ghi Audit Log

## UC-071 Tra Cứu Audit Log
