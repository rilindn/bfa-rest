import express from 'express'
import UserController from '../../controllers/user.controller'

const router = express.Router()

router.get('/', UserController.getAllUsers)

router.get('/search', UserController.getFilteredUsers)

router.get('/:id', UserController.getUserById)

router.post('/', UserController.registerUser)

router.put('/changePassword/:userId', UserController.changePassword)

router.put('/:id', UserController.updateUser)

router.delete('/:id', UserController.deleteUser)

export default router
