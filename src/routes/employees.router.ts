import express from 'express';
import multer from 'multer';
import { EmployeesController } from '../controllers/employees.controller';

const router = express.Router();
const uploadPath = process.env.UPLOAD_PATH || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
const controller = new EmployeesController();

router.get('/', controller.list.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.post('/', upload.single('photo_path'), controller.create.bind(controller));
router.put('/:id', upload.single('photo_path'), controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export { router as employeesRouter };
