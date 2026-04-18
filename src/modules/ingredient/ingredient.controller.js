
const { Op } = require("sequelize");
const { ingredientSvc } = require("./ingredient.service");
class IngredientController {
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
                        { ingredient_name: { [Op.iLike]: `%${req.query.search}%` } },
                    ]
                };
            }

            const { list, total } = await ingredientSvc.listAllByFilter({ limit, offset, filter });


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
                message: "List all ingredients.",
                status: "INGREDIENT_LIST_SUCCESS"
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
            const ingredient = await ingredientSvc.createIngredient(data);
            res.json({
                result: ingredient,
                meta: null,
                message: "Ingredient created successfully.",
                status: "INGREDIENT_CREATION_SUCCESS"
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
            const ingredient = await ingredientSvc.getSingleIngredientData({ ingredient_id: id });
            res.json({
                result: ingredient,
                meta: null,
                message: "Ingredient details.",
                status: "INGREDIENT_FOUND"
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
            const data = req.body;
            const ingredient = await ingredientSvc.updateIngredient(id, data);
            res.json({
                result: ingredient,
                meta: null,
                message: "Ingredient updated successfully.",
                status: "INGREDIENT_UPDATE_SUCCESS"
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
            const id = req.params.id;
            const response = await ingredientSvc.deleteIngredientById(id);
            res.json({
                result: response,
                meta: null,
                message: "Ingredient deleted successfully.",
                status: "INGREDIENT_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }

}
const ingredientCtrl = new IngredientController();

module.exports = ingredientCtrl;