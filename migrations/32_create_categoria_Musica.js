/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_musica', (table)=>{
        table.increments('idcategoria_musica').primary();
        table.string('imagecategoria_musica').notNullable();
        table.string('nomecategoria_musica').notNullable();
        table.string('detalhescategoria_musica').notNullable();
        table.string('data_Criacao_categoria_musica').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_musica')
};
