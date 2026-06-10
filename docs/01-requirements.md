# Requirements

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0
Status: Draft

---

# 1. Giới Thiệu

## 1.1 Mục Đích

Tài liệu này mô tả phạm vi, quy trình nghiệp vụ và các yêu cầu chức năng chính của hệ thống quản lý trung tâm đào tạo lái xe.

Tài liệu được dùng để:

* Khách hàng xác nhận phạm vi hệ thống
* Developer hiểu chức năng cần triển khai
* QA xây dựng test case
* AI Agent hỗ trợ phân tích, thiết kế và sinh mã nguồn

---

## 1.2 Mục Tiêu Hệ Thống

Hệ thống nhằm số hóa toàn bộ quy trình vận hành trung tâm đào tạo lái xe, bao gồm:

* Quản lý học viên
* Quản lý hồ sơ học viên
* Quản lý học phí
* Quản lý lịch học
* Quản lý đào tạo thực hành
* Quản lý thi tốt nghiệp
* Quản lý thi sát hạch
* Quản lý giáo viên
* Quản lý xe
* Quản lý nhân sự
* Quản lý nghỉ phép
* Quản lý lương
* Quản lý báo cáo, thống kê

---

## 1.3 Phạm Vi

### Trong phạm vi

Hệ thống bao gồm:

* Web Admin cho nhân viên trung tâm
* Ứng dụng hoặc giao diện cho học viên
* Quản lý học viên từ lúc đăng ký đến khi nhận bằng
* Quản lý đặt lịch học
* Quản lý giáo viên, xe, lịch dạy
* Quản lý học phí, phí học thêm, phí thi lại
* Quản lý thi tốt nghiệp và thi sát hạch
* Quản lý nghỉ phép và tính lương
* Báo cáo vận hành

### Ngoài phạm vi

Các chức năng sau chưa nằm trong phạm vi mặc định:

* Thanh toán online
* Tích hợp ngân hàng
* Ký hợp đồng điện tử
* Tích hợp SMS Gateway
* Tích hợp hệ thống DAT bên ngoài
* Tích hợp hệ thống quản lý nhà nước
* ERP kế toán đầy đủ
* Quên mật khẩu tự động
* Đăng nhập Google/Facebook
* Tích hợp thiết bị DAT
* Tích hợp SMS Provider
* Tích hợp Zalo
* Tích hợp Email notification
* Xuất Excel báo cáo
* Xuất PDF báo cáo
* Tính lương tự động thành tiền

---

# 2. Vai Trò Người Dùng

## 2.1 Học Viên

Học viên sử dụng hệ thống để:

* Đăng nhập
* Xem thông tin cá nhân
* Theo dõi tiến độ học
* Xem học phí
* Nhận thông báo học phí
* Xem lịch học
* Đặt lịch học
* Đánh giá giáo viên
* Đăng ký học thêm
* Xem lịch thi
* Xem kết quả thi
* Đăng ký thi lại
* Theo dõi ngày nhận bằng

---

## 2.2 Kinh Doanh

Kinh doanh sử dụng hệ thống để:

* Tư vấn khách hàng
* Theo dõi học viên phụ trách
* Nhắc học viên đóng phí
* Nhắc học viên nộp giấy khám sức khỏe
* Hoàn thiện hồ sơ học viên
* Gửi lịch học lý thuyết, mô phỏng
* Hướng dẫn học viên học online
* Theo dõi hoa hồng

---

## 2.3 Kế Toán

Kế toán sử dụng hệ thống để:

* Tạo tài khoản học viên
* Thu học phí
* Ghi nhận thanh toán
* Hoàn phí
* Theo dõi công nợ
* Ghi nhận phí học thêm
* Ghi nhận phí thi lại
* Theo dõi chi phí xăng xe
* Xem lương nhân viên kế toán

---

## 2.4 Giáo Vụ Khu Vực

Giáo vụ khu vực sử dụng hệ thống để:

* Tiếp nhận lịch học học viên đã đặt
* Xử lý lịch học
* Phân công giáo viên
* Phân công xe
* Chủ động xếp lịch cho học viên
* Nhắc học viên đóng phí lần cuối
* Cập nhật trạng thái nhận bằng
* Theo dõi lương nhân viên

---

## 2.5 Giáo Vụ Sa Hình

Giáo vụ sa hình sử dụng hệ thống để:

* Tiếp nhận lịch học sa hình
* Xử lý lịch học sa hình
* Phân công giáo viên
* Phân công xe
* Chủ động xếp lịch học sa hình
* Theo dõi lương nhân viên

---

## 2.6 Giáo Vụ Thi

Giáo vụ thi sử dụng hệ thống để:

* Lập danh sách học viên đủ điều kiện thi tốt nghiệp
* Cập nhật lịch thi tốt nghiệp
* Cập nhật kết quả thi tốt nghiệp
* Lập danh sách học viên đủ điều kiện thi sát hạch
* Cập nhật lịch thi sát hạch
* Cập nhật kết quả thi sát hạch
* Ghi nhận học viên đăng ký thi lại
* Theo dõi lương nhân viên

---

## 2.7 Giáo Viên

Giáo viên sử dụng hệ thống để:

* Xem lịch dạy
* Điểm danh
* Báo cáo tình trạng xe
* Khai báo ODO đi
* Khai báo ODO về
* Báo cáo buổi học
* Ghi nhận thời gian học
* Ghi nhận số km
* Upload hình ảnh DAT
* Upload hóa đơn xăng
* Gửi yêu cầu nghỉ phép
* Gửi đề xuất bảo dưỡng xe
* Xem thống kê giờ dạy
* Xem thông tin xe phụ trách

---

## 2.8 Quản Lý Khu Vực

Quản lý khu vực sử dụng hệ thống để:

* Theo dõi điểm danh giáo viên
* Theo dõi thời gian xe đi, xe về
* Quản lý nhân sự khu vực
* Duyệt nghỉ phép giáo viên
* Theo dõi lương giáo viên
* Duyệt đề xuất bảo dưỡng xe

---

## 2.9 Quản Trị Hệ Thống

Quản trị hệ thống sử dụng hệ thống để:

* Quản lý tài khoản
* Quản lý phân quyền
* Cấu hình gói học
* Cấu hình học phí
* Cấu hình phí học thêm
* Cấu hình phí thi lại
* Cấu hình quy trình nghỉ phép
* Cấu hình hướng dẫn thi sát hạch
* Quản lý tài khoản nhân viên

---

## 2.10 Giám Đốc

Giám đốc sử dụng hệ thống để:

* Theo dõi hoạt động toàn trung tâm
* Theo dõi xe toàn hệ thống
* Theo dõi kết quả thi sát hạch
* Theo dõi học viên hoàn thành khóa học
* Theo dõi nhân sự
* Duyệt lương, thưởng

---

# 3. Quy Trình Nghiệp Vụ Tổng Thể

## 3.1 Vòng Đời Học Viên

```text
Khách hàng
→ Tư vấn
→ Ký hợp đồng
→ Tạo tài khoản học viên
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
```

---

## 3.2 Quy Trình Đặt Lịch Học

```text
Học viên xem lịch trống
→ Học viên chọn lịch
→ Hệ thống kiểm tra xung đột lịch
→ Nếu không xung đột: lịch được tạo ngay
→ Giáo vụ có thể phân công giáo viên/xe thủ công nếu cần
→ Học viên đi học
→ Giáo viên ghi nhận hoàn thành buổi học
→ Học viên xác nhận buổi học
→ Học viên đánh giá giáo viên
→ Hệ thống cập nhật tiến độ học

Ghi chú:

Lịch học không cần giáo vụ xác nhận.
Hệ thống không tự động phân giáo viên.
Hệ thống không tự động phân xe.
```

---

## 3.3 Quy Trình Thi

```text
Học viên đủ điều kiện
→ Giáo vụ thi lập danh sách
→ Cập nhật ngày thi
→ Thông báo cho học viên
→ Học viên đi thi
→ Giáo vụ thi cập nhật kết quả
→ Nếu đạt: chuyển bước tiếp theo
→ Nếu không đạt: học viên đăng ký thi lại
```

---

## 3.4 Quy Trình Xe

```text
Giáo viên nhận xe
→ Khai báo ODO đi
→ Báo cáo tình trạng xe
→ Dạy học
→ Đổ xăng nếu cần
→ Upload hóa đơn xăng
→ Khai báo ODO về
→ Cập nhật số km hoạt động
→ Gửi đề xuất bảo dưỡng nếu cần
```

---

# 4. Yêu Cầu Chức Năng

# 4.1 Quản Lý Học Viên

## FR-STU-001 Đăng Nhập Học Viên

Học viên có thể đăng nhập hệ thống bằng tài khoản được cấp.

Tài khoản học viên được tạo theo nguyên tắc:

* Tên đăng nhập: họ tên học viên viết liền không dấu
* Mật khẩu mặc định: số điện thoại học viên

---

## FR-STU-002 Xem Thông Tin Học Viên

Học viên có thể xem:

* Họ tên
* Ngày sinh
* Số điện thoại
* Khóa học
* Ngày nộp khám sức khỏe
* Ngày khai giảng
* Ngày bế giảng
* Ngày thanh lý hồ sơ

---

## FR-STU-003 Theo Dõi Tiến Độ Học

Học viên có thể theo dõi tiến độ theo từng tab tương ứng với lộ trình đào tạo:

* Hồ sơ
* Học phí
* Lý thuyết
* Mô phỏng
* Thực hành cơ bản
* Cabin
* DAT đường trường
* Sa hình thô
* Thi tốt nghiệp
* Thi sát hạch
* Sa hình cảm ứng tập/thi
* Nhận bằng

---

## FR-STU-004 Xem Tình Trạng Nhận Bằng

Học viên có thể xem ngày bằng đã về trung tâm và trạng thái nhận bằng.

---

# 4.2 Quản Lý Hồ Sơ

## FR-DOC-001 Quản Lý Hồ Sơ Học Viên

Hệ thống quản lý các loại hồ sơ:

* Đơn học lái xe
* Hình học viên
* Giấy khám sức khỏe
* Hợp đồng
* Hồ sơ thanh lý

---

## FR-DOC-002 Cập Nhật Hồ Sơ

Kinh doanh, kế toán hoặc giáo vụ có thể cập nhật trạng thái hồ sơ học viên.

---

## FR-DOC-003 Theo Dõi Giấy Khám Sức Khỏe

Hệ thống ghi nhận ngày học viên nộp giấy khám sức khỏe.

---

## FR-DOC-004 Hoàn Thiện Hồ Sơ

Hệ thống cho phép đánh dấu hồ sơ đã hoàn thiện khi đủ giấy tờ bắt buộc.

---

# 4.3 Quản Lý Học Phí

## FR-FEE-001 Xem Học Phí

Học viên có thể xem:

* Tổng học phí
* Số tiền đã đóng
* Số tiền còn lại

---

## FR-FEE-002 Thu Học Phí

Kế toán có thể ghi nhận các khoản học phí:

* Học phí lần 1
* Học phí lần 2
* Học phí lần cuối

---

## FR-FEE-003 Nhắc Học Phí

Hệ thống gửi thông báo nhắc học viên đóng học phí còn lại.

---

## FR-FEE-004 Hoàn Phí

Kế toán có thể ghi nhận hoàn phí đối với học viên thay đổi ý định hoặc hủy khóa học.

---

## FR-FEE-005 Thu Phí Học Thêm

Kế toán ghi nhận chi phí khi học viên đăng ký học thêm:

* Giờ thực hành đường trường
* Sa hình thô
* Sa hình cảm ứng tập/thi

---

## FR-FEE-006 Thu Phí Thi Lại

Kế toán ghi nhận phí thi lại theo từng phần thi học viên chưa đạt.

---

# 4.4 Lý Thuyết Và Mô Phỏng

## FR-THEORY-001 Cập Nhật Lịch Học

Quản trị hoặc giáo vụ cập nhật lịch học lý thuyết và mô phỏng.

---

## FR-THEORY-002 Học Viên Xem Lịch

Học viên có thể xem lịch học lý thuyết và mô phỏng.

---

## FR-THEORY-003 Hướng Dẫn Học Online

Kinh doanh hoặc giáo vụ có thể gửi hướng dẫn học online và hướng dẫn sử dụng ứng dụng điện thoại cho học viên.

---

# 4.5 Đặt Lịch Học

## FR-SCH-001 Xem Lịch Trống

Học viên có thể xem lịch trống để đặt lịch học.

Áp dụng cho:

* 4H cơ bản
* Cabin
* DAT đường trường
* Sa hình thô

---

## FR-SCH-002 Đặt Lịch 4H Cơ Bản

Học viên đặt lịch học 4H cơ bản.

Sau khi đặt thành công, hệ thống hiển thị thông báo:

```text
Lịch đã được đặt
```

---

## FR-SCH-003 Đặt Lịch Cabin

Học viên đặt lịch học cabin.

Sau khi đặt thành công, hệ thống hiển thị thông báo:

```text
Lịch đã được đặt
```

---

## FR-SCH-004 Đặt Lịch DAT Đường Trường

Học viên đặt lịch học DAT đường trường.

Sau khi đặt thành công, hệ thống hiển thị thông báo:

```text
Lịch đã được đặt
```

---

## FR-SCH-005 Đặt Lịch Sa Hình Thô

Học viên đặt lịch học sa hình thô.

Sau khi đặt thành công, hệ thống hiển thị thông báo:

```text
Lịch đã được đặt
```

---

## FR-SCH-006 Giáo Vụ Điều Phối Lịch

Giáo vụ có thể xem, điều phối, phân công giáo viên, phân công xe hoặc điều chỉnh lịch học khi cần.

Lịch học viên đặt không cần giáo vụ xác nhận trước khi có hiệu lực.

---

## FR-SCH-007 Phân Công Giáo Viên

Giáo vụ phân công giáo viên cho lịch học.

---

## FR-SCH-008 Phân Công Xe

Giáo vụ phân công xe cho lịch học.

---

## FR-SCH-009 Phân Công Cabin

Giáo vụ phân công máy cabin còn trống cho lịch học cabin.

---

## FR-SCH-010 Chủ Động Xếp Lịch

Giáo vụ có thể chủ động liên hệ và xếp lịch cho học viên qua hệ thống.

---

# 4.6 Đào Tạo Thực Hành

## FR-TRAIN-001 Ghi Nhận Buổi Học 4H Cơ Bản

Sau buổi học, hệ thống ghi nhận thông tin buổi học vào tab 4H cơ bản của học viên.

Thông tin gồm:

* Giáo viên
* Xe
* Thời gian học
* Số km nếu có
* Trạng thái hoàn thành

---

## FR-TRAIN-002 Ghi Nhận Buổi Học Cabin

Sau buổi học, hệ thống ghi nhận thông tin học 2H cabin vào tab cabin của học viên.

---

## FR-TRAIN-003 Ghi Nhận Buổi Học DAT

Sau buổi học DAT, hệ thống ghi nhận:

* Số km từng buổi
* Thời gian từng buổi
* Tổng km đã học
* Km còn lại
* Tổng thời gian đã học

---

## FR-TRAIN-004 Upload Hình DAT

Giáo viên có thể upload hình DAT nếu có.

Ảnh DAT không bắt buộc trong phiên bản đầu tiên.

---

## FR-TRAIN-005 Ghi Nhận Buổi Học Sa Hình

Sau buổi học sa hình, hệ thống ghi nhận thông tin buổi học vào tab sa hình.

---

## FR-TRAIN-006 Đăng Ký Học Thêm Đường Trường

Học viên có thể đăng ký thêm giờ học đường trường.

Sau khi đăng ký thành công, hệ thống cập nhật số giờ tổng của học viên.

---

## FR-TRAIN-007 Đăng Ký Học Thêm Sa Hình

Học viên có thể đăng ký thêm giờ học sa hình tập/thi.

Sau khi đăng ký thành công, hệ thống cập nhật số giờ tổng của học viên.

---

# 4.7 Đánh Giá Giáo Viên

## FR-RATE-001 Đánh Giá Sau Buổi Học

Sau buổi học, học viên có thể:

* Chấm sao giáo viên từ 1 đến 5
* Nhập nhận xét giáo viên

---

## FR-RATE-002 Lưu Đánh Giá

Hệ thống lưu đánh giá gắn với:

* Học viên
* Giáo viên
* Buổi học
* Thời gian đánh giá

---

# 4.8 Thi Tốt Nghiệp

## FR-GRAD-001 Lập Danh Sách Thi Tốt Nghiệp

Giáo vụ thi lập danh sách học viên đủ điều kiện thi tốt nghiệp.

---

## FR-GRAD-002 Cập Nhật Lịch Thi Tốt Nghiệp

Giáo vụ thi cập nhật ngày thi tốt nghiệp lên hệ thống.

---

## FR-GRAD-003 Thông Báo Lịch Thi Tốt Nghiệp

Hệ thống thông báo lịch thi tốt nghiệp cho học viên.

---

## FR-GRAD-004 Cập Nhật Kết Quả Thi Tốt Nghiệp

Giáo vụ thi cập nhật kết quả thi tốt nghiệp cho học viên.

---

## FR-GRAD-005 Học Viên Xem Kết Quả Thi Tốt Nghiệp

Học viên xem kết quả thi tốt nghiệp trong tab thi tốt nghiệp.

---

# 4.9 Thi Sát Hạch

## FR-EXAM-001 Lập Danh Sách Thi Sát Hạch

Giáo vụ thi lập danh sách học viên đủ điều kiện thi sát hạch và gửi về trường.

---

## FR-EXAM-002 Cập Nhật Lịch Thi Sát Hạch

Giáo vụ thi cập nhật ngày thi sát hạch lên hệ thống.

---

## FR-EXAM-003 Thông Báo Lịch Thi Sát Hạch

Hệ thống thông báo lịch thi sát hạch cho học viên.

---

## FR-EXAM-004 Cập Nhật Hướng Dẫn Thi Sát Hạch

Quản trị hệ thống cập nhật hướng dẫn cho ngày thi sát hạch.

---

## FR-EXAM-005 Cập Nhật Kết Quả Thi Sát Hạch

Giáo vụ thi cập nhật kết quả thi sát hạch.

Kết quả gồm 4 phần:

* Lý thuyết
* Mô phỏng
* Sa hình
* Đường trường

---

## FR-EXAM-006 Xử Lý Thi Không Đạt

Nếu học viên không đạt một hoặc nhiều phần thi, hệ thống hiển thị nút đăng ký thi lại cho các phần chưa đạt.

---

## FR-EXAM-007 Đăng Ký Thi Lại

Học viên có thể đăng ký thi lại các phần chưa đạt với phí theo quy định hiện hành.

---

# 4.10 Quản Lý Giáo Viên

## FR-TEA-001 Xem Lịch Dạy

Giáo viên có thể xem lịch dạy trên hệ thống.

---

## FR-TEA-002 Điểm Danh

Giáo viên điểm danh trước lịch đầu tiên trong ngày.

---

## FR-TEA-003 Chuẩn Bị Xe

Giáo viên báo cáo tình trạng xe trước khi dạy.

---

## FR-TEA-004 Khai Báo ODO

Đi Giáo viên có thể nhập ODO đi nếu có.

ODO đi không bắt buộc trong phiên bản đầu tiên.

---

## FR-TEA-005 Khai Báo ODO Về

Giáo viên có thể nhập ODO về nếu có.

ODO về không bắt buộc trong phiên bản đầu tiên.

---

## FR-TEA-006 Báo Cáo Buổi Học

Giáo viên báo cáo buổi học lên hệ thống.

Thông tin gồm:

* Học viên
* Thời gian học
* Số km nếu có
* Loại buổi học
* Ghi chú

---

## FR-TEA-007 Báo Cáo Xăng

Sau khi dạy xong, giáo viên có thể ghi nhận:

* Số lít xăng
* Hóa đơn xăng
* Xe tương ứng

---

## FR-TEA-008 Gửi Yêu Cầu Nghỉ Phép

Giáo viên chọn ngày muốn nghỉ phép và gửi yêu cầu lên hệ thống.

---

## FR-TEA-009 Xem Thống Kê Giờ Dạy

Trang chủ giáo viên hiển thị tổng giờ đã dạy theo nhóm:

* T2-T6
* T7-CN
* Đêm
* Cảm ứng tập
* Thi

---

# 4.11 Quản Lý Xe

## FR-CAR-001 Quản Lý Thông Tin Xe

Hệ thống quản lý thông tin xe:

* Biển số
* Dòng xe
* Trạng thái
* Giáo viên phụ trách nếu có

---

## FR-CAR-002 Quản Lý Giấy Tờ Xe

Hệ thống quản lý thời hạn giấy tờ xe:

* Đăng kiểm
* Giấy phép tập lái
* Bảo hiểm
* Biên bản thế chấp
* Chủ quyền xe

---

## FR-CAR-003 Theo Dõi ODO

Hệ thống ghi nhận:

* ODO đi
* ODO về

---

## FR-CAR-004 Theo Dõi Thời Gian Xe Hoạt Động

Hệ thống ghi nhận:

* Thời gian xe đi
* Thời gian xe về

---

## FR-CAR-005 Theo Dõi Vệ Sinh Xe

Hệ thống ghi nhận tình trạng xe sạch hoặc không sạch thông qua hình ảnh giáo viên gửi.

---

## FR-CAR-006 Theo Dõi Nhiên Liệu

Hệ thống theo dõi:

* Tổng lít xăng đã đổ trong tháng
* Chi phí nhiên liệu
* Xe tương ứng
* Giáo viên khai báo

---

## FR-CAR-007 Quản Lý Bảo Dưỡng

Hệ thống quản lý lịch sử bảo dưỡng và thay thế phụ tùng của xe.

---

## FR-CAR-008 Đề Xuất Bảo Dưỡng

Khi xe đến hạn bảo dưỡng hoặc cần thay thế phụ tùng, giáo viên gửi đề xuất bảo dưỡng lên hệ thống.

---

## FR-CAR-009 Phê Duyệt Bảo Dưỡng

Quản lý khu vực xem xét và duyệt đề xuất bảo dưỡng.

---

# 4.12 Quản Lý Nhân Sự Và Nghỉ Phép

## FR-HR-001 Quản Lý Nhân Viên

Hệ thống quản lý thông tin nhân viên:

* Giáo viên
* Giáo vụ
* Kinh doanh
* Kế toán
* Quản lý khu vực
* Quản trị hệ thống

---

## FR-HR-002 Theo Dõi Điểm Danh Giáo Viên

Quản lý khu vực theo dõi thời gian điểm danh của giáo viên.

---

## FR-HR-003 Báo Cáo Thay Đổi Nhân Sự

Quản lý khu vực ghi nhận báo cáo thay đổi nhân sự của khu vực.

---

## FR-HR-004 Duyệt Nghỉ Phép

Quản lý khu vực duyệt hoặc từ chối yêu cầu nghỉ phép của giáo viên thuộc khu vực mình quản lý.

---

## FR-HR-005 Cấu Hình Quy Trình Nghỉ Phép

Quản trị hệ thống cấu hình quy trình nghỉ phép theo quy định trung tâm.

Ví dụ:

* Hai giáo viên không nghỉ chung một ngày

---

# 4.13 Quản Lý Lương

## FR-PAY-001 Tính Giờ Dạy

Hệ thống tính giờ dạy theo nhóm:

* T2-T6
* T7-CN
* Đêm
* Cảm ứng tập
* Thi

---

## FR-PAY-002 Tổng Hợp Giờ Dạy Giáo Viên

Phiên bản đầu tiên chỉ tổng hợp giờ dạy của giáo viên theo nhóm:

- T2-T6
- T7-CN
- Đêm
- Cảm ứng tập
- Cảm ứng thi

Hệ thống chưa tính lương tự động thành tiền trong phiên bản đầu tiên.

---

## FR-PAY-003 Xem Lương Nhân Viên

Các vai trò phù hợp có thể xem mức lương của nhân viên theo quyền hạn.

---

## FR-PAY-004 Kiểm Tra Lương

Quản trị hệ thống xem và kiểm tra lương của giáo viên trên toàn hệ thống.

---

## FR-PAY-005 Gửi Duyệt Lương

Quản trị hệ thống gửi yêu cầu phê duyệt lương cho giám đốc.

---

## FR-PAY-006 Duyệt Lương

Giám đốc xem xét và duyệt chi lương, thưởng.

---

# 4.14 Quản Trị Hệ Thống

## FR-ADM-001 Cấu Hình Gói Học

Quản trị hệ thống cấu hình thông tin và giá các gói học lái xe:

* A
* A1
* B số sàn
* B tự động
* C1

---

## FR-ADM-002 Cấu Hình Số Giờ Học

Quản trị hệ thống cấu hình số giờ học cho từng gói:

* Thực hành
* Cabin
* Sa hình cảm ứng tập/thi

---

## FR-ADM-003 Cấu Hình Giá Học Thêm

Quản trị hệ thống cấu hình giá học thêm:

* Giờ thực hành đường trường
* Sa hình thô
* Sa hình cảm ứng tập/thi

---

## FR-ADM-004 Cấu Hình Phí Thi Lại

Quản trị hệ thống cấu hình chi phí các phần thi lại theo quy định hiện hành.

---

## FR-ADM-005 Quản Lý Tài Khoản

Quản trị hệ thống quản lý tài khoản:

* Học viên
* Giáo viên
* Giáo vụ
* Kinh doanh
* Kế toán
* Quản lý
* Giám đốc

---

## FR-ADM-006 Quản Lý Phân Quyền

Quản trị hệ thống cấu hình vai trò và quyền truy cập.

---

## FR-ADM-007 Cập Nhật Hướng Dẫn Thi Sát Hạch

Quản trị hệ thống cập nhật hướng dẫn thi sát hạch theo quy định hiện hành.

---

# 4.15 Báo Cáo Và Dashboard

Ghi chú MVP:

Phiên bản đầu tiên chỉ bắt buộc các báo cáo sau:

- Học viên đã hoàn thành khóa học
- Kết quả thi sát hạch của tất cả học viên
- Thông tin xe
- Thông tin nhân viên
- Lương hoặc bảng tổng hợp giờ dạy

Phiên bản đầu tiên không yêu cầu xuất Excel/PDF báo cáo.

## FR-RPT-001 Báo Cáo Học Viên

Hệ thống báo cáo:

* Tổng số học viên
* Học viên đang học
* Học viên hoàn thành
* Học viên theo khóa
* Học viên theo trạng thái

---

## FR-RPT-002 Báo Cáo Doanh Thu

Hệ thống báo cáo:

* Học phí
* Phí học thêm
* Phí thi lại
* Hoàn phí

---

## FR-RPT-003 Báo Cáo Công Nợ

Hệ thống báo cáo học viên còn nợ học phí.

---

## FR-RPT-004 Báo Cáo Kết Quả Thi

Hệ thống báo cáo:

* Kết quả thi tốt nghiệp
* Kết quả thi sát hạch
* Tỷ lệ đậu
* Tỷ lệ rớt
* Danh sách thi lại

---

## FR-RPT-005 Báo Cáo Giáo Viên

Hệ thống báo cáo:

* Giờ dạy
* Đánh giá
* Nghỉ phép
* Lương

---

## FR-RPT-006 Báo Cáo Xe

Hệ thống báo cáo:

* Tổng km đã dạy trong tháng
* Tổng lít xăng đã đổ trong tháng
* Lịch sử bảo dưỡng
* Tình trạng giấy tờ xe

---

## FR-RPT-007 Dashboard Giám Đốc

Dashboard giám đốc hiển thị:

* Tình hình học viên
* Tình hình thi cử
* Tình hình doanh thu
* Tình hình xe
* Tình hình nhân sự
* Lương cần duyệt

---

# 4.16 Thông Báo

## FR-NOTI-001 Thông Báo Học Phí

Hệ thống thông báo học viên khi còn học phí cần thanh toán.

---

## FR-NOTI-002 Thông Báo Lịch Học

Hệ thống thông báo lịch học cho học viên.

---

## FR-NOTI-003 Thông Báo Lịch Thi

Hệ thống thông báo lịch thi tốt nghiệp và thi sát hạch.

---

## FR-NOTI-004 Thông Báo Kết Quả Thi

Hệ thống thông báo khi có kết quả thi.

---

## FR-NOTI-005 Thông Báo Nghỉ Phép

Hệ thống thông báo kết quả duyệt nghỉ phép cho giáo viên.

---

## FR-NOTI-006 Thông Báo Bảo Dưỡng

Hệ thống thông báo trạng thái đề xuất bảo dưỡng.

---

# 4.17 Audit Log

## FR-AUDIT-001 Ghi Nhận Nhật Ký Thao Tác

Hệ thống ghi nhận audit log cho các thao tác quan trọng:

* Tạo học viên
* Cập nhật học viên
* Thu học phí
* Hoàn phí
* Cập nhật kết quả thi
* Điều chỉnh lịch học
* Cập nhật lương
* Duyệt lương
* Cập nhật phân quyền

---

## FR-AUDIT-002 Tra Cứu Audit Log

Quản trị hệ thống có thể tra cứu audit log theo:

* Người thao tác
* Thời gian
* Loại đối tượng
* Mã đối tượng
* Hành động

---

# 5. Yêu Cầu Phi Chức Năng

## 5.1 Bảo Mật

* Người dùng phải đăng nhập trước khi sử dụng hệ thống.
* Hệ thống phân quyền theo vai trò.
* Mật khẩu phải được mã hóa.
* Các thao tác quan trọng phải có audit log.

---

## 5.2 Hiệu Năng

* Các thao tác thông thường phản hồi trong thời gian chấp nhận được.
* Danh sách dữ liệu phải hỗ trợ phân trang.
* Các báo cáo lớn cần hỗ trợ bộ lọc.

---

## 5.3 Khả Dụng

* Hệ thống cần hỗ trợ sao lưu dữ liệu định kỳ.
* Dữ liệu quan trọng không được xóa vật lý.

---

## 5.4 Khả Năng Mở Rộng

Hệ thống cần có khả năng mở rộng:

* Nhiều chi nhánh/khu vực
* Nhiều loại gói học
* Nhiều loại phí
* Nhiều vai trò người dùng
* Nhiều loại báo cáo

---

# 6. Tiêu Chí Nghiệm Thu Tổng Quát

Hệ thống được xem là hoàn thành khi:

* Các phân hệ trong phạm vi được triển khai.
* Người dùng có thể đăng nhập và thao tác theo đúng vai trò.
* Học viên có thể theo dõi tiến độ học.
* Học viên có thể đặt lịch học.
* Giáo vụ có thể xử lý và phân công lịch học.
* Giáo viên có thể xem lịch dạy và ghi nhận buổi học.
* Kế toán có thể ghi nhận học phí.
* Giáo vụ thi có thể cập nhật lịch thi và kết quả thi.
* Quản lý có thể theo dõi xe, giáo viên, nghỉ phép và lương.
* Giám đốc có thể xem dashboard và duyệt lương.
* Dữ liệu quan trọng được lưu đúng và có thể tra cứu.
* Báo cáo chính hoạt động đúng.

---

# 7. Tài Liệu Liên Quan

Bộ tài liệu triển khai đề xuất:

* 01-requirements.md
* 02-business-rules.md
* 03-use-cases.md
* 04-domain-model.md
* 05-erd.md
* 06-rest-api-spec.md
* 07-screen-specification.md
* 08-test-scenarios.md
* 09-implementation-plan.md
