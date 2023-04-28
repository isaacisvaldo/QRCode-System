
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('produto', (table)=>{
        table.increments('idProduto').primary();
        table.integer('precoProduto').notNullable();
        table.string('nomeProduto').notNullable();
        table.string('descProduto').notNullable();
        table.string('descGeralProduto').notNullable();
        table.string('provinciaProduto').notNullable();
        table.string('municipioProduto').notNullable();
        table.integer('quantProduto').notNullable();
        table.string('lat').notNullable();
        table.string('lng').notNullable();
        table.string('datacriacaoProduto').notNullable().defaultTo(knex.fn.now())
        table.integer('estadoProduto').notNullable().defaultTo('0')
        table.string('situacaoProduto').notNullable();
        table.string('descSituacaoProduto').notNullable();
        table.string('corProduto').notNullable();
        table.integer('negociavelProduto').notNullable();
        table.integer('cliente_id').unsigned();
        table.foreign('cliente_id')
        .references('clientes.idCliente')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.integer('categoria_id').unsigned();
        table.foreign('categoria_id')
        .references('categoria.idCategoria')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    }) 
};

/**
 * 
	produto com estado 0:inativo 1:ativo na plataforma:100 merece ser promovido
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('produto')
};
