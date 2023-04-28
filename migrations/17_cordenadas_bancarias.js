


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cordenadas_bancarias', (table)=>{
        table.increments('id_cordenadas').primary();
        table.string('nome_Banco').notNullable();
        table.string('numero_conta').notNullable();
        table.string('nib_conta').notNullable();
        table.string('iban_conta').notNullable();
        table.string('data_criacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_cordenadas').notNullable().defaultTo('0')
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
    return knex.schema.dropTable('cordenadas_bancarias')
};
