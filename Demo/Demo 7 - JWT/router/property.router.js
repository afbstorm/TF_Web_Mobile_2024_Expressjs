const router = require('express').Router();
const propertyController = require('../controllers/property.controller');
const {authenticateJWT, isOwner} = require("../middlewares/auth");

router.post('/', authenticateJWT, isOwner, propertyController.create);

module.exports = router;
