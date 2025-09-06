exports.up = function(knex) {
  return knex.schema.createTable('attendance', function(t) {
    t.increments('id').primary();
    t.integer('employee_id').unsigned().notNullable().references('id').inTable('employees').onDelete('CASCADE');
    t.date('date').notNullable();
    t.time('check_in_time').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.unique(['employee_id', 'date']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('attendance');
};
