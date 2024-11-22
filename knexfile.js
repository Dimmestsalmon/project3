module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'your_database_name',
      user: 'your_username',
      password: 'your_password'
    },
    migrations: {
      directory: './migrations'
    }
  }
}; 