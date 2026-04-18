const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { promoCodeCreateDTO, promoCodeUpdateDTO } = require("./promocode.contract");

const promoCtrl = require("./promocode.controller");

const promoRouter = require("express").Router();

promoRouter.route('/')
    .get(loginCheck, checkAccess('Admin'), promoCtrl.index)
    .post(loginCheck, checkAccess('Admin'), bodyValidator(promoCodeCreateDTO), promoCtrl.store)
promoRouter.route("/:id")
    .get(loginCheck, checkAccess('Admin'), promoCtrl.show)
    .put(loginCheck, checkAccess('Admin'), bodyValidator(promoCodeUpdateDTO), promoCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), promoCtrl.remove)

module.exports = promoRouter;