


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('meus_pacotes', (table)=>{
        table.increments('idMeupacote').primary();
        table.integer('saldoatual').notNullable();
        table.string('validade').notNullable();
        table.string('data').notNullable().defaultTo(knex.fn.now())
        table.integer('estado').notNullable().defaultTo('0')
        table.integer('cliente_id').unsigned();
        table.foreign('cliente_id')
        .references('clientes.idCliente')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.integer('pacote_id').unsigned();
        table.foreign('pacote_id')
        .references('pacotes.idPacote')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};

/**
 * 
idPlano	saldoatual	validade	estado	createdAt	updatedAt	clienteIdCliente	planoIdPlano
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('meus_pacotes')
};
