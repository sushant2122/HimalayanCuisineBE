const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { ingredientCreateDTO, ingredientUpdateDTO } = require("./ingredient.contract");
const ingredientCtrl = require("./ingredient.controller");

const ingredientRouter = require("express").Router();

ingredientRouter.route('/')
    .get(loginCheck, checkAccess('Admin'), ingredientCtrl.index)
    .post(loginCheck, checkAccess('Admin'), bodyValidator(ingredientCreateDTO), ingredientCtrl.store)
ingredientRouter.route("/:id")
    .get(loginCheck, checkAccess('Admin'), ingredientCtrl.show)
    .put(loginCheck, checkAccess('Admin'), bodyValidator(ingredientUpdateDTO), ingredientCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), ingredientCtrl.remove)

module.exports = ingredientRouter;