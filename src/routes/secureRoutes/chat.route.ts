import express from 'express'
import ChatController from '../../controllers/chat.controller'

const router = express.Router()

router.get('/:id', ChatController.getMyChats)

router.post('/:id', ChatController.newMessage)

router.post('/', ChatController.createChat)

router.delete('/:id', ChatController.deleteChat)

export default router
