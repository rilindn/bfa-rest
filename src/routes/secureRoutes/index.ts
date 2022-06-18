import express from 'express'

import passport from 'passport'
import { loggedUser } from '../../controllers/auth.controller'
import playerRouter from './player.route'
import userRouter from './user.route'
import clubRoutes from './club.route'
import adminRoutes from './admin.route'
import postRoutes from './post.route'
import followRoutes from './follow.route'
import likeRoutes from './like.route'
import commentRoutes from './comment.route'
import chatRoutes from './chat.route'
import vacancyRoutes from './vacancy.route'
import vacancyApplicationRoutes from './vacancyApplication.route'
import teamRoutes from './team.route'
import bookmarkRoutes from './bookmark.route'

const router = express.Router()

// get logged user saved in session
router.get('/loggedUser', passport.authenticate('jwt', { session: false }), loggedUser)

router.use('/user', userRouter)
router.use('/player', playerRouter)
router.use('/club', clubRoutes)
router.use('/admin', adminRoutes)
router.use('/post', postRoutes)
router.use('/follow', followRoutes)
router.use('/like', likeRoutes)
router.use('/comment', commentRoutes)
router.use('/chat', chatRoutes)
router.use('/vacancy', vacancyRoutes)
router.use('/vacancy-application', vacancyApplicationRoutes)
router.use('/team', teamRoutes)
router.use('/bookmark', bookmarkRoutes)

export default router
