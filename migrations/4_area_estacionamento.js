/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('area', (table)=>{
        table.increments('id_area').primary();
        table.string('nome_area').notNullable();
        table.integer('Limite_maximo_viatura').notNullable();
        table.integer('vituras_presentes').notNullable();
        table.integer('estado_area').notNullable().defaultTo('1');
        table.integer('categoria_area').unsigned();
        table.foreign('categoria_area')
        .references('categoria_area.idcategoria_area')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        table.timestamp('data_Criacaoarea').notNullable().defaultTo(knex.fn.now())
       
      
    }) 
};

/**idCliente	nome	email	telefone	areaname	image	nif	senha	estado	createdAt	updatedAt	acesso	cod	provincia	municipio	endereco
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('area')
};
