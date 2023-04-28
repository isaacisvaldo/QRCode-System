


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('endereco', (table)=>{
        table.increments('id_endereco').primary();
        table.string('provincia').notNullable();
        table.string('municipio').notNullable();
        table.string('endereco').notNullable();
        table.float('lat').notNullable();
        table.float('lng').notNullable();
        table.integer('estado_endereco').notNullable().defaultTo(0)
        table.string('data_Criacao_endereco').notNullable().defaultTo(knex.fn.now())
        table.integer('entrega_id').unsigned();
        table.foreign('entrega_id')
        .references('entrega.id_entrega')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};

/**
 * idFeedbak	comentario	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('endereco')
};
