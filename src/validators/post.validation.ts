import Joi from 'joi'

export const registerSchema = Joi.object({
  UserId: Joi.string().required().label('User ID'),
  content: Joi.string().min(2).required().label('Content'),
  media: Joi.string().allow(null).label('Media'),
})

export const updateSchema = Joi.object({
  postId: Joi.string().required().label('ID'),
  UserId: Joi.string().label('User ID'),
  content: Joi.string().min(2).label('Content'),
  media: Joi.string().allow(null).label('Media'),
})
