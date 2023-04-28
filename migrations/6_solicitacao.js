/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('solicitacao', (table)=>{
        table.increments('idSolicitacao').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.string('assunto').notNullable()
        table.text('mensagen').notNullable()
        table.string('data').notNullable().defaultTo(knex.fn.now())
        table.integer('estado').notNullable().defaultTo('0')
      
    })
};

/**
 * nome,email,telefone,assunto,mensagen,estado:0,hora
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('solicitacao')
};
