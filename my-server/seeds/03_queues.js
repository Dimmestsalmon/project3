/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE queue CASCADE')
  await knex('queue').del()
  await knex('queue').insert([
    {line_number: 1, event_id: 1, user_id: 1},

  ]);
};
