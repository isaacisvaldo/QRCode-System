


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('compras', (table)=>{
        table.increments('idCompra').primary();
        table.string('detalhes').notNullable();
        table.integer('quantidade_produto').notNullable();
        table.integer('preco_pagar').notNullable();
        table.string('dataCompra').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_compra').notNullable()
        table.integer('Compra_id_cliente').unsigned();
        table.integer('Compra_produto_id').unsigned();
        table.foreign('Compra_id_cliente')
        .references('clientes.idCliente')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.foreign('Compra_produto_id')
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
    return knex.schema.dropTable('compras')
};
