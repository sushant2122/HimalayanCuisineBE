const Joi = require("joi");

const categoryCreateDTO = Joi.object({
    category_name: Joi.string().min(1).max(100).required(),
});

const categoryUpdateDTO = Joi.object({
    category_name: Joi.string().min(1).max(100).required(),
});

module.exports = { categoryCreateDTO, categoryUpdateDTO }