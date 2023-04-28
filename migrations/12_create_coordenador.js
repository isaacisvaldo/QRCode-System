/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('coordenador', (table)=>{
        table.increments('idCoordenador').primary();
        table.string('image').notNullable();
        table.string('username').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('senha').notNullable()
        table.string('nif').notNullable()
        table.string('provincia').notNullable()
        table.string('municipio').notNullable()
        table.integer('estado').notNullable()
   
      
    }) 
};

/**idCliente	nome	email	telefone	username	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('coordenador')
};
