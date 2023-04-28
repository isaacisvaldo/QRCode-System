/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_evento', (table)=>{
        table.increments('idcategoria_evento').primary();
        table.string('imagecategoria_evento').notNullable();
        table.string('nomecategoria_evento').notNullable();
        table.string('detalhescategoria_evento').notNullable();
        table.string('data_Criacao_categoria_evento').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_evento')
};
