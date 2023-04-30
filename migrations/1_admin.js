/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', (table)=>{
        table.increments('id_admin').primary();
        table.string('image_admin').notNullable();
        table.string('username_admin').notNullable();
        table.string('nome_admin').notNullable();
        table.string('email_admin').notNullable();
        table.integer('telefone_admin').notNullable();
        table.string('senha_admin').notNullable()
        table.string('data_Criacaoadmin').notNullable().defaultTo(knex.fn.now())
       
      
    }) 
};

/**idCliente	nome	email	telefone	adminname	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('admin')
};
