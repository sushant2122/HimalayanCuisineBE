
const { Dish } = require("../../config/db.config");
const { uploadHelper } = require("../../utilities/helper");


class DishService {

    transformDishData = async (req) => {
        const data = req.body;
        if (req.file) {
            data.image_url = await uploadHelper(req.file.path, 'dishes');
        }
        else {
            delete data.image_url
        }
        return data;
    }
    createDish = async (data) => {
        try {
            const newDish = await Dish.create(data);
            return newDish;
        } catch (exception) {
            throw exception;
        }

    }
    listAllByFilter = async ({ limit = 10, offset = 0, filter = {} }) => {
        try {
            const total = await Dish.count({
                where: filter
            });

            const list = await Dish.findAll({
                where: filter,
                order: [['createdAt', 'DESC']], // Sorting by createdAt descending
                limit: limit,
                offset: offset
            });

            return { list, total };
        } catch (exception) {
            throw exception;
        }
    };

    getSingleDishData = async (filter) => {
        try {
            const dishDetail = await Dish.findOne({
                where: filter,
            });

            if (!dishDetail) {
                throw ({ code: 404, message: "Dish does not exists.", status: "DISH_NOT_FOUND" });
            } else {
                return dishDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updateDish = async (id, data) => {
        try {
            // First, make sure the banner exists
            const dish = await Banner.findByPk(id);

            if (!dish) {
                throw { code: 400, message: "Dish not found", status: "DISH_NOT_FOUND" };
            }

            // Now update the banner with the new data
            const updatedDish = await Dish.update(data);

            return updatedDish;

        } catch (exception) {
            throw exception;
        }
    }
    deleteDishById = async (id) => {

        try {
            const result = await Dish.destroy({
                where: {
                    dish_id: id
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Dish already deleted or does not exists.", status: "DISH_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };




}
const dishSvc = new DishService();
module.exports = { dishSvc };