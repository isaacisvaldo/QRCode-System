/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('area_preco_evento', (table)=>{
        table.increments('idarea_preco_evento').primary();
        table.string('nome_area_preco_evento').notNullable();
        table.string('descricao_area_preco_evento').notNullable();
        table.string('preco_area_preco_evento').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('area_preco_evento_id').unsigned();
        table.foreign('area_preco_evento_id')
        .references('area_preco_evento.idarea_preco_evento')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 

    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('area_preco_evento')
};
