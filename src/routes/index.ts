import express from 'express'
import userRoutes from './user.route'
import playerRoutes from './player.route'
import clubRoutes from './club.route'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/club', clubRoutes)
router.use('/player', playerRoutes)

export default router
