SET search_path TO sch_drvinschl;

ALTER TABLE tbl_system_config
    ALTER COLUMN config_value TYPE TEXT,
    ALTER COLUMN description TYPE TEXT;
