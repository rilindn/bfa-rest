import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model'
import _ from 'lodash'
import trimObjectValues from '../helpers/trimObjectValues'
import Player from '../models/player.model'
import Club from '../models/club.model'

dotenv.config()
const jwt = jsonwebtoken

const login = async (req: any, res: any, next: any) => {
  req.body = trimObjectValues(req.body)
  passport.authenticate('local', async (err: any, user: any) => {
    try {
      if (err || !user) {
        return res.status(401).send('Invalid credentials! Please try again!')
      }
      req.login(user, { session: false }, async (error: any) => {
        if (error) return next(error)
        const body = { userID: user?.id }
        const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET || '')
        const { password, ...data } = user.dataValues // don't send password field in response
        return res.json({ token, ...data })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}

const loggedUser = async (req: any, res: any) => {
  try {
    const user = await User.findByPk(req.user.userID, { include: [{ model: Player }, { model: Club }] })
    res.send({ user })
  } catch (error) {
    res.status(500).send(error)
  }
}

const logout = (req: any, res: any) => {
  try {
    req.logout()
    res.send('Logged out succesfully!')
  } catch (error) {
    res.status(500).send(error)
  }
}

export { login, loggedUser, logout }
