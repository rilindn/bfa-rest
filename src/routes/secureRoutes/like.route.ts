import express from 'express'
import LikeController from '../../controllers/like.controller'

const router = express.Router()

router.get('/:id', LikeController.getPostLikes)

router.post('/', LikeController.likePost)

router.post('/check', LikeController.checkIfLiked)

router.post('/unlike', LikeController.unlikePost)

export default router
