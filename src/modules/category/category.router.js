const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { categoryCreateDTO, categoryUpdateDTO } = require("./category.contract");
const categoryCtrl = require("./category.controller");

const categoryRouter = require("express").Router();

categoryRouter.get('/list-home', categoryCtrl.listForHome)
categoryRouter.route('/')
    .get(loginCheck, checkAccess('Admin'), categoryCtrl.index)
    .post(loginCheck, checkAccess('Admin'), bodyValidator(categoryCreateDTO), categoryCtrl.store)
categoryRouter.route("/:id")
    .get(loginCheck, checkAccess('Admin'), categoryCtrl.show)
    .put(loginCheck, checkAccess('Admin'), bodyValidator(categoryUpdateDTO), categoryCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), categoryCtrl.remove)

module.exports = categoryRouter;