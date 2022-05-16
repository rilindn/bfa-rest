import express from 'express'
import FollowController from '../../controllers/follow.controller'

const router = express.Router()

router.get('/followers/:id', FollowController.getMyFollowers)

router.get('/followings/:id', FollowController.getMyFollowings)

router.get('/checkFollow/:followerId/:followedId', FollowController.checkFollow)

router.get('/suggestions/:id', FollowController.getFollowSuggestions)

router.post('/', FollowController.createFollow)

router.delete('/:followerId/:followedId', FollowController.unFollow)

export default router
