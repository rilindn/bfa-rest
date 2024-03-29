import Joi from 'joi'

export const registerSchema = Joi.object({
  ClubId: Joi.string().required().label('Club ID'),
  about: Joi.string().label('About'),
  height: Joi.number().min(50).max(250).label('Height'),
  foot: Joi.string().label('Foot').valid('Left', 'Right', 'Both'),
  position: Joi.string().required().label('Position'),
  ageFrom: Joi.number().min(15).max(45).label('Age From'),
  ageTo: Joi.number().min(15).max(45).label('Age To'),
})

export const updateSchema = Joi.object({
  vacancyId: Joi.string().required().label('Vacancy ID'),
  ClubId: Joi.string().label('Club ID'),
  about: Joi.string().label('About'),
  height: Joi.number().min(50).max(250).label('Height'),
  foot: Joi.string().label('Foot').valid('Left', 'Right', 'Both'),
  position: Joi.string().label('Position'),
  ageFrom: Joi.number().min(15).max(45).label('Age From'),
  ageTo: Joi.number().min(15).max(45).label('Age To'),
})
