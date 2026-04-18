const { DataTypes } = require("sequelize");
const categorySchema = {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
};
const createCategoryModel = (sequelize) => {
    const category = sequelize.define('category', categorySchema);
    return category;
};

module.exports = {
    createCategoryModel
};
