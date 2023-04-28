/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('fotos', (table)=>{
        table.increments('idfotos').primary();
        table.string('imagempublicitado1').notNullable();
        table.string('imagempublicitado2').notNullable();
        table.string('imagempublicitado3').notNullable();
        table.string('imagempublicitado4').notNullable();
        table.string('imagempublicitado5').notNullable();
        table.string('imagempublicitado6').notNullable();
        table.string('data_Publicacao_foto').notNullable().defaultTo(knex.fn.now())
        table.integer('galeria_fotos_id').unsigned();
        table.foreign('galeria_fotos_id')
        .references('galeria_fotos.idgaleria_fotos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE'); 
     
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('fotos')
};
