import Joi from 'joi'

export const newChatSchema = Joi.object({
  firstUser: Joi.string().required().label('First User ID'),
  secondUser: Joi.string().required().label('Second User ID'),
})

export const newMessageSchema = Joi.object({
  sender: Joi.string().required().label('Sender ID'),
  receiver: Joi.string().required().label('Receiver ID'),
  content: Joi.string().required().label('Content'),
})
