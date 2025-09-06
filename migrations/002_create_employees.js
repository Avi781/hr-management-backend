exports.up = function(knex) {
  return knex.schema.createTable('employees', function(t) {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.integer('age').notNullable();
    t.string('designation').notNullable();
    t.date('hiring_date').notNullable();
    t.date('date_of_birth').notNullable();
    t.decimal('salary', 14, 2).notNullable();
    t.string('photo_path');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('employees');
};
