exports.seed = async function(knex) {
  await knex('employees').del();
  await knex('employees').insert([
    { id:1, name: 'Rahim K', age: 29, designation: 'Developer', hiring_date: '2022-03-01', date_of_birth: '1996-05-10', salary: '1200.00' },
    { id:2, name: 'Karim A', age: 34, designation: 'Designer', hiring_date: '2021-06-15', date_of_birth: '1990-08-20', salary: '1100.00' }
  ]);
};
