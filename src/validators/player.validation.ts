import Joi from 'joi'
import { registerSchema, updateSchema } from './user.validation'

export const playerRegisterSchema = registerSchema.keys({
  firstName: Joi.string().required().min(2).max(50).label('Firstname'),
  lastName: Joi.string().required().min(2).max(50).label('Lastname'),
  gender: Joi.string().label('Gender').valid('Male', 'Female'),
  city: Joi.string().min(2).max(50).label('City'),
  zipCode: Joi.string().min(2).max(30).label('Zip Code'),
  placeOfBirth: Joi.string().min(2).max(50).label('Place of birth'),
  nationality: Joi.string().min(2).max(50).label('Nationality'),
  openForTransfer: Joi.bool().label('Open for transfer'),
  weight: Joi.number().min(30).max(150).label('Weight'),
  height: Joi.number().min(50).max(250).label('Height'),
  foot: Joi.string().label('Foot').valid('Left', 'Right', 'Both'),
  position: Joi.string().min(2).max(50).label('Position'),
  secondPosition: Joi.string().min(2).max(50).label('Second position'),
})

export const playerUpdateSchema = updateSchema.keys({
  userId: Joi.string().required().label('Player ID'),
  firstName: Joi.string().required().min(2).max(50).label('Firstname'),
  lastName: Joi.string().required().min(2).max(50).label('Lastname'),
  gender: Joi.string().label('Gender').valid('Male', 'Female'),
  city: Joi.string().min(2).max(50).label('City'),
  zipCode: Joi.string().min(2).max(30).label('Zip Code'),
  placeOfBirth: Joi.string().min(2).max(50).label('Place of birth'),
  nationality: Joi.string().min(2).max(50).label('Nationality'),
  openForTransfer: Joi.bool().label('Open for transfer'),
  weight: Joi.number().min(30).max(150).label('Weight'),
  height: Joi.number().min(50).max(250).label('Height'),
  foot: Joi.string().label('Foot').valid('Left', 'Right', 'Both'),
  position: Joi.string().min(2).max(50).label('Position'),
  secondPosition: Joi.string().min(2).max(50).label('Second position'),
})
