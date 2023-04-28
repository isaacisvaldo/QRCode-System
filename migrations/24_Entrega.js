


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('entrega', (table)=>{
        table.increments('id_entrega').primary();
        table.string('tipo_entrega').notNullable();
        table.string('detalhes_entrega').notNullable();
        table.string('data_entrega').notNullable();
        table.string('hora_entrega').notNullable();
        table.integer('estado_entrega').notNullable().defaultTo(0)
        table.string('data_Criacao').notNullable().defaultTo(knex.fn.now())
        table.integer('compra_id').unsigned();
        table.foreign('compra_id')
        .references('compras.idCompra')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};

/**
 * idFeedbak	comentario	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('entrega')
};
