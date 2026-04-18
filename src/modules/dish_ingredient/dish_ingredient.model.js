const { DataTypes } = require("sequelize");

const dishIngredientSchema = {

    dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ingredient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

};

const createDishIngredientModel = (sequelize) => {
    const dishIngredient = sequelize.define('dish_ingredients', dishIngredientSchema, {

        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['dish_id', 'ingredient_id']
            }
        ]
    });
    return dishIngredient;
};

module.exports = {
    createDishIngredientModel
};