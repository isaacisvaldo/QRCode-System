/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('livros_adquiridos', (table)=>{
        table.increments('idlivro_adquirido').primary();
        table.integer('estadobilhete_adquirido').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('id_livro_adquirido').unsigned();
        table.foreign('id_livro_adquirido')
        .references('livros.idLivro')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
        table.integer('id_entidade_adquiriu').unsigned();
        table.foreign('id_entidade_adquiriu')
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
    return knex.schema.dropTable('livros_adquiridos')
};
