const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { uploader, setPath } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { dishCreateDTO, dishUpdateDTO } = require("./dish.contract");
const dishCtrl = require("./dish.controller");

const dishRouter = require("express").Router();

dishRouter.route('/')
    .get(dishCtrl.index)
    .post(loginCheck, checkAccess('Admin'), setPath('dishes'), uploader.single('image_url'), bodyValidator(dishCreateDTO), dishCtrl.store)
dishRouter.route("/:id")
    .get(loginCheck, checkAccess('Admin'), dishCtrl.show)
    .put(loginCheck, checkAccess('Admin'), setPath('dishes'), uploader.single('image_url'), bodyValidator(dishUpdateDTO), dishCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), dishCtrl.remove)

module.exports = dishRouter;