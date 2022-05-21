import express from 'express'

import passport from 'passport'
import { loggedUser } from '../../controllers/auth.controller'
import playerRouter from './player.route'
import userRouter from './user.route'
import clubRoutes from './club.route'
import postRoutes from './post.route'
import followRoutes from './follow.route'
import likeRoutes from './like.route'

const router = express.Router()

// get logged user saved in session
router.get('/loggedUser', passport.authenticate('jwt', { session: false }), loggedUser)

router.use('/player', playerRouter)
router.use('/user', userRouter)
router.use('/club', clubRoutes)
router.use('/post', postRoutes)
router.use('/follow', followRoutes)
router.use('/like', likeRoutes)

export default router
