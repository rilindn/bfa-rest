import { newChatSchema, newMessageSchema } from '../validators/chat.validation'
import { Request, Response } from 'express'
import Chat from '../models/chat.model'
import User from '../models/user.model'
import Player from '../models/player.model'
import Club from '../models/club.model'
import Sequelize from 'sequelize'

const Op = Sequelize.Op

const getMyChats = async (req: Request, res: Response) => {
  const id = req.params.id
  const query: any = req.query.q || ''
  const search = query?.toLowerCase()
  try {
    const chats = await Chat.find({
      $or: [{ firstUser: id }, { secondUser: id }],
    })

    if (!chats) return res.status(404).send('No chats found!')
    const users = await Promise.all(
      chats.map(async (chat: any) => {
        const otherUserId = chat?.firstUser !== id ? chat?.firstUser : chat?.secondUser
        const user = await User.findOne({
          where: {
            [Op.or]: [
              { '$Player.firstName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Player.firstName')), 'LIKE', '%' + search + '%') },
              { '$Player.lastName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Player.lastName')), 'LIKE', '%' + search + '%') },
              { '$Club.clubName$': Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Club.clubName')), 'LIKE', '%' + search + '%') },
            ],
            id: otherUserId,
          },
          include: [{ model: Player }, { model: Club }],
        })
        return { chat, user }
      }),
    )
    return res.send(users.filter(Boolean))
  } catch (error) {
    return res.status(500).send(error)
  }
}

const createChat = async (req: Request, res: Response) => {
  const validationResult = newChatSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }
  try {
    const newChat = new Chat({ ...req.body })
    await newChat.save()
    return res.send(newChat)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const newMessage = async (req: Request, res: Response) => {
  const id = req.params.id

  const validationResult = newMessageSchema.validate({ ...req.body })

  if (validationResult.error) {
    const errorMsg = validationResult.error.details[0].message
    return res.status(400).send(errorMsg)
  }

  try {
    const chat = await Chat.findById(id)
    if (!chat) return res.status(404).send('Chat not found!')

    chat.messages.push({ ...req.body })
    await chat.save()

    res.status(200).send(chat)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const deleteChat = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const deletedChat = await Chat.findByIdAndDelete(id)
    if (!deletedChat) return res.status(404).send('Chat not found!')
    res.status(200).send(deletedChat)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default { getMyChats, createChat, newMessage, deleteChat }
