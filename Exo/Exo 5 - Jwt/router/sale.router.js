const router = require("express").Router();
const saleController = require("../controllers/sale.controller");
const { authenticateJWT } = require("../middlewares/auth");

router.post("/", authenticateJWT, saleController.create);
router.get("/user/:userId", authenticateJWT, saleController.findAll);

module.exports = router;
