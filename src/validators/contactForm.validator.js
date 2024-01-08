import Joi from "joi";

const contactFormValidator = Joi.object({
    user_name: Joi.string().regex(/^[a-zA-ZА-яіІїЇёЁ\W]{1,30}$/).required().messages({
        'string.empty': "Поле не може бути пустим."
    }),
    user_email: Joi.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).required().trim(true).messages({
        'string.empty': "Поле не може бути пустим. Введіть ваш email",
        'string.pattern.base': "Введіть ваш email"
    }),
    user_phone: Joi.string().regex(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/).required().messages({
        'string.empty': "Введіть ваш номер телефону у форматі +380123456789",
        'string.pattern.base': "Введіть ваш номер телефону у форматі +380123456789"
    }),
    message: Joi.string().min(5).required().messages({
        'string.empty': "Введіть повідомлення. Мінімум 5 символів",
        'string.min': "Введіть повідомлення. Мінімум 5 символів"
    })
})

export {contactFormValidator};
