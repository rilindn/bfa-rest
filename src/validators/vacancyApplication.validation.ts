import Joi from 'joi'

export const registerSchema = Joi.object({
  UserId: Joi.string().required().label('Club ID'),
  VacancyId: Joi.string().required().label('Vacancy ID'),
  status: Joi.string().label('Foot').valid('Accepted', 'Rejected', 'Pending'),
  description: Joi.string().allow('').label('Description'),
})

export const updateSchema = Joi.object({
  applicationId: Joi.string().required().label('Application ID'),
  status: Joi.string().label('Foot').valid('Accepted', 'Rejected', 'Pending'),
  description: Joi.string().allow('').label('Description'),
})
