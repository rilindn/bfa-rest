import express from 'express'
import LikeController from '../../controllers/like.controller'

const router = express.Router()

router.get('/', LikeController.getAllLikes)

router.get('/:id', LikeController.getLikeById)

router.post('/', LikeController.createLike)

router.delete('/:id', LikeController.removeLike)

export default router