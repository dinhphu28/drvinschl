# Driving Training Management System

## Full Requirement Specification (Derived from Business Flow)

---

## 1. Actors

```yaml
actors:
  - hoc_vien
  - kinh_doanh
  - ke_toan
  - giao_vu_khu_vuc
  - giao_vu_sa_hinh
  - giao_vu_thi
  - giao_vien
  - quan_ly_khu_vuc
  - admin
  - giam_doc
```

---

## 2. Student (Học Viên)

```yaml
module: hoc_vien

features:

  account:
    - login
    - view_profile

  profile:
    - ho_ten
    - ngay_sinh
    - dien_thoai
    - khoa_hoc
    - ngay_nop_ho_so
    - ngay_khai_giang
    - ngay_be_giang
    - ngay_thanh_ly

  learning_progress:
    - theo_doi_theo_tab:
        - ly_thuyet
        - mo_phong
        - 4h_co_ban
        - cabin
        - DAT
        - sa_hinh_tho
        - sa_hinh_cam_ung

  payment:
    - xem_hoc_phi_da_dong
    - xem_hoc_phi_con_lai

  scheduling:

    4h_co_ban:
      - xem_lich_trong
      - dat_lich
      - thong_bao_dat_lich_thanh_cong
      - sau_buoi_hoc:
          - danh_gia_gv
          - nhan_xet
          - ghi_nhan_lich_su

    cabin:
      - dat_lich_2h
      - ghi_nhan_sau_buoi_hoc

    DAT:
      - dat_lich
      - sau_buoi_hoc:
          - ghi_nhan_km
          - ghi_nhan_thoi_gian
          - tong_km
          - km_con_lai
          - tong_thoi_gian

    sa_hinh_tho:
      - dat_lich
      - danh_gia_gv
      - ghi_nhan_buoi_hoc

    sa_hinh_cam_ung:
      - hoc_theo_lich_duoc_xep
      - danh_gia_gv
      - ghi_nhan_buoi_hoc

  extra_registration:
    - dang_ky_them_gio_duong_truong
    - dang_ky_them_sa_hinh

  exam:

    thi_tot_nghiep:
      - xem_lich_thi
      - xem_ket_qua

    thi_sat_hach:
      - xem_lich_thi
      - xem_huong_dan
      - xem_ket_qua

      retake:
        - dang_ky_thi_lai
        - ap_dung_phi

  certificate:
    - xem_ngay_nhan_bang
```

---

## 3. Sales (Kinh Doanh)

```yaml
module: kinh_doanh

features:
  - tu_van_khach_hang
  - hen_ky_hop_dong
  - ghi_nhan_hop_dong

  - quan_ly_danh_sach_hoc_vien_phu_trach

  - nhac_hoc_phi_lan_2
  - nhac_nop_giay_kham_suc_khoe

  - hoan_thien_ho_so:
      - don_dang_ky
      - hinh_anh
      - giay_kham_suc_khoe
      - hoc_phi

  - gui_lich_hoc_ly_thuyet_mo_phong
  - huong_dan_hoc_online
  - huong_dan_su_dung_app

  - tu_van_khoa_bo_tuc

  - tinh_hoa_hong
```

---

## 4. Accounting (Kế Toán)

```yaml
module: ke_toan

features:
  - tao_tai_khoan_hoc_vien
  - thu_hoc_phi
  - hoan_phi

  - theo_doi_xang:
      - theo_ngay
      - theo_thang

  - tinh_chi_phi_nhien_lieu

  - cap_nhat_hoc_phi_lan_cuoi

  - ghi_nhan_phi_hoc_them
  - ghi_nhan_phi_thi_lai

  - hien_thi_luong
```

---

## 5. Operations (Giáo Vụ)

### 5.1 Giáo Vụ Khu Vực

```yaml
module: giao_vu_khu_vuc

features:
  - tiep_nhan_lich_hv
  - phan_bo_gv_va_xe
  - sap_xep_lich_chu_dong

  - xu_ly_lich_cabin

  - nhac_phi_lan_cuoi_khi_DAT_16h

  - cap_nhat_trang_thai_hoan_thanh_khoa
```

---

### 5.2 Giáo Vụ Sa Hình

```yaml
module: giao_vu_sa_hinh

features:
  - tiep_nhan_lich
  - phan_bo_gv_va_xe
  - sap_xep_lich
```

---

### 5.3 Giáo Vụ Thi

```yaml
module: giao_vu_thi

features:
  - lap_danh_sach_thi_tot_nghiep
  - cap_nhat_lich_thi_tot_nghiep
  - cap_nhat_ket_qua

  - lap_danh_sach_thi_sat_hach
  - cap_nhat_lich_thi_sat_hach
  - cap_nhat_ket_qua

  - quan_ly_thi_lai
```

---

## 6. Teacher (Giáo Viên)

```yaml
module: giao_vien

features:

  teaching:
    - xem_lich_day
    - diem_danh
    - bao_cao_ODO_di
    - don_hoc_vien

  session_report:

    4h_co_ban:
      - thoi_gian
      - km

    DAT:
      - chup_man_hinh_DAT
      - nhap_km
      - nhap_thoi_gian

    sa_hinh:
      - thoi_gian_bat_dau
      - thoi_gian_ket_thuc

  fuel:
    - do_xang
    - upload_hoa_don
    - nhap_so_lit

  vehicle_tracking:
    - ODO_ve
    - thoi_gian_ve

  leave:
    - gui_yeu_cau_nghi_phep
```

---

## 7. Vehicle Management

```yaml
module: xe

features:
  - thong_tin_giay_to:
      - dang_kiem
      - GPLX_tap_lai
      - bao_hiem
      - the_chap
      - chu_quyen

  - ghi_nhan:
      - thoi_gian_di_ve
      - ODO
      - tinh_trang_sach

  - lich_su_bao_duong
```

---

## 8. Area Manager (Quản Lý Khu Vực)

```yaml
module: quan_ly_khu_vuc

features:
  - theo_doi_diem_danh_gv
  - theo_doi_xe

  - duyet_nghi_phep
  - duyet_bao_duong

  - tinh_luong_gv
```

---

## 9. System Admin

```yaml
module: admin

features:
  - cau_hinh_goi_hoc
  - cau_hinh_so_gio_hoc

  - cau_hinh_gia_hoc_them
  - cau_hinh_phi_thi_lai

  - tao_tai_khoan_nguoi_dung

  - cap_nhat_lich_ly_thuyet_mo_phong

  - cau_hinh_quy_trinh_nghi_phep

  - quan_ly_xe_toan_he_thong

  - gui_phe_duyet_luong
```

---

## 10. Director (Giám Đốc)

```yaml
module: giam_doc

features:
  - theo_doi_toan_bo_he_thong
  - xem_thong_ke_thi_sat_hach
  - xem_thong_ke_hoan_thanh_khoa

  - duyet_luong_thuong
```

---

## 11. Key Constraints

```yaml
constraints:
  - khong_them_notification_he_thong
  - khong_external_integration
  - mobile_app_chi_cho_hoc_vien
```

---

## 12. Notes for AI Agent

```yaml
rules:
  - strictly_follow_this_document
  - do_not_invent_features
  - all_logic_must_map_to_defined_modules
```

---

