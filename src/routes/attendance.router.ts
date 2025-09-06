import express from 'express';
import { AttendanceController } from '../controllers/attendance.controller';
const router = express.Router();
const controller = new AttendanceController();

router.get('/', controller.list.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.post('/', controller.upsert.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export { router as attendanceRouter };
