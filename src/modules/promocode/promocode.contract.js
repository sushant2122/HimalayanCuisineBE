const Joi = require("joi");

const promoCodeCreateDTO = Joi.object({
    code: Joi.string().min(3).max(50).required(),
    discount_type: Joi.string().valid('Percentage', 'Fixed').required(),
    discount_value: Joi.number().positive().precision(2).required(),
    min_order_amount: Joi.number().precision(2).min(0).default(0),
    expiration_date: Joi.date().greater('now').required(),
    usage_limit: Joi.number().integer().positive().allow(null),
    is_active: Joi.boolean().default(true)
});

const promoCodeUpdateDTO = Joi.object({
    code: Joi.string().min(3).max(50).optional(),
    discount_type: Joi.string().valid('Percentage', 'Fixed').optional(),
    discount_value: Joi.number().positive().precision(2).optional(),
    min_order_amount: Joi.number().precision(2).min(0).optional(),
    expiration_date: Joi.date().greater('now').optional(),
    usage_limit: Joi.number().integer().positive().allow(null).optional(),
    is_active: Joi.boolean().optional()
});

module.exports = { promoCodeCreateDTO, promoCodeUpdateDTO }