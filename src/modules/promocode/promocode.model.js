const { DataTypes } = require("sequelize");

const promoCodeSchema = {
    promo_code_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    discount_type: {
        type: DataTypes.ENUM('Percentage', 'Fixed'),
        allowNull: false
    },
    discount_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    min_order_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usage_limit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
};

const createPromoCodeModel = (sequelize) => {
    const promoCode = sequelize.define('promoCode', promoCodeSchema);
    return promoCode;
};

module.exports = {
    createPromoCodeModel
};