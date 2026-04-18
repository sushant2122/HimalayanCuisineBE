const { DataTypes } = require("sequelize");
const ingredientSchema = {
    ingredient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ingredient_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
};
const createIngredientModel = (sequelize) => {
    const ingredient = sequelize.define('ingredient', ingredientSchema);
    return ingredient;
};

module.exports = {
    createIngredientModel
};
