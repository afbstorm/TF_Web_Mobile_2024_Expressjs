const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { authenticateJWT, isOwner } = require("../middlewares/auth");

router.get("/", userController.findAll);
router.get("/:id", userController.findByPk);
router.patch("/:id", authenticateJWT, isOwner, userController.update);
router.delete("/:id", authenticateJWT, isOwner, userController.destroy);

module.exports = router;
