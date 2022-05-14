import express from 'express'
import FollowController from '../../controllers/follow.controller'

const router = express.Router()

router.get('/followers/:id', FollowController.getMyFollowers)

router.get('/followings/:id', FollowController.getMyFollowings)

router.post('/', FollowController.createFollow)

export default router
