/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', (table)=>{
    table.increments('idAdmin').primary();
    table.string('image').notNullable();
    table.string('username').notNullable();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.integer('telefone').notNullable();
    table.string('senha').notNullable()
    table.string('nif').notNullable()
    table.integer('role').notNullable()
  
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('admin')
};
