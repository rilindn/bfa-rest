import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import passportJwt from 'passport-jwt'
import User from '../models/user.model'
import dotenv from 'dotenv'
import Player from '../models/player.model'
import Club from '../models/club.model'

dotenv.config()

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const secretOrKey = process.env.ACCESS_TOKEN_SECRET

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
}

passport.use(
  new LocalStrategy(authFields, async (email: String, password: string | Buffer, done: any) => {
    const user: any = await User.findOne({
      where: { email },
      include: [{ model: Player }, { model: Club }],
      attributes: {
        include: ['password'],
      },
    })
    if (!user) {
      return done(null, false)
    } else if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false)
    } else {
      return done(null, user)
    }
  }),
)

passport.use(
  new JwtStrategy(
    {
      secretOrKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: any) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    },
  ),
)
