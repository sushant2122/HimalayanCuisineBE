const { fileDelete } = require("../../utilities/helper");
const { Op } = require("sequelize"); // Import Sequelize operators
const { dishSvc } = require("./dish.service");
class DishController {
    /**
     *  * this function is used to show the banners by logged in user
     * @param {import ("express").Request} req 
     *  * @param {import ("express").Response} res
     *  * @param {import ("express").NextFunction} next
     * @return {void} 
    
     */
    index = async (req, res, next) => {
        try {
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let offset = (page - 1) * limit; // `offset` in Sequelize is equivalent to `skip`

            let filter = {};

            if (req.query.search) {
                filter = {
                    ...filter,
                    [Op.or]: [
                        { dish_name: { [Op.iLike]: `%${req.query.search}%` } }, // Case-insensitive LIKE search
                    ]
                };
            }


            // Fetch the list and total count of banners
            const { list, total } = await dishSvc.listAllByFilter({ limit, offset, filter });

            // Check if the requested page exceeds the total available pages
            const totalPages = Math.ceil(total / limit);
            if (page > totalPages) {
                return next({
                    code: 404,
                    message: "No data to load for the requested page.",
                    status: "PAGINATION_ERROR"
                });
            }

            res.json({
                result: list,
                meta: {
                    limit,
                    page,
                    total,
                    totalpages: totalPages
                },
                message: "List all dishes.",
                status: "DISH_LIST_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };


    /**
     *  * this function is to create banners by logged in user
     * @param {import ("express").Request} req 
     *  * @param {import ("express").Response} res
     *  * @param {import ("express").NextFunction} next
     * @return {void} 
    
     */
    store = async (req, res, next) => {
        try {
            const data = await dishSvc.transformDishData(req);
            const dish = await dishSvc.createDish(data);
            res.json({
                result: dish,
                meta: null,
                message: "Dish created successfully.",
                status: "DISH_CREATION_SUCCESS"
            });

        } catch (exception) {
            next(exception)

        } finally {
            if (req.file) {
                fileDelete(req.file.path);
            }
        }

    }
    /**
     *  this function is used to show the details of the banner by logged in user
     * @param {import ("express").Request} req 
     *  * @param {import ("express").Response} res
     *  * @param {import ("express").NextFunction} next
     * @return {void} 
    
     */
    show = async (req, res, next) => {
        try {
            const id = req.params.id;
            const dish = await dishSvc.getSingleDishData({ dish_id: id });
            res.json({
                result: dish,
                meta: null,
                message: "Dish details.",
                status: "DISH_FOUND"
            });
        } catch (exception) {
            next(exception)
        }
    }
    /**
     *  this function is used to update a banner data by the logged in admin user
     * @param {import ("express").Request} req 
     *  * @param {import ("express").Response} res
     *  * @param {import ("express").NextFunction} next
     * @return {void} 
    
     */
    update = async (req, res, next) => {
        try {

            const id = req.params.id;
            const data = await dishSvc.transformDishData(req);
            const dish = await dishSvc.updateDish(id, data);
            res.json({
                result: dish,
                meta: null,
                message: "Dish updated successfully.",
                status: "DISH_UPDATE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        } finally {
            if (req.file) {
                fileDelete(req.file.path);
            }
        }
    }
    /**
     *  this function is used to remove  a banner  by the logged in admin user
     * @param {import ("express").Request} req 
     *  * @param {import ("express").Response} res
     *  * @param {import ("express").NextFunction} next
     * @return {void} 
    
     */
    remove = async (req, res, next) => {
        try {
            const id = req.params.id;
            const response = await dishSvc.deleteDishById(id);
            res.json({
                result: response,
                meta: null,
                message: "Dish deleted successfully.",
                status: "DISH_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }
}
const dishCtrl = new DishController();

module.exports = dishCtrl;