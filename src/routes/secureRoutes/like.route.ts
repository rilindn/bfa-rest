import express from 'express'
import LikeController from '../../controllers/like.controller'

const router = express.Router()

router.get('/', LikeController.getAllLikes)

router.get('/', LikeController.createLike)

router.get('/:id', LikeController.removeLike)

export default router