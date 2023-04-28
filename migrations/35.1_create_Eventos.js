/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('eventos', (table)=>{
        table.increments('idEvento').primary();
        table.string('nomeEvento').notNullable();
        table.string('descricaoEvento').notNullable();
        table.string('generoEvento').notNullable();
        table.string('capaEvento').notNullable();
        table.string('dataEvento').notNullable();
        table.string('horaEvento').notNullable();
        table.string('localEvento').notNullable();
        table.integer('estadoEvento').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('categoria_evento_id').unsigned();
        table.foreign('categoria_evento_id')
        .references('categoria_evento.idcategoria_evento')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
        table.integer('organizador_evento_id').unsigned();
        table.foreign('organizador_evento_id')
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
    return knex.schema.dropTable('eventos')
};
