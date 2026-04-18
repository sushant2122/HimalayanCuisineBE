//
//bulk creation in dishIngredient  in service 
//
//
const { dishIngredientSvc } = require("./dish_ingredient.service");
class DishIngredientController {

    index = async (req, res, next) => {
        try {
            let page = +req.query.page || 1;
            let limit = +req.query.limit || 10;
            let offset = (page - 1) * limit;

            let filter = {};


            const { list, total } = await dishIngredientSvc.listAllByFilter({ limit, offset, filter });


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
                message: "List all dish and ingredients.",
                status: "DISH_INGREDIENT_LIST_SUCCESS"
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
            const data = req.body;
            const dish_ingredient = await dishIngredientSvc.createDishIngredient(data);
            res.json({
                result: dish_ingredient,
                meta: null,
                message: "Dish and ingredient created successfully.",
                status: "DISH_INGREDIENT_CREATION_SUCCESS"
            });

        } catch (exception) {
            next(exception)
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
            const dish_ingredient = await dishIngredientSvc.getSingleDishIngredientData({ dish_id: id });
            res.json({
                result: dish_ingredient,
                meta: null,
                message: "Dish and ingredient details.",
                status: "DISH_INGREDIENT_FOUND"
            });
        } catch (exception) {
            next(exception)
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
            const dish_id = req.params.id;
            const ingredient_id = req.params.id2;
            const response = await dishIngredientSvc.deleteDishIngredientById(dish_id, ingredient_id);
            res.json({
                result: response,
                meta: null,
                message: "Dish and Ingredient deleted successfully.",
                status: "DISH_INGREDIENT_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }

}
const dishIngredientCtrl = new DishIngredientController();

module.exports = dishIngredientCtrl;