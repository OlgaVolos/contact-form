import Joi from "joi";

const contactFormValidator = Joi.object({
    user_name: Joi.string().regex(/^[a-zA-ZА-яіІїЇёЁ\W]{1,30}$/).required().messages({
        'string.empty': "Enter your name"
    }),
    user_email: Joi.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).required().trim(true).messages({
        'string.empty': "Enter your email",
        'string.pattern.base': "Enter your email"
    }),
    user_phone: Joi.string().regex(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/).required().messages({
        'string.empty': "Enter your phone",
        'string.pattern.base': "Enter your phone"
    }),
    message: Joi.string().min(5).max(300).messages({
        'string.empty': "Enter your message",
        'string.min': "Enter your message",
        'string.max': "Message too long!",

    })
})

export {contactFormValidator};
