/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE events CASCADE')
  await knex('events').del()


  await knex('events').insert([
    {name: 'Concert', location: 'Stadium', time: '7:30', date: '2024-12-22'},

  ]);
};
