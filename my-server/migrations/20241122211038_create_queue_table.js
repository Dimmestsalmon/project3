/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('queue', (table) => {
    table.increments('id').primary();
    table.integer('line_number');
    table.integer('event_id');
    table.foreign('event_id').references('events.id');
    table.integer('user_id');
    table.foreign('user_id').references('users.id').onDelete('SET NULL');
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('queue', table => {
    table.dropForeign('event_id')
    table.dropForeign('user_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('queue')
  })
};
