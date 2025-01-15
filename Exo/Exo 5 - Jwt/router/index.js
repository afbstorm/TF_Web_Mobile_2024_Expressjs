const router = require("express").Router();
const authRouter = require("./auth.router");
const saleRouter = require("./sale.router");
const garageRouter = require("./garage.router");
const userRouter = require("./user.router");

router.use("/auth", authRouter);
router.use("/sales", saleRouter);
router.use("/garages", garageRouter);
router.use("/users", userRouter);

module.exports = router;
