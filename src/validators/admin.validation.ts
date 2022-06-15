import Joi from 'joi'
import { registerSchema, updateSchema } from './user.validation'

export const adminRegisterSchema = registerSchema.keys({
  firstName: Joi.string().min(2).max(30).required().label('Firstname'),
  lastName: Joi.string().min(2).max(30).required().label('Lastname'),
  isSuperAdmin: Joi.bool(),
})

export const adminUpdateSchema = updateSchema.keys({
  userId: Joi.string().required().label('ID'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  isSuperAdmin: Joi.bool(),
})
