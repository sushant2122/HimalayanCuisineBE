const Joi = require("joi");

const dishIngredientCreateDTO = Joi.object({
    dish_id: Joi.number().integer().positive().required(),
    ingredient_id: Joi.number().integer().positive().required()
});

const dishIngredientUpdateDTO = Joi.object({
    dish_id: Joi.number().integer().positive().optional(),
    ingredient_id: Joi.number().integer().positive().optional()
});


module.exports = {
    dishIngredientCreateDTO,
    dishIngredientUpdateDTO

};