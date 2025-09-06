# HR Management Backend (TypeScript + Express + Knex + PostgreSQL)

This project is a starter implementation for an HR management backend featuring:

- JWT authentication for HR users
- CRUD for employees (with photo upload)
- Attendance recording & upsert
- Monthly attendance report (days present, times late (after 09:45:00))
- Knex migrations & seeds
- Docker + docker-compose setup for quick testing

## Quick start
1. Copy `.env.example` to `.env` and set DB credentials.
2. Run with Docker Compose: `docker-compose up --build` or run locally and run migrations.
3. Run migrations: `npm run migrate` and `npm run seed`.
4. Start dev server: `npm run dev`.

Endpoints:
- POST /auth/login { email, password }
- /employees - protected
- /attendance - protected
- /reports/attendance?month=YYYY-MM&employee_id=

JWT: default hr seed user: `hr@example.com` / `password123`
