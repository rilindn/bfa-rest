import Joi from 'joi'
import { registerSchema, updateSchema } from './user.validation'

export const clubRegisterSchema = registerSchema.keys({
  clubName: Joi.string().min(2).max(30).required().label('Club name'),
  firstName: Joi.string().min(2).max(30).required().label('Firstname'),
  lastName: Joi.string().min(2).max(30).required().label('Lastname'),
  city: Joi.string().min(2).max(30).label('City'),
  isVerified: Joi.boolean().label('Is Verified'),
  clubLogo: Joi.string().label('Club Logo'),
  league: Joi.string().label('League'),
  leagueLevel: Joi.string().label('League level'),
})

export const clubUpdateSchema = updateSchema.keys({
  userId: Joi.string().required().label('ID'),
  clubName: Joi.string().min(2).max(30).label('Club name'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  city: Joi.string().min(2).max(30).label('City'),
  isVerified: Joi.boolean().label('Is Verified'),
  clubLogo: Joi.string().label('Club Logo'),
  league: Joi.string().label('League'),
  leagueLevel: Joi.string().label('League level'),
})
