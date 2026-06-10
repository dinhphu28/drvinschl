# Requirements

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Giới Thiệu

## 1.1 Mục Đích

Tài liệu này mô tả phạm vi, quy trình nghiệp vụ và các yêu cầu chức năng chính của hệ thống quản lý trung tâm đào tạo lái xe.

Tài liệu được dùng để:

- Khách hàng xác nhận phạm vi hệ thống.
- Developer hiểu chức năng cần triển khai.
- QA xây dựng test case.
- AI Agent hỗ trợ phân tích, thiết kế và sinh mã nguồn.

---

## 1.2 Mục Tiêu Hệ Thống

Hệ thống nhằm số hóa toàn bộ quy trình vận hành trung tâm đào tạo lái xe, bao gồm:

- Quản lý học viên.
- Quản lý hồ sơ học viên.
- Quản lý học phí.
- Quản lý lịch học.
- Quản lý đào tạo thực hành.
- Quản lý thi tốt nghiệp.
- Quản lý thi sát hạch.
- Quản lý giáo viên.
- Quản lý xe.
- Quản lý nhân sự.
- Quản lý nghỉ phép.
- Tổng hợp giờ dạy và trình duyệt lương.
- Quản lý báo cáo, thống kê.

---

## 1.3 Phạm Vi

### Trong phạm vi

Hệ thống bao gồm:

- Web Admin cho nhân viên trung tâm.
- Ứng dụng hoặc giao diện cho học viên.
- Giao diện cho giáo viên.
- Quản lý học viên từ lúc đăng ký đến khi nhận bằng.
- Quản lý đặt lịch học.
- Quản lý giáo viên, xe, lịch dạy.
- Quản lý học phí, phí học thêm, phí thi lại.
- In phiếu thu và xuất PDF phiếu thu.
- Quản lý thi tốt nghiệp và thi sát hạch.
- Quản lý nghỉ phép.
- Tổng hợp giờ dạy của giáo viên.
- Báo cáo vận hành MVP.

### Ngoài phạm vi MVP

Các chức năng sau chưa nằm trong phạm vi phiên bản đầu tiên:

- Thanh toán online.
- Tích hợp ngân hàng.
- Ký hợp đồng điện tử.
- Quên mật khẩu tự động.
- Đăng nhập Google/Facebook.
- Tích hợp thiết bị DAT.
- Tích hợp SMS Provider.
- Tích hợp Zalo.
- Tích hợp Email notification.
- Xuất Excel báo cáo.
- Xuất PDF báo cáo.
- Tính lương tự động thành tiền.
- ERP kế toán đầy đủ.
- Dashboard nâng cao.
- Báo cáo nâng cao.

---

# 2. Vai Trò Người Dùng

## 2.1 Học Viên

Học viên sử dụng hệ thống để:

- Đăng nhập.
- Đổi mật khẩu.
- Xem thông tin cá nhân.
- Theo dõi tiến độ học.
- Xem học phí.
- Nhận thông báo học phí.
- Xem lịch học.
- Đặt lịch học.
- Hủy lịch học trước giờ bắt đầu.
- Xác nhận buổi học sau khi giáo viên hoàn thành.
- Đánh giá giáo viên.
- Đăng ký học thêm.
- Xem lịch thi.
- Xem kết quả thi.
- Đăng ký thi lại.
- Theo dõi ngày nhận bằng.

## 2.2 Kinh Doanh

Kinh doanh sử dụng hệ thống để:

- Tư vấn khách hàng.
- Theo dõi học viên phụ trách.
- Nhắc học viên đóng phí.
- Nhắc học viên nộp giấy khám sức khỏe.
- Hoàn thiện hồ sơ học viên.
- Đánh dấu hồ sơ học viên hoàn thiện.
- Gửi lịch học lý thuyết, mô phỏng.
- Hướng dẫn học viên học online.
- Theo dõi hoa hồng nếu được cấu hình sau.

## 2.3 Kế Toán

Kế toán sử dụng hệ thống để:

- Tạo tài khoản học viên thủ công.
- Thu học phí.
- Ghi nhận thanh toán.
- In phiếu thu.
- Xuất PDF phiếu thu.
- Hoàn phí một phần hoặc toàn phần.
- Theo dõi công nợ.
- Ghi nhận phí học thêm.
- Ghi nhận phí thi lại.
- Theo dõi chi phí xăng xe.

## 2.4 Giáo Vụ Khu Vực

Giáo vụ khu vực sử dụng hệ thống để:

- Theo dõi lịch học học viên đã đặt.
- Điều phối lịch học.
- Phân công giáo viên thủ công nếu cần.
- Phân công xe thủ công nếu cần.
- Chủ động xếp lịch cho học viên qua hệ thống.
- Nhắc học viên đóng phí lần cuối.
- Cập nhật trạng thái nhận bằng.
- Theo dõi bảng tổng hợp giờ dạy nếu có quyền.

## 2.5 Giáo Vụ Sa Hình

Giáo vụ sa hình sử dụng hệ thống để:

- Theo dõi lịch học sa hình.
- Điều phối lịch học sa hình.
- Phân công giáo viên.
- Phân công xe.
- Chủ động xếp lịch học sa hình.
- Theo dõi bảng tổng hợp giờ dạy nếu có quyền.

## 2.6 Giáo Vụ Thi

Giáo vụ thi sử dụng hệ thống để:

- Lập danh sách học viên đủ điều kiện thi tốt nghiệp bằng cách xác nhận thủ công.
- Cập nhật lịch thi tốt nghiệp.
- Cập nhật kết quả thi tốt nghiệp.
- Lập danh sách học viên đủ điều kiện thi sát hạch bằng cách xác nhận thủ công.
- Cập nhật lịch thi sát hạch.
- Cập nhật kết quả thi sát hạch.
- Ghi nhận học viên đăng ký thi lại.

## 2.7 Giáo Viên

Giáo viên sử dụng hệ thống để:

- Xem lịch dạy hiện tại và tương lai.
- Yêu cầu đổi lịch dạy.
- Điểm danh.
- Chụp hình xe trước khi sử dụng xe.
- Nhập ODO đi nếu có.
- Nhập ODO về nếu có.
- Báo cáo buổi học.
- Ghi nhận thời gian học.
- Ghi nhận số km.
- Nhập dữ liệu DAT thủ công.
- Upload hình ảnh DAT nếu có.
- Upload hóa đơn xăng.
- Gửi yêu cầu nghỉ phép.
- Gửi đề xuất bảo dưỡng xe.
- Xem thống kê giờ dạy.
- Xem thông tin xe phụ trách nếu có.

## 2.8 Quản Lý Khu Vực

Quản lý khu vực sử dụng hệ thống để:

- Theo dõi điểm danh giáo viên.
- Theo dõi thời gian xe đi, xe về.
- Quản lý nhân sự khu vực.
- Duyệt nghỉ phép giáo viên.
- Theo dõi bảng tổng hợp giờ dạy.
- Duyệt đề xuất bảo dưỡng xe.

## 2.9 Quản Trị Hệ Thống

Quản trị hệ thống sử dụng hệ thống để:

- Quản lý tài khoản.
- Reset mật khẩu người dùng.
- Quản lý phân quyền.
- Cấu hình gói học.
- Cấu hình học phí.
- Cấu hình đợt thanh toán.
- Cấu hình phí học thêm.
- Cấu hình phí thi lại.
- Cấu hình quy trình nghỉ phép.
- Cấu hình hướng dẫn thi sát hạch.
- Quản lý tài khoản nhân viên.
- Quản lý audit log.

## 2.10 Giám Đốc

Giám đốc sử dụng hệ thống để:

- Theo dõi hoạt động toàn trung tâm.
- Theo dõi xe toàn hệ thống.
- Theo dõi kết quả thi sát hạch.
- Theo dõi học viên hoàn thành khóa học.
- Theo dõi nhân sự.
- Duyệt bảng tổng hợp giờ dạy hoặc bảng lương theo quy trình trung tâm.

---

# 3. Quy Trình Nghiệp Vụ Tổng Thể

## 3.1 Vòng Đời Học Viên

```text
Khách hàng
→ Tư vấn
→ Ký hợp đồng
→ Admin/Kế toán tạo tài khoản học viên
→ Hoàn thiện hồ sơ
→ Kinh doanh đánh dấu hồ sơ hoàn thiện
→ Đóng học phí
→ Học lý thuyết
→ Học mô phỏng
→ Học thực hành cơ bản
→ Học cabin
→ Học DAT đường trường
→ Học sa hình
→ Giáo vụ thi xác nhận đủ điều kiện thi tốt nghiệp
→ Thi tốt nghiệp
→ Giáo vụ thi xác nhận đủ điều kiện thi sát hạch
→ Thi sát hạch
→ Nhận bằng
→ Hoàn thành khóa học
```

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
```

Ghi chú:

- Lịch học không cần giáo vụ xác nhận.
- Hệ thống không tự động phân giáo viên.
- Hệ thống không tự động phân xe.
- Học viên được hủy lịch trước giờ bắt đầu.

## 3.3 Quy Trình Thi

```text
Giáo vụ thi xác nhận học viên đủ điều kiện
→ Giáo vụ thi lập danh sách
→ Cập nhật ngày thi
→ Thông báo cho học viên trong ứng dụng
→ Học viên đi thi
→ Giáo vụ thi cập nhật kết quả
→ Nếu đạt: chuyển bước tiếp theo
→ Nếu không đạt: học viên đăng ký thi lại theo từng phần
```

## 3.4 Quy Trình Xe

```text
Giáo viên nhận xe
→ Chụp hình xe trước khi sử dụng
→ Nhập ODO đi nếu có
→ Dạy học
→ Đổ xăng nếu cần
→ Upload hóa đơn xăng nếu có
→ Nhập ODO về nếu có
→ Cập nhật số km hoạt động nếu có dữ liệu
→ Gửi đề xuất bảo dưỡng nếu cần
```

---

# 4. Yêu Cầu Chức Năng

## 4.1 Quản Lý Học Viên

### FR-STU-001 Đăng Nhập Học Viên

Học viên có thể đăng nhập hệ thống bằng tài khoản được cấp.

Tài khoản học viên được tạo thủ công bởi Admin hoặc Kế toán.

Tài khoản học viên được tạo theo nguyên tắc:

- Tên đăng nhập: họ tên học viên viết liền không dấu.
- Mật khẩu mặc định: số điện thoại học viên.

### FR-STU-002 Đổi Mật Khẩu

Học viên được phép đổi mật khẩu sau khi đăng nhập.

Phiên bản đầu tiên chưa hỗ trợ quên mật khẩu tự động. Nếu học viên quên mật khẩu, học viên cần liên hệ Admin để reset mật khẩu.

### FR-STU-003 Xem Thông Tin Học Viên

Học viên có thể xem:

- Họ tên.
- Ngày sinh.
- Số điện thoại.
- Khóa học.
- Ngày nộp khám sức khỏe.
- Ngày khai giảng.
- Ngày bế giảng.
- Ngày thanh lý hồ sơ.

### FR-STU-004 Theo Dõi Tiến Độ Học

Học viên có thể theo dõi tiến độ theo từng tab tương ứng với lộ trình đào tạo:

- Hồ sơ.
- Học phí.
- Lý thuyết.
- Mô phỏng.
- Thực hành cơ bản.
- Cabin.
- DAT đường trường.
- Sa hình thô.
- Thi tốt nghiệp.
- Thi sát hạch.
- Sa hình cảm ứng tập/thi.
- Nhận bằng.

### FR-STU-005 Xem Tình Trạng Nhận Bằng

Học viên có thể xem ngày bằng đã về trung tâm và trạng thái nhận bằng.

### FR-STU-006 Nhiều Khóa Học

Một học viên có thể tham gia nhiều khóa học khác nhau. Mỗi khóa học được quản lý thông qua một đăng ký khóa học riêng.

---

## 4.2 Quản Lý Hồ Sơ

### FR-DOC-001 Quản Lý Hồ Sơ Học Viên

Hệ thống quản lý hồ sơ linh hoạt. Mỗi hồ sơ có thể có:

- Tên hồ sơ.
- Loại hồ sơ.
- File đính kèm nếu có.
- Ghi chú nếu có.

### FR-DOC-002 Cập Nhật Hồ Sơ

Kinh doanh, Kế toán hoặc Giáo vụ có thể cập nhật hồ sơ học viên theo quyền được phân.

### FR-DOC-003 Theo Dõi Giấy Khám Sức Khỏe

Hệ thống ghi nhận ngày học viên nộp giấy khám sức khỏe nếu có.

### FR-DOC-004 Hoàn Thiện Hồ Sơ

Nhân viên Kinh doanh có thể đánh dấu hồ sơ đã hoàn thiện.

Hệ thống không tự động đánh giá hồ sơ hoàn thiện dựa trên số lượng file đính kèm.

---

## 4.3 Quản Lý Học Phí

### FR-FEE-001 Xem Học Phí

Học viên có thể xem:

- Tổng học phí.
- Số tiền đã đóng.
- Số tiền còn lại.

### FR-FEE-002 Thu Học Phí

Kế toán có thể ghi nhận các khoản học phí theo đợt thanh toán được cấu hình.

### FR-FEE-003 Nhắc Học Phí

Hệ thống gửi thông báo trong ứng dụng để nhắc học viên đóng học phí còn lại.

### FR-FEE-004 Hoàn Phí

Kế toán có thể ghi nhận hoàn phí một phần hoặc toàn phần.

### FR-FEE-005 Không Thanh Toán Dư

Hệ thống không cho phép thanh toán vượt quá công nợ.

### FR-FEE-006 In Phiếu Thu

Kế toán có thể in phiếu thu sau khi ghi nhận thanh toán.

### FR-FEE-007 Xuất PDF Phiếu Thu

Kế toán có thể xuất PDF phiếu thu sau khi ghi nhận thanh toán.

### FR-FEE-008 Thu Phí Học Thêm

Kế toán ghi nhận chi phí khi học viên đăng ký học thêm:

- Giờ thực hành đường trường.
- Sa hình thô.
- Sa hình cảm ứng tập/thi.

### FR-FEE-009 Thu Phí Thi Lại

Kế toán ghi nhận phí thi lại theo từng phần thi học viên chưa đạt.

---

## 4.4 Đặt Lịch Học

### FR-SCH-001 Xem Lịch Trống

Học viên có thể xem lịch trống để đặt lịch học.

Áp dụng cho:

- 4H cơ bản.
- Cabin.
- DAT đường trường.
- Sa hình thô.

### FR-SCH-002 Đặt Lịch Học

Học viên đặt lịch học. Sau khi đặt thành công, hệ thống hiển thị thông báo:

```text
Lịch đã được đặt
```

Lịch có hiệu lực ngay nếu không bị xung đột.

### FR-SCH-003 Hủy Lịch Học

Học viên có thể hủy lịch nếu thời điểm hủy trước giờ bắt đầu lịch học.

### FR-SCH-004 Giáo Vụ Điều Phối Lịch

Giáo vụ có thể xem, điều phối, phân công giáo viên, phân công xe hoặc điều chỉnh lịch học khi cần.

Lịch học viên đặt không cần giáo vụ xác nhận trước khi có hiệu lực.

### FR-SCH-005 Phân Công Giáo Viên Thủ Công

Giáo vụ phân công giáo viên thủ công cho lịch học nếu cần.

### FR-SCH-006 Phân Công Xe Thủ Công

Giáo vụ phân công xe thủ công cho lịch học nếu cần.

### FR-SCH-007 Phân Công Cabin

Giáo vụ phân công máy cabin còn trống cho lịch học cabin nếu cần.

---

## 4.5 Đào Tạo Thực Hành

### FR-TRAIN-001 Ghi Nhận Buổi Học

Giáo viên ghi nhận buổi học lên hệ thống.

Thông tin gồm:

- Học viên.
- Giáo viên.
- Xe nếu có.
- Thời gian học.
- Số km nếu có.
- Loại buổi học.
- Ghi chú.
- Trạng thái hoàn thành.

### FR-TRAIN-002 Hoàn Thành Buổi Học

Giáo viên đánh dấu hoàn thành buổi học.

### FR-TRAIN-003 Học Viên Xác Nhận Buổi Học

Sau khi giáo viên hoàn thành buổi học, học viên xác nhận buổi học.

### FR-TRAIN-004 Ghi Nhận DAT

Dữ liệu DAT được nhập tay.

Thông tin gồm:

- Số km.
- Thời gian.
- Ghi chú nếu có.
- Ảnh DAT nếu có.

Không tích hợp thiết bị DAT trong phiên bản đầu tiên. Ảnh DAT không bắt buộc.

### FR-TRAIN-005 Đăng Ký Học Thêm

Học viên có thể đăng ký học thêm:

- Đường trường.
- Sa hình.
- Sa hình cảm ứng tập/thi.

Sau khi đăng ký thành công, hệ thống cập nhật số giờ tổng của học viên.

---

## 4.6 Đánh Giá Giáo Viên

### FR-RATE-001 Đánh Giá Sau Buổi Học

Sau buổi học, học viên có thể:

- Chấm sao giáo viên từ 1 đến 5.
- Nhập nhận xét giáo viên.

### FR-RATE-002 Điểm Trung Bình Giáo Viên

Hệ thống tính điểm đánh giá trung bình của giáo viên.

---

## 4.7 Thi Tốt Nghiệp

### FR-GRAD-001 Lập Danh Sách Thi Tốt Nghiệp

Giáo vụ thi lập danh sách học viên đủ điều kiện thi tốt nghiệp.

Điều kiện đủ thi do giáo vụ thi xác nhận thủ công.

### FR-GRAD-002 Cập Nhật Lịch Thi Tốt Nghiệp

Giáo vụ thi cập nhật ngày thi tốt nghiệp lên hệ thống.

### FR-GRAD-003 Cập Nhật Kết Quả Thi Tốt Nghiệp

Giáo vụ thi cập nhật kết quả thi tốt nghiệp cho học viên.

### FR-GRAD-004 Thi Lại Tốt Nghiệp

Học viên được phép thi tốt nghiệp nhiều lần. Thi lại tốt nghiệp có tính phí.

---

## 4.8 Thi Sát Hạch

### FR-EXAM-001 Lập Danh Sách Thi Sát Hạch

Giáo vụ thi lập danh sách học viên đủ điều kiện thi sát hạch.

Điều kiện đủ thi do giáo vụ thi xác nhận thủ công.

### FR-EXAM-002 Cập Nhật Lịch Thi Sát Hạch

Giáo vụ thi cập nhật ngày thi sát hạch lên hệ thống.

### FR-EXAM-003 Cập Nhật Kết Quả Thi Sát Hạch

Giáo vụ thi cập nhật kết quả thi sát hạch.

Kết quả gồm 4 phần:

- Lý thuyết.
- Mô phỏng.
- Sa hình.
- Đường trường.

### FR-EXAM-004 Đăng Ký Thi Lại

Nếu học viên không đạt một hoặc nhiều phần thi, học viên có thể đăng ký thi lại theo từng phần chưa đạt.

---

## 4.9 Quản Lý Giáo Viên

### FR-TEA-001 Xem Lịch Dạy

Giáo viên có thể xem lịch dạy hiện tại và tương lai.

### FR-TEA-002 Yêu Cầu Đổi Lịch

Giáo viên có thể yêu cầu đổi lịch dạy.

### FR-TEA-003 Điểm Danh

Giáo viên điểm danh theo quy định trung tâm.

### FR-TEA-004 Chuẩn Bị Xe

Giáo viên bắt buộc chụp hình xe trước khi sử dụng xe.

### FR-TEA-005 Khai Báo ODO Nếu Có

Giáo viên có thể nhập ODO đi và ODO về nếu có.

ODO không bắt buộc trong phiên bản đầu tiên.

### FR-TEA-006 Báo Cáo Xăng

Giáo viên có thể ghi nhận:

- Số lít xăng.
- Số tiền nếu có.
- Hóa đơn xăng nếu có.
- Xe tương ứng.

### FR-TEA-007 Gửi Yêu Cầu Nghỉ Phép

Giáo viên chọn ngày muốn nghỉ phép và gửi yêu cầu lên hệ thống.

### FR-TEA-008 Xem Thống Kê Giờ Dạy

Giáo viên xem tổng giờ đã dạy theo nhóm:

- T2-T6.
- T7-CN.
- Đêm.
- Cảm ứng tập.
- Cảm ứng thi.

---

## 4.10 Quản Lý Xe

### FR-CAR-001 Quản Lý Thông Tin Xe

Hệ thống quản lý thông tin xe:

- Biển số.
- Dòng xe.
- Trạng thái.
- Giáo viên phụ trách nếu có.

### FR-CAR-002 Quản Lý Giấy Tờ Xe

Hệ thống quản lý thời hạn giấy tờ xe:

- Đăng kiểm.
- Giấy phép tập lái.
- Bảo hiểm.
- Biên bản thế chấp.
- Chủ quyền xe.

### FR-CAR-003 Theo Dõi ODO Nếu Có

Hệ thống ghi nhận ODO đi và ODO về nếu giáo viên nhập.

### FR-CAR-004 Theo Dõi Hình Ảnh Xe

Hệ thống ghi nhận hình ảnh xe trước khi sử dụng xe.

### FR-CAR-005 Theo Dõi Nhiên Liệu

Hệ thống theo dõi:

- Tổng lít xăng đã đổ.
- Chi phí nhiên liệu nếu có.
- Xe tương ứng.
- Giáo viên khai báo.
- Mức tiêu hao nhiên liệu trung bình nếu có dữ liệu.

### FR-CAR-006 Quản Lý Bảo Dưỡng

Hệ thống quản lý lịch sử bảo dưỡng, chi phí bảo dưỡng và thay thế phụ tùng.

### FR-CAR-007 Đề Xuất Bảo Dưỡng

Giáo viên gửi đề xuất bảo dưỡng xe.

### FR-CAR-008 Phê Duyệt Bảo Dưỡng

Quản lý khu vực xem xét và duyệt đề xuất bảo dưỡng qua một cấp duyệt.

---

## 4.11 Nhân Sự Và Nghỉ Phép

### FR-HR-001 Quản Lý Nhân Viên

Hệ thống quản lý thông tin nhân viên:

- Giáo viên.
- Giáo vụ.
- Kinh doanh.
- Kế toán.
- Quản lý khu vực.
- Quản trị hệ thống.
- Giám đốc.

### FR-HR-002 Quản Lý Nghỉ Phép

Giáo viên gửi yêu cầu nghỉ phép. Quản lý khu vực duyệt hoặc từ chối.

### FR-HR-003 Cấu Hình Quy Trình Nghỉ Phép

Admin có thể cấu hình:

- Số ngày nghỉ tối đa trong tháng.
- Số lượng giáo viên tối thiểu còn lại khi duyệt nghỉ.

Mặc định số ngày nghỉ tối đa là không giới hạn.

---

## 4.12 Tổng Hợp Giờ Dạy Và Lương

### FR-PAY-001 Tổng Hợp Giờ Dạy

Phiên bản đầu tiên chỉ tổng hợp giờ dạy của giáo viên theo nhóm:

- T2-T6.
- T7-CN.
- Đêm.
- Cảm ứng tập.
- Cảm ứng thi.

### FR-PAY-002 Chưa Tính Lương Tự Động

Hệ thống chưa tính lương tự động thành tiền trong phiên bản đầu tiên.

### FR-PAY-003 Gửi Duyệt

Admin hoặc người có quyền gửi bảng tổng hợp giờ dạy cho Giám đốc duyệt.

### FR-PAY-004 Duyệt

Giám đốc duyệt hoặc từ chối bảng tổng hợp giờ dạy.

---

## 4.13 Quản Trị Hệ Thống

### FR-ADM-001 Cấu Hình Gói Học

Quản trị hệ thống cấu hình thông tin và giá các gói học lái xe:

- A.
- A1.
- B số sàn.
- B tự động.
- C1.

### FR-ADM-002 Cấu Hình Số Giờ Học

Quản trị hệ thống cấu hình số giờ học cho từng gói:

- Thực hành.
- Cabin.
- Sa hình cảm ứng tập/thi.

### FR-ADM-003 Cấu Hình Giá Học Thêm

Quản trị hệ thống cấu hình giá học thêm:

- Giờ thực hành đường trường.
- Sa hình thô.
- Sa hình cảm ứng tập/thi.

### FR-ADM-004 Cấu Hình Phí Thi Lại

Quản trị hệ thống cấu hình chi phí các phần thi lại.

### FR-ADM-005 Quản Lý Tài Khoản

Quản trị hệ thống quản lý tài khoản:

- Học viên.
- Giáo viên.
- Giáo vụ.
- Kinh doanh.
- Kế toán.
- Quản lý.
- Giám đốc.

### FR-ADM-006 Quản Lý Phân Quyền

Quản trị hệ thống cấu hình vai trò và quyền truy cập.

### FR-ADM-007 Cập Nhật Hướng Dẫn Thi Sát Hạch

Quản trị hệ thống cập nhật hướng dẫn thi sát hạch theo quy định hiện hành.

---

## 4.14 Báo Cáo Và Dashboard

### Ghi chú MVP

Phiên bản đầu tiên chỉ bắt buộc các báo cáo sau:

- Học viên đã hoàn thành khóa học.
- Kết quả thi sát hạch của tất cả học viên.
- Thông tin xe.
- Thông tin nhân viên.
- Lương hoặc bảng tổng hợp giờ dạy.

Phiên bản đầu tiên không yêu cầu xuất Excel/PDF báo cáo.

### FR-RPT-001 Báo Cáo Học Viên Hoàn Thành

Hệ thống báo cáo danh sách học viên đã hoàn thành khóa học.

### FR-RPT-002 Báo Cáo Kết Quả Thi Sát Hạch

Hệ thống báo cáo kết quả thi sát hạch của tất cả học viên.

### FR-RPT-003 Báo Cáo Thông Tin Xe

Hệ thống báo cáo thông tin xe, giấy tờ xe, nhiên liệu và bảo dưỡng.

### FR-RPT-004 Báo Cáo Thông Tin Nhân Viên

Hệ thống báo cáo thông tin nhân viên.

### FR-RPT-005 Báo Cáo Lương/Giờ Dạy

Hệ thống báo cáo bảng tổng hợp giờ dạy hoặc lương theo phạm vi MVP.

---

## 4.15 Thông Báo

### FR-NOTI-001 Thông Báo Trong Ứng Dụng

Phiên bản đầu tiên chỉ hỗ trợ thông báo trong ứng dụng.

### FR-NOTI-002 Thông Báo Tự Động

Hệ thống cần hỗ trợ gửi thông báo tự động cho:

- Nhắc học phí.
- Lịch học.
- Lịch thi.
- Kết quả thi.
- Nghỉ phép.
- Bảo dưỡng.

---

## 4.16 Audit Log

### FR-AUDIT-001 Ghi Nhận Nhật Ký Thao Tác

Hệ thống ghi nhận audit log cho các thao tác quan trọng:

- Tạo/cập nhật học viên.
- Thu học phí.
- Hoàn phí.
- Cập nhật kết quả thi.
- Điều chỉnh lịch học.
- Cập nhật bảng tổng hợp giờ dạy/lương.
- Duyệt bảng tổng hợp giờ dạy/lương.
- Cập nhật phân quyền.
- Reset mật khẩu.

### FR-AUDIT-002 Tra Cứu Audit Log

Quản trị hệ thống có thể tra cứu audit log theo:

- Người thao tác.
- Thời gian.
- Loại đối tượng.
- Mã đối tượng.
- Hành động.

Audit log không được xóa.

---

# 5. Yêu Cầu Phi Chức Năng

## 5.1 Bảo Mật

- Người dùng phải đăng nhập trước khi sử dụng hệ thống.
- Hệ thống phân quyền theo vai trò.
- Mật khẩu phải được mã hóa.
- Các thao tác quan trọng phải có audit log.

## 5.2 Hiệu Năng

- Danh sách dữ liệu phải hỗ trợ phân trang.
- Các báo cáo lớn cần hỗ trợ bộ lọc.
- Các thao tác thông thường cần phản hồi trong thời gian chấp nhận được.

## 5.3 Khả Dụng

- Hệ thống cần hỗ trợ sao lưu dữ liệu định kỳ.
- Dữ liệu nghiệp vụ quan trọng không được xóa vật lý.
- Audit log không được xóa.

## 5.4 Khả Năng Mở Rộng

Hệ thống cần có khả năng mở rộng:

- Nhiều chi nhánh/khu vực.
- Nhiều loại gói học.
- Nhiều loại phí.
- Nhiều vai trò người dùng.
- Nhiều loại báo cáo.
- Thông báo qua SMS/Zalo/Email trong phase sau.
- Tích hợp thiết bị DAT trong phase sau nếu cần.

---

# 6. Tiêu Chí Nghiệm Thu Tổng Quát

Hệ thống được xem là hoàn thành khi:

- Các phân hệ trong phạm vi MVP được triển khai.
- Người dùng có thể đăng nhập và thao tác theo đúng vai trò.
- Admin hoặc Kế toán có thể tạo tài khoản học viên thủ công.
- Học viên có thể đổi mật khẩu.
- Học viên có thể theo dõi tiến độ học.
- Học viên có thể đặt lịch học không cần giáo vụ xác nhận.
- Học viên có thể hủy lịch trước giờ bắt đầu.
- Giáo vụ có thể điều phối và phân công lịch thủ công.
- Giáo viên có thể xem lịch dạy và ghi nhận buổi học.
- Giáo viên có thể nhập dữ liệu DAT thủ công.
- Học viên có thể xác nhận buổi học và đánh giá giáo viên.
- Kế toán có thể ghi nhận học phí, hoàn phí, in phiếu thu và xuất PDF phiếu thu.
- Giáo vụ thi có thể cập nhật lịch thi và kết quả thi.
- Quản lý có thể theo dõi xe, giáo viên, nghỉ phép và bảng tổng hợp giờ dạy.
- Giám đốc có thể duyệt bảng tổng hợp giờ dạy/lương.
- Dữ liệu quan trọng được lưu đúng và có thể tra cứu.
- Báo cáo MVP hoạt động đúng.
- Audit log được ghi nhận cho các thao tác quan trọng.

---

# 7. Tài Liệu Liên Quan

- 01-requirements.md
- 02-business-rules.md
- 03-use-cases.md
- 04-domain-model.md
- 05-erd.md
- 06-rest-api-spec.md
- 07-screen-specification.md
- 08-test-scenarios.md
- 09-implement-plan.md
- 11-open-questions.md
