// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 
  */
  module.exports = {

      client: 'mysql2',
     connection: {
     host : '127.0.0.1',
     port : 3306,
     database: 'estancionamento',
    user:'root',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  
    }
  



};
