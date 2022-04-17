import { Sequelize } from 'sequelize'
require('dotenv').config()
const { HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

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
