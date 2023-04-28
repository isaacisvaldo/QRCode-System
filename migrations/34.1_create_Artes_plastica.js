/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('artes_plasticas', (table)=>{
        table.increments('idartes_plasticas').primary();
        table.string('nomeartes_plasticas').notNullable();
        table.string('descricaoartes_plasticas').notNullable();
        table.string('quantidadeartes_plasticas').notNullable();
        table.string('imageartes_plasticas').notNullable();
        table.string('precoartes_plasticas').notNullable();
        table.integer('estadoartes_plasticas').notNullable();
        table.string('dataPublicacao').notNullable().defaultTo(knex.fn.now())
        table.integer('categoria_artes_plasticas_id').unsigned();
        table.foreign('categoria_artes_plasticas_id')
        .references('categoria_artes_plasticas.idcategoria_artes_plasticas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
        table.integer('artista_id').unsigned();
        table.foreign('artista_id')
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
    return knex.schema.dropTable('artes_plasticass')
};
