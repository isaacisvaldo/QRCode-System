


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('actividades', (table)=>{
        table.increments('idActividade').primary();
        table.string('detalhes').notNullable();
        table.string('data').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_atividade').notNullable().defaultTo('0')
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
    return knex.schema.dropTable('actividades')
};
