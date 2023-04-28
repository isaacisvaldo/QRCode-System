


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('criar_investimento', (table)=>{
        table.increments('id_informacao').primary();
        table.string('informacao_investimento').notNullable();
        table.integer('valor_investimento').notNullable();
        table.string('tempo_investimento').notNullable();
        table.string('data_criacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_investimento').notNullable().defaultTo('0')
        table.integer('cliente_id').unsigned();
        table.foreign('cliente_id')
        .references('clientes.idCliente')
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
    return knex.schema.dropTable('criar_investimento')
};
