# AGENT.md

## Project Snapshot
- Repository: `El-cmd/ValoBot`
- Default branch: `main`
- Detected stack: Node.js / frontend, Docker
- Notable root entries: `assets/`, `src/`, `.env.example`, `.gitignore`, `docker-compose.yml`, `Dockerfile`, `LICENSE`, `Makefile`, `package.json`, `README.md`
- Source mix: .js:6, .example:1, .json:1, .yml:1, dockerfile:1, .gitignore:1

## Working Guidelines
- Keep changes scoped to the requested behavior and follow the style already present in the touched files.
- Check `README.md`, `Makefile`, package scripts, and Docker files before introducing new commands or tooling.
- Keep package-lock.json in sync when dependencies change.
- Validate Docker changes with the compose/build command before pushing.
- Do not commit local secrets, `.env` files, generated dependency folders, build artifacts, or editor metadata.

## Setup
- `npm install`

## Run
- `npm run start`
- `make up`
- `docker compose up --build`

## Validate
- `make`
- `make build`
- `docker compose config`

## Makefile Targets Detected
- `build`, `up`, `down`, `logs`, `restart`

## NPM Scripts Detected
- `start`
