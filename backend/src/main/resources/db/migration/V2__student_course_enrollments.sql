SET search_path TO sch_drvinschl;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS tbl_student_course_enrollment (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    course_package VARCHAR(255) NOT NULL,
    course_status VARCHAR(50),
    application_date DATE,
    opening_date DATE,
    closing_date DATE,
    settlement_date DATE,
    certificate_received_date DATE,
    total_fee DECIMAL(15,2),
    paid_fee DECIMAL(15,2),
    primary_course BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_student_course_enrollment_student
    ON tbl_student_course_enrollment(student_id);

INSERT INTO tbl_student_course_enrollment (
    id,
    version,
    created_date,
    last_modified_date,
    created_by,
    last_modified_by,
    student_id,
    course_package,
    course_status,
    application_date,
    opening_date,
    closing_date,
    settlement_date,
    certificate_received_date,
    total_fee,
    paid_fee,
    primary_course
)
SELECT
    gen_random_uuid(),
    0,
    s.created_date,
    s.last_modified_date,
    s.created_by,
    s.last_modified_by,
    s.id,
    s.course_package,
    s.course_status,
    s.application_date,
    s.opening_date,
    s.closing_date,
    s.settlement_date,
    s.certificate_received_date,
    s.total_fee,
    s.paid_fee,
    TRUE
FROM tbl_student s
WHERE s.course_package IS NOT NULL
  AND NOT EXISTS (
      SELECT 1
      FROM tbl_student_course_enrollment e
      WHERE e.student_id = s.id
        AND e.course_package = s.course_package
  );
