/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bilhetes_adquiridos', (table)=>{
        table.increments('idbilhetes_adquiridos').primary();
        table.integer('estadobilhete_adquirido').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('id_bilhete_evento').unsigned();
        table.foreign('id_bilhete_evento')
        .references('eventos.idEvento')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
        table.integer('id_entidade_adquiriu').unsigned();
        table.foreign('id_entidade_adquiriu')
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
    return knex.schema.dropTable('bilhetes_adquiridos')
};
