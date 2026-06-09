SET search_path TO sch_drvinschl;

UPDATE tbl_student
SET registration_form_submitted = COALESCE(registration_form_submitted, FALSE),
    photo_submitted = COALESCE(photo_submitted, FALSE),
    health_check_submitted = COALESCE(health_check_submitted, FALSE),
    second_fee_paid = COALESCE(second_fee_paid, FALSE),
    final_fee_paid = COALESCE(final_fee_paid, FALSE);

ALTER TABLE tbl_student
    ALTER COLUMN registration_form_submitted SET DEFAULT FALSE,
    ALTER COLUMN registration_form_submitted SET NOT NULL,
    ALTER COLUMN photo_submitted SET DEFAULT FALSE,
    ALTER COLUMN photo_submitted SET NOT NULL,
    ALTER COLUMN health_check_submitted SET DEFAULT FALSE,
    ALTER COLUMN health_check_submitted SET NOT NULL,
    ALTER COLUMN second_fee_paid SET DEFAULT FALSE,
    ALTER COLUMN second_fee_paid SET NOT NULL,
    ALTER COLUMN final_fee_paid SET DEFAULT FALSE,
    ALTER COLUMN final_fee_paid SET NOT NULL;
