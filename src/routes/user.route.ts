import express from 'express'
import UserController from '../controllers/user.controller'

const router = express.Router()

// GET - users
router.get('/', UserController.getAllUsers)

// GET - users/:id
router.get('/:id', UserController.getUserById)

// POST - users
router.post('/', UserController.registerUser)

// PUT - users/:id
router.put('/:id', UserController.updateUser)

// DELETE - users/:id
router.delete('/:id', UserController.deleteUser)

export default router
