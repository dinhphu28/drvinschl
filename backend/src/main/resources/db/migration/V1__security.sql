CREATE SCHEMA IF NOT EXISTS sch_drvinschl;

CREATE TABLE IF NOT EXISTS sch_drvinschl.roles (
    id UUID PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sch_drvinschl.permissions (
    id UUID PRIMARY KEY,
    code VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sch_drvinschl.users (
    id UUID PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    status VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    created_by UUID,
    updated_by UUID,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sch_drvinschl.user_roles (
    user_id UUID NOT NULL REFERENCES sch_drvinschl.users(id),
    role_id UUID NOT NULL REFERENCES sch_drvinschl.roles(id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS sch_drvinschl.role_permissions (
    role_id UUID NOT NULL REFERENCES sch_drvinschl.roles(id),
    permission_id UUID NOT NULL REFERENCES sch_drvinschl.permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS sch_drvinschl.tokens (
    id UUID PRIMARY KEY,
    token TEXT NOT NULL UNIQUE,
    token_type VARCHAR(30) NOT NULL,
    revoked BOOLEAN NOT NULL,
    expired BOOLEAN NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    user_id UUID NOT NULL REFERENCES sch_drvinschl.users(id)
);
