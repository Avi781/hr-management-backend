# HR Management Backen

This project is a starter implementation for an HR management backend featuring:

- JWT authentication for HR users
- CRUD for employees (with photo upload)
- Attendance recording & upsert
- Monthly attendance report (days present, times late (after 09:45:00))
- Knex migrations & seeds
- Docker + docker-compose setup for quick testing

## Quick start
1. Create `.env` file and set DB credentials.
2. Run with Docker Compose: ` docker-compose up -d --build `.
3. Run migrations: ` docker-compose run --rm hr_backend npm run migrate `
4. Then Run Seed `docker-compose run --rm hr_backend npm run seed`
5. server running port : `http://localhost:4000/ `.

Endpoints:
- POST /auth/login { email, password }
- /employees - protected
- /attendance - protected
- /reports/attendance?month=YYYY-MM&employee_id=

