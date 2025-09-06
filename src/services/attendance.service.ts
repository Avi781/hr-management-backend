import db from "../utils/db";

export class AttendanceService {
  private knex = db;

  async list(opts: { employee_id?: number; from?: string; to?: string; page: number; limit: number }) {

    const { employee_id, from, to, page, limit } = opts;
    const query = this.knex('attendance').join('employees', 'attendance.employee_id', 'employees.id').select('attendance.*', 'employees.name');

    if (employee_id) query.where('attendance.employee_id', employee_id);
    if (from) query.where('attendance.date', '>=', from);
    if (to) query.where('attendance.date', '<=', to);

   const totalQ = query.clone().clearSelect().count('* as count');
    const total = Number((await totalQ)[0].count);
    const items = await query.offset((page - 1) * limit).limit(limit).orderBy('date', 'desc');

    return { total, page, limit, items };
  }

  async getById(id: number) {
    return this.knex('attendance').where({ id }).first();
  }

  async upsert(employee_id: number, date: string, check_in_time: string) {
    const rows = await this.knex.raw(`
      insert into attendance (employee_id, date, check_in_time, created_at, updated_at)
      values (?, ?, ?, now(), now())
      on conflict (employee_id, date) do update set check_in_time = excluded.check_in_time, updated_at = now()
      returning *;
    `, [employee_id, date, check_in_time]);
    return rows.rows[0];
  }

  async update(id: number, payload: any) {
    await this.knex('attendance').where({ id }).update({ ...payload, updated_at: new Date() });
    return this.getById(id);
  }

  async delete(id: number) {
    await this.knex('attendance').where({ id }).delete();
  }
}
