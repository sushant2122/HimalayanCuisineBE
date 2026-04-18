const Joi = require("joi");

const dishCreateDTO = Joi.object({
    dish_name: Joi.string().min(1).max(100).required(),
    category_id: Joi.number().integer().required(),
    discription: Joi.string().max(250).allow(null, '').optional(),
    price: Joi.number().precision(2).positive().required(),
    image_url: Joi.string().required(),
});

const dishUpdateDTO = Joi.object({
    dish_name: Joi.string().min(1).max(100).optional(),
    category_id: Joi.number().integer().optional(),
    discription: Joi.string().max(250).allow(null, '').optional(),
    price: Joi.number().precision(2).positive().optional(),
    image_url: Joi.string().optional(),//required(),
});

module.exports = { dishCreateDTO, dishUpdateDTO }