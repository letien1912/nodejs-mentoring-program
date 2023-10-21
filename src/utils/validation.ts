import Joi from 'joi';

export const cartValidation = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
    items: Joi.array().items(
        Joi.object({
            product: Joi.object({
                id: Joi.string().guid({ version: 'uuidv4' }).required(),
                title: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().positive().required()
            }).required(),
            count: Joi.number().positive().required()
        })
    ).min(1).required()
});

