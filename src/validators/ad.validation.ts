import Joi from 'joi'

export const registerSchema = Joi.object({
  title: Joi.string().required().label('Title'),
  description: Joi.string().required().label('description'),
  url: Joi.string().required().label('URL'),
  image: Joi.string().required().label('Image'),
  active: Joi.boolean().label('Active'),
  order: Joi.number().label('Order'),
  views: Joi.number().label('Views'),
  clicks: Joi.number().label('Clicks'),
})

export const updateSchema = Joi.object({
  adId: Joi.string().required().label('ID'),
  title: Joi.string().label('Title'),
  description: Joi.string().label('description'),
  url: Joi.string().label('URL'),
  image: Joi.string().label('Image'),
  active: Joi.boolean().label('Active'),
  order: Joi.number().label('Order'),
  views: Joi.number().label('Views'),
  clicks: Joi.number().label('Clicks'),
})
