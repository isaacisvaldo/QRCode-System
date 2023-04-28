


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('visitantes', (table)=>{
        table.increments('idVisitante').primary();
        table.float('lat').notNullable();
        table.float('lng').notNullable();
        table.integer('estadoVisitante').notNullable()
        table.string('dataVisita').notNullable().defaultTo(knex.fn.now())
        
    }) 
};

/**
 * idFeedbak	comentario	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('visitantes')
};
