import { Request, Response } from 'express';
import { AttendanceService } from '../services/attendance.service';
import { attendanceSchema } from '../utils/schemaValidation';

export class AttendanceController {
  private service = new AttendanceService();

  async list(req: Request, res: Response) {
    const { employee_id, from, to, page, limit } = req.query as any;
    const result = await this.service.list({ employee_id: employee_id ? Number(employee_id) : undefined, from, to, page: Number(page||1), limit: Number(limit||50) });
    return res.json(result);
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await this.service.getById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    return res.json(item);
  }

  async upsert(req: Request, res: Response) {
    const { error, value } = attendanceSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const item = await this.service.upsert(value.employee_id, value.date, value.check_in_time);
    return res.status(201).json(item);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { error, value } = attendanceSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const item = await this.service.update(id, value);
    return res.json(item);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.service.delete(id);
    return res.status(204).send();
  }
}
