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
    username: DB_USERNAME_PROD,
    password: DB_PASSWORD_PROD,
    database: DB_NAME_PROD,
    host: DB_HOST_PROD,
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
