/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('minha_reserva', (table) => {
        table.increments('id_area').primary();
        table.string('nome_area').notNullable();
        table.integer('Limite_maximo_viatura').notNullable();
        table.integer('vituras_presentes').notNullable();
        table.integer('estado_area').notNullable().defaultTo('1');
        table.integer('id_user').unsigned();
        table.foreign('id_user')
            .references('users.id_user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('id_area').unsigned();
        table.foreign('id_area')
            .references('area.id_area')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.string('data_Criacaominha_reserva').notNullable().defaultTo(knex.fn.now())


    })
};

/**idCliente	nome	email	telefone	areaname	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('minha_reserva')
};
