import express from 'express'

import passport from 'passport'
import { loggedUser } from '../../controllers/auth.controller'
import playerRouter from './player.route'
import userRouter from './user.route'
import clubRoutes from './club.route'
import postRoutes from './post.route'

const router = express.Router()

// get logged user saved in session
router.get('/loggedUser', passport.authenticate('jwt', { session: false }), loggedUser)

router.use('/player', playerRouter)
router.use('/user', userRouter)
router.use('/club', clubRoutes)
router.use('/post', postRoutes)

export default router
