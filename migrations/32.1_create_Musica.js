/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('musicas', (table)=>{
        table.increments('idMusica').primary();
        table.string('nomeMusica').notNullable();
        table.string('descricaoMusica').notNullable();
        table.string('generoMusica').notNullable();
        table.string('capaMusica').notNullable();
        table.string('musica').notNullable().defaultTo('0');
        table.integer('estadoMusica').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('categoria_musica_id').unsigned();
        table.foreign('categoria_musica_id')
        .references('categoria_musica.idcategoria_musica')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
        table.integer('musico_id').unsigned();
        table.foreign('musico_id')
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
    return knex.schema.dropTable('musicas')
};
