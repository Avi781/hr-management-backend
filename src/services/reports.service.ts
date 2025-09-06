import db from "../utils/db";
import { Knex } from "knex";

export class ReportsService {
  private knex: Knex = db;

  async attendanceSummary(month: string, employee_id?: number) {
    const start = `${month}-01`;

    const [year, monthStr] = month.split("-");
    const lastDay = new Date(Number(year), Number(monthStr), 0).getDate();
    const end = `${month}-${String(lastDay).padStart(2, "0")}`;

    const params: any[] = [start, end];
    let extra = "";
    if (employee_id) {
      extra = "and e.id = ?";
      params.push(employee_id);
    }

const sql = `
          select 
            e.id as employee_id,
            e.name,
            count(a.id) filter (where a.check_in_time is not null) as days_present,
            count(a.id) filter (where a.check_in_time is not null and a.check_in_time > time '09:45:00') as times_late
          from employees e
          left join attendance a 
            on a.employee_id = e.id 
            and a.date between ? and ?
          where e.deleted_at is null
          ${extra ? "and " + extra : ""}
          group by e.id, e.name
          order by e.id;`;

    const result = await this.knex.raw(sql, params);
    return result.rows;
  }
}
