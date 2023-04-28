


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('saldo_contabilizado', (table)=>{
        table.increments('id_saldo').primary();
        table.integer('quantia_total').notNullable();
        table.string('data').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_saldo').notNullable().defaultTo('0')
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
    return knex.schema.dropTable('saldo_contabilizado')
};
