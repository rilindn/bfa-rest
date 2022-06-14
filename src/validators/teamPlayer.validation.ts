import Joi from 'joi'

export const registerSchema = Joi.object({
  TeamId: Joi.string().label('Team ID'),
  PlayerId: Joi.string().required().label('Player ID'),
  position: Joi.string().required().label('Position'),
})
