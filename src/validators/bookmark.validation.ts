import Joi from 'joi'

export const registerSchema = Joi.object({
  bookmarkerId: Joi.string().required().label('Bookmarker ID'),
  referencedPost: Joi.string().label('Referenced Post ID'),
  referencedPlayer: Joi.string().label('Reference Player ID'),
  referenceType: Joi.string().required().valid('Player', 'Post').label('Reference Type'),
}).or('referencedPost', 'referencedPlayer')
