import Joi from "joi";

export const registerSchema = Joi.object({
    likeId: Joi.string().required().label('Like Id'),
})