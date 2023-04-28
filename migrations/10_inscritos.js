


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('inscritos', (table)=>{
        table.increments('id').primary();
        table.integer('email').notNullable();
        table.string('data').notNullable().defaultTo(knex.fn.now())

      
    }) 
};

/**
 * 
idPlano	saldoatual	validade	estado	createdAt	updatedAt	clienteIdCliente	planoIdPlano
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('inscritos')
};
