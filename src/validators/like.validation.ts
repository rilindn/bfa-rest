import Joi from 'joi'

export const registerSchema = Joi.object({
  UserId: Joi.string().required().label('User Id'),
  PostId: Joi.string().required().label('Post Id'),
})
