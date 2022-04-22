import Joi from 'joi'

export const registerSchema = Joi.object({
  fullName: Joi.string().required().min(2).max(70).label('Fullname'),
  gender: Joi.string().label('Gender').valid('Male', 'Female'),
  city: Joi.string().min(2).max(50).label('City'),
  zipCode: Joi.string().min(2).max(30).label('Zip Code'),
  status: Joi.string().required().label('Status').valid('Active', 'Inactive'),
  placeOfBirth: Joi.string().min(2).max(50).label('Place of birth'),
  nationality: Joi.string().min(2).max(50).label('Nationality'),
  openForTransfer: Joi.bool().label('Open for transfer'),
  weight: Joi.number().min(30).max(150).label('Weight'),
  height: Joi.number().min(50).max(250).label('Height'),
  foot: Joi.string().label('Foot').valid('Left', 'Right', 'Both'),
  position: Joi.string().min(2).max(50).label('Position'),
  secondPosition: Joi.string().min(2).max(50).label('Second position'),
})

export const updateSchema = Joi.object({
  playerId: Joi.string().required().label('Player ID'),
  fullName: Joi.string().min(2).max(70).label('Fullname'),
  gender: Joi.string().label('Gender').valid('Male', 'Female'),
  city: Joi.string().min(2).max(50).label('City'),
  zipCode: Joi.string().min(2).max(30).label('Zip Code'),
  status: Joi.string().required().label('Status').valid('Active', 'Inactive'),
  placeOfBirth: Joi.string().min(2).max(50).label('Place of birth'),
  nationality: Joi.string().min(2).max(50).label('Nationality'),
  openForTransfer: Joi.bool().label('Open for transfer'),
  weight: Joi.number().min(30).max(150).label('Weight'),
  height: Joi.number().min(50).max(250).label('Height'),
  foot: Joi.string().label('Foot').valid('Left', 'Right', 'Both'),
  position: Joi.string().min(2).max(50).label('Position'),
  secondPosition: Joi.string().min(2).max(50).label('Second position'),
})
