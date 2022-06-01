import Joi from 'joi'

export const registerSchema = Joi.object({
  UserId: Joi.string().required().label('User Id'),
  PostId: Joi.string().required().label('Post Id'),
  content: Joi.string().required().label('Comment'),
})

export const updateSchema = Joi.object({
  commentId: Joi.string().required().label('Comment Id'),
  UserId: Joi.string().label('User Id'),
  PostId: Joi.string().label('Post Id'),
  content: Joi.string().label('Comment'),
})
