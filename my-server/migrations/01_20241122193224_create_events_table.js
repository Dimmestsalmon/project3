/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('events', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('location');
        table.string('password');
        table.date('date');
        table.time('time');
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('events');
};
