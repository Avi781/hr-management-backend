import { Request, Response } from 'express';
import { EmployeesService } from '../services/employees.service';
import { createEmployeeSchema } from '../utils/schemaValidation';

export class EmployeesController {
  private service = new EmployeesService();

  async list(req: Request, res: Response) {
    const { page, limit, search } = req.query as any;
    const result = await this.service.list({ page: Number(page || 1), limit: Number(limit || 20), search });
    return res.json(result);
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await this.service.getById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    return res.json(item);
  }

  async create(req: Request, res: Response) {
    const body = req.body;
    const { error, value } = createEmployeeSchema.validate(body);
    if (error) return res.status(400).json({ error: error.message });
    const file = req.file;
    const employee = await this.service.create(value, file ? file.filename : undefined);
    return res.status(201).json(employee);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body = req.body;
    const file = req.file;
    const employee = await this.service.update(id, body, file ? file.filename : undefined);
    return res.json(employee);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.service.delete(id);
    return res.status(204).send();
  }
}
