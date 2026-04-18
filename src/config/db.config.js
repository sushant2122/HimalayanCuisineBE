
const { Sequelize } = require("sequelize");
const { createRoleModel } = require("../modules/role/role.model");
const { createUserModel } = require("../modules/user/user.model");
const { seedRoles } = require("../seeding/role.seeding");
const { seedAdminUser } = require("../seeding/admin.seeding");
const { createDishModel } = require("../modules/dish/dish.model");
const { createIngredientModel } = require("../modules/ingredient/ingredient.model");
const { createTransactionModel } = require("../modules/transaction/transaction.model");
const { createPromoCodeModel } = require("../modules/promocode/promocode.model");
const { createCategoryModel } = require("../modules/category/category.model");
const { createOrderItemModel } = require("../modules/order_item/order_item.model");
const { createOrderModel } = require("../modules/order/order.model");
const { createDishIngredientModel } = require("../modules/dish_ingredient/dish_ingredient.model");
// const { createBannerModel } = require("../modules/banner/banner.model");

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: process.env.PG_DIALECT,
        logging: false,
    }
);


const Role = createRoleModel(sequelize);
const User = createUserModel(sequelize);
// const Banner = createBannerModel(sequelize);
const Dish = createDishModel(sequelize);
const Ingredient = createIngredientModel(sequelize);
const Dish_Ingredient = createDishIngredientModel(sequelize);
const Transaction = createTransactionModel(sequelize);
const Promocode = createPromoCodeModel(sequelize);
const Category = createCategoryModel(sequelize);
const order_Item = createOrderItemModel(sequelize);
const Order = createOrderModel(sequelize);

//defining relationship
// //relation defined for user and role
User.belongsTo(Role, { foreignKey: "role_title" });  // User belongs to Role
Role.hasMany(User, { foreignKey: "role_title" });    // Role has many Users

Dish.belongsTo(Dish_Ingredient, { foreignKey: "dish_id" });  // User belongs to Role
Dish_Ingredient.hasMany(Dish, { foreignKey: "dish_id" });    // Role has many Users

Ingredient.belongsTo(Dish_Ingredient, { foreignKey: "ingredient_id" });  // User belongs to Role
Dish_Ingredient.hasMany(Ingredient, { foreignKey: "ingredient_id" });    // Role has many Users

Dish.belongsTo(Category, { foreignKey: "category_id" });  // User belongs to Role
Category.hasMany(Dish, { foreignKey: "category_id" });    // Role has many Users

Order.belongsTo(order_Item, { foreignKey: "order_id" });  // User belongs to Role
order_Item.hasMany(Order, { foreignKey: "order_id" });    // Role has many Users


Order.belongsTo(Transaction, { foreignKey: "order_id" });  // User belongs to Role
Transaction.hasMany(Order, { foreignKey: "order_id" });    // Role has many Users



// //relation defined for user and banner
// Banner.belongsTo(User, { foreignKey: "created_by", as: "createdBy" }); // One Banner belongs to one User
// User.hasMany(Banner, { foreignKey: "created_by", as: "createdBy" });  // One User has many Banners


const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to PostgreSQL database.");

        // // Sync database
        await sequelize.sync();

        // // Seed database
        await seedRoles(Role);
        await seedAdminUser(User, Role);

        console.log("✅ Database synced and seeded.");
    } catch (error) {
        console.error("❌ Error connecting to PostgreSQL database:", error);
    }
};

initDb();


module.exports = {
    sequelize,
    User,
    Dish,
    Ingredient,
    Dish_Ingredient,
    Category,
    Order,
    order_Item,
    Promocode,
    Transaction
};
