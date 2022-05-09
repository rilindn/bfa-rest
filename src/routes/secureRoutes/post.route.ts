import express from 'express'
import PostController from '../../controllers/post.controller'

const router = express.Router()

router.get('/', PostController.getAllPosts)

router.get('/:id', PostController.getPostById)

router.get('/user/:id', PostController.getPostsByUserId)

router.post('/', PostController.createPost)

router.put('/:id', PostController.updatePost)

router.delete('/:id', PostController.deletePost)

export default router
