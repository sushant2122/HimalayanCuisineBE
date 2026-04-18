const { DataTypes } = require("sequelize");

const transactionSchema = {
    transaction_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payment_method: {
        type: DataTypes.ENUM('Cash', 'Card', 'Online'),
        allowNull: false
    },
    payment_status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Failed'),
        allowNull: false
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
};

const createTransactionModel = (sequelize) => {
    const transaction = sequelize.define('transaction', transactionSchema);
    return transaction;
};

module.exports = {
    createTransactionModel
};