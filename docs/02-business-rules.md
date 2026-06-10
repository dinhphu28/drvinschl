# BUSINESS RULES

## 1. HỌC VIÊN

### BR-STU-001

Một học viên có thể tham gia nhiều khóa học khác nhau.

Quy tắc:

- Một học viên có thể có nhiều đăng ký khóa học.
- Mỗi đăng ký khóa học được quản lý độc lập.
- Mỗi đăng ký khóa học gắn với một gói học cụ thể.

### BR-STU-002

Mỗi học viên có một tài khoản đăng nhập duy nhất.

### BR-STU-003

Tài khoản học viên được tạo thủ công bởi:

- Admin
- Kế toán

Hệ thống không tự động tạo tài khoản khi tạo học viên.

### BR-STU-004

Tên đăng nhập mặc định của học viên được tạo theo quy tắc:

- Họ tên viết liền
- Không dấu

Ví dụ:

Nguyễn Văn A
→ nguyenvana

Nếu tên đăng nhập bị trùng, hệ thống phải yêu cầu người tạo tài khoản điều chỉnh.

### BR-STU-005

Mật khẩu mặc định của học viên là số điện thoại học viên.

### BR-STU-006

Học viên được phép đổi mật khẩu sau khi đăng nhập.

### BR-STU-007

Phiên bản đầu tiên chưa hỗ trợ chức năng quên mật khẩu.

Nếu học viên quên mật khẩu, học viên cần liên hệ Admin để reset mật khẩu.

### BR-STU-008

Khi học viên hủy một khóa học, đăng ký khóa học chuyển sang trạng thái:

```
CANCELLED
```

### BR-STU-009

Các thay đổi thông tin học viên phải được audit log.

Các thông tin cần audit:

- Họ tên
- Số điện thoại
- Ngày sinh
- Địa chỉ
- Trạng thái học viên
- Khóa học

------

# 2. HỒ SƠ

### BR-DOC-001

Hồ sơ học viên được quản lý linh hoạt theo từng loại hồ sơ. Mỗi hồ sơ có thể bao gồm:

- Tên hồ sơ
- File đính kèm
- Ghi chú

### BR-DOC-002

Hệ thống cho phép hồ sơ chỉ có ghi chú mà không bắt buộc có file đính kèm.

### BR-DOC-003

Hệ thống cho phép hồ sơ chỉ có file đính kèm mà không bắt buộc có ghi chú.

### BR-DOC-004

Việc hoàn thiện hồ sơ do nhân viên kinh doanh xác nhận thủ công.

### BR-DOC-005

Hệ thống không tự động đánh giá hồ sơ hoàn thiện dựa trên số lượng file đính kèm.

### BR-DOC-006

Nhân viên kinh doanh có thể đánh dấu hồ sơ là hoàn thiện ngay cả khi một số loại hồ sơ chỉ có ghi chú.

------

# 3. HỌC PHÍ

### BR-FEE-001

Học phí được chia thành nhiều đợt thanh toán.

### BR-FEE-002

Số đợt thanh toán được cấu hình linh hoạt bởi Admin.

Admin có thể cấu hình:

- Số đợt thanh toán
- Tên đợt thanh toán
- Số tiền hoặc tỷ lệ từng đợt
- Ghi chú cho từng đợt

### BR-FEE-003

Hệ thống phải lưu lịch sử thanh toán.

### BR-FEE-004

Không được xóa vật lý giao dịch đã thanh toán.

### BR-FEE-005

Chỉ kế toán được phép ghi nhận hoàn phí.

### BR-FEE-006

Mọi giao dịch hoàn phí phải lưu lý do.

### BR-FEE-007

Không cho phép học viên thanh toán vượt quá công nợ.

Quy tắc:

Tổng đã thanh toán <= Tổng học phí phải thu

Nếu số tiền thanh toán vượt quá công nợ, hệ thống phải từ chối giao dịch.

### BR-FEE-008

Cho phép hoàn phí một phần.

Quy tắc:

```
Số tiền hoàn <= Số tiền đã thanh toán
```

### BR-FEE-009

Hệ thống cần hỗ trợ in phiếu thu.

### BR-FEE-010

Hệ thống cần hỗ trợ xuất PDF phiếu thu.

------

# 4. ĐẶT LỊCH HỌC

### BR-SCH-001

Học viên chỉ được đặt lịch còn trống.

### BR-SCH-002

Học viên có thể đặt lịch miễn là thời điểm đặt trước giờ bắt đầu lịch học.

Quy tắc:

Booking Time < Schedule Start Time

### BR-SCH-003

Học viên được phép hủy lịch nếu thời điểm hủy trước giờ bắt đầu lịch học.

Quy tắc:

```
Cancel Time < Schedule Start Time
```

### BR-SCH-004

Không giới hạn số lượng lịch học viên được đặt.

Điều kiện:

- Không trùng lịch học viên
- Không xung đột lịch giáo viên nếu đã phân giáo viên
- Không xung đột lịch xe nếu đã phân xe

### BR-SCH-005

Học viên đặt lịch không cần giáo vụ xác nhận.

Nếu lịch không vi phạm xung đột, lịch được tạo ngay.

### BR-SCH-006

Giáo vụ không tự động phân giáo viên.

Giáo vụ có thể phân công giáo viên thủ công nếu cần.

### BR-SCH-007

Giáo vụ không tự động phân xe.

Giáo vụ có thể phân công xe thủ công nếu cần.

### BR-SCH-008

Một giáo viên không được dạy hai lịch cùng thời điểm.

### BR-SCH-009

Một xe không được sử dụng cho hai lịch cùng thời điểm.

### BR-SCH-010

Một học viên không được học hai lịch cùng thời điểm.

### BR-SCH-011

Mọi thay đổi lịch phải ghi nhận:

- Người thay đổi
- Thời gian thay đổi
- Nội dung thay đổi
- Lý do thay đổi nếu có

### BR-SCH-012

Trạng thái lịch học gồm:

```
BOOKED
CANCELLED
IN_PROGRESS
TEACHER_COMPLETED
STUDENT_CONFIRMED
COMPLETED
```

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
- Ghi chú nếu có

### BR-DAT-002

Dữ liệu DAT được giáo viên nhập tay.

### BR-DAT-003

Hệ thống không tích hợp thiết bị DAT trong phiên bản đầu tiên.

### BR-DAT-004

Ảnh DAT đầu buổi và cuối buổi không bắt buộc.

### BR-DAT-005

KM tổng được cộng dồn từ các buổi DAT đã hoàn thành.

### BR-DAT-006

Thời gian tổng được cộng dồn từ các buổi DAT đã hoàn thành.

------

# 8. THI TỐT NGHIỆP

### BR-GRAD-001

Điều kiện đủ thi tốt nghiệp do giáo vụ thi xác nhận thủ công.

### BR-GRAD-002

Hệ thống không tự động kiểm tra điều kiện thi tốt nghiệp trong phiên bản đầu tiên.

### BR-GRAD-003

Học viên được phép thi tốt nghiệp nhiều lần.

### BR-GRAD-004

Thi lại tốt nghiệp có tính phí.

### BR-GRAD-005

Kết quả thi không được xóa vật lý.

### BR-GRAD-006

Kết quả thi chỉ được cập nhật bởi giáo vụ thi hoặc Admin.

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

Giáo viên được xem lịch dạy hiện tại và lịch dạy tương lai.

### BR-INS-002

Giáo viên được phép yêu cầu đổi lịch dạy.

### BR-INS-003

Mọi thay đổi lịch dạy phải được ghi nhận lịch sử thay đổi.

### BR-INS-004

Giáo viên phải điểm danh trước buổi học theo quy định trung tâm.

### BR-INS-005

Giáo viên phải chụp hình xe trước khi sử dụng xe.

### BR-INS-006

Giáo viên không bắt buộc phải khai báo ODO trước khi xuất bãi.

### BR-INS-007

Giáo viên không bắt buộc phải khai báo ODO khi kết thúc ngày làm việc.

### BR-INS-008

Giáo viên phải gửi hóa đơn xăng sau khi đổ xăng nếu có phát sinh khai báo nhiên liệu.

### BR-INS-009

Giáo viên được gửi yêu cầu nghỉ phép.

### BR-INS-010

Hệ thống cần tính điểm đánh giá trung bình của giáo viên.

Công thức:

Average Rating = Total Rating Score / Number Of Ratings

------

# 11. XE

### BR-CAR-001

Mỗi xe có mã định danh duy nhất.

### BR-CAR-002

Biển số xe không được trùng.

### BR-CAR-003

Một xe không gán cố định cho một giáo viên.

### BR-CAR-004

Giáo viên bắt buộc chụp hình xe trước khi sử dụng xe.

### BR-CAR-005

ODO đầu và ODO cuối không bắt buộc.

### BR-CAR-006

Nếu có nhập ODO đầu và ODO cuối, hệ thống phải kiểm tra:

ODO cuối >= ODO đầu

### BR-CAR-007

Hệ thống cần theo dõi nhiên liệu theo định mức.

Dữ liệu cần lưu:

- Xe
- Giáo viên khai báo
- Số lít nhiên liệu
- KM vận hành nếu có
- Chi phí nếu có
- Hóa đơn nếu có

### BR-CAR-008

Mỗi lần bảo dưỡng phải lưu:

- Ngày bảo dưỡng
- Nội dung
- Chi phí
- Phụ tùng thay thế nếu có

### BR-CAR-009

Không được xóa vật lý lịch sử bảo dưỡng.

------

# 12. NGHỈ PHÉP

### BR-LEAVE-001

Giáo viên gửi yêu cầu nghỉ phép.

### BR-LEAVE-002

Quản lý khu vực phê duyệt nghỉ phép.

### BR-LEAVE-003

Số ngày nghỉ tối đa trong tháng được cấu hình bởi Admin.

Giá trị mặc định:

Unlimited

### BR-LEAVE-004

Khi duyệt nghỉ phép, hệ thống phải kiểm tra số lượng giáo viên tối thiểu còn lại.

Nếu số lượng giáo viên còn lại nhỏ hơn ngưỡng cấu hình, hệ thống phải:

- Cảnh báo
- Hoặc từ chối duyệt nếu cấu hình bắt buộc

------

# 13. LƯƠNG

### BR-PAY-001

Phiên bản đầu tiên chưa tính lương tự động thành tiền.

### BR-PAY-002

Hệ thống chỉ tổng hợp giờ dạy của giáo viên theo nhóm:

- Thứ 2
- Thứ 6
- Thứ 7
- Chủ nhật
- Ca đêm
- Cảm ứng tập
- Cảm ứng thi

### BR-PAY-003

Không có phụ cấp trong phiên bản đầu tiên.

### BR-PAY-004

Không có thưởng KPI trong phiên bản đầu tiên.

### BR-PAY-005

Không có khấu trừ trong phiên bản đầu tiên.

### BR-PAY-006

Lương hoặc bảng tổng hợp giờ dạy được duyệt bởi Giám đốc.

### BR-PAY-007

Bảng lương chỉ được khóa sau khi Giám đốc phê duyệt.

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

---

# 15. THÔNG BÁO

### BR-NOTI-001

Phiên bản đầu tiên chỉ hỗ trợ thông báo trong ứng dụng.

### BR-NOTI-002

Không gửi thông báo qua:

- SMS
- Email
- Zalo trong phiên bản đầu tiên.

### BR-NOTI-003

Hệ thống cần hỗ trợ gửi thông báo tự động cho các nghiệp vụ chính:

- Nhắc học phí
- Lịch học
- Lịch thi
- Kết quả thi
- Nghỉ phép
- Bảo dưỡng

------

# 16. BÁO CÁO

### BR-RPT-001

Các báo cáo bắt buộc trong phiên bản đầu tiên gồm:

- Học viên đã hoàn thành khóa học
- Kết quả thi sát hạch của tất cả học viên
- Thông tin xe
- Thông tin nhân viên
- Lương hoặc bảng tổng hợp giờ dạy

### BR-RPT-002

Phiên bản đầu tiên không cần xuất Excel.

### BR-RPT-003

Phiên bản đầu tiên không cần xuất PDF báo cáo.

------

# 17. DỮ LIỆU VÀ AUDIT

### BR-DATA-001

Dữ liệu nghiệp vụ chỉ được soft delete.

### BR-DATA-002

Audit log không được xóa.

### BR-AUDIT-001

Các đối tượng bắt buộc audit:

- Học viên
- Học phí
- Hoàn phí
- Kết quả thi
- Lương
- Phân quyền
- Tài khoản người dùng

