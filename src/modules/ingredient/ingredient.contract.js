const Joi = require("joi");

const ingredientCreateDTO = Joi.object({
    ingredient_name: Joi.string().min(1).max(100).required(),
});

const ingredientUpdateDTO = Joi.object({
    ingredient_name: Joi.string().min(1).max(100).required(),
});

module.exports = { ingredientCreateDTO, ingredientUpdateDTO }