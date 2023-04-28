/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('periodo_investidor', (table)=>{
        table.increments('idPeriodo').primary();
        table.string('compravativoPedido').notNullable();
        table.integer('limitePeriodo').notNullable();
        table.string('dataFimPeriodo').notNullable();
        table.string('dataPeriodo').notNullable().defaultTo(knex.fn.now())
        table.integer('estadoPeriodo').notNullable()
        table.integer('id_tornar_investidor').unsigned();
        table.foreign('id_tornar_investidor')
        .references('tornar_investidor.id_pedido')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');  
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('periodo_investidor')
};
