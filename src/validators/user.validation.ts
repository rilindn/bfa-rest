import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(7).max(30).required().label('Password'),
  birthDate: Joi.string().label('Birthdate'),
  role: Joi.string().required().valid('Player', 'Club', 'Admin').label('Role'),
  status: Joi.string().label('Status').valid('Active', 'Inactive'),
  profilePic: Joi.string().min(2).label('Profile picture'),
})

export const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  email: Joi.string().email().label('Email'),
  password: Joi.string().min(7).max(30).label('Password'),
  birthDate: Joi.string().label('Birthdate'),
  role: Joi.string().valid('Player', 'Club', 'Admin').label('Role'),
  status: Joi.string().label('Status').valid('Active', 'Inactive'),
  profilePic: Joi.string().min(2).label('Profile picture'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
})

export const passwordChangeSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  oldPassword: Joi.string().required().min(7).max(30).label('Old Password'),
  newPassword: Joi.string().required().min(7).max(30).label('New Password'),
})
