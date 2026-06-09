# HỆ THỐNG QUẢN LÝ TRUNG TÂM ĐÀO TẠO LÁI XE

## 1. Giới Thiệu

### 1.1 Mục Tiêu

Xây dựng hệ thống quản lý toàn bộ quy trình đào tạo lái xe từ khi học viên đăng ký khóa học đến khi hoàn thành khóa học và nhận bằng.

### 1.2 Phạm Vi

Hệ thống hỗ trợ:

- Quản lý học viên
- Quản lý hồ sơ
- Quản lý học phí
- Quản lý lịch học
- Quản lý đào tạo
- Quản lý thi cử
- Quản lý giáo viên
- Quản lý xe
- Quản lý nhân sự
- Quản lý lương
- Báo cáo thống kê

### 1.3 Vai Trò Người Dùng

- Học viên
- Kinh doanh
- Kế toán
- Giáo vụ khu vực
- Giáo vụ sa hình
- Giáo vụ thi
- Giáo viên
- Quản lý khu vực
- Quản lý xe
- Quản trị hệ thống
- Giám đốc

------

# 2. Quy Trình Nghiệp Vụ Tổng Thể

## 2.1 Vòng Đời Học Viên

Khách hàng tiềm năng

→ Ký hợp đồng

→ Tạo hồ sơ học viên

→ Hoàn thiện hồ sơ

→ Đóng học phí

→ Học lý thuyết

→ Học mô phỏng

→ Học thực hành cơ bản

→ Học cabin

→ Học DAT đường trường

→ Học sa hình

→ Thi tốt nghiệp

→ Thi sát hạch

→ Nhận bằng

→ Hoàn thành khóa học

------

# 3. Quản Lý Học Viên

## Mục Tiêu

Quản lý toàn bộ thông tin và quá trình học tập của học viên.

## Chức Năng

### FR-STU-001 Đăng Nhập

Học viên đăng nhập hệ thống bằng tài khoản được cấp.

### FR-STU-002 Xem Hồ Sơ

Hiển thị:

- Họ tên
- Ngày sinh
- Số điện thoại
- Khóa học
- Ngày nộp khám sức khỏe
- Ngày khai giảng
- Ngày bế giảng
- Ngày thanh lý hồ sơ

### FR-STU-003 Theo Dõi Tiến Độ

Hiển thị tiến độ đào tạo theo từng giai đoạn:

- Hồ sơ
- Học phí
- Lý thuyết
- Mô phỏng
- Thực hành cơ bản
- Cabin
- DAT
- Sa hình
- Thi tốt nghiệp
- Thi sát hạch
- Nhận bằng

### FR-STU-004 Đánh Giá Giáo Viên

Sau mỗi buổi học học viên được:

- Chấm điểm từ 1 đến 5 sao
- Nhập nhận xét

------

# 4. Quản Lý Hồ Sơ

## FR-DOC-001 Hồ Sơ Học Viên

Lưu trữ:

- Đơn đăng ký học lái xe
- Ảnh học viên
- Giấy khám sức khỏe
- Hợp đồng đào tạo

## Quy Tắc Nghiệp Vụ

BR-DOC-001

Học viên phải hoàn thiện hồ sơ trước khi được xét điều kiện thi.

------

# 5. Quản Lý Học Phí

## FR-FEE-001 Thu Học Phí

Ghi nhận các khoản:

- Học phí lần 1
- Học phí lần 2
- Học phí cuối

## FR-FEE-002 Theo Dõi Công Nợ

Hiển thị:

- Tổng học phí
- Đã thanh toán
- Còn phải thanh toán

## FR-FEE-003 Nhắc Học Phí

Tự động thông báo học phí còn thiếu.

## FR-FEE-004 Hoàn Phí

Kế toán thực hiện hoàn phí khi học viên hủy khóa học.

------

# 6. Quản Lý Lịch Học

## FR-SCH-001 Đặt Lịch Học

Học viên được xem lịch trống và đặt lịch học.

Áp dụng cho:

- 4H cơ bản
- Cabin
- DAT
- Sa hình thô

## FR-SCH-002 Xử Lý Lịch Đặt

Giáo vụ:

- Tiếp nhận lịch
- Phân công giáo viên
- Phân công xe

## FR-SCH-003 Điều Chỉnh Lịch

Giáo vụ được phép:

- Đổi giáo viên
- Đổi xe
- Dời lịch học

------

# 7. Quản Lý Đào Tạo

## FR-TRAIN-001 Học Lý Thuyết

Cập nhật lịch học lý thuyết.

## FR-TRAIN-002 Học Mô Phỏng

Cập nhật lịch học mô phỏng.

## FR-TRAIN-003 Thực Hành Cơ Bản

Theo dõi:

- Số giờ học
- Lịch sử buổi học
- Giáo viên phụ trách

## FR-TRAIN-004 Cabin

Theo dõi:

- Số giờ cabin
- Lịch sử học cabin

## FR-TRAIN-005 DAT Đường Trường

Theo dõi:

- KM yêu cầu
- KM đã học
- KM còn lại
- Tổng thời gian học

## FR-TRAIN-006 Sa Hình

Theo dõi toàn bộ quá trình học sa hình.

------

# 8. Thi Tốt Nghiệp

## FR-GRAD-001 Lập Danh Sách Thi

Giáo vụ thi lập danh sách học viên đủ điều kiện.

## FR-GRAD-002 Công Bố Lịch Thi

Thông báo ngày thi cho học viên.

## FR-GRAD-003 Cập Nhật Kết Quả

Cập nhật kết quả thi tốt nghiệp.

------

# 9. Thi Sát Hạch

## FR-EXAM-001 Lập Danh Sách Thi

Tạo danh sách học viên đủ điều kiện thi sát hạch.

## FR-EXAM-002 Công Bố Lịch Thi

Thông báo lịch thi sát hạch.

## FR-EXAM-003 Cập Nhật Kết Quả

Cập nhật kết quả:

- Lý thuyết
- Mô phỏng
- Sa hình
- Đường trường

## FR-EXAM-004 Đăng Ký Thi Lại

Cho phép học viên đăng ký thi lại các phần chưa đạt.

------

# 10. Quản Lý Giáo Viên

## FR-INS-001 Quản Lý Lịch Dạy

Giáo viên xem lịch giảng dạy.

## FR-INS-002 Điểm Danh

Giáo viên điểm danh trước buổi học.

## FR-INS-003 Báo Cáo Buổi Học

Ghi nhận:

- Thời gian
- Số KM
- Học viên tham gia

## FR-INS-004 Báo Cáo Nhiên Liệu

Khai báo:

- Số lít xăng
- Hóa đơn xăng

## FR-INS-005 Nghỉ Phép

Tạo yêu cầu nghỉ phép.

------

# 11. Quản Lý Xe

## FR-CAR-001 Hồ Sơ Xe

Lưu thông tin:

- Đăng kiểm
- Bảo hiểm
- Giấy phép tập lái
- Chủ quyền xe

## FR-CAR-002 Theo Dõi Hoạt Động

Theo dõi:

- ODO đi
- ODO về
- Giờ xe đi
- Giờ xe về

## FR-CAR-003 Bảo Dưỡng

Quản lý:

- Lịch sử bảo dưỡng
- Lịch sử thay thế phụ tùng

## FR-CAR-004 Đề Xuất Bảo Dưỡng

Giáo viên gửi đề xuất bảo dưỡng.

------

# 12. Quản Lý Nhân Sự

## FR-HR-001 Nghỉ Phép

Quản lý yêu cầu nghỉ phép.

## FR-HR-002 Phê Duyệt Nghỉ Phép

Quản lý khu vực thực hiện phê duyệt.

## Quy Tắc Nghiệp Vụ

BR-HR-001

Không cho phép hai giáo viên nghỉ cùng ngày theo cấu hình hệ thống.

------

# 13. Quản Lý Lương

## FR-PAY-001 Tính Lương

Tính lương theo:

- Giờ dạy ngày thường
- Giờ dạy cuối tuần
- Giờ dạy ban đêm
- Giờ dạy cảm ứng tập
- Giờ thi

## FR-PAY-002 Duyệt Lương

Quản lý gửi bảng lương.

Giám đốc phê duyệt.

------

# 14. Quản Trị Hệ Thống

## FR-ADM-001 Quản Lý Gói Học

Cấu hình:

- A1
- A
- B số sàn
- B tự động
- C1

## FR-ADM-002 Cấu Hình Giá

Cấu hình:

- Học phí
- Học thêm
- Thi lại

## FR-ADM-003 Quản Lý Tài Khoản

Quản lý tài khoản người dùng.

## FR-ADM-004 Quản Lý Phân Quyền

Quản lý quyền truy cập hệ thống.

------

# 15. Báo Cáo

## Báo Cáo Học Viên

- Tổng học viên
- Học viên đang học
- Học viên hoàn thành

## Báo Cáo Thi

- Tỷ lệ đậu
- Tỷ lệ rớt
- Số lượng thi lại

## Báo Cáo Giáo Viên

- Giờ dạy
- Lương
- Đánh giá

## Báo Cáo Xe

- KM hoạt động
- Tiêu hao nhiên liệu
- Chi phí bảo dưỡng