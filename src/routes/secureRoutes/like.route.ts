import express from 'express'
import LikeController from '../../controllers/like.controller'

const router = express.Router()

router.get('/:id', LikeController.getPostLikes)

router.post('/', LikeController.createLike)

router.delete('/:id', LikeController.removeLike)

export default router
