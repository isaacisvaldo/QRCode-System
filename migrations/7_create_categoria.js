/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria', (table)=>{
        table.increments('idCategoria').primary();
        table.string('imageCategoria').notNullable();
        table.string('nomeCategoria').notNullable();
        table.string('detalhesCategoria').notNullable();
        table.string('data_Criacao').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria')
};
