


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pagamento', (table)=>{
        table.increments('id_pagamento').primary();
        table.string('tipo_pagamento').notNullable();
        table.string('detalhes_pagamento').notNullable();
        table.integer('estado_pagamento').notNullable().defaultTo(0)
        table.string('data_Criacao_pagamento').notNullable().defaultTo(knex.fn.now())
        table.integer('compra_id').unsigned();
        table.foreign('compra_id')
        .references('compras.idCompra')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};

/**
 * tipo_pagamento	detalhes_pagamento	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('pagamento')
};
