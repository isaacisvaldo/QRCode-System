/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('perfil_user', (table)=>{
    table.increments('idperfil_user').primary();
    table.string('nome_perfil').notNullable();
    table.integer('estado_perfil').notNullable();
   
  
})
};

exports.down = function(knex) {
    return knex.schema.dropTable('perfil_user')
};
