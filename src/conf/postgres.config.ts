import { Sequelize } from 'sequelize'
require('dotenv').config()
let { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env

console.log('first', DB_NAME!, DB_USERNAME!, DB_PASSWORD, DB_HOST)

export const sequelize = new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  ...(process.env.NODE_ENV === 'production' && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
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
