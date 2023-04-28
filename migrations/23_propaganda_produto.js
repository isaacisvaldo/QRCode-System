


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('propaganda', (table)=>{
        table.increments('idpropaganda').primary();
        table.string('nome_propaganda').notNullable();
        table.string('descricao_propaganda').notNullable();
        table.string('preco_anterior').notNullable();
        table.string('imagemPropaganda1').notNullable();
        table.string('imagemPropaganda2').notNullable();
        table.string('imagemPropaganda3').notNullable();
        table.string('imagemPropaganda4').notNullable();
        table.string('imagemPropaganda5').notNullable();
        table.string('ficheiro_comprovatico').notNullable();
        table.string('datacriacao_propaganda').notNullable().defaultTo(knex.fn.now())
        table.integer('estado_propaganda').notNullable().defaultTo('0')
        table.integer('produto_id').unsigned();
        table.foreign('produto_id')
        .references('produto.idProduto')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    
      
    }) 
};

/**
 * 
	os produtos que estao em propaganda teram os estado 100 
 * 
 */
exports.down = function(knex) {
    return knex.schema.dropTable('propaganda')
};
