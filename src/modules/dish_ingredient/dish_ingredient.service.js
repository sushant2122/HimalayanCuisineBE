
const { Ingredient, Dish, Dish_Ingredient } = require("../../config/db.config");

class DishIngredientService {

    createDishIngredient = async (data) => {
        try {
            const newDishIngredient = await Dish_Ingredient.create(data);
            return newDishIngredient;
        } catch (exception) {
            throw exception;
        }

    }
    listAllByFilter = async ({ limit = 10, offset = 0, filter = {} }) => {
        try {
            const total = await Dish_Ingredient.count({
                where: filter
            });

            const list = await Dish_Ingredient.findAll({
                where: filter,
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset
            });

            return { list, total };
        } catch (exception) {
            throw exception;
        }
    };

    getSingleDishIngredientData = async (filter) => {
        try {
            const dishingredientDetail = await Dish_Ingredient.findOne({
                where: filter,
                include: [
                    {
                        model: Dish,
                        attributes: ['dish_id', 'dish_name', 'price', 'description']
                    },
                    {
                        model: Ingredient,
                        attributes: ['ingredient_id', 'ingredient_name']
                    }
                ]
            });

            if (!dishingredientDetail) {
                throw ({ code: 404, message: "Dish and Ingredient does not exists.", status: "DISH_INGREDIENT_NOT_FOUND" });
            } else {
                return dishingredientDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    // updateDishIngredient = async (id, data) => {
    //     try {

    //         const dishIngredient = await Dish_Ingredient.findByPk(id);

    //         if (!dishIngredient) {
    //             throw { code: 400, message: "Dish and Ingredient not found", status: "DISH_INGREDIENT_NOT_FOUND" };
    //         }

    //         const updatedDishIngredient = await Dish_Ingredient.update(data);

    //         return updatedDishIngredient;

    //     } catch (exception) {
    //         throw exception;
    //     }
    // }
    deleteDishIngredientById = async (dishid, ingredientid) => {

        try {
            const result = await Dish_Ingredient.destroy({
                where: {
                    ingredient_id: ingredientid,
                    dish_id: dishid
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Dish and Ingredient already deleted or does not exists.", status: "DISH_INGREDIENT_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };
}
const dishIngredientSvc = new DishIngredientService();
module.exports = { dishIngredientSvc };