# BUSINESS RULES

## 1. HỌC VIÊN

### BR-STU-001

Mỗi học viên chỉ thuộc một khóa học tại một thời điểm.

### BR-STU-002

Mỗi học viên có một tài khoản duy nhất.

### BR-STU-003

Tên đăng nhập được sinh tự động theo quy tắc:

- Họ tên viết liền
- Không dấu

### BR-STU-004

Mật khẩu mặc định là số điện thoại học viên.

### BR-STU-005

Học viên phải hoàn thiện hồ sơ trước khi được xét thi tốt nghiệp.

### BR-STU-006

Học viên phải hoàn thành học phí trước khi được xét thi sát hạch.

------

# 2. HỒ SƠ

### BR-DOC-001

Hồ sơ học viên bao gồm:

- Đơn đăng ký học lái xe
- Ảnh học viên
- Giấy khám sức khỏe

### BR-DOC-002

Hồ sơ chỉ được đánh dấu hoàn thành khi đầy đủ toàn bộ giấy tờ bắt buộc.

------

# 3. HỌC PHÍ

### BR-FEE-001

Học phí được chia thành nhiều đợt thanh toán.

### BR-FEE-002

Hệ thống phải lưu lịch sử thanh toán.

### BR-FEE-003

Không được xóa giao dịch đã thanh toán.

### BR-FEE-004

Chỉ kế toán được phép hoàn phí.

### BR-FEE-005

Mọi giao dịch hoàn phí phải lưu lý do.

------

# 4. ĐẶT LỊCH HỌC

### BR-SCH-001

Học viên chỉ được đặt lịch còn trống.

### BR-SCH-002

Một giáo viên không được dạy hai lịch cùng thời điểm.

### BR-SCH-003

Một xe không được sử dụng cho hai lịch cùng thời điểm.

### BR-SCH-004

Một học viên không được học hai lớp cùng thời điểm.

### BR-SCH-005

Lịch học sau khi xác nhận phải lưu lịch sử thay đổi.

### BR-SCH-006

Mọi thay đổi lịch phải ghi nhận:

- Người thay đổi
- Thời gian thay đổi
- Nội dung thay đổi

------

# 5. THỰC HÀNH CƠ BẢN

### BR-PRAC-001

Mỗi buổi học phải ghi nhận:

- Giáo viên
- Xe
- Thời gian bắt đầu
- Thời gian kết thúc

### BR-PRAC-002

Sau khi kết thúc buổi học, học viên được đánh giá giáo viên.

### BR-PRAC-003

Mỗi buổi học chỉ được đánh giá một lần.

------

# 6. CABIN

### BR-CAB-001

Hệ thống phải lưu tổng số giờ cabin.

### BR-CAB-002

Chỉ tính giờ cabin đã hoàn thành.

------

# 7. DAT

### BR-DAT-001

Mỗi buổi DAT phải lưu:

- KM
- Thời gian

### BR-DAT-002

KM tổng được cộng dồn từ các buổi DAT.

### BR-DAT-003

Thời gian tổng được cộng dồn từ các buổi DAT.

### BR-DAT-004

Giáo viên phải chụp màn hình DAT lúc bắt đầu.

### BR-DAT-005

Giáo viên phải chụp màn hình DAT lúc kết thúc.

------

# 8. THI TỐT NGHIỆP

### BR-GRAD-001

Chỉ học viên đủ điều kiện mới được đưa vào danh sách thi.

### BR-GRAD-002

Kết quả thi không được xóa.

### BR-GRAD-003

Kết quả thi chỉ được cập nhật bởi giáo vụ thi.

------

# 9. THI SÁT HẠCH

### BR-EXAM-001

Kết quả bao gồm:

- Lý thuyết
- Mô phỏng
- Sa hình
- Đường trường

### BR-EXAM-002

Nếu học viên trượt bất kỳ phần nào được phép đăng ký thi lại.

### BR-EXAM-003

Chi phí thi lại lấy từ cấu hình hệ thống.

### BR-EXAM-004

Lịch sử thi lại phải được lưu vĩnh viễn.

------

# 10. GIÁO VIÊN

### BR-INS-001

Giáo viên phải điểm danh trước buổi học.

### BR-INS-002

Giáo viên phải khai báo ODO trước khi xuất bãi.

### BR-INS-003

Giáo viên phải khai báo ODO khi kết thúc ngày làm việc.

### BR-INS-004

Giáo viên phải gửi hóa đơn xăng sau khi đổ xăng.

### BR-INS-005

Giáo viên được gửi yêu cầu nghỉ phép.

------

# 11. XE

### BR-CAR-001

Mỗi xe có mã định danh duy nhất.

### BR-CAR-002

Mỗi lần sử dụng xe phải ghi nhận:

- ODO đi
- ODO về

### BR-CAR-003

ODO về phải lớn hơn hoặc bằng ODO đi.

### BR-CAR-004

Mỗi lần bảo dưỡng phải lưu:

- Ngày bảo dưỡng
- Nội dung
- Chi phí

### BR-CAR-005

Không được xóa lịch sử bảo dưỡng.

------

# 12. NGHỈ PHÉP

### BR-LEAVE-001

Giáo viên gửi yêu cầu nghỉ phép.

### BR-LEAVE-002

Quản lý khu vực phê duyệt nghỉ phép.

### BR-LEAVE-003

Hai giáo viên không được nghỉ cùng ngày theo cấu hình hiện hành.

------

# 13. LƯƠNG

### BR-PAY-001

Lương được tính theo số giờ dạy.

### BR-PAY-002

Giờ ngày thường và cuối tuần có hệ số khác nhau.

### BR-PAY-003

Giờ đêm có hệ số riêng.

### BR-PAY-004

Lương chỉ được khóa sau khi giám đốc phê duyệt.

------

# 14. BẢO MẬT

### BR-SEC-001

Mọi thao tác chỉnh sửa phải lưu audit log.

### BR-SEC-002

Mọi thao tác xóa phải lưu audit log.

### BR-SEC-003

Mọi thay đổi học phí phải lưu audit log.

### BR-SEC-004

Mọi thay đổi kết quả thi phải lưu audit log.

### BR-SEC-005

Mọi thay đổi phân quyền phải lưu audit log.