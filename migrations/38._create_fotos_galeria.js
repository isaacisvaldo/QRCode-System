/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('galeria_fotos', (table)=>{
        table.increments('idgaleria_fotos').primary();
        table.string('nomegaleria_fotos').notNullable();
        table.string('imagem_aleria_fotos').notNullable();
        table.string('descricaogaleria_fotos').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
 
     
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('galeria_fotos')
};
