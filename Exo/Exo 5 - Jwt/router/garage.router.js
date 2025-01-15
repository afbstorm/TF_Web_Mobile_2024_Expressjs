const router = require("express").Router();
const garageController = require("../controllers/garage.controller");
const { authenticateJWT } = require("../middlewares/auth");

router.post("/", authenticateJWT, garageController.create);
router.get("/sales/:name", garageController.fetchSales);

module.exports = router;
