import Joi from "joi";

export const registerSchema = Joi.object({
    ClubId: Joi.string().required().label('Club ID'),
    PostId: Joi.string().required().label('Post ID'),
    PlayerId: Joi.string().required().label('Player ID'),
    referenceId: Joi.string().required().label('Reference ID'),
    referenceType: Joi.string().required().label('Reference Type'),
})

// export const updateSchema = Joi.object({
//     bookmarkId: Joi.string().required().label('Bookmark ID'),
//     ClubId: Joi.string().required().label('Club ID'),
//     PlayerId: Joi.string().required().label('Player ID'),
//     referenceId: Joi.string().required().label('Reference ID'),
//     referenceType: Joi.string().required().label('Reference Type'),
// })