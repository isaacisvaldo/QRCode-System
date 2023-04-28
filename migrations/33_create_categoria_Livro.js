/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_livro', (table)=>{
        table.increments('idcategoria_livro').primary();
        table.string('imagecategoria_livro').notNullable();
        table.string('nomecategoria_livro').notNullable();
        table.string('detalhescategoria_livro').notNullable();
        table.string('data_Criacao_categoria_livro').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_livro')
};
