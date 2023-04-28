


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('avaliacao_produto', (table)=>{
        table.increments('idavaliacao_produto').primary();
        table.string('comentario_avaliacao_produto').notNullable();
        table.integer('avaliacao_produto').notNullable();
        table.string('data_avaliacao_produto').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_avaliacao_produto').notNullable()
        table.integer('id_cliente_avaliacao_produto').unsigned();
        table.integer('produto_id_avaliacao_produto').unsigned();
        table.foreign('id_cliente_avaliacao_produto')
        .references('clientes.idCliente')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.foreign('produto_id_avaliacao_produto')
        .references('produto.idProduto')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      
    }) 
};

/**quantidade_produto,preco_pagar
 * idFeedbak	comentario	estadoFeedbak	createdAt	updatedAt	horaFeedbak	clienteIdCliente	
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('avaliacao_produto')
};
