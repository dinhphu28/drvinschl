# Business Rules

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Confirmed Draft

---

# 1. Học Viên Và Tài Khoản

### BR-STU-001 Một Học Viên Có Thể Học Nhiều Khóa

Một học viên có thể tham gia nhiều khóa học khác nhau.

Quy tắc:

- Một học viên có thể có nhiều đăng ký khóa học.
- Mỗi đăng ký khóa học được quản lý độc lập.
- Mỗi đăng ký khóa học gắn với một gói học cụ thể.

### BR-STU-002 Một Tài Khoản Duy Nhất

Mỗi học viên có một tài khoản đăng nhập duy nhất.

### BR-STU-003 Tạo Tài Khoản Học Viên

Tài khoản học viên được tạo thủ công bởi:

- Admin.
- Kế toán.

Hệ thống không tự động tạo tài khoản khi tạo học viên.

### BR-STU-004 Username Học Viên

Tên đăng nhập mặc định của học viên được tạo theo quy tắc:

- Họ tên viết liền.
- Không dấu.

Ví dụ:

```text
Nguyễn Văn A
→ nguyenvana
```

Nếu tên đăng nhập bị trùng, hệ thống phải yêu cầu người tạo tài khoản điều chỉnh.

### BR-STU-005 Mật Khẩu Mặc Định

Mật khẩu mặc định của học viên là số điện thoại học viên.

### BR-STU-006 Đổi Mật Khẩu

Học viên được phép đổi mật khẩu sau khi đăng nhập.

### BR-STU-007 Quên Mật Khẩu

Phiên bản đầu tiên chưa hỗ trợ chức năng quên mật khẩu tự động.

Nếu học viên quên mật khẩu, học viên cần liên hệ Admin để reset mật khẩu.

### BR-STU-008 Hủy Khóa Học

Khi học viên hủy một khóa học, đăng ký khóa học chuyển sang trạng thái:

```text
CANCELLED
```

### BR-STU-009 Audit Thông Tin Học Viên

Các thay đổi thông tin học viên phải được audit log.

Các thông tin cần audit:

- Họ tên.
- Số điện thoại.
- Ngày sinh.
- Địa chỉ.
- Trạng thái học viên.
- Khóa học.

---

# 2. Hồ Sơ

### BR-DOC-001 Hồ Sơ Linh Hoạt

Hồ sơ học viên được quản lý linh hoạt theo từng loại hồ sơ.

Mỗi hồ sơ có thể bao gồm:

- Tên hồ sơ.
- File đính kèm.
- Ghi chú.

### BR-DOC-002 Hồ Sơ Chỉ Có Ghi Chú

Hệ thống cho phép hồ sơ chỉ có ghi chú mà không bắt buộc có file đính kèm.

### BR-DOC-003 Hồ Sơ Chỉ Có File

Hệ thống cho phép hồ sơ chỉ có file đính kèm mà không bắt buộc có ghi chú.

### BR-DOC-004 Hoàn Thiện Hồ Sơ

Việc hoàn thiện hồ sơ do nhân viên Kinh doanh xác nhận thủ công.

### BR-DOC-005 Không Tự Động Kiểm Tra Hồ Sơ

Hệ thống không tự động đánh giá hồ sơ hoàn thiện dựa trên số lượng file đính kèm.

### BR-DOC-006 Đánh Dấu Hoàn Thiện Khi Có Ghi Chú

Nhân viên Kinh doanh có thể đánh dấu hồ sơ là hoàn thiện ngay cả khi một số loại hồ sơ chỉ có ghi chú.

---

# 3. Học Phí

### BR-FEE-001 Nhiều Đợt Thanh Toán

Học phí được chia thành nhiều đợt thanh toán.

### BR-FEE-002 Cấu Hình Đợt Thanh Toán

Số đợt thanh toán được cấu hình linh hoạt bởi Admin.

Admin có thể cấu hình:

- Số đợt thanh toán.
- Tên đợt thanh toán.
- Số tiền hoặc tỷ lệ từng đợt.
- Ghi chú cho từng đợt.

### BR-FEE-003 Lưu Lịch Sử Thanh Toán

Hệ thống phải lưu lịch sử thanh toán.

### BR-FEE-004 Không Xóa Giao Dịch Thanh Toán

Không được xóa vật lý giao dịch đã thanh toán.

### BR-FEE-005 Quyền Hoàn Phí

Chỉ Kế toán được phép ghi nhận hoàn phí.

### BR-FEE-006 Lý Do Hoàn Phí

Mọi giao dịch hoàn phí phải lưu lý do.

### BR-FEE-007 Không Thanh Toán Dư

Không cho phép học viên thanh toán vượt quá công nợ.

Quy tắc:

```text
Tổng đã thanh toán <= Tổng học phí phải thu
```

Nếu số tiền thanh toán vượt quá công nợ, hệ thống phải từ chối giao dịch.

### BR-FEE-008 Hoàn Phí Một Phần

Cho phép hoàn phí một phần.

Quy tắc:

```text
Số tiền hoàn <= Số tiền đã thanh toán
```

### BR-FEE-009 In Phiếu Thu

Hệ thống cần hỗ trợ in phiếu thu.

### BR-FEE-010 Xuất PDF Phiếu Thu

Hệ thống cần hỗ trợ xuất PDF phiếu thu.

---

# 4. Đặt Lịch Học

### BR-SCH-001 Chỉ Đặt Lịch Trống

Học viên chỉ được đặt lịch còn trống.

### BR-SCH-002 Đặt Trước Giờ Bắt Đầu

Học viên có thể đặt lịch miễn là thời điểm đặt trước giờ bắt đầu lịch học.

Quy tắc:

```text
Booking Time < Schedule Start Time
```

### BR-SCH-003 Hủy Trước Giờ Bắt Đầu

Học viên được phép hủy lịch nếu thời điểm hủy trước giờ bắt đầu lịch học.

Quy tắc:

```text
Cancel Time < Schedule Start Time
```

### BR-SCH-004 Không Giới Hạn Số Lịch

Không giới hạn số lượng lịch học viên được đặt.

Điều kiện:

- Không trùng lịch học viên.
- Không xung đột lịch giáo viên nếu đã phân giáo viên.
- Không xung đột lịch xe nếu đã phân xe.

### BR-SCH-005 Không Cần Giáo Vụ Xác Nhận

Học viên đặt lịch không cần giáo vụ xác nhận.

Nếu lịch không vi phạm xung đột, lịch được tạo ngay.

### BR-SCH-006 Không Tự Động Phân Giáo Viên

Giáo vụ không tự động phân giáo viên.

Giáo vụ có thể phân công giáo viên thủ công nếu cần.

### BR-SCH-007 Không Tự Động Phân Xe

Giáo vụ không tự động phân xe.

Giáo vụ có thể phân công xe thủ công nếu cần.

### BR-SCH-008 Không Trùng Lịch Giáo Viên

Một giáo viên không được dạy hai lịch cùng thời điểm.

### BR-SCH-009 Không Trùng Lịch Xe

Một xe không được sử dụng cho hai lịch cùng thời điểm.

### BR-SCH-010 Không Trùng Lịch Học Viên

Một học viên không được học hai lịch cùng thời điểm.

### BR-SCH-011 Lưu Lịch Sử Thay Đổi Lịch

Mọi thay đổi lịch phải ghi nhận:

- Người thay đổi.
- Thời gian thay đổi.
- Nội dung thay đổi.
- Lý do thay đổi nếu có.

### BR-SCH-012 Trạng Thái Lịch Học

Trạng thái lịch học gồm:

```text
BOOKED
CANCELLED
IN_PROGRESS
TEACHER_COMPLETED
STUDENT_CONFIRMED
COMPLETED
```

---

# 5. Buổi Học Và Đào Tạo

### BR-TRAIN-001 Ghi Nhận Buổi Học

Mỗi buổi học phải ghi nhận:

- Học viên.
- Giáo viên nếu có.
- Xe nếu có.
- Thời gian bắt đầu.
- Thời gian kết thúc.
- Loại buổi học.
- Ghi chú nếu có.

### BR-TRAIN-002 Giáo Viên Hoàn Thành Buổi Học

Giáo viên có quyền đánh dấu hoàn thành buổi học.

Hệ thống không tự động tính điều kiện hoàn thành.

### BR-TRAIN-003 Học Viên Xác Nhận Buổi Học

Sau khi giáo viên hoàn thành buổi học, học viên phải xác nhận buổi học.

### BR-TRAIN-004 Trạng Thái Buổi Học

Trạng thái buổi học gồm:

```text
SCHEDULED
IN_PROGRESS
TEACHER_COMPLETED
STUDENT_CONFIRMED
COMPLETED
CANCELLED
```

### BR-TRAIN-005 Đánh Giá Giáo Viên

Sau khi buổi học hoàn thành, học viên được đánh giá giáo viên.

### BR-TRAIN-006 Một Buổi Chỉ Được Đánh Giá Một Lần

Mỗi học viên chỉ được đánh giá một buổi học một lần.

---

# 6. Cabin

### BR-CAB-001 Lưu Tổng Giờ Cabin

Hệ thống phải lưu tổng số giờ cabin.

### BR-CAB-002 Chỉ Tính Cabin Đã Hoàn Thành

Chỉ tính giờ cabin đã hoàn thành.

---

# 7. DAT

### BR-DAT-001 Dữ Liệu DAT

Mỗi buổi DAT phải lưu:

- KM.
- Thời gian.
- Ghi chú nếu có.

### BR-DAT-002 Nhập Tay

Dữ liệu DAT được giáo viên nhập tay.

### BR-DAT-003 Không Tích Hợp Thiết Bị DAT

Hệ thống không tích hợp thiết bị DAT trong phiên bản đầu tiên.

### BR-DAT-004 Ảnh DAT Không Bắt Buộc

Ảnh DAT đầu buổi và cuối buổi không bắt buộc.

### BR-DAT-005 Cộng Dồn KM DAT

KM tổng được cộng dồn từ các buổi DAT đã hoàn thành.

### BR-DAT-006 Cộng Dồn Thời Gian DAT

Thời gian tổng được cộng dồn từ các buổi DAT đã hoàn thành.

---

# 8. Thi Tốt Nghiệp

### BR-GRAD-001 Điều Kiện Thi Tốt Nghiệp

Điều kiện đủ thi tốt nghiệp do Giáo vụ thi xác nhận thủ công.

### BR-GRAD-002 Không Tự Động Kiểm Tra Điều Kiện

Hệ thống không tự động kiểm tra điều kiện thi tốt nghiệp trong phiên bản đầu tiên.

### BR-GRAD-003 Thi Nhiều Lần

Học viên được phép thi tốt nghiệp nhiều lần.

### BR-GRAD-004 Phí Thi Lại Tốt Nghiệp

Thi lại tốt nghiệp có tính phí.

### BR-GRAD-005 Không Xóa Kết Quả Thi

Kết quả thi không được xóa vật lý.

### BR-GRAD-006 Quyền Cập Nhật Kết Quả Thi

Kết quả thi chỉ được cập nhật bởi Giáo vụ thi hoặc Admin.

---

# 9. Thi Sát Hạch

### BR-EXAM-001 Kết Quả Theo 4 Phần

Kết quả thi sát hạch bao gồm:

- Lý thuyết.
- Mô phỏng.
- Sa hình.
- Đường trường.

### BR-EXAM-002 Điều Kiện Thi Sát Hạch

Điều kiện đủ thi sát hạch do Giáo vụ thi xác nhận thủ công.

### BR-EXAM-003 Không Tự Động Kiểm Tra Điều Kiện

Hệ thống không tự động kiểm tra điều kiện thi sát hạch trong phiên bản đầu tiên.

### BR-EXAM-004 Thi Lại Theo Từng Phần

Thi lại tính theo từng phần thi chưa đạt.

### BR-EXAM-005 Học Viên Tự Đăng Ký Thi Lại

Học viên có thể tự đăng ký thi lại các phần chưa đạt.

### BR-EXAM-006 Chi Phí Thi Lại

Chi phí thi lại lấy từ cấu hình hệ thống.

### BR-EXAM-007 Lưu Lịch Sử Thi Lại

Lịch sử thi lại phải được lưu vĩnh viễn.

---

# 10. Giáo Viên

### BR-INS-001 Xem Lịch Dạy Tương Lai

Giáo viên được xem lịch dạy hiện tại và lịch dạy tương lai.

### BR-INS-002 Yêu Cầu Đổi Lịch Dạy

Giáo viên được phép yêu cầu đổi lịch dạy.

### BR-INS-003 Lưu Lịch Sử Đổi Lịch

Mọi thay đổi lịch dạy phải được ghi nhận lịch sử thay đổi.

### BR-INS-004 Điểm Danh

Giáo viên phải điểm danh trước buổi học theo quy định trung tâm.

### BR-INS-005 Chụp Hình Xe

Giáo viên phải chụp hình xe trước khi sử dụng xe.

### BR-INS-006 ODO Đi Không Bắt Buộc

Giáo viên không bắt buộc phải khai báo ODO trước khi xuất bãi.

### BR-INS-007 ODO Về Không Bắt Buộc

Giáo viên không bắt buộc phải khai báo ODO khi kết thúc ngày làm việc.

### BR-INS-008 Hóa Đơn Xăng

Giáo viên phải gửi hóa đơn xăng sau khi đổ xăng nếu có phát sinh khai báo nhiên liệu.

### BR-INS-009 Nghỉ Phép

Giáo viên được gửi yêu cầu nghỉ phép.

### BR-INS-010 Điểm Đánh Giá Trung Bình

Hệ thống cần tính điểm đánh giá trung bình của giáo viên.

Công thức:

```text
Average Rating = Total Rating Score / Number Of Ratings
```

---

# 11. Xe

### BR-CAR-001 Mã Định Danh Xe

Mỗi xe có mã định danh duy nhất.

### BR-CAR-002 Biển Số Xe Duy Nhất

Biển số xe không được trùng.

### BR-CAR-003 Không Gán Cố Định Giáo Viên

Một xe không gán cố định cho một giáo viên.

### BR-CAR-004 Bắt Buộc Chụp Hình Xe

Giáo viên bắt buộc chụp hình xe trước khi sử dụng xe.

### BR-CAR-005 ODO Không Bắt Buộc

ODO đầu và ODO cuối không bắt buộc.

### BR-CAR-006 Kiểm Tra ODO Nếu Có

Nếu có nhập ODO đầu và ODO cuối, hệ thống phải kiểm tra:

```text
ODO cuối >= ODO đầu
```

### BR-CAR-007 Theo Dõi Nhiên Liệu Theo Định Mức

Hệ thống cần theo dõi nhiên liệu theo định mức.

Dữ liệu cần lưu:

- Xe.
- Giáo viên khai báo.
- Số lít nhiên liệu.
- KM vận hành nếu có.
- Chi phí nếu có.
- Hóa đơn nếu có.

### BR-CAR-008 Bảo Dưỡng

Mỗi lần bảo dưỡng phải lưu:

- Ngày bảo dưỡng.
- Nội dung.
- Chi phí.
- Phụ tùng thay thế nếu có.

### BR-CAR-009 Không Xóa Lịch Sử Bảo Dưỡng

Không được xóa vật lý lịch sử bảo dưỡng.

---

# 12. Nghỉ Phép

### BR-LEAVE-001 Gửi Nghỉ Phép

Giáo viên gửi yêu cầu nghỉ phép.

### BR-LEAVE-002 Phê Duyệt Nghỉ Phép

Quản lý khu vực phê duyệt nghỉ phép.

### BR-LEAVE-003 Giới Hạn Nghỉ Phép

Số ngày nghỉ tối đa trong tháng được cấu hình bởi Admin.

Giá trị mặc định:

```text
Unlimited
```

### BR-LEAVE-004 Kiểm Tra Giáo Viên Tối Thiểu

Khi duyệt nghỉ phép, hệ thống phải kiểm tra số lượng giáo viên tối thiểu còn lại.

Nếu số lượng giáo viên còn lại nhỏ hơn ngưỡng cấu hình, hệ thống phải:

- Cảnh báo.
- Hoặc từ chối duyệt nếu cấu hình bắt buộc.

---

# 13. Tổng Hợp Giờ Dạy Và Lương

### BR-PAY-001 Chưa Tính Lương Tự Động

Phiên bản đầu tiên chưa tính lương tự động thành tiền.

### BR-PAY-002 Tổng Hợp Giờ Dạy

Hệ thống chỉ tổng hợp giờ dạy của giáo viên theo nhóm:

- Thứ 2 - Thứ 6.
- Thứ 7 - Chủ nhật.
- Ca đêm.
- Cảm ứng tập.
- Cảm ứng thi.

### BR-PAY-003 Không Phụ Cấp

Không có phụ cấp trong phiên bản đầu tiên.

### BR-PAY-004 Không KPI

Không có thưởng KPI trong phiên bản đầu tiên.

### BR-PAY-005 Không Khấu Trừ

Không có khấu trừ trong phiên bản đầu tiên.

### BR-PAY-006 Người Duyệt

Lương hoặc bảng tổng hợp giờ dạy được duyệt bởi Giám đốc.

### BR-PAY-007 Khóa Bảng Tổng Hợp

Bảng tổng hợp giờ dạy/lương chỉ được khóa sau khi Giám đốc phê duyệt.

---

# 14. Thông Báo

### BR-NOTI-001 Kênh Thông Báo

Phiên bản đầu tiên chỉ hỗ trợ thông báo trong ứng dụng.

### BR-NOTI-002 Không Tích Hợp Kênh Ngoài

Không gửi thông báo qua:

- SMS.
- Email.
- Zalo.

trong phiên bản đầu tiên.

### BR-NOTI-003 Thông Báo Tự Động

Hệ thống cần hỗ trợ gửi thông báo tự động cho các nghiệp vụ chính:

- Nhắc học phí.
- Lịch học.
- Lịch thi.
- Kết quả thi.
- Nghỉ phép.
- Bảo dưỡng.

---

# 15. Báo Cáo

### BR-RPT-001 Báo Cáo MVP

Các báo cáo bắt buộc trong phiên bản đầu tiên gồm:

- Học viên đã hoàn thành khóa học.
- Kết quả thi sát hạch của tất cả học viên.
- Thông tin xe.
- Thông tin nhân viên.
- Lương hoặc bảng tổng hợp giờ dạy.

### BR-RPT-002 Không Xuất Excel

Phiên bản đầu tiên không cần xuất Excel.

### BR-RPT-003 Không Xuất PDF Báo Cáo

Phiên bản đầu tiên không cần xuất PDF báo cáo.

---

# 16. Dữ Liệu Và Audit

### BR-DATA-001 Soft Delete

Dữ liệu nghiệp vụ chỉ được soft delete.

### BR-DATA-002 Audit Log Không Được Xóa

Audit log không được xóa.

### BR-AUDIT-001 Đối Tượng Bắt Buộc Audit

Các đối tượng bắt buộc audit:

- Học viên.
- Học phí.
- Hoàn phí.
- Kết quả thi.
- Lương hoặc bảng tổng hợp giờ dạy.
- Phân quyền.
- Tài khoản người dùng.
- Reset mật khẩu.

### BR-AUDIT-002 Audit Khi Xóa

Mọi thao tác xóa mềm phải lưu audit log.

### BR-AUDIT-003 Audit Khi Thay Đổi Phân Quyền

Mọi thay đổi phân quyền phải lưu audit log.
