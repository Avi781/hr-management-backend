exports.up = function(knex) {
  return knex.schema.createTable('hr_users', function(t) {
    t.increments('id').primary();
    t.string('email').notNullable().unique();
    t.string('password_hash').notNullable();
    t.string('name').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hr_users');
};
