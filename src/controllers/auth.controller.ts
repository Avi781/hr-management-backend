import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { loginSchema } from '../utils/schemaValidation';

export class AuthController {
  private service = new AuthService();

  async login(req: Request, res: Response) {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    try {
      const token = await this.service.login(value.email, value.password);
      return res.json({message:'Login Successfully', token });
    } catch (err: any) {
      return res.status(401).json({ error: err.message || 'Invalid credentials' });
    }
  }
}
