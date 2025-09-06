# HR Management Backend

This project is a starter implementation for an HR management backend featuring:

- JWT authentication for HR users
- CRUD for employees (with photo upload)
- Attendance recording & upsert
- Monthly attendance report (days present, times late (after 09:45:00))
- Knex migrations & seeds
- Docker + docker-compose setup for quick testing

## Quick start
### 1. Clone repo

1. Clone repo  ` https://github.com/Avi781/hr-management-backend.git `
               ` cd hr-management-backend `
2. Create `.env` file and set DB credentials.
            ` PORT=4000
              NODE_ENV=
              JWT_SECRET=
              DB_HOST=
              DB_PORT=5432
              DB_USER=
              DB_PASSWORD=
              DB_NAME=
              UPLOAD_PATH=
              JWT_EXPIRES = `

3. Run with Docker Compose: ` docker-compose up -d --build `
4. Run migrations: ` docker-compose run --rm hr_backend npm run migrate `
5. Then Run Seed ` docker-compose run --rm hr_backend npm run seed `
6. server running port : ` http://localhost:4000/ `

Endpoints:
- POST /auth/login { email, password }
- /employees - protected
- /attendance - protected
- /reports/attendance?month=YYYY-MM&employee_id=

