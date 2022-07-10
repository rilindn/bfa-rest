import Joi from 'joi'

export const registerSchema = Joi.object({
  title: Joi.string().required().label('Title'),
  description: Joi.string().required().label('description'),
  image: Joi.string().required().label('Image'),
  active: Joi.boolean().label('Active'),
  views: Joi.number().label('Views'),
  clicks: Joi.number().label('Clicks'),
})

export const updateSchema = Joi.object({
  adId: Joi.string().required().label('ID'),
  title: Joi.string().label('Title'),
  description: Joi.string().label('description'),
  image: Joi.string().label('Image'),
  active: Joi.boolean().label('Active'),
  views: Joi.number().label('Views'),
  clicks: Joi.number().label('Clicks'),
})
