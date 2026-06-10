# Open Questions

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Confirmed

---

# 1. Mục Đích

Tài liệu này lưu lại các câu hỏi nghiệp vụ đã được xác nhận, dùng làm căn cứ để chốt scope, business rules, domain model, ERD, API và kế hoạch triển khai.

---

# 2. Tài Khoản Và Phân Quyền

## Q-001 Tài khoản học viên được tạo khi nào?

Admin hoặc Kế toán tạo thủ công.

## Q-002 Username của học viên là gì?

Tên đăng nhập: Họ tên học viên viết liền không dấu.  
Mật khẩu: Số điện thoại học viên.

## Q-003 Học viên có được đổi mật khẩu không?

Có.

## Q-004 Có cần quên mật khẩu không?

Tạm thời không. Cần liên hệ Admin để reset mật khẩu. Sau này sẽ phát triển thêm.

## Q-005 Có cần đăng nhập bằng Google hoặc Facebook không?

Không.

---

# 3. Quản Lý Học Viên

## Q-006 Một học viên có thể đăng ký nhiều khóa học không?

Có.

## Q-007 Khi học viên hủy khóa học thì trạng thái nào được sử dụng?

CANCELLED.

## Q-008 Có cần lưu lịch sử thay đổi thông tin học viên không?

Có.

---

# 4. Hồ Sơ Học Viên

## Q-009 Danh sách hồ sơ bắt buộc gồm những gì?

Cho phép linh hoạt dựa trên upload file và đính kèm ghi chú. Một số loại hồ sơ chỉ cần ghi chú là đủ.

## Q-010 Điều kiện để hồ sơ hoàn thiện là gì?

Do nhân viên Kinh doanh tự đánh dấu.

---

# 5. Học Phí

## Q-011 Học phí chia thành bao nhiêu đợt?

Cho phép cài đặt linh hoạt.

## Q-012 Có cho phép thanh toán dư không?

Không.

## Q-013 Có cho phép hoàn phí một phần không?

Có.

## Q-014 Có cần in phiếu thu không?

Có.

## Q-015 Có cần xuất PDF phiếu thu không?

Có.

---

# 6. Đặt Lịch Học

## Q-016 Học viên được đặt lịch trước tối đa bao nhiêu ngày?

Ít nhất trước giờ bắt đầu lịch.

## Q-017 Học viên có được hủy lịch không?

Có.

## Q-018 Nếu được hủy lịch thì phải hủy trước bao lâu?

Ít nhất trước giờ bắt đầu lịch.

## Q-019 Một học viên được giữ tối đa bao nhiêu lịch đang chờ?

Không giới hạn, miễn là không trùng và không xung đột lịch.

## Q-020 Có cần giáo vụ xác nhận lịch không?

Không.

## Q-021 Có cần tự động phân giáo viên không?

Không.

## Q-022 Có cần tự động phân xe không?

Không.

---

# 7. Đào Tạo

## Q-023 Điều kiện hoàn thành 4H cơ bản là gì?

Giáo viên tự đánh dấu.

## Q-024 Điều kiện hoàn thành cabin là gì?

Giáo viên tự đánh dấu.

## Q-025 Điều kiện hoàn thành DAT là gì?

Giáo viên tự đánh dấu.

## Q-026 DAT lấy dữ liệu từ đâu?

Nhập tay.

## Q-027 Có bắt buộc chụp ảnh DAT đầu và cuối buổi học không?

Không.

## Q-028 Có cần học viên xác nhận hoàn thành buổi học không?

Có.

---

# 8. Giáo Viên

## Q-029 Giáo viên có được xem lịch dạy tương lai không?

Có.

## Q-030 Giáo viên có được đổi lịch dạy không?

Có.

## Q-031 Có cần tính điểm đánh giá giáo viên trung bình không?

Có.

---

# 9. Thi Tốt Nghiệp

## Q-032 Điều kiện đủ thi tốt nghiệp là gì?

Giáo vụ thi sẽ nhập tay.

## Q-033 Có cho phép thi tốt nghiệp nhiều lần không?

Có.

## Q-034 Thi lại tốt nghiệp có mất phí không?

Có.

---

# 10. Thi Sát Hạch

## Q-035 Điều kiện đủ thi sát hạch là gì?

Giáo vụ thi sẽ nhập tay.

## Q-036 Có bao nhiêu phần thi sát hạch?

Chính xác gồm:

- Lý thuyết.
- Mô phỏng.
- Sa hình.
- Đường trường.

## Q-037 Thi lại tính theo từng phần hay toàn bộ kỳ thi?

Theo từng phần.

## Q-038 Học viên có được tự đăng ký thi lại không?

Có.

---

# 11. Xe

## Q-039 Một xe có gán cố định cho giáo viên không?

Không.

## Q-040 Có bắt buộc nhập ODO đầu và cuối ngày không?

Không.

## Q-041 Có bắt buộc chụp hình xe trước khi đi không?

Có.

## Q-042 Có cần theo dõi nhiên liệu theo định mức không?

Có.

---

# 12. Bảo Dưỡng Xe

## Q-043 Đề xuất bảo dưỡng cần bao nhiêu cấp duyệt?

1 cấp.

## Q-044 Có cần quản lý chi phí bảo dưỡng không?

Có.

## Q-045 Có cần quản lý thay thế phụ tùng không?

Có.

---

# 13. Nghỉ Phép

## Q-046 Giáo viên được nghỉ tối đa bao nhiêu ngày/tháng?

Mặc định không giới hạn, tuy nhiên Admin có thể điều chỉnh.

## Q-047 Có cần kiểm tra số lượng giáo viên tối thiểu còn lại khi duyệt nghỉ không?

Có.

---

# 14. Lương

## Q-048 Công thức tính lương giáo viên là gì?

Tạm thời chỉ hiển thị tổng giờ dạy theo:

- T2-T6.
- T7&CN.
- Đêm.
- Cảm ứng tập.
- Cảm ứng thi.

## Q-049 Có phụ cấp không?

Không.

## Q-050 Có thưởng KPI không?

Không.

## Q-051 Có khấu trừ không?

Không.

## Q-052 Lương được duyệt bởi ai?

Giám đốc.

---

# 15. Thông Báo

## Q-053 Hệ thống gửi thông báo qua kênh nào?

Trong ứng dụng. Sau này sẽ mở rộng.

## Q-054 Có cần gửi thông báo tự động không?

Có.

---

# 16. Báo Cáo

## Q-055 Các báo cáo nào là bắt buộc trong phiên bản đầu tiên?

- Học viên đã hoàn thành khóa học.
- Kết quả thi sát hạch của tất cả học viên.
- Thông tin xe.
- Thông tin nhân viên.
- Lương.

## Q-056 Có cần xuất Excel không?

Không.

## Q-057 Có cần xuất PDF không?

Không.

---

# 17. Tích Hợp Bên Ngoài

## Q-058 Có tích hợp cổng thanh toán không?

Không.

## Q-059 Có tích hợp SMS Provider không?

Không.

## Q-060 Có tích hợp thiết bị DAT không?

Không.

---

# 18. Dữ Liệu Và Audit

## Q-061 Có được xóa dữ liệu không?

Dữ liệu chỉ được soft delete. Riêng Audit không được xóa.

## Q-062 Những dữ liệu nào bắt buộc phải audit?

- Học phí.
- Hoàn phí.
- Kết quả thi.
- Lương.
- Phân quyền.
- Học viên.

---

# 19. Xác Nhận Phạm Vi MVP

## Q-063 Chức năng nào có thể triển khai sau?

- Dashboard nâng cao.
- Audit log chi tiết.
- Báo cáo nâng cao.
- Tính lương tự động.

---

# 20. Kết Luận

Các câu hỏi đã được xác nhận và được dùng làm cơ sở cập nhật:

- 01-requirements.md
- 02-business-rules.md
- 03-use-cases.md
- 04-domain-model.md
- 05-erd.md
- 06-rest-api-spec.md
- 07-screen-specification.md
- 08-test-scenarios.md
- 09-implement-plan.md

Mọi thay đổi sau thời điểm này nên được xử lý theo quy trình Change Request.
