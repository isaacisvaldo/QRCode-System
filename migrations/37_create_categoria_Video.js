/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_video', (table)=>{
        table.increments('idcategoria_video').primary();
        table.string('imagecategoria_video').notNullable();
        table.string('nomecategoria_video').notNullable();
        table.string('detalhescategoria_video').notNullable();
        table.string('data_Criacao_categoria_video').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_video')
};
