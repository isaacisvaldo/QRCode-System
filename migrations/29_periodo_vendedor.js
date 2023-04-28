/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('periodo_vendedor', (table)=>{
        table.increments('idPeriodo').primary();
        table.string('compravativoPedido').notNullable();
        table.string('dataFimPeriodo').notNullable();
        table.integer('limitePeriodo').notNullable();
        table.integer('valorPago').notNullable();
        table.string('dataPeriodo').notNullable().defaultTo(knex.fn.now())
        table.integer('estadoPeriodo').notNullable()
        table.integer('id_tornar_vendedor').unsigned();
        table.foreign('id_tornar_vendedor')
        .references('tornar_vendedor.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');  
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('periodo_vendedor')
};
