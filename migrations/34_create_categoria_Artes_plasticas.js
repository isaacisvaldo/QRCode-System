/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_artes_plasticas', (table)=>{
        table.increments('idcategoria_artes_plasticas').primary();
        table.string('imagecategoria_artes_plasticas').notNullable();
        table.string('nomecategoria_artes_plasticas').notNullable();
        table.string('detalhescategoria_artes_plasticas').notNullable();
        table.string('data_Criacao_categoria_artes_plasticas').notNullable().defaultTo(knex.fn.now())    
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_artes_plasticas')
};
