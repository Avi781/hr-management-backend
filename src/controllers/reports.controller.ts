import { Request, Response } from 'express';
import { ReportsService } from '../services/reports.service';
import { reportSchema } from '../utils/schemaValidation';

export class ReportsController {
  private service = new ReportsService();

  async attendanceReport(req: Request, res: Response) {
    const { error, value } = reportSchema.validate(req.query);
    if (error) return res.status(400).json({ error: error.message });
    const data = await this.service.attendanceSummary(value.month, value.employee_id);
    return res.json(data);
  }
}
