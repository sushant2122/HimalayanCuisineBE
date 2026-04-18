
const { Category } = require("../../config/db.config");

class CategoryService {

    createCategory = async (data) => {
        try {
            const newCategory = await Category.create(data);
            return newCategory;
        } catch (exception) {
            throw exception;
        }

    }
    listAllByFilter = async ({ limit = 10, offset = 0, filter = {} }) => {
        try {
            const total = await Category.count({
                where: filter
            });

            const list = await Category.findAll({
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

    getSingleCategoryData = async (filter) => {
        try {
            const categoryDetail = await Category.findOne({
                where: filter,
            });

            if (!categoryDetail) {
                throw ({ code: 404, message: "Category does not exists.", status: "CATEGORY_NOT_FOUND" });
            } else {
                return categoryDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updateCategory = async (id, data) => {
        try {

            const category = await Category.findByPk(id);

            if (!category) {
                throw { code: 400, message: "Category not found", status: "CATEGORY_NOT_FOUND" };
            }

            const updatedCategory = await Category.update(data);

            return updatedCategory;

        } catch (exception) {
            throw exception;
        }
    }
    deleteCategoryById = async (id) => {

        try {
            const result = await Category.destroy({
                where: {
                    category_id: id
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Category already deleted or does not exists.", status: "CATEGORY_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };
}
const categorySvc = new CategoryService();
module.exports = { categorySvc };