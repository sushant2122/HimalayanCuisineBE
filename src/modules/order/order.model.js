const { DataTypes } = require("sequelize");

const orderSchema = {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Preparing', 'Completed', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Pending'
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    promo_code_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }
};

const createOrderModel = (sequelize) => {
    const order = sequelize.define('order', orderSchema, {
        // Optional: Add table name configuration if needed
        tableName: 'orders'
    });
    return order;
};

module.exports = {
    createOrderModel
};