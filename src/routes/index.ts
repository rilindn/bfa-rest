import express from 'express'
import userRoutes from './user.route'
import playerRoutes from './player.route'

const router = express.Router()

router.use('/user', userRoutes)

router.use('/player', playerRoutes)

export default router
