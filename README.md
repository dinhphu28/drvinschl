# Driving Training Management System (Drvinschl)

Hệ thống quản lý trường dạy lái xe theo `REQUIREMENT_SPECIFICATION.md`.

## Cấu trúc

| Thư mục | Mô tả |
|---------|-------|
| `backend/` | Spring Boot API (Java 21, PostgreSQL, JWT) |
| `frontend/` | Web app cho nhân viên (React + Vite) |
| `mobile/` | App di động học viên (không bắt buộc cho plan hiện tại) |

## Vai trò (Actors)

- **HOC_VIEN** — Web: hồ sơ, tiến độ, đặt lịch, học phí, thi
- **KINH_DOANH** — Web: tư vấn, hợp đồng, hồ sơ
- **KE_TOAN** — Web: thu phí, hoàn phí, xăng, lương
- **GIAO_VU_KHU_VUC / GIAO_VU_SA_HINH** — Web: phân bổ lịch, xe, GV
- **GIAO_VU_THI** — Web: quản lý thi
- **GIAO_VIEN** — Web: lịch dạy, báo cáo buổi học, xăng
- **QUAN_LY_KHU_VUC** — Web: duyệt nghỉ phép, bảo dưỡng, lương
- **ADMIN** — Web: cấu hình hệ thống
- **GIAM_DOC** — Web: thống kê, duyệt lương

## Chạy nhanh bằng Makefile

Các lệnh này tự dùng `backend/.env` cho backend và Docker Compose.

```bash
make db        # Chỉ start PostgreSQL
make db-fresh  # Xóa volume DB và tạo DB mới
make backend   # Start DB rồi chạy backend
make frontend  # Chạy frontend
make all       # Start DB, backend và frontend
make stop      # Stop Docker services
make ps        # Xem trạng thái Docker services
make test      # Backend test + frontend build
```

Web: http://localhost:5173  
API: http://localhost:8080  
Swagger: http://localhost:8080/swagger-ui.html

## Chạy Backend thủ công

```bash
cd backend
docker compose up -d db
source .env
./gradlew bootRun
```

API: http://localhost:8080  
Swagger: http://localhost:8080/swagger-ui.html

## Chạy Frontend thủ công (Web)

```bash
cd frontend
yarn install
yarn dev
```

Web: http://localhost:5173

## Chạy Mobile (tùy chọn)

```bash
cd mobile
npm install
npx expo start
```

## Tài khoản demo

Mật khẩu tất cả: `password123`

| Email | Vai trò |
|-------|---------|
| admin@drvinschl.local | ADMIN |
| ketoan@drvinschl.local | KE_TOAN |
| sales@drvinschl.local | KINH_DOANH |
| teacher@drvinschl.local | GIAO_VIEN |
| ops@drvinschl.local | GIAO_VU_KHU_VUC |
| student@drvinschl.local | HOC_VIEN (web) |
| director@drvinschl.local | GIAM_DOC |

## API Modules

- `/api/v1/students/*` — Học viên (profile, tiến độ, đặt lịch, thi)
- `/api/v1/sales/*` — Kinh doanh
- `/api/v1/accounting/*` — Kế toán
- `/api/v1/ops/*` — Giáo vụ
- `/api/v1/exams/*` — Giáo vụ thi
- `/api/v1/teachers/*` — Giáo viên
- `/api/v1/vehicles/*` — Quản lý xe
- `/api/v1/area-manager/*` — Quản lý khu vực
- `/api/v1/admin/*` — Admin
- `/api/v1/director/*` — Giám đốc
