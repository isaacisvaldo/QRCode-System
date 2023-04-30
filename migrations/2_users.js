/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table)=>{
        table.increments('id_user').primary();
        table.string('image_user').notNullable();
        table.string('username_user').notNullable();
        table.string('nome_user').notNullable();
        table.string('email_user').notNullable();
        table.integer('telefone_user').notNullable();
        table.string('senha_user').notNullable()
        table.string('nif_user').notNullable()
        table.integer('estado_user').notNullable().defaultTo('1');
        table.integer('perfil_user').unsigned();
        table.foreign('perfil_user')
        .references('perfil_user.idperfil_user')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.string('data_CriacaoUser').notNullable().defaultTo(knex.fn.now())
       
      
    }) 
};

/**idCliente	nome	email	telefone	username	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
