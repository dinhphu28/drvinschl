SHELL := /bin/bash

BACKEND_DIR := backend
FRONTEND_DIR := frontend
BACKEND_ENV := $(BACKEND_DIR)/.env
COMPOSE := docker compose --env-file $(BACKEND_ENV) -f $(BACKEND_DIR)/docker-compose.yaml

.DEFAULT_GOAL := help

.PHONY: help db db-clean db-fresh backend frontend all start stop ps test

help:
	@echo "Available targets:"
	@echo "  make db        Start PostgreSQL only"
	@echo "  make db-clean  Stop PostgreSQL and remove its volume"
	@echo "  make db-fresh  Recreate PostgreSQL from an empty volume"
	@echo "  make backend   Start DB, then backend API with backend/.env"
	@echo "  make frontend  Start frontend dev server"
	@echo "  make all       Start DB, backend, and frontend"
	@echo "  make start     Alias for make all"
	@echo "  make stop      Stop Docker services"
	@echo "  make ps        Show Docker service status"
	@echo "  make test      Run backend tests and frontend build"

db:
	$(COMPOSE) up -d db

db-clean:
	$(COMPOSE) down -v

db-fresh: db-clean db

backend: db
	cd $(BACKEND_DIR) && set -a && source .env && set +a && ./gradlew bootRun

frontend:
	yarn --cwd $(FRONTEND_DIR) dev

all: db
	@echo "Starting backend and frontend. Press Ctrl+C to stop both."
	@set -e; \
	( cd $(BACKEND_DIR) && set -a && source .env && set +a && ./gradlew bootRun ) & backend_pid=$$!; \
	( yarn --cwd $(FRONTEND_DIR) dev ) & frontend_pid=$$!; \
	trap 'kill $$backend_pid $$frontend_pid 2>/dev/null || true' INT TERM EXIT; \
	wait $$backend_pid $$frontend_pid

start: all

stop:
	$(COMPOSE) stop

ps:
	$(COMPOSE) ps

test:
	cd $(BACKEND_DIR) && set -a && source .env && set +a && ./gradlew test
	yarn --cwd $(FRONTEND_DIR) build
