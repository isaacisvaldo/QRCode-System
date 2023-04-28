/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_audios', (table)=>{
        table.increments('idcategoria_audios').primary();
        table.string('imagecategoria_audios').notNullable();
        table.string('nomecategoria_audios').notNullable();
        table.string('detalhescategoria_audios').notNullable();
        table.string('data_Criacao_categoria_audios').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_audios')
};
