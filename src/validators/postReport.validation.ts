import Joi from 'joi'

export const registerSchema = Joi.object({
  postReporterId: Joi.string().required().label('Post Reporter ID'),
  reporterId: Joi.string().label('Reporter ID'),
  postId: Joi.string().label('Post ID'),
  reason: Joi.string().required().label('Reason'),
})
