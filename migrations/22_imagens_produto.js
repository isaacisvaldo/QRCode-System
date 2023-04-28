


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('imagensProduto', (table)=>{
        table.increments('idimagens').primary();
        table.string('imagenProduto1').notNullable();
        table.string('imagenProduto2').notNullable();
        table.string('imagenProduto3').notNullable();
        table.string('imagenProduto4').notNullable();
        table.string('imagenProduto5').notNullable();
        table.string('dataciacao').notNullable().defaultTo(knex.fn.now())
        table.integer('estadoimagens').notNullable().defaultTo('0')
        table.integer('produto_id').unsigned();
        table.foreign('produto_id')
        .references('produto.idProduto')
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
    return knex.schema.dropTable('imagensProduto')
};
