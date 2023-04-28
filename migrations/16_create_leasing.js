


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('leasing', (table)=>{
        table.increments('id_leasing').primary();
        table.integer('quantia_leasing').notNullable();
        table.string('info_leasing').notNullable();
        table.string('data_solicitacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_leasing').notNullable().defaultTo('0')
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
    return knex.schema.dropTable('leasing')
};
