const { DataTypes } = require("sequelize");

const orderItemSchema = {

    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    dish_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
};

const createOrderItemModel = (sequelize) => {
    const orderItem = sequelize.define('orderItem', orderItemSchema, {

        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['order_id', 'dish_id']
            }
        ]
    });
    return orderItem;
};

module.exports = {
    createOrderItemModel
};