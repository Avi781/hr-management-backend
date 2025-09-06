// app.ts
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

import { authRouter } from './routes/auth.router';
import { employeesRouter } from './routes/employees.router';
import { attendanceRouter } from './routes/attendance.router';
import { reportsRouter } from './routes/reports.router';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads')));

app.use('/auth', authRouter);

app.use('/employees', authMiddleware, employeesRouter);
app.use('/attendance', authMiddleware, attendanceRouter);
app.use('/reports', authMiddleware, reportsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
