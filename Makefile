COMPOSE = docker compose

.PHONY: build up down logs restart

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f valobot

restart:
	$(COMPOSE) restart valobot
