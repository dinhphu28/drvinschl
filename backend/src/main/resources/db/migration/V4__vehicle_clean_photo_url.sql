SET search_path TO sch_drvinschl;

ALTER TABLE tbl_vehicle_log
    ADD COLUMN IF NOT EXISTS clean_photo_url TEXT;
