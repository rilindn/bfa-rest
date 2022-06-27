import Joi from 'joi'

export const registerSchema = Joi.object({
  reporterId: Joi.string().required().label('Reporter ID'),
  postId: Joi.string().required().label('Post ID'),
  reason: Joi.string().required().label('Reason'),
})
