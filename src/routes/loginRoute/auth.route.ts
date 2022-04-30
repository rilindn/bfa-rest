import express from 'express'
import { login, logout } from '../../controllers/auth.controller'
import clubController from '../../controllers/club.controller'
import playerController from '../../controllers/player.controller'
import userController from '../../controllers/user.controller'

const authRoute = express.Router()

authRoute.post('/login', login)

authRoute.post('/logout', logout)

authRoute.post('/club', clubController.registerClub)

authRoute.post('/player', playerController.registerPlayer)

authRoute.post('/requestResetPassword', userController.requestResetPassword)

authRoute.post('/validateResetPasswordCode', userController.validateResetPasswordCode)

authRoute.put('/resetPassword/:userId', userController.resetPassword)

export default authRoute
