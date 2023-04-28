// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 
 
  module.exports = {

      client: 'mysql2',
     connection: {
     host : '127.0.0.1',
     port : 3306,
     database: 'digitalseguros',
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
  
 */
module.exports = {

    client: 'mysql2',
    connection: {
      host:'us-cdbr-east-06.cleardb.net',
      database: 'heroku_f7c9bfc752b6ece',
      user:     'b84b6b8d32cbfd',
      password: 'e1b0143d'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  

};
