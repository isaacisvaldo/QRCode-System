


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comprovativo', (table)=>{
        table.increments('id_comprovativo').primary();
        table.string('arquivo').notNullable();
        table.integer('estado_comprovativo').notNullable().defaultTo(0)
        table.string('data_Criacao_comprovativo').notNullable().defaultTo(knex.fn.now())
        table.integer('pagamento_id').unsigned();
        table.foreign('pagamento_id')
        .references('pagamento.id_pagamento')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};


/**
 * tipo_pagamento	detalhes_pagamento	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comprovativo')
};
