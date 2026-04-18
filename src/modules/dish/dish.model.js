const { DataTypes } = require("sequelize");
const dishSchema = {
    dish_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dish_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discription: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
};
const createDishModel = (sequelize) => {
    const dish = sequelize.define('dish', dishSchema);
    return dish;
};

module.exports = {
    createDishModel
};
