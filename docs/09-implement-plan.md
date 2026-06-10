# Implementation Plan

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0  
Status: Draft

---

# 1. Mục Đích

Tài liệu này mô tả kế hoạch triển khai hệ thống theo từng giai đoạn.

---

# 2. Nguyên Tắc Triển Khai

## 2.1 Ưu Tiên Luồng Chính

Triển khai trước:

```text
Học viên
→ Hồ sơ
→ Học phí
→ Đặt lịch
→ Buổi học
→ Thi
→ Nhận bằng
```

## 2.2 Không Code Theo Màn Hình Trước

Thứ tự khuyến nghị:

```text
Database
→ Backend Domain
→ REST API
→ Web Admin
→ Student UI
→ Teacher UI
→ Reports
```

## 2.3 Đúng Nghiệp Vụ Trước

Ưu tiên:

- Dữ liệu đúng.
- Phân quyền đúng.
- Luồng nghiệp vụ đúng.
- Có thể demo và kiểm thử.

---

# 3. Phase 0: Project Setup

## Mục tiêu

Chuẩn bị nền tảng kỹ thuật.

## Công việc

- Repository structure.
- Backend project.
- Frontend project.
- Database.
- Docker Compose.
- Migration tool.
- Authentication base.
- Logging.
- Error response chuẩn.
- Validation chuẩn.

---

# 4. Phase 1: Identity & Access

## Mục tiêu

Triển khai đăng nhập, tài khoản, vai trò và phân quyền.

## Chức năng

- Đăng nhập.
- Đổi mật khẩu.
- Admin reset mật khẩu.
- Quản lý user.
- Quản lý role.
- Quản lý permission.
- RBAC.

## Không thuộc MVP

- Quên mật khẩu tự động.
- Google/Facebook login.

---

# 5. Phase 2: Student, Course & Enrollment

## Mục tiêu

Quản lý học viên, gói học và đăng ký khóa học.

## Chức năng

- Tạo học viên.
- Cập nhật học viên.
- Tra cứu học viên.
- Quản lý gói học.
- Một học viên có thể có nhiều enrollment.
- Hủy enrollment bằng trạng thái `CANCELLED`.

---

# 6. Phase 3: Student Documents

## Mục tiêu

Quản lý hồ sơ học viên linh hoạt.

## Chức năng

- Upload hồ sơ.
- Ghi chú hồ sơ.
- Hồ sơ chỉ file.
- Hồ sơ chỉ ghi chú.
- Kinh doanh đánh dấu hồ sơ hoàn thiện thủ công.

---

# 7. Phase 4: Payment Management

## Mục tiêu

Quản lý học phí, công nợ, hoàn phí và phiếu thu.

## Chức năng

- Ghi nhận học phí.
- Không cho thanh toán dư.
- Xem công nợ.
- Ghi nhận phí học thêm.
- Ghi nhận phí thi lại.
- Hoàn phí một phần/toàn phần.
- In phiếu thu.
- Xuất PDF phiếu thu.
- Cấu hình đợt thanh toán.

## Backend

- payments.
- refunds.
- payment_plans.
- payment_receipts.
- Receipt PDF generation.

---

# 8. Phase 5: Booking & Scheduling

## Mục tiêu

Triển khai đặt lịch học trực tiếp, không cần giáo vụ xác nhận.

Giáo vụ có thể theo dõi, điều phối, phân công giáo viên/xe và điều chỉnh lịch khi cần.

## Chức năng

- Học viên xem lịch trống.
- Học viên đặt lịch.
- Hệ thống kiểm tra xung đột lịch.
- Lịch được tạo ngay nếu hợp lệ.
- Học viên hủy lịch trước giờ bắt đầu.
- Giáo vụ phân công giáo viên thủ công nếu cần.
- Giáo vụ phân công xe thủ công nếu cần.
- Giáo vụ đổi lịch hoặc hủy lịch nếu có quyền.
- Ghi lịch sử thay đổi lịch.

---

# 9. Phase 6: Training Session Management

## Mục tiêu

Ghi nhận buổi học thực tế.

## Chức năng

- Giáo viên xem lịch dạy.
- Giáo viên bắt đầu buổi học.
- Giáo viên đánh dấu hoàn thành buổi học.
- Học viên xác nhận buổi học.
- DAT nhập tay.
- Ảnh DAT optional.
- Tính tổng giờ học.
- Tính tổng KM DAT.
- Học viên đánh giá giáo viên.
- Tính điểm đánh giá trung bình giáo viên.

---

# 10. Phase 7: Exam Management

## Mục tiêu

Quản lý thi tốt nghiệp, thi sát hạch và thi lại.

## Chức năng

- Giáo vụ thi xác nhận đủ điều kiện thi thủ công.
- Tạo kỳ thi tốt nghiệp.
- Tạo kỳ thi sát hạch.
- Cập nhật kết quả thi tốt nghiệp.
- Cập nhật kết quả sát hạch theo 4 phần.
- Học viên đăng ký thi lại từng phần chưa đạt.
- Ghi nhận phí thi lại.

---

# 11. Phase 8: Teacher, Vehicle Usage & Fuel

## Mục tiêu

Triển khai nghiệp vụ giáo viên, xe, hình ảnh xe và nhiên liệu.

## Chức năng

- Quản lý giáo viên.
- Giáo viên điểm danh.
- Giáo viên bắt buộc upload hình xe trước khi sử dụng.
- Giáo viên có thể khai báo ODO đi nếu có.
- Giáo viên có thể khai báo ODO về nếu có.
- Giáo viên khai báo đổ xăng.
- Kế toán xem dữ liệu xăng.
- Quản lý xem lịch sử sử dụng xe.

---

# 12. Phase 9: Vehicle Documents & Maintenance

## Mục tiêu

Quản lý giấy tờ xe, bảo dưỡng và thay thế phụ tùng.

## Chức năng

- Quản lý giấy tờ xe.
- Theo dõi ngày hết hạn giấy tờ.
- Giáo viên gửi đề xuất bảo dưỡng.
- Quản lý duyệt bảo dưỡng một cấp.
- Ghi nhận lịch sử bảo dưỡng.
- Ghi nhận chi phí bảo dưỡng.
- Ghi nhận phụ tùng thay thế.

---

# 13. Phase 10: HR & Leave Management

## Mục tiêu

Quản lý nhân sự và nghỉ phép.

## Chức năng

- Quản lý nhân viên.
- Quản lý khu vực.
- Giáo viên gửi nghỉ phép.
- Quản lý duyệt hoặc từ chối nghỉ phép.
- Cấu hình số ngày nghỉ tối đa.
- Cấu hình số giáo viên tối thiểu còn lại khi duyệt nghỉ.

---

# 14. Phase 11: Teaching Hour Summary

## Mục tiêu

Triển khai tổng hợp giờ dạy của giáo viên và trình Giám đốc duyệt.

Phiên bản đầu tiên chưa tính lương tự động thành tiền.

## Chức năng

- Tổng hợp giờ dạy T2-T6.
- Tổng hợp giờ dạy T7-CN.
- Tổng hợp giờ dạy ca đêm.
- Tổng hợp giờ cảm ứng tập.
- Tổng hợp giờ cảm ứng thi.
- Gửi bảng tổng hợp chờ duyệt.
- Giám đốc duyệt hoặc từ chối.

---

# 15. Phase 12: Notification

## Mục tiêu

Triển khai thông báo trong ứng dụng.

## Chức năng

- Thông báo học phí.
- Thông báo lịch học.
- Thông báo lịch thi.
- Thông báo kết quả thi.
- Thông báo nghỉ phép.
- Thông báo bảo dưỡng.
- Đánh dấu đã đọc.

## Không tích hợp trong MVP

- SMS.
- Email.
- Zalo.

---

# 16. Phase 13: Reports MVP

## Chức năng MVP

- Báo cáo học viên đã hoàn thành khóa học.
- Báo cáo kết quả thi sát hạch của tất cả học viên.
- Báo cáo thông tin xe.
- Báo cáo thông tin nhân viên.
- Báo cáo lương hoặc bảng tổng hợp giờ dạy.

## Không thuộc MVP

- Báo cáo nâng cao.
- Dashboard nâng cao.
- Xuất Excel.
- Xuất PDF báo cáo.

---

# 17. Phase 14: Audit Log

## Mục tiêu

Triển khai audit log cho các thao tác quan trọng.

## Chức năng

- Audit học viên.
- Audit học phí.
- Audit hoàn phí.
- Audit kết quả thi.
- Audit lương/bảng tổng hợp giờ dạy.
- Audit phân quyền.
- Audit reset mật khẩu.
- Tra cứu audit log.

---

# 18. Milestone Đề Xuất

## Milestone 1: Nền Tảng Và Học Viên

Bao gồm:

- Phase 0.
- Phase 1.
- Phase 2.
- Phase 3.

## Milestone 2: Học Phí Và Đặt Lịch

Bao gồm:

- Phase 4.
- Phase 5.

## Milestone 3: Đào Tạo Và Thi Cử

Bao gồm:

- Phase 6.
- Phase 7.

## Milestone 4: Giáo Viên, Xe Và Nghỉ Phép

Bao gồm:

- Phase 8.
- Phase 9.
- Phase 10.

## Milestone 5: Giờ Dạy, Báo Cáo, Thông Báo Và Audit

Bao gồm:

- Phase 11.
- Phase 12.
- Phase 13.
- Phase 14.

---

# 19. Definition of Done

Một chức năng được xem là hoàn thành khi:

- Database migration đã có.
- API đã triển khai.
- Validation đã có.
- Phân quyền đã áp dụng.
- Frontend gọi được API.
- Có xử lý loading, error, empty state.
- Có test dữ liệu cơ bản.
- Có audit log nếu là nghiệp vụ quan trọng.
- Có cập nhật tài liệu nếu thay đổi nghiệp vụ.
