const bcrypt = require("bcryptjs");
exports.seed = async function (knex) {
  const hash = await bcrypt.hash('avi', 10);
  await knex('hr_users').del();
  await knex('hr_users').insert([{ id: 1, email: 'avi@gmail.com', password_hash: hash, name: 'HR Admin' }]);
};
