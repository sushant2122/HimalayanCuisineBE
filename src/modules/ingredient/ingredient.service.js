
const { Ingredient } = require("../../config/db.config");

class IngredientService {

    createIngredient = async (data) => {
        try {
            const newIngredient = await Ingredient.create(data);
            return newIngredient;
        } catch (exception) {
            throw exception;
        }

    }
    listAllByFilter = async ({ limit = 10, offset = 0, filter = {} }) => {
        try {
            const total = await Ingredient.count({
                where: filter
            });

            const list = await Ingredient.findAll({
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

    getSingleIngredientData = async (filter) => {
        try {
            const ingredientDetail = await Ingredient.findOne({
                where: filter,
            });

            if (!ingredientDetail) {
                throw ({ code: 404, message: "Ingredient does not exists.", status: "INGREDIENT_NOT_FOUND" });
            } else {
                return ingredientDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updateIngredient = async (id, data) => {
        try {

            const ingredient = await Ingredient.findByPk(id);

            if (!ingredient) {
                throw { code: 400, message: "Ingredient not found", status: "INGREDIENT_NOT_FOUND" };
            }

            const updatedIngredient = await Ingredient.update(data);

            return updatedIngredient;

        } catch (exception) {
            throw exception;
        }
    }
    deleteIngredientById = async (id) => {

        try {
            const result = await Ingredient.destroy({
                where: {
                    ingredient_id: id
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Ingredient already deleted or does not exists.", status: "INGREDIENT_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };
}
const ingredientSvc = new IngredientService();
module.exports = { ingredientSvc };