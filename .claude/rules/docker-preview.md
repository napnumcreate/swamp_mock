---
description: Policy for Docker / nginx local preview work
paths:
  - "docker/**"
  - "docker-compose.yml"
---

# Docker / nginx local preview policy

## When to apply

When the user requests work on local preview, Docker startup, or nginx serving, include the following as Required reading candidates:

- `docker/Dockerfile`
- `docker/nginx.conf`
- `docker-compose.yml`

For ordinary screen mockup work, do not force Docker / nginx configuration into the Edit scope.

## Scope

- Docker is for local preview only; do not inflate into production infrastructure.
- For screen-only mockup work, do not touch the Docker configuration.
