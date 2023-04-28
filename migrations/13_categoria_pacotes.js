/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categoria_pacotes', (table)=>{
        table.increments('idCategoria').primary();
        table.string('codigo_Categoria').notNullable();
        table.string('informacao_Categoria').notNullable();
        table.string('nome_Categoria').notNullable();
        table.string('data_Criacao').notNullable().defaultTo(knex.fn.now())
   
      
    }) 
};

/**idCliente	nome	email	telefone	username	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categoria_pacotes')
};
