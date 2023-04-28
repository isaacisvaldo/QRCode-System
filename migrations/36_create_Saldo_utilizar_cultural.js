/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('saldo_utilizar_cultural', (table)=>{
        table.increments('idsaldo_utilizar_cultural').primary();
        table.integer('saldo_disponivel').notNullable(); 
        table.integer('cliente_saldo_disponivel_id').unsigned();
        table.foreign('cliente_saldo_disponivel_id')
        .references('clientes.idCliente')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('saldo_utilizar_cultural')
};
