/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('minha_reserva', (table) => {
        table.increments('id_minha_reserva').primary();
        table.string('matricula_viatura').notNullable();
        table.integer('estado_reserva').notNullable().defaultTo('1');
        table.integer('user_id').unsigned();
        table.foreign('user_id')
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
