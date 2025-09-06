import db from "../utils/db";
import { EmployeePayload, ListOptions } from "../utils/payload";

export class EmployeesService {
  private knex = db;
  async list(opts: ListOptions) {
    const { page, limit, search } = opts;

    let query = this.knex('employees').whereNull('deleted_at');

    if (search) {
      query = query.where('name', 'ilike', `%${search}%`);
    }

    const totalResult = await query.clone().count('* as count');
    const total = Number((totalResult[0] as any).count);

    const items = await query
      .clone()
      .offset((page - 1) * limit)
      .limit(limit)
      .select('*')
      .orderBy('id', 'asc');

    return { total, page, limit, items };
  }

  async getById(id: number) {
    return this.knex('employees').where({ id }).whereNull('deleted_at').first();
  }

  async create(payload: EmployeePayload, photo?: string) {
    const now = new Date();

    const inserted = await this.knex('employees')
      .insert({
        ...payload,
        photo_path: photo || null,
        created_at: now,
        updated_at: now,
      })
      .returning('id');
    const newId = inserted[0].id;
    return this.getById(newId);
  }


  async update(id: number, payload: Partial<EmployeePayload>, photo?: string) {
    const updateData: any = {
      ...payload,
      updated_at: new Date(),
    };

    if (photo) {
      updateData.photo_path = photo;
    }

    await this.knex('employees')
      .where({ id })
      .update(updateData);

    return this.getById(id);
  }

  async delete(id: number) {
    await this.knex('employees')
      .where({ id })
      .update({ deleted_at: new Date() });
  }
}
