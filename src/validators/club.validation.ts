import Joi from 'joi'

export const registerSchema = Joi.object({
  clubName: Joi.string().min(2).max(30).required().label('Club name'),
  city: Joi.string().required().min(2).max(30).label('City'),
  isVerified: Joi.boolean().required().label('Is Verified'),
  clubLogo: Joi.string().required().label('Club Logo'),
})

export const updateSchema = Joi.object({
  clubId: Joi.string().required().label('ID'),
  clubName: Joi.string().min(2).max(30).label('Club name'),
  city: Joi.string().min(2).max(30).label('City'),
  isVerified: Joi.boolean().label('Is Verified'),
  clubLogo: Joi.string().label('Club Logo'),
})
