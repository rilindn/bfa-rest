import { Sequelize } from 'sequelize'
require('dotenv').config()
let { HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

if (process.env.NODE_ENV === 'production') {
  HOST = process.env.HOST_PROD
  DB_NAME = process.env.DB_NAME_PROD
  DB_USERNAME = process.env.DB_USERNAME_PROD
  DB_PASSWORD = process.env.DB_PASSWORD_PROD
}

export const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD, {
  host: HOST,
  dialect: 'postgres',
  logging: false,
})

export const sequelizeConnection = async () => {
  try {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Postgres connection has been established successfully.')
      })
      .then(() => {
        sequelize.sync({ alter: true }).then(() => {
          console.log(`Database & tables synced!`)
        })
      })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
