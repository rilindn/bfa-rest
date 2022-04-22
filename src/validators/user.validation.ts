import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(7).max(30).required().label('Password'),
  birthDate: Joi.string().label('Birthdate'),
  role: Joi.string().required().valid('Player', 'Club').label('Role'),
  profilePic: Joi.string().min(2).label('Profile picture'),
})

export const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(7).max(30).required().label('Password'),
  birthDate: Joi.string().label('Birthdate'),
  role: Joi.string().required().valid('Player', 'Club').label('Role'),
  profilePic: Joi.string().min(2).label('Profile picture'),
})
