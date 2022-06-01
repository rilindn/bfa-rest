import express from 'express'
import CommentController from '../../controllers/comment.controller'

const router = express.Router()

router.get('/:id', CommentController.getPostComments)

router.post('/', CommentController.createComment)

router.put('/:id', CommentController.updateComment)

router.delete('/:id', CommentController.deleteComment)

export default router
