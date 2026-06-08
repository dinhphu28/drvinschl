# Driving School Management System - Requirements Source of Truth

Source document: `documents/MaTranTinhNang.docx`, converted from `documents/MaTranTinhNang.pdf`.

This file is the canonical requirement reference for future implementation work and coding agents. If another document conflicts with this file, this file takes precedence after product-owner review.

## 1. Release Scope

### 1.1 Delivery Channel

- The current release is web-based for all user roles.
- Native mobile app delivery is deferred.
- Student pages must be usable on mobile browser layouts.
- Any original requirement that says "App" must be interpreted as "web app" for this release unless explicitly changed later.

### 1.2 User Roles

- Học viên
- Kinh doanh
- Kế toán
- Giáo vụ khu vực
- Giáo vụ sa hình
- Giáo vụ thi
- Giáo viên
- Xe / phân hệ quản lý xe
- Quản lý khu vực
- Quản lý / Quản trị hệ thống
- Giám đốc

### 1.3 Training Journey Columns

The system tracks work across these training and operational stages:

- Tư vấn / khách hàng
- Học viên / tài khoản / hồ sơ
- Hoàn thiện hồ sơ
- Học phí
- Lý thuyết, mô phỏng
- Thực hành 4H cơ bản
- Cabin
- DAT / đường trường
- Sa hình thô
- Thi tốt nghiệp
- Lịch thi sát hạch
- Sa hình cảm ứng tập / thi
- Thi sát hạch
- Nhận bằng
- Nhân sự
- Phê duyệt nghỉ phép
- Tính lương
- Quản lý xe
- Bảo dưỡng

## 2. Global Rules

### GLOBAL-001: Role-Based Access

- Each role must only access the modules assigned to that role.
- Admin/system roles may manage configuration and user accounts.
- Management/director roles may view broader reports and approval workflows according to their role.

### GLOBAL-002: Student Training Progress

- The student journey must be displayed as tabs or equivalent sections matching the training stages:
  - Lý thuyết
  - Mô phỏng
  - 4H cơ bản
  - Cabin
  - DAT
  - Sa hình thô
  - Thi tốt nghiệp
  - Lịch thi sát hạch
  - Sa hình cảm ứng tập / thi
  - Thi sát hạch
  - Nhận bằng

### GLOBAL-003: Configurable Prices And Fees

- Package prices, package required hours, extra-hour prices, and retake fees must be configurable by Admin.
- Student-facing registration flows must use configured prices/fees, not hard-coded client-side values.

### GLOBAL-004: Auditability

- Financial, scheduling, exam, salary, leave, vehicle, and maintenance actions should record enough data to support later review.

## 3. Học Viên Requirements

### HV-001: Login And Account Overview

Học viên can log in and view account/profile information.

Required profile fields:

- Họ tên
- Ngày tháng năm sinh
- Điện thoại
- Khóa học
- Ngày nộp khám sức khỏe / hồ sơ
- Ngày khai giảng
- Ngày bế giảng
- Ngày thanh lý hồ sơ
- Ngày bằng về trung tâm / ngày nhận bằng when available

### HV-002: Training Progress Tabs

Học viên can track progress in tabs/sections for each step in the training journey.

Each section should show relevant status, completed amount, remaining amount, and result where applicable.

### HV-003: Health Check

Học viên must be able to see or be guided that health check documents must be submitted to the office.

Tracked data should include whether the health check was submitted and the submission date if available.

### HV-004: Tuition View

Học viên can view:

- Total tuition fee
- Paid amount
- Remaining amount
- Payment history
- Final tuition fee status if applicable

### HV-005: Tuition Reminder

The system should support reminding students about remaining tuition. This may be shown as an in-app/web notice in the current release.

### HV-006: Theory And Simulation Learning Method

Học viên can view or select the learning method for theory and simulation.

The system must show schedules/instructions configured by Admin/Sales for:

- Lý thuyết
- Mô phỏng
- Offline schedule by area where applicable
- Online learning instructions where applicable

### HV-007: Book 4H Basic Practice

Before the lesson, Học viên can:

- View available 4H basic practice schedules.
- Book an available schedule.
- Receive confirmation that the schedule was booked.

After the lesson:

- The completed session is recorded in the 4H cơ bản tab.
- Học viên can rate the teacher from 1 to 5 stars.
- Học viên can leave teacher feedback.

### HV-008: Register Extra Road Practice Hours

Học viên can register additional road practice hours.

After successful registration:

- The registration is recorded.
- Fees are calculated from Admin-configured extra-hour price.
- Student totals/progress should reflect the added hours where applicable.

### HV-009: Book Cabin Practice

Before the lesson, Học viên can:

- View available Cabin schedules.
- Book a 2-hour Cabin schedule.
- Receive confirmation that the schedule was booked.

After the lesson:

- The completed Cabin session is recorded in the Cabin tab.

### HV-010: Book DAT / Road Practice

Before the lesson, Học viên can:

- View available DAT / road practice schedules.
- Book a DAT schedule.
- Receive confirmation that the schedule was booked.

After the lesson:

- The completed session is recorded in the DAT tab.
- Each session records kilometers and lesson time.
- DAT tab shows:
  - Total required kilometers
  - Completed kilometers
  - Remaining kilometers
  - Total completed time
- Học viên can rate the teacher from 1 to 5 stars.
- Học viên can leave teacher feedback.

### HV-011: Book Raw Yard Practice

Before the lesson, Học viên can:

- View available Sa hình thô schedules.
- Book an available schedule.
- Receive confirmation that the schedule was booked.

After the lesson:

- The completed session is recorded in the Sa hình thô tab.
- Học viên can rate the teacher from 1 to 5 stars.
- Học viên can leave teacher feedback.

### HV-012: Graduation Exam View

Học viên can view:

- Graduation exam date/time.
- Graduation exam result.

### HV-013: Licensing Exam Schedule And Instructions

Học viên can view in the Thi sát hạch tab:

- Licensing exam date/time.
- Instructions for the exam day.
- Current exam guidance configured according to current rules.

### HV-014: Sensor Yard Practice / Exam Schedule

Before the lesson, Học viên can:

- View Sa hình cảm ứng tập/thi schedules assigned by Giáo vụ thi.
- Attend according to the assigned schedule.

After the lesson:

- The completed session is recorded in the corresponding tab.
- Học viên can rate the teacher from 1 to 5 stars.
- Học viên can leave teacher feedback.

### HV-015: Register Extra Sensor Yard Hours

Học viên can register extra hours for:

- Sa hình cảm ứng tập
- Sa hình cảm ứng thi

After successful registration:

- The registration is recorded.
- Fees are calculated from Admin-configured extra-hour price.
- Student totals/progress should reflect the added hours where applicable.

### HV-016: Licensing Exam Results

Học viên can view results for licensing exam parts:

- Lý thuyết
- Mô phỏng
- Sa hình
- Đường trường

### HV-017: Retake Registration

If Học viên fails one or more licensing exam parts, the system must show a retake registration action for failed parts.

Retake registration must:

- Use Admin-configured retake fees.
- Record the retake registration.
- Return the student to waiting for the next licensing exam schedule.

### HV-018: Certificate Collection

Học viên can view when the license/certificate has arrived at the center and can be collected.

## 4. Kinh Doanh Requirements

### KD-001: Customer Consulting

Kinh doanh can record and manage customer consulting activity.

### KD-002: Contract Appointment

Kinh doanh can schedule or record appointments for customers to sign contracts.

### KD-003: Successful Contract

When a customer signs successfully:

- The contract is recorded.
- The student/customer is associated with the responsible Kinh doanh staff.
- Commission information for Kinh doanh is recorded or made available for later calculation.

### KD-004: Managed Student List

Kinh doanh can view the list of students assigned to them for support.

### KD-005: Second Fee And Health Check Reminder

Kinh doanh can track and remind students to:

- Pay the second fee installment.
- Submit health check documents.

### KD-006: Dossier Completion

Kinh doanh can track completion of:

- 2 driving application forms
- 10 student photos
- Health check document
- Second fee payment

### KD-007: Theory And Simulation Guidance

Kinh doanh can send or provide:

- Theory/simulation offline schedule by area
- Online learning guidance
- Web/mobile app usage guidance where applicable

### KD-008: Supplemental Driving Course Consulting

Kinh doanh can advise students or licensed drivers about supplemental driving courses.

### KD-009: Monthly Dossier And Commission Summary

Kinh doanh or authorized roles can summarize:

- Number of student dossiers registered in a month
- Commission according to the rule active at that time

## 5. Kế Toán Requirements

### KT-001: Create Student Account

Kế toán can create student accounts and student profile information.

Account creation rule:

- Username = student's full name written continuously without Vietnamese accents and without spaces.
- Default password = student's phone number.
- System must prevent username collision, for example by adding a suffix when needed.

### KT-002: Tuition Payment

Kế toán can record tuition payments.

Payment records must update paid amount and remaining amount for the student.

### KT-003: Refund

Kế toán can record refunds when a student changes intention or withdraws.

Refund records must reduce the paid amount where applicable.

### KT-004: Fuel Tracking

Kế toán can track vehicle fuel records:

- Daily
- Monthly
- By branch/area where applicable

### KT-005: Fuel Cost Calculation

Kế toán can calculate fuel cost by branch/area and use it for settlement with gas stations.

### KT-006: Final Tuition Update

Kế toán can track and update final tuition payment status for students, especially near DAT completion.

### KT-007: Extra-Hour Fee Tracking

Kế toán can record and report fees from additional practice registrations, including:

- Road practice
- Sa hình thô
- Sa hình cảm ứng tập
- Sa hình cảm ứng thi

### KT-008: Retake Fee Tracking

Kế toán can record and report exam retake fees.

### KT-009: Accounting Salary View

Kế toán can view salary information allowed for their role.

## 6. Giáo Vụ Khu Vực Requirements

### GVK-001: Receive Student Bookings

Giáo vụ khu vực can receive and process schedules booked by students.

### GVK-002: Assign Teacher And Vehicle

Giáo vụ khu vực can assign booked schedules to:

- Teacher
- Vehicle

### GVK-003: Proactive Scheduling

Giáo vụ khu vực can proactively contact and schedule students through the system.

### GVK-004: Cabin Scheduling

Giáo vụ khu vực can:

- Receive Cabin bookings.
- Assign available Cabin equipment/machines.
- Proactively schedule Cabin lessons for students.

### GVK-005: DAT Final Fee Reminder

Giáo vụ khu vực can remind students to pay the final fee when the student reaches 16 DAT hours.

### GVK-006: Course Completion / Certificate Status

When a student receives the license/certificate, Giáo vụ khu vực can update:

- Student has received license/certificate.
- Student has completed the course.

### GVK-007: Salary View

Giáo vụ khu vực can view salary information allowed for their role.

## 7. Giáo Vụ Sa Hình Requirements

### GVSH-001: Receive Yard Bookings

Giáo vụ sa hình can receive and process yard lesson schedules booked by students.

### GVSH-002: Assign Teacher And Vehicle

Giáo vụ sa hình can assign yard schedules to:

- Teacher
- Vehicle

### GVSH-003: Proactive Yard Scheduling

Giáo vụ sa hình can proactively contact and schedule students through the system.

### GVSH-004: Sensor Yard Scheduling Support

Giáo vụ sa hình can process and assign schedules related to Sa hình cảm ứng where assigned by the center.

### GVSH-005: Salary View

Giáo vụ sa hình can view salary information allowed for their role.

## 8. Giáo Vụ Thi Requirements

### GVT-001: Graduation Exam Eligible List

Giáo vụ thi can generate/view the list of students eligible for graduation exam.

### GVT-002: Graduation Exam Schedule

Giáo vụ thi can update graduation exam date/time and notify or expose this information to assigned students.

### GVT-003: Graduation Exam Result

Giáo vụ thi can update graduation exam results for students.

### GVT-004: Licensing Exam Eligible List

Giáo vụ thi can generate/view the list of students eligible for licensing exam and send it to the school/authority as needed.

### GVT-005: Licensing Exam Schedule

Giáo vụ thi can update licensing exam date/time and expose this information to assigned students.

### GVT-006: Licensing Exam Result

Giáo vụ thi can update licensing exam results for students.

### GVT-007: Retake Management

Giáo vụ thi can view and manage students who registered for retake exams.

### GVT-008: Salary View

Giáo vụ thi can view salary information allowed for their role.

## 9. Giáo Viên Requirements

### GV-001: Teaching Schedule

Giáo viên can view assigned teaching schedules.

### GV-002: Attendance And Pre-Trip Report

Before the first schedule of the day, preferably at least 30 minutes earlier, Giáo viên records:

- Attendance/check-in
- Vehicle readiness
- Vehicle condition
- Starting ODO
- Departure time

### GV-003: Student Pickup And Instruction

Giáo viên can record or follow assigned student pickup/instruction workflow.

### GV-004: 4H Basic Session Report

After a 4H basic lesson, Giáo viên reports:

- Lesson time
- Kilometers

The data is recorded in the student's 4H cơ bản tab.

### GV-005: DAT Session Report

After a DAT lesson, Giáo viên reports:

- Photo of DAT machine screen at start where applicable
- Photo of DAT machine screen at end where applicable
- Lesson time
- Kilometers

The data is recorded in the student's DAT tab.

### GV-006: Raw Yard Session Report

After a Sa hình lesson, Giáo viên reports:

- Start time
- End time
- Lesson details needed by the center

The data is recorded in the student's Sa hình tab.

### GV-007: Sensor Yard Session Report

For Sa hình cảm ứng tập/thi, Giáo viên reports:

- Start/end information
- DAT/screen images where applicable
- Time and kilometers where applicable

The data is recorded in the related student tab.

### GV-008: Fuel Report

After completing all schedules, Giáo viên records fuel information:

- Fuel receipt/photo
- Number of liters
- Amount if available

### GV-009: End-Trip Vehicle Report

Giáo viên records:

- Return time
- Ending ODO
- Vehicle return status

### GV-010: Leave Request

Giáo viên can choose leave dates and submit leave requests through the system.

### GV-011: Teacher Monthly Work Summary

Teacher home/dashboard shows monthly totals for:

- Weekday teaching hours
- Weekend teaching hours
- Night teaching hours
- Sa hình cảm ứng tập hours
- Sa hình cảm ứng thi hours
- Total teaching hours in the month

### GV-012: Assigned Vehicle Information

Teacher home/dashboard shows assigned vehicle information:

- Registration expiry
- Learner training permit expiry
- Insurance expiry
- Mortgage/pledge document status
- Ownership document status
- Total kilometers taught in the month
- Total fuel liters in the month
- Maintenance history

### GV-013: Maintenance Proposal

When a vehicle is due for maintenance or parts replacement, Giáo viên can submit a proposal and choose maintenance/replacement items.

Proposal status starts as waiting for approval.

## 10. Xe / Vehicle Management Requirements

### XE-001: Vehicle Documents

The system tracks vehicle document information:

- Registration / inspection expiry
- Learner training permit expiry
- Insurance expiry
- Mortgage/pledge document
- Ownership document

### XE-002: Vehicle Trip Data

The system records:

- Departure time
- Return time
- Starting ODO
- Ending ODO
- Vehicle cleanliness/status through teacher submitted images where applicable

### XE-003: Fleet Overview

Vehicle management module shows all active vehicles across the system, including:

- Document expiry status
- Kilometers taught in the month
- Fuel liters in the month
- Vehicle activity time
- Maintenance history

### XE-004: Maintenance History

Authorized users can update vehicle maintenance and replacement history.

## 11. Quản Lý Khu Vực Requirements

### QLKV-001: Teacher Attendance Monitoring

Quản lý khu vực can monitor teacher check-in time:

- Early
- On time
- Late

### QLKV-002: Vehicle Operation Monitoring

Quản lý khu vực can monitor:

- Vehicle departure time
- Vehicle return time
- Vehicle activity status

### QLKV-003: Personnel Change Report

Quản lý khu vực can report personnel changes in their area.

### QLKV-004: Leave Approval

Quản lý khu vực can review and approve leave requests from teachers in their area.

### QLKV-005: Area Teacher Salary Management

Quản lý khu vực can view, manage, and calculate salary for teachers in their area.

### QLKV-006: Maintenance Approval

Quản lý khu vực can review and approve maintenance proposals from teachers in their area.

## 12. Quản Lý / Quản Trị Hệ Thống Requirements

### ADMIN-001: Course Package Configuration

Admin can configure information and prices for student registration packages:

- A
- A1
- B Số Sàn
- B Tự Động
- C1

Each package must include:

- Package name
- Package price
- Theory hours/lessons
- Simulation hours
- 4H basic practice hours
- Cabin hours
- DAT hours
- DAT kilometers
- Road practice hours
- Sa hình thô hours
- Sa hình cảm ứng tập hours
- Sa hình cảm ứng thi hours
- Active/inactive status

### ADMIN-002: Extra-Hour Price Configuration

Admin can configure extra-hour prices for:

- Thực hành đường trường
- Sa hình thô
- Sa hình cảm ứng tập
- Sa hình cảm ứng thi

These prices are used when students register additional hours.

### ADMIN-003: Retake Fee Configuration

Admin can configure exam retake fees according to current rules.

The system must support retake fees for:

- Graduation exam retake where applicable
- Licensing exam retake
- Licensing exam retake parts:
  - Lý thuyết
  - Mô phỏng
  - Sa hình
  - Đường trường

If current implementation groups these fees, the UI and business rules must clearly state the grouping.

### ADMIN-004: Student Account Rule

Admin/accounting-created student accounts must follow:

- Username = student's full name written continuously without Vietnamese accents.
- Password = student's phone number.

### ADMIN-005: Theory And Simulation Schedule Configuration

Admin can update schedules for:

- Lý thuyết
- Mô phỏng

The UI must be usable by end users and must not require raw JSON editing.

### ADMIN-006: Fleet Monitoring

Admin can monitor all active vehicles and vehicle information across the system:

- Kilometers
- Fuel
- Activity time
- Documents
- Maintenance history

### ADMIN-007: Licensing Exam Instruction Configuration

Admin can update current licensing exam instructions for students in the Thi sát hạch tab.

### ADMIN-008: User Account Management

Admin can create and manage accounts for:

- Giáo viên
- Giáo vụ
- Kinh doanh
- Kế toán
- Quản lý khu vực
- Giám đốc
- Admin

### ADMIN-009: Leave Workflow Configuration

Admin can configure center leave rules, including:

- Two teachers must not take leave on the same day where that rule applies.
- Other current center leave policies.

### ADMIN-010: Salary Review And Approval Submission

Admin can:

- View/check teacher salary across the whole system.
- Send salary approval requests to Giám đốc.

## 13. Giám Đốc Requirements

### GD-001: Management Process Definition

Giám đốc defines/agrees on management processes, including:

- Student management process
- Booking process
- Cancellation process
- Schedule adjustment process

### GD-002: Fleet Overview

Giám đốc can monitor all active vehicles and vehicle information across the system:

- Kilometers
- Fuel
- Activity time
- Document status
- Maintenance status

### GD-003: Licensing Exam Statistics

Giám đốc can view statistics for licensing exam results across all students.

### GD-004: Course Completion Statistics

Giám đốc can view statistics of students who have completed courses.

### GD-005: Employee Information

Giám đốc can view employee information across the whole system.

### GD-006: Salary And Bonus Approval

Giám đốc can review and approve salary/bonus payments.

## 14. Data Model Checklist

The system should have durable records for the following concepts:

- User account
- Student profile
- Student dossier/completion state
- Course package
- System configuration
- Payment/refund record
- Extra-hour registration
- Training slot/schedule
- Training booking
- Training session report
- Learning progress
- Teacher rating/feedback
- Exam session
- Exam registration
- Exam result
- Retake registration/fee
- Vehicle
- Vehicle document status
- Vehicle log/trip
- Fuel record
- Maintenance proposal
- Maintenance history
- Leave request
- Salary record
- Commission record or commission calculation input

## 15. Implementation Guidance For Coding Agents

- Treat every requirement ID as stable.
- Before implementing a feature, map it to one or more requirement IDs.
- Do not invent roles, modules, or workflow steps outside this document unless the product owner updates this file.
- Prefer configuration-driven rules for prices, fees, hours, workflow limits, and instructions.
- Student-facing workflows must work in mobile browser layouts.
- Native mobile implementation is deferred for the current release.
- If a requirement mentions notification but no notification channel is specified, implement a web-visible status/message first.
- If a requirement depends on "current rules/regulations", make the value configurable instead of hard-coding it.

