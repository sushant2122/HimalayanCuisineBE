
const { Op } = require("sequelize"); // Import Sequelize operators
const { promoSvc } = require("./promocode.service");
class PromoController {
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
                        { code: { [Op.iLike]: `%${req.query.search}%` } },
                    ]
                };
            }

            if (req.query.status !== undefined) {
                const status = req.query.status === 'true' ? true : req.query.status === 'false' ? false : undefined;
                if (status !== undefined) {
                    filter.is_active = status;
                }
            }

            const { list, total } = await promoSvc.listAllByFilter({ limit, offset, filter });


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
                message: "List all promocodes.",
                status: "PROMO_CODE_LIST_SUCCESS"
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
            const promo = await promoSvc.createPromo(data);
            res.json({
                result: promo,
                meta: null,
                message: "Promocode created successfully.",
                status: "PROMO_CODE_CREATION_SUCCESS"
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
            const promo = await promoSvc.getSinglePromoData({ promo_code_id: id });
            res.json({
                result: promo,
                meta: null,
                message: "Promocode details.",
                status: "PROMO_CODE_FOUND"
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
            const promo = await promoSvc.updatePromo(id, data);
            res.json({
                result: promo,
                meta: null,
                message: "PromoCode updated successfully.",
                status: "PROMO_CODE_UPDATE_SUCCESS"
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
            const response = await promoSvc.deletePromoById(id);
            res.json({
                result: response,
                meta: null,
                message: "Promocode deleted successfully.",
                status: "PROMO_CODE_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }

}
const promoCtrl = new PromoController();

module.exports = promoCtrl;