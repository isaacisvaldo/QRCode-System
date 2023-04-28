


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('feedbaks', (table)=>{
        table.increments('idFeedbak').primary();
        table.string('comentario').notNullable();
        table.string('dataFeedbak').notNullable().defaultTo(knex.fn.now())
        table.integer('estadoFeedbak').notNullable()
        table.integer('cliente_id').unsigned();
        table.foreign('cliente_id')
        .references('clientes.idCliente')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};

/**
 * idFeedbak	comentario	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('feedbaks')
};
