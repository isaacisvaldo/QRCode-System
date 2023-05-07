/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_area', (table)=>{
    table.increments('idcategoria_area').primary();
    table.string('nome_categoria').notNullable();
    table.integer('estado_categoria').notNullable();
    table.integer('preco_hora').notNullable();
   
  
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('categoria_area')
};
