import Joi from 'joi'
import { registerSchema, updateSchema } from './user.validation'

export const clubRegisterSchema = registerSchema.keys({
  clubName: Joi.string().min(2).max(30).required().label('Club name'),
  city: Joi.string().required().min(2).max(30).label('City'),
  isVerified: Joi.boolean().required().label('Is Verified'),
  clubLogo: Joi.string().required().label('Club Logo'),
})

export const clubUpdateSchema = updateSchema.keys({
  userId: Joi.string().required().label('ID'),
  clubName: Joi.string().min(2).max(30).label('Club name'),
  city: Joi.string().min(2).max(30).label('City'),
  isVerified: Joi.boolean().label('Is Verified'),
  clubLogo: Joi.string().label('Club Logo'),
})
