# Test Scenarios

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0
Status: Draft

---

# 1. Mục Đích

Tài liệu này mô tả các kịch bản kiểm thử chính cho hệ thống quản lý trung tâm đào tạo lái xe.

Tài liệu dùng để:

* QA viết test case chi tiết
* Developer tự kiểm tra chức năng
* Khách hàng kiểm thử nghiệm thu
* AI Agent sinh test case tự động
* Đối chiếu với yêu cầu nghiệp vụ

---

# 2. Quy Ước

## 2.1 Test Scenario ID

```text
TS-xxx
```

## 2.2 Priority

| Priority | Ý nghĩa                                         |
| -------- | ----------------------------------------------- |
| High     | Luồng nghiệp vụ chính, bắt buộc đúng            |
| Medium   | Luồng quan trọng nhưng không chặn toàn hệ thống |
| Low      | Luồng phụ, cải thiện trải nghiệm                |

## 2.3 Test Result

| Result  | Ý nghĩa                                     |
| ------- | ------------------------------------------- |
| Passed  | Đạt                                         |
| Failed  | Không đạt                                   |
| Blocked | Bị chặn do thiếu dữ liệu hoặc lỗi phụ thuộc |
| Not Run | Chưa chạy                                   |

---

# 3. Authentication

## TS-001 Đăng Nhập Thành Công

### Priority

High

### Actor

* Học viên
* Nhân viên
* Giáo viên
* Quản trị hệ thống

### Preconditions

* Người dùng đã có tài khoản.
* Tài khoản đang hoạt động.

### Steps

1. Mở màn hình đăng nhập.
2. Nhập username hợp lệ.
3. Nhập password hợp lệ.
4. Chọn đăng nhập.

### Expected Result

* Người dùng đăng nhập thành công.
* Hệ thống chuyển đến màn hình phù hợp với vai trò.
* Access token được tạo.

---

## TS-002 Đăng Nhập Sai Mật Khẩu

### Priority

High

### Preconditions

* Người dùng đã có tài khoản.

### Steps

1. Mở màn hình đăng nhập.
2. Nhập username hợp lệ.
3. Nhập password sai.
4. Chọn đăng nhập.

### Expected Result

* Hệ thống không cho đăng nhập.
* Hiển thị thông báo lỗi phù hợp.

---

## TS-003 Người Dùng Không Có Quyền Truy Cập Màn Hình

### Priority

High

### Steps

1. Đăng nhập bằng tài khoản học viên.
2. Truy cập URL màn hình quản trị.
3. Quan sát phản hồi hệ thống.

### Expected Result

* Hệ thống từ chối truy cập.
* Không hiển thị dữ liệu quản trị.

---

# 4. Quản Lý Học Viên

## TS-004 Tạo Học Viên Thành Công

### Priority

High

### Actor

* Kinh doanh
* Kế toán
* Quản trị hệ thống

### Preconditions

* Người dùng đã đăng nhập.
* Người dùng có quyền tạo học viên.

### Steps

1. Mở màn hình danh sách học viên.
2. Chọn tạo học viên.
3. Nhập đầy đủ thông tin bắt buộc.
4. Chọn gói học.
5. Lưu thông tin.

### Expected Result

* Học viên được tạo thành công.
* Hệ thống sinh mã học viên.
* Hệ thống tạo tài khoản học viên nếu có cấu hình.
* Học viên xuất hiện trong danh sách.

---

## TS-005 Tạo Học Viên Thiếu Thông Tin Bắt Buộc

### Priority

High

### Steps

1. Mở màn hình tạo học viên.
2. Bỏ trống họ tên hoặc số điện thoại.
3. Chọn lưu.

### Expected Result

* Hệ thống không lưu dữ liệu.
* Hiển thị lỗi tại trường bắt buộc.

---

## TS-006 Tạo Học Viên Trùng Số Điện Thoại

### Priority

High

### Preconditions

* Đã tồn tại học viên có số điện thoại A.

### Steps

1. Tạo học viên mới.
2. Nhập số điện thoại A.
3. Chọn lưu.

### Expected Result

* Hệ thống từ chối tạo học viên.
* Hiển thị thông báo số điện thoại đã tồn tại.

---

## TS-007 Cập Nhật Thông Tin Học Viên

### Priority

Medium

### Steps

1. Mở chi tiết học viên.
2. Chọn cập nhật.
3. Thay đổi thông tin hợp lệ.
4. Lưu.

### Expected Result

* Thông tin học viên được cập nhật.
* Hệ thống ghi nhận audit log.

---

## TS-008 Tra Cứu Học Viên

### Priority

High

### Steps

1. Mở danh sách học viên.
2. Nhập từ khóa tìm kiếm.
3. Chọn tìm kiếm.

### Expected Result

* Hệ thống hiển thị danh sách học viên phù hợp.
* Hỗ trợ tìm theo tên, mã học viên hoặc số điện thoại.

---

## TS-009 Xem Tiến Độ Học Viên

### Priority

High

### Steps

1. Mở chi tiết học viên.
2. Chọn tab tiến độ học.
3. Quan sát dữ liệu.

### Expected Result

* Hệ thống hiển thị tiến độ theo từng giai đoạn.
* Dữ liệu tiến độ khớp với buổi học, thanh toán và kết quả thi.

---

# 5. Quản Lý Hồ Sơ

## TS-010 Upload Hồ Sơ Học Viên Thành Công

### Priority

High

### Actor

* Kinh doanh
* Kế toán
* Giáo vụ

### Steps

1. Mở tab hồ sơ học viên.
2. Chọn loại hồ sơ.
3. Upload file hợp lệ.
4. Lưu.

### Expected Result

* File được upload thành công.
* Hồ sơ hiển thị trong danh sách.
* Lưu thời gian upload và người upload.

---

## TS-011 Upload File Không Hợp Lệ

### Priority

Medium

### Steps

1. Mở tab hồ sơ.
2. Upload file sai định dạng hoặc quá dung lượng.
3. Chọn lưu.

### Expected Result

* Hệ thống từ chối file.
* Hiển thị thông báo lỗi phù hợp.

---

## TS-012 Đánh Dấu Hồ Sơ Hoàn Thiện

### Priority

High

### Preconditions

* Học viên đã có đầy đủ giấy tờ bắt buộc.

### Steps

1. Mở tab hồ sơ.
2. Kiểm tra danh sách giấy tờ.
3. Chọn đánh dấu hoàn thiện.

### Expected Result

* Trạng thái hồ sơ chuyển thành hoàn thiện.
* Tiến độ học viên được cập nhật.

---

## TS-013 Không Cho Hoàn Thiện Khi Thiếu Hồ Sơ

### Priority

High

### Preconditions

* Học viên thiếu giấy khám sức khỏe hoặc giấy tờ bắt buộc.

### Steps

1. Mở tab hồ sơ.
2. Chọn đánh dấu hoàn thiện.

### Expected Result

* Hệ thống không cho hoàn thiện.
* Hiển thị danh sách giấy tờ còn thiếu.

---

# 6. Quản Lý Học Phí

## TS-014 Ghi Nhận Thanh Toán Học Phí

### Priority

High

### Actor

* Kế toán

### Steps

1. Mở màn hình tạo thanh toán.
2. Chọn học viên.
3. Chọn loại học phí.
4. Nhập số tiền.
5. Chọn phương thức thanh toán.
6. Lưu.

### Expected Result

* Thanh toán được ghi nhận.
* Công nợ học viên được cập nhật.
* Lịch sử thanh toán hiển thị giao dịch mới.

---

## TS-015 Không Cho Thanh Toán Số Tiền Âm Hoặc Bằng 0

### Priority

High

### Steps

1. Mở màn hình tạo thanh toán.
2. Nhập số tiền bằng 0 hoặc âm.
3. Lưu.

### Expected Result

* Hệ thống từ chối lưu.
* Hiển thị lỗi số tiền không hợp lệ.

---

## TS-016 Xem Công Nợ Học Viên

### Priority

High

### Steps

1. Mở chi tiết học viên.
2. Chọn tab học phí.

### Expected Result

* Hiển thị tổng học phí.
* Hiển thị tổng đã thanh toán.
* Hiển thị số tiền còn lại.
* Dữ liệu khớp với lịch sử thanh toán.

---

## TS-017 Hoàn Phí Thành Công

### Priority

High

### Actor

* Kế toán

### Preconditions

* Học viên có giao dịch thanh toán trước đó.

### Steps

1. Mở danh sách thanh toán.
2. Chọn giao dịch cần hoàn phí.
3. Nhập số tiền hoàn.
4. Nhập lý do hoàn.
5. Xác nhận.

### Expected Result

* Giao dịch hoàn phí được ghi nhận.
* Công nợ được cập nhật.
* Audit log được tạo.

---

## TS-018 Không Cho Hoàn Phí Lớn Hơn Số Tiền Đã Thanh Toán

### Priority

High

### Steps

1. Mở màn hình hoàn phí.
2. Nhập số tiền hoàn lớn hơn số tiền đã thanh toán.
3. Xác nhận.

### Expected Result

* Hệ thống từ chối hoàn phí.
* Hiển thị lỗi số tiền hoàn không hợp lệ.

---

# 7. Đặt Lịch Học

## TS-019 Học Viên Xem Lịch Trống

### Priority

High

### Actor

* Học viên

### Steps

1. Đăng nhập bằng tài khoản học viên.
2. Mở màn hình đặt lịch.
3. Chọn loại lịch học.
4. Chọn ngày học.

### Expected Result

* Hệ thống hiển thị các khung giờ còn trống.
* Không hiển thị khung giờ đã bị đặt kín.

---

## TS-020 Học Viên Đặt Lịch Thành Công

### Priority

High

### Preconditions

* Có khung giờ còn trống.

### Steps

1. Chọn loại lịch.
2. Chọn khung giờ còn trống.
3. Xác nhận đặt lịch.

### Expected Result

* Hệ thống tạo booking.
* Hiển thị thông báo: "Lịch đã được đặt".
* Lịch xuất hiện trong danh sách lịch của học viên.

---

## TS-021 Không Cho Đặt Lịch Trùng Thời Gian

### Priority

High

### Preconditions

* Học viên đã có lịch học tại thời điểm A.

### Steps

1. Chọn khung giờ trùng với thời điểm A.
2. Xác nhận đặt lịch.

### Expected Result

* Hệ thống từ chối đặt lịch.
* Hiển thị thông báo trùng lịch.

---

## TS-022 Giáo Vụ Xác Nhận Lịch

### Priority

High

### Actor

* Giáo vụ

### Preconditions

* Có booking ở trạng thái chờ xử lý.

### Steps

1. Mở màn hình booking.
2. Chọn booking cần xử lý.
3. Phân công giáo viên.
4. Phân công xe hoặc cabin.
5. Xác nhận lịch.

### Expected Result

* Booking chuyển sang trạng thái đã xác nhận.
* Schedule được tạo.
* Học viên có thể xem lịch đã xác nhận.

---

## TS-023 Không Cho Phân Giáo Viên Trùng Lịch

### Priority

High

### Preconditions

* Giáo viên đã có lịch tại thời điểm A.

### Steps

1. Xác nhận lịch mới tại thời điểm A.
2. Chọn cùng giáo viên.
3. Lưu.

### Expected Result

* Hệ thống từ chối phân công.
* Hiển thị lỗi giáo viên bị trùng lịch.

---

## TS-024 Không Cho Phân Xe Trùng Lịch

### Priority

High

### Preconditions

* Xe đã có lịch tại thời điểm A.

### Steps

1. Xác nhận lịch mới tại thời điểm A.
2. Chọn cùng xe.
3. Lưu.

### Expected Result

* Hệ thống từ chối phân công.
* Hiển thị lỗi xe bị trùng lịch.

---

## TS-025 Hủy Lịch Học

### Priority

Medium

### Steps

1. Mở lịch học.
2. Chọn lịch cần hủy.
3. Nhập lý do hủy nếu cần.
4. Xác nhận hủy.

### Expected Result

* Lịch chuyển sang trạng thái đã hủy.
* Lịch sử thay đổi được ghi nhận.
* Học viên nhận thông báo nếu có cấu hình.

---

# 8. Đào Tạo Thực Hành

## TS-026 Giáo Viên Xem Lịch Dạy

### Priority

High

### Actor

* Giáo viên

### Steps

1. Giáo viên đăng nhập.
2. Mở màn hình lịch dạy.

### Expected Result

* Hiển thị lịch dạy của giáo viên.
* Không hiển thị lịch của giáo viên khác.

---

## TS-027 Giáo Viên Điểm Danh Đầu Ngày

### Priority

High

### Steps

1. Mở màn hình điểm danh.
2. Nhập ODO đi.
3. Upload hình tình trạng xe nếu cần.
4. Xác nhận điểm danh.

### Expected Result

* Hệ thống ghi nhận check-in.
* Hệ thống ghi nhận ODO đi.
* Trạng thái giáo viên được cập nhật.

---

## TS-028 Ghi Nhận Buổi Học 4H Cơ Bản

### Priority

High

### Steps

1. Giáo viên mở lịch dạy.
2. Chọn buổi học cơ bản.
3. Nhập thời gian bắt đầu.
4. Nhập thời gian kết thúc.
5. Hoàn thành buổi học.

### Expected Result

* Buổi học được ghi nhận.
* Tiến độ 4H cơ bản của học viên được cập nhật.

---

## TS-029 Ghi Nhận Buổi Học Cabin

### Priority

High

### Steps

1. Giáo vụ hoặc hệ thống mở lịch học cabin.
2. Ghi nhận thời lượng học cabin.
3. Hoàn thành buổi học.

### Expected Result

* Giờ cabin của học viên được cập nhật.
* Buổi học hiển thị trong lịch sử cabin.

---

## TS-030 Ghi Nhận Buổi Học DAT

### Priority

High

### Steps

1. Giáo viên mở buổi học DAT.
2. Upload ảnh DAT lúc bắt đầu.
3. Nhập KM bắt đầu.
4. Nhập KM kết thúc.
5. Upload ảnh DAT lúc kết thúc.
6. Hoàn thành buổi học.

### Expected Result

* Buổi DAT được ghi nhận.
* Tổng KM DAT của học viên được cập nhật.
* Tổng thời gian DAT được cập nhật.

---

## TS-031 Không Cho Hoàn Thành DAT Khi Thiếu Ảnh

### Priority

High

### Steps

1. Mở buổi học DAT.
2. Không upload ảnh bắt đầu hoặc kết thúc.
3. Chọn hoàn thành.

### Expected Result

* Hệ thống không cho hoàn thành.
* Hiển thị lỗi thiếu ảnh DAT.

---

## TS-032 Không Cho KM Kết Thúc Nhỏ Hơn KM Bắt Đầu

### Priority

High

### Steps

1. Mở buổi học DAT.
2. Nhập KM bắt đầu lớn hơn KM kết thúc.
3. Chọn hoàn thành.

### Expected Result

* Hệ thống từ chối lưu.
* Hiển thị lỗi KM không hợp lệ.

---

## TS-033 Học Viên Đánh Giá Giáo Viên

### Priority

Medium

### Preconditions

* Buổi học đã hoàn thành.

### Steps

1. Học viên mở chi tiết buổi học.
2. Chọn đánh giá giáo viên.
3. Chọn số sao.
4. Nhập nhận xét.
5. Gửi đánh giá.

### Expected Result

* Đánh giá được lưu.
* Giáo viên có thêm đánh giá mới.

---

## TS-034 Không Cho Đánh Giá Hai Lần Cùng Một Buổi Học

### Priority

Medium

### Preconditions

* Học viên đã đánh giá buổi học A.

### Steps

1. Mở lại buổi học A.
2. Thử gửi đánh giá lần nữa.

### Expected Result

* Hệ thống không cho tạo đánh giá mới.
* Hiển thị thông báo đã đánh giá.

---

# 9. Thi Tốt Nghiệp

## TS-035 Lập Danh Sách Thi Tốt Nghiệp

### Priority

High

### Actor

* Giáo vụ thi

### Steps

1. Mở màn hình thi tốt nghiệp.
2. Chọn tạo kỳ thi.
3. Chọn học viên đủ điều kiện.
4. Lưu danh sách.

### Expected Result

* Kỳ thi được tạo.
* Danh sách học viên được ghi nhận.

---

## TS-036 Không Cho Học Viên Chưa Đủ Điều Kiện Thi Tốt Nghiệp

### Priority

High

### Steps

1. Tạo kỳ thi tốt nghiệp.
2. Chọn học viên chưa hoàn thành điều kiện học.
3. Lưu danh sách.

### Expected Result

* Hệ thống cảnh báo học viên chưa đủ điều kiện.
* Không cho thêm học viên nếu quy tắc bắt buộc được bật.

---

## TS-037 Cập Nhật Lịch Thi Tốt Nghiệp

### Priority

High

### Steps

1. Mở kỳ thi tốt nghiệp.
2. Nhập ngày thi.
3. Lưu.

### Expected Result

* Ngày thi được cập nhật.
* Học viên có thể xem lịch thi.

---

## TS-038 Cập Nhật Kết Quả Thi Tốt Nghiệp

### Priority

High

### Steps

1. Mở danh sách thi tốt nghiệp.
2. Chọn học viên.
3. Nhập kết quả đạt hoặc không đạt.
4. Lưu.

### Expected Result

* Kết quả được lưu.
* Học viên xem được kết quả trên hệ thống.

---

# 10. Thi Sát Hạch

## TS-039 Lập Danh Sách Thi Sát Hạch

### Priority

High

### Actor

* Giáo vụ thi

### Steps

1. Mở màn hình thi sát hạch.
2. Tạo kỳ thi sát hạch.
3. Chọn học viên đủ điều kiện.
4. Lưu danh sách.

### Expected Result

* Danh sách thi sát hạch được tạo.
* Học viên có lịch thi tương ứng.

---

## TS-040 Cập Nhật Kết Quả Thi Sát Hạch Đạt

### Priority

High

### Steps

1. Mở danh sách thi sát hạch.
2. Chọn học viên.
3. Nhập kết quả đạt cho 4 phần thi.
4. Lưu.

### Expected Result

* Kết quả tổng là đạt.
* Học viên chuyển sang bước nhận bằng nếu đúng quy trình.

---

## TS-041 Cập Nhật Kết Quả Thi Sát Hạch Không Đạt Một Phần

### Priority

High

### Steps

1. Mở kết quả thi sát hạch.
2. Nhập đạt cho một số phần.
3. Nhập không đạt cho một phần thi.
4. Lưu.

### Expected Result

* Kết quả tổng là không đạt.
* Hệ thống ghi nhận phần thi chưa đạt.
* Học viên có thể đăng ký thi lại phần chưa đạt.

---

## TS-042 Học Viên Đăng Ký Thi Lại

### Priority

High

### Actor

* Học viên

### Preconditions

* Học viên có ít nhất một phần thi không đạt.

### Steps

1. Học viên mở màn hình kết quả thi.
2. Chọn đăng ký thi lại.
3. Chọn phần thi chưa đạt.
4. Xác nhận đăng ký.

### Expected Result

* Đăng ký thi lại được tạo.
* Phí thi lại được lấy từ cấu hình.
* Kế toán hoặc hệ thống có thể ghi nhận phí thi lại.

---

## TS-043 Không Cho Đăng Ký Thi Lại Phần Đã Đạt

### Priority

High

### Steps

1. Học viên có phần thi lý thuyết đã đạt.
2. Thử đăng ký thi lại phần lý thuyết.

### Expected Result

* Hệ thống không cho đăng ký.
* Chỉ hiển thị phần thi chưa đạt.

---

# 11. Quản Lý Xe

## TS-044 Tạo Xe Thành Công

### Priority

High

### Actor

* Quản trị hệ thống
* Quản lý khu vực

### Steps

1. Mở màn hình danh sách xe.
2. Chọn tạo xe.
3. Nhập biển số xe.
4. Nhập thông tin xe.
5. Lưu.

### Expected Result

* Xe được tạo thành công.
* Biển số xe là duy nhất.

---

## TS-045 Không Cho Tạo Xe Trùng Biển Số

### Priority

High

### Preconditions

* Đã tồn tại xe có biển số A.

### Steps

1. Tạo xe mới.
2. Nhập biển số A.
3. Lưu.

### Expected Result

* Hệ thống từ chối tạo xe.
* Hiển thị lỗi biển số đã tồn tại.

---

## TS-046 Cập Nhật Giấy Tờ Xe

### Priority

Medium

### Steps

1. Mở chi tiết xe.
2. Chọn tab giấy tờ xe.
3. Cập nhật ngày hết hạn đăng kiểm hoặc bảo hiểm.
4. Lưu.

### Expected Result

* Giấy tờ xe được cập nhật.
* Hệ thống hiển thị ngày hết hạn mới.

---

## TS-047 Ghi Nhận Xe Đi Và ODO Đi

### Priority

High

### Actor

* Giáo viên

### Steps

1. Giáo viên mở màn hình check-in.
2. Chọn xe.
3. Nhập ODO đi.
4. Xác nhận.

### Expected Result

* Hệ thống tạo vehicle usage.
* ODO đi được ghi nhận.

---

## TS-048 Ghi Nhận Xe Về Và ODO Về

### Priority

High

### Steps

1. Giáo viên mở màn hình kết thúc ngày.
2. Nhập ODO về.
3. Xác nhận.

### Expected Result

* Vehicle usage được cập nhật ODO về.
* ODO về lớn hơn hoặc bằng ODO đi.
* Thời gian xe về được ghi nhận.

---

## TS-049 Không Cho ODO Về Nhỏ Hơn ODO Đi

### Priority

High

### Steps

1. Mở màn hình nhập ODO về.
2. Nhập ODO về nhỏ hơn ODO đi.
3. Lưu.

### Expected Result

* Hệ thống từ chối lưu.
* Hiển thị lỗi ODO không hợp lệ.

---

## TS-050 Giáo Viên Khai Báo Đổ Xăng

### Priority

Medium

### Steps

1. Giáo viên mở màn hình khai báo xăng.
2. Chọn xe.
3. Nhập số lít.
4. Upload hóa đơn.
5. Gửi.

### Expected Result

* Fuel log được tạo.
* Dữ liệu xăng xuất hiện trong báo cáo xe.

---

## TS-051 Giáo Viên Gửi Đề Xuất Bảo Dưỡng

### Priority

Medium

### Steps

1. Giáo viên mở màn hình đề xuất bảo dưỡng.
2. Chọn xe.
3. Nhập hạng mục cần bảo dưỡng.
4. Gửi đề xuất.

### Expected Result

* Maintenance request được tạo.
* Trạng thái là chờ duyệt.

---

## TS-052 Quản Lý Duyệt Đề Xuất Bảo Dưỡng

### Priority

Medium

### Actor

* Quản lý khu vực

### Steps

1. Mở danh sách đề xuất bảo dưỡng.
2. Chọn đề xuất đang chờ duyệt.
3. Chọn duyệt.

### Expected Result

* Đề xuất chuyển sang trạng thái đã duyệt.
* Audit log được ghi nhận.

---

# 12. Nghỉ Phép

## TS-053 Giáo Viên Gửi Yêu Cầu Nghỉ Phép

### Priority

Medium

### Actor

* Giáo viên

### Steps

1. Mở màn hình nghỉ phép.
2. Chọn ngày nghỉ.
3. Nhập lý do.
4. Gửi yêu cầu.

### Expected Result

* Leave request được tạo.
* Trạng thái là chờ duyệt.

---

## TS-054 Quản Lý Duyệt Nghỉ Phép

### Priority

Medium

### Actor

* Quản lý khu vực

### Steps

1. Mở danh sách nghỉ phép.
2. Chọn đơn nghỉ phép.
3. Chọn duyệt.

### Expected Result

* Đơn nghỉ phép chuyển sang trạng thái đã duyệt.
* Giáo viên nhận thông báo nếu có cấu hình.

---

## TS-055 Không Cho Hai Giáo Viên Nghỉ Chung Ngày Nếu Quy Tắc Được Bật

### Priority

Medium

### Preconditions

* Quy tắc không cho hai giáo viên nghỉ cùng ngày đang bật.
* Đã có giáo viên A nghỉ ngày D.

### Steps

1. Giáo viên B gửi nghỉ ngày D.
2. Quản lý duyệt đơn.

### Expected Result

* Hệ thống cảnh báo vi phạm quy tắc.
* Không cho duyệt nếu quy tắc bắt buộc.

---

# 13. Lương

## TS-056 Sinh Bảng Lương Giáo Viên

### Priority

High

### Actor

* Quản trị hệ thống
* Quản lý khu vực

### Steps

1. Mở màn hình lương.
2. Chọn tháng, năm.
3. Chọn sinh bảng lương.
4. Hệ thống tính giờ và tiền lương.

### Expected Result

* Bảng lương được tạo.
* Các dòng lương được tính theo giờ dạy.
* Trạng thái là nháp.

---

## TS-057 Gửi Bảng Lương Chờ Duyệt

### Priority

High

### Steps

1. Mở bảng lương ở trạng thái nháp.
2. Chọn gửi duyệt.

### Expected Result

* Bảng lương chuyển sang trạng thái chờ duyệt.
* Giám đốc có thể xem bảng lương.

---

## TS-058 Giám Đốc Duyệt Lương

### Priority

High

### Actor

* Giám đốc

### Steps

1. Đăng nhập bằng tài khoản giám đốc.
2. Mở danh sách lương chờ duyệt.
3. Chọn bảng lương.
4. Chọn duyệt.

### Expected Result

* Bảng lương chuyển sang trạng thái đã duyệt.
* Audit log được tạo.

---

## TS-059 Giám Đốc Từ Chối Lương

### Priority

Medium

### Steps

1. Mở bảng lương chờ duyệt.
2. Chọn từ chối.
3. Nhập lý do.
4. Xác nhận.

### Expected Result

* Bảng lương chuyển sang trạng thái bị từ chối.
* Lý do từ chối được lưu.

---

# 14. Quản Trị Hệ Thống

## TS-060 Cấu Hình Gói Học

### Priority

High

### Actor

* Quản trị hệ thống

### Steps

1. Mở cấu hình gói học.
2. Tạo hoặc cập nhật gói học.
3. Nhập giá, giờ học, KM DAT yêu cầu.
4. Lưu.

### Expected Result

* Gói học được lưu.
* Gói học có thể được chọn khi tạo học viên.

---

## TS-061 Cấu Hình Phí Thi Lại

### Priority

High

### Steps

1. Mở cấu hình phí.
2. Chọn loại phí thi lại.
3. Nhập số tiền.
4. Lưu.

### Expected Result

* Phí thi lại được cập nhật.
* Khi học viên đăng ký thi lại, hệ thống lấy đúng mức phí.

---

## TS-062 Quản Lý Tài Khoản Người Dùng

### Priority

High

### Steps

1. Mở màn hình người dùng.
2. Tạo tài khoản mới.
3. Gán vai trò.
4. Lưu.

### Expected Result

* Tài khoản được tạo.
* Người dùng có quyền tương ứng với vai trò.

---

## TS-063 Reset Mật Khẩu Người Dùng

### Priority

Medium

### Steps

1. Mở danh sách người dùng.
2. Chọn tài khoản.
3. Chọn reset mật khẩu.
4. Xác nhận.

### Expected Result

* Mật khẩu được reset.
* Người dùng có thể đăng nhập bằng mật khẩu mới theo cấu hình.

---

## TS-064 Quản Lý Phân Quyền

### Priority

High

### Steps

1. Mở màn hình vai trò và quyền.
2. Chọn role.
3. Thêm hoặc gỡ quyền.
4. Lưu.

### Expected Result

* Quyền được cập nhật.
* Người dùng thuộc role đó bị ảnh hưởng theo cấu hình mới.

---

# 15. Báo Cáo

## TS-065 Xem Báo Cáo Học Viên

### Priority

Medium

### Steps

1. Mở báo cáo học viên.
2. Chọn bộ lọc.
3. Xem kết quả.

### Expected Result

* Hệ thống hiển thị thống kê học viên.
* Số liệu khớp với dữ liệu học viên thực tế.

---

## TS-066 Xem Báo Cáo Doanh Thu

### Priority

High

### Actor

* Kế toán
* Giám đốc

### Steps

1. Mở báo cáo doanh thu.
2. Chọn tháng, năm.
3. Xem kết quả.

### Expected Result

* Hiển thị tổng học phí.
* Hiển thị phí học thêm.
* Hiển thị phí thi lại.
* Hiển thị hoàn phí.
* Số liệu khớp với dữ liệu thanh toán.

---

## TS-067 Xem Báo Cáo Kết Quả Thi

### Priority

Medium

### Steps

1. Mở báo cáo thi.
2. Chọn kỳ thi hoặc khoảng thời gian.
3. Xem kết quả.

### Expected Result

* Hiển thị số học viên thi.
* Hiển thị số đậu, số rớt.
* Hiển thị tỷ lệ đậu.
* Hiển thị danh sách thi lại.

---

## TS-068 Xem Báo Cáo Xe

### Priority

Medium

### Steps

1. Mở báo cáo xe.
2. Chọn tháng.
3. Xem kết quả.

### Expected Result

* Hiển thị tổng KM.
* Hiển thị tổng lít xăng.
* Hiển thị xe đến hạn bảo dưỡng hoặc giấy tờ sắp hết hạn nếu có.

---

# 16. Thông Báo

## TS-069 Gửi Thông Báo Học Phí

### Priority

Medium

### Preconditions

* Học viên còn nợ học phí.

### Steps

1. Hệ thống hoặc nhân viên kích hoạt nhắc học phí.
2. Học viên mở màn hình thông báo.

### Expected Result

* Học viên nhận được thông báo học phí.
* Nội dung thông báo hiển thị số tiền hoặc nội dung cần thanh toán.

---

## TS-070 Gửi Thông Báo Lịch Học

### Priority

Medium

### Preconditions

* Lịch học đã được xác nhận.

### Steps

1. Giáo vụ xác nhận lịch.
2. Học viên mở thông báo.

### Expected Result

* Học viên nhận được thông báo lịch học.
* Thông báo hiển thị ngày, giờ và loại buổi học.

---

## TS-071 Đánh Dấu Thông Báo Đã Đọc

### Priority

Low

### Steps

1. Học viên mở danh sách thông báo.
2. Chọn một thông báo chưa đọc.
3. Đánh dấu đã đọc.

### Expected Result

* Trạng thái thông báo chuyển thành đã đọc.

---

# 17. Audit Log

## TS-072 Ghi Audit Log Khi Cập Nhật Học Viên

### Priority

High

### Steps

1. Cập nhật thông tin học viên.
2. Mở audit log của học viên.

### Expected Result

* Có log ghi nhận thao tác cập nhật.
* Log có người thao tác, thời gian, dữ liệu trước và sau nếu có.

---

## TS-073 Ghi Audit Log Khi Thu Học Phí

### Priority

High

### Steps

1. Kế toán tạo thanh toán.
2. Mở audit log.

### Expected Result

* Có log ghi nhận giao dịch thanh toán.
* Log có actor và mã giao dịch liên quan.

---

## TS-074 Ghi Audit Log Khi Cập Nhật Kết Quả Thi

### Priority

High

### Steps

1. Giáo vụ thi cập nhật kết quả thi.
2. Mở audit log.

### Expected Result

* Có log ghi nhận cập nhật kết quả thi.
* Log lưu người thao tác và thời gian.

---

## TS-075 Ghi Audit Log Khi Duyệt Lương

### Priority

High

### Steps

1. Giám đốc duyệt bảng lương.
2. Mở audit log.

### Expected Result

* Có log ghi nhận hành động duyệt lương.
* Log lưu người duyệt và thời gian duyệt.

---

# 18. Test Data Đề Xuất

## Người dùng

| Role            | Username mẫu |
| --------------- | ------------ |
| Học viên        | student01    |
| Giáo viên       | teacher01    |
| Kế toán         | accountant01 |
| Giáo vụ         | education01  |
| Giáo vụ thi     | exam01       |
| Quản lý khu vực | manager01    |
| Admin           | admin01      |
| Giám đốc        | director01   |

---

## Học viên

| Mã    | Trạng thái             |
| ----- | ---------------------- |
| HV001 | Mới tạo                |
| HV002 | Đã hoàn thiện hồ sơ    |
| HV003 | Đang học DAT           |
| HV004 | Chờ thi tốt nghiệp     |
| HV005 | Chờ thi sát hạch       |
| HV006 | Thi sát hạch không đạt |
| HV007 | Hoàn thành khóa học    |

---

## Xe

| Biển số   | Trạng thái            |
| --------- | --------------------- |
| 51A-00001 | Hoạt động             |
| 51A-00002 | Đang bảo dưỡng        |
| 51A-00003 | Sắp hết hạn đăng kiểm |

---

## Giáo viên

| Mã    | Trạng thái       |
| ----- | ---------------- |
| GV001 | Có lịch hôm nay  |
| GV002 | Không có lịch    |
| GV003 | Đã xin nghỉ phép |

---

# 19. Ghi Chú

## 19.1 Test Scenario Khác Test Case

Tài liệu này mới mô tả kịch bản kiểm thử ở mức nghiệp vụ.

Test case chi tiết có thể được tách riêng theo format:

```text
Test Case ID
Precondition
Input
Steps
Expected Result
Actual Result
Status
```

---

## 19.2 Nên Ưu Tiên Test Theo Luồng Chính

Thứ tự kiểm thử đề xuất:

1. Đăng nhập và phân quyền
2. Tạo học viên
3. Ghi nhận học phí
4. Đặt lịch học
5. Xác nhận lịch
6. Ghi nhận buổi học
7. Thi tốt nghiệp
8. Thi sát hạch
9. Xe
10. Lương
11. Báo cáo

---

## 19.3 Các Luồng Tài Chính Phải Test Kỹ

Các chức năng sau cần test kỹ hơn bình thường:

* Thu học phí
* Hoàn phí
* Thu phí học thêm
* Thu phí thi lại
* Tính lương
* Duyệt lương
* Báo cáo doanh thu
