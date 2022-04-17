import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes'
import { sequelizeConnection } from './conf/postgres.config'

require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

// connect to postgres
sequelizeConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})

export default app
