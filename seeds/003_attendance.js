exports.seed = async function(knex) {
  await knex('attendance').del();
  await knex('attendance').insert([
    { id:1, employee_id:1, date:'2025-08-01', check_in_time:'09:30:00' },
    { id:2, employee_id:1, date:'2025-08-02', check_in_time:'09:50:00' },
    { id:3, employee_id:2, date:'2025-08-01', check_in_time:'09:10:00' }
  ]);
};
