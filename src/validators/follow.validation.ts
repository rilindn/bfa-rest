import Joi from 'joi'

export const registerSchema = Joi.object({
  followerId: Joi.string().required().label('Follower ID'),
  followedId: Joi.string().required().label('Followed user ID'),
})
