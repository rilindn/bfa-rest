import Joi from 'joi'

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label('Name'),
})

export const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  name: Joi.string().min(2).max(30).label('Name'),
})
