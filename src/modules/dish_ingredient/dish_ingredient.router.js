const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { dishIngredientCreateDTO } = require("./dish_ingredient.contract");
const dishIngredientCtrl = require("./dish_ingredient.controller");
const dishIngredientRouter = require("express").Router();

dishIngredientRouter.route('/')
    .post(loginCheck, checkAccess('Admin'), bodyValidator(dishIngredientCreateDTO), dishIngredientCtrl.store)
dishIngredientRouter.route("/:id")
    // .get(loginCheck, checkAccess('Admin'), dishIngredientCtrl.show)
    // .put(loginCheck, checkAccess('Admin'),  bodyValidator(dishUpdateDTO), dishCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), dishIngredientCtrl.remove)

module.exports = dishIngredientRouter;