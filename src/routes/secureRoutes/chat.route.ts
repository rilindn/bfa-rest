import express from 'express'
import ChatController from '../../controllers/chat.controller'

const router = express.Router()

router.get('/:id', ChatController.getMyChats)

router.get('/byId/:id', ChatController.getChatById)

router.post('/:id', ChatController.newMessage)

router.post('/', ChatController.createChat)

router.delete('/:id', ChatController.deleteChat)

router.delete('/:id/:messageId', ChatController.deleteMessage)

export default router
