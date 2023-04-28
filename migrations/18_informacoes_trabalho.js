


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('informacoes_trabalho', (table)=>{
        table.increments('id_informacao').primary();
        table.string('nome_empresa').notNullable();
        table.string('salario_mensal').notNullable();
        table.string('data_criacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_').notNullable().defaultTo('0')
        table.integer('banco_id').unsigned();
        table.foreign('banco_id')
        .references('cordenadas_bancarias.id_cordenadas')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    
      
    }) 
};

/**
 * 
	idActividade	detalheActividade	estadoActividade
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('informacoes_trabalho')
};
