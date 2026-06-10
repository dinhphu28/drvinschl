# Task Breakdown

# Hệ Thống Quản Lý Trung Tâm Đào Tạo Lái Xe

Version: 1.0
Status: Draft

------

# 1. Mục Đích

Tài liệu này chia nhỏ kế hoạch triển khai hệ thống thành các Epic, Feature, Story và Technical Task.

Tài liệu dùng để:

- Quản lý công việc triển khai
- Chia task theo milestone
- Theo dõi tiến độ phát triển
- Làm input cho GitHub Issues
- Làm input cho AI Coding Agent
- Giảm rủi ro bỏ sót chức năng

------

# 2. Quy Ước

## 2.1 Task ID

```text
EPIC-xx
FEAT-xx
STORY-xx
TASK-xx
```

## 2.2 Priority

| Priority | Ý nghĩa                         |
| -------- | ------------------------------- |
| High     | Bắt buộc cho luồng chính        |
| Medium   | Quan trọng nhưng có thể làm sau |
| Low      | Cải thiện hoặc mở rộng          |

## 2.3 Status

| Status      | Ý nghĩa      |
| ----------- | ------------ |
| TODO        | Chưa làm     |
| IN_PROGRESS | Đang làm     |
| DONE        | Hoàn thành   |
| BLOCKED     | Đang bị chặn |

------

# 3. Milestone Tổng Thể

## Milestone 1: Foundation, Auth, Student

Bao gồm:

- Project setup
- Authentication
- Authorization
- User management
- Role & permission
- Student management
- Course package
- Enrollment
- Student documents

------

## Milestone 2: Payment, Receipt, Scheduling

Bao gồm:

- Payment
- Refund
- Payment receipt
- Receipt PDF
- Schedule
- Schedule conflict validation
- Manual teacher assignment
- Manual vehicle assignment

------

## Milestone 3: Training, DAT, Rating, Exam

Bao gồm:

- Training session
- DAT manual input
- Student confirmation
- Teacher rating
- Graduation exam
- License exam
- Retake registration

------

## Milestone 4: Teacher, Vehicle, Leave, Maintenance

Bao gồm:

- Teacher management
- Teacher schedule
- Vehicle usage
- Fuel log
- Vehicle documents
- Maintenance request
- Leave request

------

## Milestone 5: Teaching Hour Summary, Reports, Audit

Bao gồm:

- Teaching hour summary
- Director approval
- In-app notification
- MVP reports
- Audit log

------

# 4. EPIC-01 Project Foundation

## FEAT-01.01 Repository Structure

### STORY-01.01.01 Setup Backend Project

#### Tasks

- TASK-001 Create backend project structure
- TASK-002 Configure application profiles
- TASK-003 Configure environment variables
- TASK-004 Configure global exception handler
- TASK-005 Configure standard API response
- TASK-006 Configure validation response
- TASK-007 Configure logging
- TASK-008 Add health check endpoint

### Acceptance Criteria

- Backend can start successfully.
- Health check API returns OK.
- Error response format is consistent.

------

## FEAT-01.02 Database Foundation

### STORY-01.02.01 Setup PostgreSQL

#### Tasks

- TASK-009 Create Docker Compose for PostgreSQL
- TASK-010 Configure database connection
- TASK-011 Configure migration tool
- TASK-012 Create base audit columns convention
- TASK-013 Create soft delete convention
- TASK-014 Create UUID primary key convention

### Acceptance Criteria

- PostgreSQL runs locally.
- Migration can be executed.
- Base schema can be created.

------

## FEAT-01.03 File Storage

### STORY-01.03.01 Setup File Upload Foundation

#### Tasks

- TASK-015 Define file upload strategy
- TASK-016 Implement file upload service
- TASK-017 Implement file metadata model if needed
- TASK-018 Validate file size
- TASK-019 Validate file type
- TASK-020 Store file URL
- TASK-021 Support local storage or S3-compatible storage

### Acceptance Criteria

- User can upload a file.
- System returns file URL.
- Invalid file type or size is rejected.

------

# 5. EPIC-02 Authentication & Authorization

## FEAT-02.01 Authentication

### STORY-02.01.01 User Login

#### Tasks

- TASK-022 Create `users` table
- TASK-023 Create password hashing utility
- TASK-024 Implement login API
- TASK-025 Generate access token
- TASK-026 Implement authentication filter
- TASK-027 Implement current user endpoint
- TASK-028 Implement logout if needed

### API

```http
POST /auth/login
GET /auth/me
POST /auth/logout
```

### Acceptance Criteria

- User can login using username/password.
- Invalid login is rejected.
- Authenticated user can access protected APIs.

------

### STORY-02.01.02 Change Password

#### Tasks

- TASK-029 Implement change password API
- TASK-030 Validate old password
- TASK-031 Hash new password
- TASK-032 Invalidate old session if required

### API

```http
PUT /auth/change-password
```

### Acceptance Criteria

- Logged-in user can change password.
- Wrong old password is rejected.

------

### STORY-02.01.03 Admin Reset Password

#### Tasks

- TASK-033 Implement reset password API
- TASK-034 Restrict API to Admin
- TASK-035 Add audit log for reset password

### API

```http
PUT /users/{id}/reset-password
```

### Acceptance Criteria

- Admin can reset user password.
- Non-admin cannot reset password.
- Reset action is audited.

------

## FEAT-02.02 Role & Permission

### STORY-02.02.01 Manage Roles

#### Tasks

- TASK-036 Create `roles` table
- TASK-037 Create role CRUD API
- TASK-038 Seed default roles
- TASK-039 Create role management screen

### API

```http
GET /roles
POST /roles
PUT /roles/{id}
```

### Acceptance Criteria

- Admin can view, create and update roles.
- Default roles exist.

------

### STORY-02.02.02 Manage Permissions

#### Tasks

- TASK-040 Create `permissions` table
- TASK-041 Seed default permissions
- TASK-042 Create `role_permissions` table
- TASK-043 Implement assign permissions to role
- TASK-044 Enforce permission check in API

### API

```http
GET /permissions
PUT /roles/{id}/permissions
```

### Acceptance Criteria

- Admin can assign permissions.
- APIs are protected by role/permission.

------

## FEAT-02.03 User Management

### STORY-02.03.01 Manage Users

#### Tasks

- TASK-045 Create user list API
- TASK-046 Create user detail API
- TASK-047 Create user API
- TASK-048 Update user API
- TASK-049 Lock/unlock user API
- TASK-050 Create user management screen

### API

```http
GET /users
POST /users
GET /users/{id}
PUT /users/{id}
PUT /users/{id}/status
```

### Acceptance Criteria

- Admin can manage users.
- User can have one or more roles.
- Username must be unique.

------

# 6. EPIC-03 Student, Course, Enrollment

## FEAT-03.01 Student Management

### STORY-03.01.01 Create Student

#### Tasks

- TASK-051 Create `students` table
- TASK-052 Implement create student API
- TASK-053 Validate required fields
- TASK-054 Validate unique student code
- TASK-055 Validate phone if required
- TASK-056 Add audit log for student creation
- TASK-057 Create student form UI

### API

```http
POST /students
```

### Acceptance Criteria

- Sales, Accountant or Admin can create student.
- Student is saved successfully.
- Audit log is created.

------

### STORY-03.01.02 Update Student

#### Tasks

- TASK-058 Implement update student API
- TASK-059 Add audit log for changed fields
- TASK-060 Create edit student UI

### API

```http
PUT /students/{id}
```

### Acceptance Criteria

- Authorized user can update student.
- Changes are audited.

------

### STORY-03.01.03 Search Student

#### Tasks

- TASK-061 Implement student list API
- TASK-062 Add filters by keyword, phone, status
- TASK-063 Add pagination
- TASK-064 Create student list UI

### API

```http
GET /students
```

### Acceptance Criteria

- User can search students.
- Result supports pagination.

------

### STORY-03.01.04 Student Detail

#### Tasks

- TASK-065 Implement student detail API
- TASK-066 Create student detail screen
- TASK-067 Add tabs for documents, payments, schedules, progress, exams

### API

```http
GET /students/{id}
```

### Acceptance Criteria

- User can view full student profile.
- Detail page links to related information.

------

## FEAT-03.02 Course Package

### STORY-03.02.01 Manage Course Packages

#### Tasks

- TASK-068 Create `course_packages` table
- TASK-069 Implement course package CRUD API
- TASK-070 Create course package configuration screen
- TASK-071 Add active/inactive status

### API

```http
GET /course-packages
POST /course-packages
PUT /course-packages/{id}
```

### Acceptance Criteria

- Admin can manage course packages.
- Active course packages can be selected for enrollment.

------

## FEAT-03.03 Enrollment

### STORY-03.03.01 Create Enrollment

#### Tasks

- TASK-072 Create `enrollments` table
- TASK-073 Implement create enrollment API
- TASK-074 Allow one student to have multiple enrollments
- TASK-075 Link enrollment to course package
- TASK-076 Display enrollments in student detail

### API

```http
POST /enrollments
GET /students/{id}/enrollments
```

### Acceptance Criteria

- A student can have multiple enrollments.
- Each enrollment belongs to one course package.

------

### STORY-03.03.02 Cancel Enrollment

#### Tasks

- TASK-077 Implement cancel enrollment API
- TASK-078 Set enrollment status to CANCELLED
- TASK-079 Add audit log

### API

```http
PUT /enrollments/{id}/cancel
```

### Acceptance Criteria

- Enrollment can be cancelled.
- Status becomes CANCELLED.
- Cancellation is audited.

------

# 7. EPIC-04 Student Documents

## FEAT-04.01 Flexible Student Documents

### STORY-04.01.01 Upload Student Document

#### Tasks

- TASK-080 Create `student_documents` table
- TASK-081 Support document name
- TASK-082 Support optional file URL
- TASK-083 Support optional note
- TASK-084 Implement upload document API
- TASK-085 Implement document list API
- TASK-086 Create student document tab UI

### API

```http
GET /students/{id}/documents
POST /students/{id}/documents
```

### Acceptance Criteria

- User can add document with file only.
- User can add document with note only.
- User can add document with both file and note.

------

### STORY-04.01.02 Mark Document Complete

#### Tasks

- TASK-087 Add document completion status to student/enrollment
- TASK-088 Implement mark complete API
- TASK-089 Restrict action to Sales/Admin if required
- TASK-090 Add audit log
- TASK-091 Add UI action

### API

```http
PUT /students/{id}/documents/complete
```

### Acceptance Criteria

- Sales can manually mark documents as complete.
- System does not require all documents to have files.

------

# 8. EPIC-05 Payment & Receipt

## FEAT-05.01 Payment Configuration

### STORY-05.01.01 Configure Payment Installments

#### Tasks

- TASK-092 Create payment installment configuration table if needed
- TASK-093 Implement installment config API
- TASK-094 Add UI for installment configuration
- TASK-095 Validate installment total amount or percentage

### API

```http
GET /payment-installment-configs
POST /payment-installment-configs
PUT /payment-installment-configs/{id}
```

### Acceptance Criteria

- Admin can configure payment installments.
- Payment plan is flexible.

------

## FEAT-05.02 Payment

### STORY-05.02.01 Create Payment

#### Tasks

- TASK-096 Create `payments` table
- TASK-097 Implement create payment API
- TASK-098 Validate payment amount > 0
- TASK-099 Prevent overpayment
- TASK-100 Link payment to student/enrollment
- TASK-101 Add audit log
- TASK-102 Create payment UI

### API

```http
POST /payments
```

### Acceptance Criteria

- Accountant can record payment.
- Payment cannot exceed debt.
- Payment is audited.

------

### STORY-05.02.02 View Payment History

#### Tasks

- TASK-103 Implement payment list API
- TASK-104 Implement student payment history API
- TASK-105 Add filters by student, date, type
- TASK-106 Create payment list UI
- TASK-107 Create payment tab in student detail

### API

```http
GET /payments
GET /students/{id}/payments
```

### Acceptance Criteria

- User can view payment history.
- Student debt is calculated correctly.

------

## FEAT-05.03 Refund

### STORY-05.03.01 Create Partial Refund

#### Tasks

- TASK-108 Create `refunds` table
- TASK-109 Implement refund API
- TASK-110 Validate refund amount > 0
- TASK-111 Validate refund amount <= paid amount
- TASK-112 Require refund reason
- TASK-113 Add audit log
- TASK-114 Create refund UI

### API

```http
POST /payments/{id}/refund
```

### Acceptance Criteria

- Accountant can refund partially.
- Refund cannot exceed paid amount.
- Refund reason is required.

------

## FEAT-05.04 Payment Receipt

### STORY-05.04.01 Generate Payment Receipt

#### Tasks

- TASK-115 Create `payment_receipts` table
- TASK-116 Generate receipt number
- TASK-117 Implement create receipt API
- TASK-118 Implement get receipt API
- TASK-119 Create receipt view UI

### API

```http
POST /payments/{id}/receipt
GET /payments/{id}/receipt
```

### Acceptance Criteria

- Accountant can generate receipt.
- Receipt contains student, amount, date, payment method and collector.

------

### STORY-05.04.02 Export Receipt PDF

#### Tasks

- TASK-120 Select PDF generation library
- TASK-121 Create receipt PDF template
- TASK-122 Generate PDF file
- TASK-123 Store PDF URL
- TASK-124 Implement download PDF API

### API

```http
GET /payments/{id}/receipt/pdf
```

### Acceptance Criteria

- Receipt can be exported as PDF.
- PDF is readable and contains correct data.

------

# 9. EPIC-06 Scheduling

## FEAT-06.01 Available Slots

### STORY-06.01.01 View Available Slots

#### Tasks

- TASK-125 Define slot generation logic
- TASK-126 Implement available slots API
- TASK-127 Filter by schedule type
- TASK-128 Filter by date
- TASK-129 Exclude conflicting student schedule
- TASK-130 Create available schedule UI for student

### API

```http
GET /schedules/available-slots
```

### Acceptance Criteria

- Student can view available slots.
- Conflicting slots are not shown.

------

## FEAT-06.02 Create Schedule

### STORY-06.02.01 Student Books Schedule Directly

#### Tasks

- TASK-131 Create `schedules` table
- TASK-132 Implement create schedule API
- TASK-133 Validate booking time before schedule start time
- TASK-134 Validate no student conflict
- TASK-135 Validate teacher conflict if teacher assigned
- TASK-136 Validate vehicle conflict if vehicle assigned
- TASK-137 Set status to BOOKED
- TASK-138 Create booking confirmation UI

### API

```http
POST /schedules
```

### Acceptance Criteria

- Student can book schedule directly.
- No staff confirmation is required.
- Schedule status is BOOKED.

------

### STORY-06.02.02 Cancel Schedule

#### Tasks

- TASK-139 Implement cancel schedule API
- TASK-140 Validate cancel time before schedule start time
- TASK-141 Set status to CANCELLED
- TASK-142 Add schedule change log
- TASK-143 Update my schedule UI

### API

```http
DELETE /schedules/{id}
```

### Acceptance Criteria

- Student can cancel before start time.
- Cancelled schedule is not treated as active.
- Change is logged.

------

## FEAT-06.03 Manual Assignment

### STORY-06.03.01 Assign Teacher Manually

#### Tasks

- TASK-144 Implement assign teacher API
- TASK-145 Validate teacher schedule conflict
- TASK-146 Add schedule change log
- TASK-147 Create assignment UI

### API

```http
PUT /schedules/{id}/assign-teacher
```

### Acceptance Criteria

- Staff can assign teacher manually.
- Teacher cannot have two schedules at same time.

------

### STORY-06.03.02 Assign Vehicle Manually

#### Tasks

- TASK-148 Implement assign vehicle API
- TASK-149 Validate vehicle schedule conflict
- TASK-150 Add schedule change log
- TASK-151 Create assignment UI

### API

```http
PUT /schedules/{id}/assign-vehicle
```

### Acceptance Criteria

- Staff can assign vehicle manually.
- Vehicle cannot be assigned to two schedules at same time.

------

### STORY-06.03.03 Reschedule

#### Tasks

- TASK-152 Implement reschedule API
- TASK-153 Validate schedule conflict
- TASK-154 Add schedule change log
- TASK-155 Update calendar UI

### API

```http
PUT /schedules/{id}/reschedule
```

### Acceptance Criteria

- Staff can change schedule time.
- Conflicts are rejected.
- Change is logged.

------

# 10. EPIC-07 Training Session

## FEAT-07.01 Training Session Lifecycle

### STORY-07.01.01 Start Training Session

#### Tasks

- TASK-156 Create `training_sessions` table
- TASK-157 Implement start session API
- TASK-158 Set status to IN_PROGRESS
- TASK-159 Link session to schedule
- TASK-160 Create teacher session UI

### API

```http
PUT /training-sessions/{id}/start
```

### Acceptance Criteria

- Teacher can start assigned session.
- Session status becomes IN_PROGRESS.

------

### STORY-07.01.02 Teacher Completes Session

#### Tasks

- TASK-161 Implement finish session API
- TASK-162 Store started_at and ended_at
- TASK-163 Store duration
- TASK-164 Set status to TEACHER_COMPLETED
- TASK-165 Update student progress calculation

### API

```http
PUT /training-sessions/{id}/finish
```

### Acceptance Criteria

- Teacher can mark session completed.
- Session waits for student confirmation.

------

### STORY-07.01.03 Student Confirms Session

#### Tasks

- TASK-166 Implement student confirm session API
- TASK-167 Set status to STUDENT_CONFIRMED
- TASK-168 Update progress as confirmed
- TASK-169 Add UI button in session detail

### API

```http
PUT /training-sessions/{id}/confirm
```

### Acceptance Criteria

- Student can confirm completed session.
- Confirmed session contributes to progress.

------

## FEAT-07.02 DAT Manual Input

### STORY-07.02.01 Record DAT Data

#### Tasks

- TASK-170 Create `dat_session_details` table
- TASK-171 Implement DAT update API
- TASK-172 Store KM
- TASK-173 Store duration
- TASK-174 Store note
- TASK-175 Make DAT images optional

### API

```http
PUT /training-sessions/{id}/dat
POST /training-sessions/{id}/dat-images
```

### Acceptance Criteria

- Teacher can enter DAT data manually.
- DAT image is optional.
- DAT device integration is not required.

------

## FEAT-07.03 Teacher Rating

### STORY-07.03.01 Student Rates Teacher

#### Tasks

- TASK-176 Create `teacher_ratings` table
- TASK-177 Implement create rating API
- TASK-178 Validate rating 1-5
- TASK-179 Prevent duplicate rating per session
- TASK-180 Recalculate teacher average rating
- TASK-181 Create rating UI

### API

```http
POST /teacher-ratings
```

### Acceptance Criteria

- Student can rate teacher once per session.
- Teacher average rating is updated.

------

## FEAT-07.04 Student Progress

### STORY-07.04.01 Calculate Learning Progress

#### Tasks

- TASK-182 Implement progress service
- TASK-183 Calculate basic practice progress
- TASK-184 Calculate cabin progress
- TASK-185 Calculate DAT KM/time
- TASK-186 Calculate yard progress
- TASK-187 Return progress API
- TASK-188 Display progress on student dashboard

### API

```http
GET /students/{id}/progress
GET /students/me/progress
```

### Acceptance Criteria

- Student progress is calculated from confirmed sessions.
- Progress is visible to student and staff.

------

# 11. EPIC-08 Exam Management

## FEAT-08.01 Graduation Exam

### STORY-08.01.01 Create Graduation Exam

#### Tasks

- TASK-189 Create `exams` table
- TASK-190 Implement create exam API
- TASK-191 Support exam type GRADUATION
- TASK-192 Create exam list UI

### API

```http
POST /exams
GET /exams
```

### Acceptance Criteria

- Exam staff can create graduation exam.
- Exam appears in exam list.

------

### STORY-08.01.02 Register Students For Graduation Exam

#### Tasks

- TASK-193 Create `exam_registrations` table
- TASK-194 Implement register student API
- TASK-195 Allow manual eligibility decision by exam staff
- TASK-196 Create exam registration UI

### API

```http
POST /exams/{id}/registrations
GET /exams/{id}/registrations
```

### Acceptance Criteria

- Exam staff can manually add students to exam.
- System does not automatically block eligibility in MVP.

------

### STORY-08.01.03 Update Graduation Exam Result

#### Tasks

- TASK-197 Create `exam_results` table
- TASK-198 Implement update exam result API
- TASK-199 Allow multiple attempts
- TASK-200 Add audit log
- TASK-201 Display result to student

### API

```http
POST /exam-results
PUT /exam-results/{id}
GET /students/me/exam-results
```

### Acceptance Criteria

- Exam staff can update result.
- Student can view result.
- Result change is audited.

------

## FEAT-08.02 License Exam

### STORY-08.02.01 Create License Exam

#### Tasks

- TASK-202 Support exam type LICENSE
- TASK-203 Implement license exam creation
- TASK-204 Create license exam UI

### Acceptance Criteria

- Exam staff can create license exam.
- License exam supports four sections.

------

### STORY-08.02.02 Update License Exam Result

#### Tasks

- TASK-205 Create `exam_section_results` table
- TASK-206 Store result for theory
- TASK-207 Store result for simulation
- TASK-208 Store result for yard
- TASK-209 Store result for road
- TASK-210 Determine total pass/fail
- TASK-211 Add audit log

### Acceptance Criteria

- System stores all four exam sections.
- Failed sections are tracked.

------

## FEAT-08.03 Retake Registration

### STORY-08.03.01 Student Registers Retake

#### Tasks

- TASK-212 Create `retake_registrations` table
- TASK-213 Implement retake registration API
- TASK-214 Allow registration only for failed sections
- TASK-215 Load retake fee from config
- TASK-216 Create student retake UI

### API

```http
POST /retake-registrations
GET /retake-registrations
```

### Acceptance Criteria

- Student can register retake for failed section.
- Student cannot register retake for passed section.

------

# 12. EPIC-09 Teacher Management

## FEAT-09.01 Teacher Profile

### STORY-09.01.01 Manage Teachers

#### Tasks

- TASK-217 Create `employees` table
- TASK-218 Create `teachers` table
- TASK-219 Implement teacher list API
- TASK-220 Implement teacher detail API
- TASK-221 Create teacher list UI
- TASK-222 Create teacher detail UI

### API

```http
GET /teachers
GET /teachers/{id}
```

### Acceptance Criteria

- Staff can manage teacher profiles.
- Teacher is linked to employee.

------

## FEAT-09.02 Teacher Schedule

### STORY-09.02.01 Teacher Views Future Schedule

#### Tasks

- TASK-223 Implement teacher schedule API
- TASK-224 Filter by current teacher
- TASK-225 Include future schedules
- TASK-226 Create teacher schedule screen

### API

```http
GET /teachers/me/schedules
```

### Acceptance Criteria

- Teacher can see current and future schedules.
- Teacher cannot see other teachers' private schedules unless authorized.

------

## FEAT-09.03 Teacher Attendance

### STORY-09.03.01 Teacher Check In

#### Tasks

- TASK-227 Create `teacher_attendances` table
- TASK-228 Implement check-in API
- TASK-229 Store check-in time
- TASK-230 Link to teacher
- TASK-231 Create check-in UI

### API

```http
POST /teacher-attendances/check-in
```

### Acceptance Criteria

- Teacher can check in.
- Check-in is stored.

------

# 13. EPIC-10 Vehicle Management

## FEAT-10.01 Vehicle Profile

### STORY-10.01.01 Manage Vehicles

#### Tasks

- TASK-232 Create `vehicles` table
- TASK-233 Implement vehicle list API
- TASK-234 Implement vehicle detail API
- TASK-235 Validate unique plate number
- TASK-236 Create vehicle list UI
- TASK-237 Create vehicle detail UI

### API

```http
GET /vehicles
POST /vehicles
GET /vehicles/{id}
PUT /vehicles/{id}
```

### Acceptance Criteria

- Staff can manage vehicles.
- Plate number must be unique.

------

## FEAT-10.02 Vehicle Usage

### STORY-10.02.01 Start Vehicle Usage

#### Tasks

- TASK-238 Create `vehicle_usages` table
- TASK-239 Implement start vehicle usage API
- TASK-240 Require start image
- TASK-241 Make ODO start optional
- TASK-242 Create vehicle check-in UI

### API

```http
POST /vehicle-usages/start
```

### Acceptance Criteria

- Teacher must upload vehicle image before usage.
- ODO start is optional.

------

### STORY-10.02.02 End Vehicle Usage

#### Tasks

- TASK-243 Implement end vehicle usage API
- TASK-244 Make ODO end optional
- TASK-245 Validate ODO end >= ODO start only if both exist
- TASK-246 Store ended_at

### API

```http
POST /vehicle-usages/end
```

### Acceptance Criteria

- Teacher can end vehicle usage without ODO.
- ODO is validated only when both values exist.

------

## FEAT-10.03 Fuel Log

### STORY-10.03.01 Create Fuel Log

#### Tasks

- TASK-247 Create `fuel_logs` table
- TASK-248 Implement create fuel log API
- TASK-249 Store liters
- TASK-250 Store amount if available
- TASK-251 Store receipt image if available
- TASK-252 Link to vehicle and teacher
- TASK-253 Create fuel log UI

### API

```http
POST /fuel-logs
GET /fuel-logs
```

### Acceptance Criteria

- Teacher can submit fuel log.
- Staff can view fuel history.

------

## FEAT-10.04 Vehicle Documents

### STORY-10.04.01 Manage Vehicle Documents

#### Tasks

- TASK-254 Create `vehicle_documents` table
- TASK-255 Implement vehicle document API
- TASK-256 Store expiry date
- TASK-257 Store file URL if available
- TASK-258 Create vehicle document UI

### API

```http
GET /vehicles/{id}/documents
POST /vehicles/{id}/documents
PUT /vehicles/{id}/documents/{documentId}
```

### Acceptance Criteria

- Staff can manage vehicle documents.
- Expiry dates can be tracked.

------

## FEAT-10.05 Maintenance

### STORY-10.05.01 Create Maintenance Request

#### Tasks

- TASK-259 Create `maintenance_requests` table
- TASK-260 Implement create maintenance request API
- TASK-261 Link request to vehicle
- TASK-262 Link request to requester
- TASK-263 Create teacher maintenance request UI

### API

```http
POST /maintenance-requests
GET /maintenance-requests
```

### Acceptance Criteria

- Teacher can request maintenance.
- Request status is PENDING.

------

### STORY-10.05.02 Approve Maintenance Request

#### Tasks

- TASK-264 Implement approve maintenance API
- TASK-265 Restrict approval to Area Manager/Admin
- TASK-266 Store approved_by and approved_at
- TASK-267 Add audit log

### API

```http
PUT /maintenance-requests/{id}/approve
PUT /maintenance-requests/{id}/reject
```

### Acceptance Criteria

- Maintenance request requires one approval level.
- Approval is audited.

------

### STORY-10.05.03 Create Maintenance Record

#### Tasks

- TASK-268 Create `maintenance_records` table
- TASK-269 Store maintenance cost
- TASK-270 Store replaced parts if any
- TASK-271 Implement maintenance record API
- TASK-272 Create maintenance record UI

### API

```http
POST /maintenance-records
GET /maintenance-records
```

### Acceptance Criteria

- Staff can record maintenance history.
- Cost and replaced parts can be stored.

------

# 14. EPIC-11 HR & Leave

## FEAT-11.01 Employee Management

### STORY-11.01.01 Manage Employees

#### Tasks

- TASK-273 Implement employee list API
- TASK-274 Implement employee detail API
- TASK-275 Implement create/update employee API
- TASK-276 Create employee list UI
- TASK-277 Create employee detail UI

### API

```http
GET /employees
POST /employees
GET /employees/{id}
PUT /employees/{id}
```

### Acceptance Criteria

- Admin can manage employee information.
- Employees can be assigned positions and areas.

------

## FEAT-11.02 Leave Request

### STORY-11.02.01 Teacher Creates Leave Request

#### Tasks

- TASK-278 Create `leave_requests` table
- TASK-279 Implement create leave request API
- TASK-280 Support configurable max leave days
- TASK-281 Create leave request UI

### API

```http
POST /leave-requests
GET /leave-requests
```

### Acceptance Criteria

- Teacher can submit leave request.
- Default max leave day setting is unlimited.

------

### STORY-11.02.02 Approve Leave Request

#### Tasks

- TASK-282 Implement approve leave request API
- TASK-283 Check minimum teacher count after approval
- TASK-284 Support warning or blocking mode
- TASK-285 Store approved_by and approved_at
- TASK-286 Add notification to teacher

### API

```http
PUT /leave-requests/{id}/approve
PUT /leave-requests/{id}/reject
```

### Acceptance Criteria

- Area manager can approve/reject leave.
- Minimum teacher rule is checked.
- Teacher receives in-app notification.

------

# 15. EPIC-12 Teaching Hour Summary

## FEAT-12.01 Generate Teaching Hour Summary

### STORY-12.01.01 Generate Monthly Summary

#### Tasks

- TASK-287 Create `teaching_hour_summaries` table
- TASK-288 Aggregate weekday hours
- TASK-289 Aggregate weekend hours
- TASK-290 Aggregate night hours
- TASK-291 Aggregate sensor practice hours
- TASK-292 Aggregate sensor exam hours
- TASK-293 Create generate summary API
- TASK-294 Create summary dashboard UI

### API

```http
POST /teaching-hour-summaries/generate
GET /teaching-hour-summaries
```

### Acceptance Criteria

- System summarizes teaching hours by teacher and month.
- MVP does not calculate salary amount automatically.

------

### STORY-12.01.02 Submit Summary For Approval

#### Tasks

- TASK-295 Implement submit API
- TASK-296 Set status to SUBMITTED
- TASK-297 Notify Director
- TASK-298 Add audit log

### API

```http
PUT /teaching-hour-summaries/{id}/submit
```

### Acceptance Criteria

- Admin can submit summary.
- Director can see submitted summaries.

------

### STORY-12.01.03 Director Approves Summary

#### Tasks

- TASK-299 Implement approve API
- TASK-300 Implement reject API
- TASK-301 Store approved_by and approved_at
- TASK-302 Store rejected reason if rejected
- TASK-303 Add audit log

### API

```http
PUT /teaching-hour-summaries/{id}/approve
PUT /teaching-hour-summaries/{id}/reject
```

### Acceptance Criteria

- Director can approve or reject.
- Action is audited.

------

# 16. EPIC-13 Notification

## FEAT-13.01 In-App Notification

### STORY-13.01.01 Create Notification

#### Tasks

- TASK-304 Create `notifications` table
- TASK-305 Implement notification service
- TASK-306 Create notification on schedule
- TASK-307 Create notification on exam
- TASK-308 Create notification on leave approval
- TASK-309 Create notification on maintenance approval
- TASK-310 Create notification on teaching hour summary approval

### Acceptance Criteria

- Notifications are created inside app.
- No SMS, Email or Zalo integration in MVP.

------

### STORY-13.01.02 Read Notification

#### Tasks

- TASK-311 Implement notification list API
- TASK-312 Implement mark as read API
- TASK-313 Create notification UI

### API

```http
GET /notifications
PUT /notifications/{id}/read
```

### Acceptance Criteria

- User can view notifications.
- User can mark notification as read.

------

# 17. EPIC-14 Reports

## FEAT-14.01 MVP Reports

### STORY-14.01.01 Completed Students Report

#### Tasks

- TASK-314 Implement completed students report API
- TASK-315 Add filters
- TASK-316 Create completed students report UI

### API

```http
GET /reports/completed-students
```

### Acceptance Criteria

- User can view completed students.
- Report supports basic filters.

------

### STORY-14.01.02 License Exam Result Report

#### Tasks

- TASK-317 Implement license exam result report API
- TASK-318 Include all students
- TASK-319 Include pass/fail by section
- TASK-320 Create exam report UI

### API

```http
GET /reports/license-exam-results
```

### Acceptance Criteria

- User can view license exam result report.
- Report includes four exam sections.

------

### STORY-14.01.03 Vehicle Information Report

#### Tasks

- TASK-321 Implement vehicle information report API
- TASK-322 Include vehicle documents
- TASK-323 Include fuel summary
- TASK-324 Include maintenance summary
- TASK-325 Create vehicle report UI

### API

```http
GET /reports/vehicles
```

### Acceptance Criteria

- User can view vehicle information.
- Report includes document expiry and maintenance data.

------

### STORY-14.01.04 Employee Information Report

#### Tasks

- TASK-326 Implement employee information report API
- TASK-327 Include role/position
- TASK-328 Include area
- TASK-329 Create employee report UI

### API

```http
GET /reports/employees
```

### Acceptance Criteria

- User can view employee information.

------

### STORY-14.01.05 Teaching Hour Summary Report

#### Tasks

- TASK-330 Implement teaching hour summary report API
- TASK-331 Include status
- TASK-332 Include monthly filters
- TASK-333 Create teaching hour report UI

### API

```http
GET /reports/teaching-hour-summaries
```

### Acceptance Criteria

- User can view teaching hour summary report.
- Report does not require Excel/PDF export in MVP.

------

# 18. EPIC-15 Audit Log

## FEAT-15.01 Audit Important Actions

### STORY-15.01.01 Create Audit Log Infrastructure

#### Tasks

- TASK-334 Create `audit_logs` table
- TASK-335 Implement audit service
- TASK-336 Support actor_id
- TASK-337 Support entity_type
- TASK-338 Support entity_id
- TASK-339 Support old_value/new_value JSON
- TASK-340 Ensure audit logs cannot be deleted

### Acceptance Criteria

- System can record audit log.
- Audit logs are immutable.

------

### STORY-15.01.02 Audit Required Entities

#### Tasks

- TASK-341 Audit student changes
- TASK-342 Audit payment
- TASK-343 Audit refund
- TASK-344 Audit exam result
- TASK-345 Audit teaching hour summary approval
- TASK-346 Audit role/permission changes
- TASK-347 Audit user changes

### Acceptance Criteria

- Required entities generate audit logs.
- Admin can trace important changes.

------

### STORY-15.01.03 Audit Log Search

#### Tasks

- TASK-348 Implement audit log search API
- TASK-349 Filter by actor
- TASK-350 Filter by entity type
- TASK-351 Filter by entity id
- TASK-352 Filter by time range
- TASK-353 Create audit log screen

### API

```http
GET /audit-logs
```

### Acceptance Criteria

- Admin can search audit logs.
- Audit log cannot be soft-deleted or hard-deleted from UI.

------

# 19. EPIC-16 Frontend Integration

## FEAT-16.01 Admin Web Layout

### STORY-16.01.01 Create Admin Layout

#### Tasks

- TASK-354 Create login page
- TASK-355 Create admin layout
- TASK-356 Create sidebar
- TASK-357 Create header
- TASK-358 Create breadcrumb
- TASK-359 Create protected route
- TASK-360 Create role-based menu

### Acceptance Criteria

- Admin users can navigate system.
- Menu displays based on role.

------

## FEAT-16.02 Student UI

### STORY-16.02.01 Create Student App Screens

#### Tasks

- TASK-361 Create student dashboard
- TASK-362 Create profile screen
- TASK-363 Create progress screen
- TASK-364 Create tuition screen
- TASK-365 Create available schedule screen
- TASK-366 Create my schedule screen
- TASK-367 Create session detail screen
- TASK-368 Create teacher rating screen
- TASK-369 Create exam result screen
- TASK-370 Create certificate status screen
- TASK-371 Create notification screen

### Acceptance Criteria

- Student can use main features.
- Student UI is simpler than admin UI.

------

## FEAT-16.03 Teacher UI

### STORY-16.03.01 Create Teacher Screens

#### Tasks

- TASK-372 Create teacher dashboard
- TASK-373 Create teaching schedule screen
- TASK-374 Create check-in screen
- TASK-375 Create report session screen
- TASK-376 Create fuel report screen
- TASK-377 Create leave request screen
- TASK-378 Create maintenance request screen

### Acceptance Criteria

- Teacher can complete daily workflow.
- Teacher can report session and vehicle usage.

------

# 20. Suggested Implementation Order

## Step 1

Implement foundation:

```text
EPIC-01
EPIC-02
```

## Step 2

Implement core student lifecycle:

```text
EPIC-03
EPIC-04
EPIC-05
```

## Step 3

Implement scheduling and training:

```text
EPIC-06
EPIC-07
```

## Step 4

Implement exam:

```text
EPIC-08
```

## Step 5

Implement teacher and vehicle:

```text
EPIC-09
EPIC-10
EPIC-11
```

## Step 6

Implement summary, notification, reports, audit:

```text
EPIC-12
EPIC-13
EPIC-14
EPIC-15
```

## Step 7

Polish frontend:

```text
EPIC-16
```

------

# 21. Recommended GitHub Labels

```text
epic
feature
story
backend
frontend
database
api
ui
bug
enhancement
priority-high
priority-medium
priority-low
blocked
mvp
```

------

# 22. Definition of Done

A task is considered done when:

- Database migration is completed if needed.
- Backend API is implemented if needed.
- Validation is implemented.
- Permission check is implemented.
- Frontend screen or component is implemented if applicable.
- Error handling is implemented.
- Loading and empty state are handled.
- Audit log is added for important actions.
- Basic manual test is passed.
- Documentation is updated if behavior changes.