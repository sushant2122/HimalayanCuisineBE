const router = require('express').Router();
const authRouter = require("../modules/auth/auth.router");
const categoryRouter = require('../modules/category/category.router');
const dishRouter = require('../modules/dish/dish.router');
const dishIngredientRouter = require('../modules/dish_ingredient/dish_ingredient.router');
const ingredientRouter = require('../modules/ingredient/ingredient.router');
const promoRouter = require('../modules/promocode/promocode.router');
// const bannerRouter = require('../modules/banner/banner.router');


router.use('/auth', authRouter);

router.use('/category', categoryRouter);

router.use('/dish', dishRouter);
router.use('/ingredient', ingredientRouter);
router.use('/dish-ingredient', dishIngredientRouter);
router.use('/promocode', promoRouter);



router.use("/", (req, res) => {
    res.send("This is success.");
});

module.exports = router;
