import express from 'express';
import { AuthController } from '../controllers/auth.controller';
const router = express.Router();
const controller = new AuthController();

router.post('/login', controller.login.bind(controller));

export { router as authRouter };
