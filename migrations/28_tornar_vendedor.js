


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tornar_vendedor', (table)=>{
        table.increments('id').primary();
        table.string('motivo').notNullable();
        table.string('detalhes').notNullable();
        table.string('dataSolicitacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_solicitacao').notNullable()
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
    return knex.schema.dropTable('tornar_vendedor')
};
