/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('clientes', (table)=>{
        table.increments('idCliente').primary();
        table.string('image').notNullable();
        table.string('username').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.integer('telefone').notNullable();
        table.string('senha').notNullable()
        table.string('nif').notNullable()
        table.string('provincia').notNullable()
        table.string('municipio').notNullable()
        table.string('cod').notNullable()
        table.string('endereco').notNullable()
        table.integer('estado').notNullable()
        table.string('data_CriacaoCliente').notNullable().defaultTo(knex.fn.now())
        table.integer('acesso_Leasing').notNullable().defaultTo('0')// 1 cliente normal 2 investidor
        table.integer('acesso_Ecommerce').notNullable().defaultTo('0')// 1 cliente normal 2 vendedor
        table.integer('acesso_Cultural').notNullable().defaultTo('0')// 1 User Normal 2  3 4 5
      
    }) 
};

/**idCliente	nome	email	telefone	username	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('clientes')
};
