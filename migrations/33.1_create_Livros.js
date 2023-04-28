/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('livros', (table)=>{
        table.increments('idLivro').primary();
        table.string('nomeLivro').notNullable();
        table.string('descricaoLivro').notNullable();
        table.string('ficheiro').notNullable();
        table.string('capaLivro').notNullable();
        table.string('precoLivro').notNullable();
        table.integer('quantidadeLivro').notNullable();
        table.integer('estadoLivro').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('categoria_livro_id').unsigned();
        table.foreign('categoria_livro_id')
        .references('categoria_livro.idcategoria_livro')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
        table.integer('escritor_id').unsigned();
        table.foreign('escritor_id')
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
    return knex.schema.dropTable('livros')
};
