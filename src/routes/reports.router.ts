import express from 'express';
import { ReportsController } from '../controllers/reports.controller';
const router = express.Router();
const controller = new ReportsController();

router.get('/attendance', controller.attendanceReport.bind(controller));

export { router as reportsRouter };
