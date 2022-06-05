import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import loginRouter from './routes/loginRoute'
import { sequelizeConnection } from './conf/postgres.config'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import './conf/passport.config'
import secureRouter from './routes/secureRoutes'
import mongoConnection from './conf/mongodb.config'
import { socketsService } from './services/sockets'

require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

// connect to postgres
sequelizeConnection()
// connect to mongo
mongoConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(cookieParser())

app.use(
  session({
    secret: process.env.SECRET_SESSION_KEY!,
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/', loginRouter)
app.use('/', passport.authenticate('jwt', { session: false }), secureRouter)

const server = app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})

const io = require('socket.io')(server)
io.on('connection', socketsService)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
export default app
