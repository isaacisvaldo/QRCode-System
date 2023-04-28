/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pacotes', (table)=>{
        table.increments('idPacote').primary();
        table.integer('quantia_Disponivel').notNullable();
        table.string('nome_Pacote').notNullable();
        table.string('imagem_Pacote').notNullable();
        table.string('informacao_Pacote').notNullable();
        table.string('data_criacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_Pacote').notNullable().defaultTo('0')
        table.integer('categoria_id').unsigned();
        table.foreign('categoria_id')
        .references('categoria_pacotes.idCategoria')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    })
};

/**
 * 	idPlano	quantia	nomePlano	infor	estado
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pacotes')
};
