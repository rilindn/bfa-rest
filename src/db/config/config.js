require('dotenv').config()
const { HOST, DB_USERNAME, DB_PASSWORD } = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'bfa_dev',
    host: HOST,
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'bfa_test',
    host: HOST,
    dialect: 'postgres',
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'bfa_prod',
    host: HOST,
    dialect: 'postgres',
  },
}
