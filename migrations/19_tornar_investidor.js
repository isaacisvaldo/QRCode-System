


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tornar_investidor', (table)=>{
        table.increments('id_pedido').primary();
        table.string('info_pedido').notNullable();
        table.string('data_criacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_').notNullable().defaultTo('0')
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
    return knex.schema.dropTable('tornar_investidor')
};
