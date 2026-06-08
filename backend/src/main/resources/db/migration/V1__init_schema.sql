CREATE SCHEMA IF NOT EXISTS sch_drvinschl;
SET search_path TO sch_drvinschl;

CREATE TABLE IF NOT EXISTS _user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50),
    is_enabled BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(512) UNIQUE,
    token_type VARCHAR(50),
    revoked BOOLEAN DEFAULT FALSE,
    expired BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES _user(id)
);

CREATE TABLE IF NOT EXISTS tbl_user_provider (
    id SERIAL PRIMARY KEY,
    provider_name VARCHAR(100) NOT NULL,
    provider_id VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES _user(id),
    UNIQUE(provider_name, provider_id)
);

CREATE TABLE IF NOT EXISTS tbl_student (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    user_id INTEGER NOT NULL UNIQUE REFERENCES _user(id),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    course_package VARCHAR(255),
    application_date DATE,
    opening_date DATE,
    closing_date DATE,
    settlement_date DATE,
    certificate_received_date DATE,
    registration_form_submitted BOOLEAN DEFAULT FALSE,
    photo_submitted BOOLEAN DEFAULT FALSE,
    health_check_submitted BOOLEAN DEFAULT FALSE,
    health_check_submitted_date DATE,
    second_fee_paid BOOLEAN DEFAULT FALSE,
    final_fee_paid BOOLEAN DEFAULT FALSE,
    total_fee DECIMAL(15,2),
    paid_fee DECIMAL(15,2),
    course_status VARCHAR(50),
    assigned_sales_id INTEGER REFERENCES _user(id)
);

CREATE TABLE IF NOT EXISTS tbl_course_package (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    name VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(15,2) NOT NULL,
    theory_hours INTEGER,
    simulation_hours INTEGER,
    basic_4h_hours INTEGER,
    cabin_hours INTEGER,
    dat_hours INTEGER,
    dat_km INTEGER,
    sa_hinh_hours INTEGER,
    practical_road_hours INTEGER,
    raw_yard_hours INTEGER,
    sensor_practice_hours INTEGER,
    sensor_exam_hours INTEGER,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tbl_learning_progress (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    module VARCHAR(50) NOT NULL,
    status VARCHAR(50),
    completed_hours INTEGER,
    required_hours INTEGER,
    total_km INTEGER,
    remaining_km INTEGER,
    total_minutes INTEGER,
    UNIQUE(student_id, module)
);

CREATE TABLE IF NOT EXISTS tbl_payment (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    payment_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    paid_at TIMESTAMP NOT NULL,
    note TEXT,
    recorded_by_id INTEGER REFERENCES _user(id)
);

CREATE TABLE IF NOT EXISTS tbl_vehicle (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    license_plate VARCHAR(50) NOT NULL UNIQUE,
    model VARCHAR(255),
    registration_expiry DATE,
    learner_license_expiry DATE,
    insurance_expiry DATE,
    mortgage_info TEXT,
    ownership_info TEXT,
    current_odo INTEGER,
    is_clean BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tbl_training_slot (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    session_type VARCHAR(50) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    teacher_id INTEGER REFERENCES _user(id),
    vehicle_id UUID REFERENCES tbl_vehicle(id)
);

CREATE TABLE IF NOT EXISTS tbl_training_booking (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    slot_id UUID NOT NULL REFERENCES tbl_training_slot(id),
    status VARCHAR(50),
    teacher_rating INTEGER,
    teacher_comment TEXT
);

CREATE TABLE IF NOT EXISTS tbl_session_report (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    booking_id UUID NOT NULL REFERENCES tbl_training_booking(id),
    session_type VARCHAR(50) NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    km INTEGER,
    duration_minutes INTEGER,
    dat_screenshot_url TEXT,
    attendance_marked BOOLEAN DEFAULT FALSE,
    student_dropped BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tbl_exam_session (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    exam_type VARCHAR(50) NOT NULL,
    exam_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    instructions TEXT
);

CREATE TABLE IF NOT EXISTS tbl_exam_registration (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    exam_session_id UUID NOT NULL REFERENCES tbl_exam_session(id),
    passed BOOLEAN,
    score VARCHAR(50),
    is_retake BOOLEAN DEFAULT FALSE,
    retake_fee DECIMAL(15,2),
    retake_part VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS tbl_contract (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    sales_id INTEGER NOT NULL REFERENCES _user(id),
    appointment_date TIMESTAMP,
    signed_date DATE,
    contract_amount DECIMAL(15,2),
    registration_form_complete BOOLEAN DEFAULT FALSE,
    photo_complete BOOLEAN DEFAULT FALSE,
    health_check_complete BOOLEAN DEFAULT FALSE,
    fee_complete BOOLEAN DEFAULT FALSE,
    commission_amount DECIMAL(15,2)
);

CREATE TABLE IF NOT EXISTS tbl_vehicle_log (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    vehicle_id UUID NOT NULL REFERENCES tbl_vehicle(id),
    teacher_id INTEGER REFERENCES _user(id),
    departure_time TIMESTAMP,
    return_time TIMESTAMP,
    odo_departure INTEGER,
    odo_return INTEGER,
    is_clean BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS tbl_fuel_record (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    vehicle_id UUID NOT NULL REFERENCES tbl_vehicle(id),
    teacher_id INTEGER NOT NULL REFERENCES _user(id),
    fuel_date DATE NOT NULL,
    liters DECIMAL(10,2) NOT NULL,
    receipt_url TEXT,
    amount DECIMAL(15,2)
);

CREATE TABLE IF NOT EXISTS tbl_maintenance_record (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    vehicle_id UUID NOT NULL REFERENCES tbl_vehicle(id),
    maintenance_date DATE NOT NULL,
    description TEXT,
    cost DECIMAL(15,2),
    approved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tbl_leave_request (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    teacher_id INTEGER NOT NULL REFERENCES _user(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS tbl_salary (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    teacher_id INTEGER NOT NULL REFERENCES _user(id),
    month VARCHAR(7) NOT NULL,
    base_salary DECIMAL(15,2),
    bonus DECIMAL(15,2),
    total_amount DECIMAL(15,2),
    approved_by_admin BOOLEAN DEFAULT FALSE,
    approved_by_director BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tbl_system_config (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    config_key VARCHAR(255) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS tbl_extra_registration (
    id UUID PRIMARY KEY,
    version BIGINT,
    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,
    created_by VARCHAR(255),
    last_modified_by VARCHAR(255),
    student_id UUID NOT NULL REFERENCES tbl_student(id),
    extra_type VARCHAR(50) NOT NULL,
    hours INTEGER,
    fee DECIMAL(15,2)
);
