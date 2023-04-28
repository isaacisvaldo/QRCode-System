/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('musicas_adquiridas', (table)=>{
        table.increments('idmusicas_adquiridas').primary();
        table.integer('estadomusica_adquirida').notNullable().defaultTo('0');;
        table.string('data_musica_adquirida').notNullable().defaultTo(knex.fn.now())
        table.integer('id_musica_adquirida').unsigned();
        table.foreign('id_musica_adquirida')
        .references('musicas.idMusica')
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
    return knex.schema.dropTable('musicas_adquiridas')
};
