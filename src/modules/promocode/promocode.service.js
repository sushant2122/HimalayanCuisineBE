
const { Promocode } = require("../../config/db.config");

class PromoCodeService {

    createPromo = async (data) => {
        try {
            const newPromo = await Promocode.create(data);
            return newPromo;
        } catch (exception) {
            throw exception;
        }

    }
    listAllByFilter = async ({ limit = 10, offset = 0, filter = {} }) => {
        try {
            const total = await Promocode.count({
                where: filter
            });

            const list = await Promocode.findAll({
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

    getSinglePromoData = async (filter) => {
        try {
            const promoDetail = await Promocode.findOne({
                where: filter,
            });

            if (!promoDetail) {
                throw ({ code: 404, message: "Promocode does not exists.", status: "PROMOCODE_NOT_FOUND" });
            } else {
                return promoDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updatePromo = async (id, data) => {
        try {
            // First, make sure the banner exists
            const promo = await Promocode.findByPk(id);

            if (!promo) {
                throw { code: 400, message: "Promo not found", status: "PROMO_NOT_FOUND" };
            }

            // Now update the banner with the new data
            const updatedPromo = await Promo.update(data);

            return updatedPromo;

        } catch (exception) {
            throw exception;
        }
    }
    deletePromoById = async (id) => {

        try {
            const result = await Promocode.destroy({
                where: {
                    promo_code_id: id
                }
            });

            if (result === 0) {
                throw { code: 404, message: "PromoCode already deleted or does not exists.", status: "PROMO_CODE_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };




}
const promoSvc = new PromoCodeService();
module.exports = { promoSvc };