const router = require('express').Router();
const bookingController = require('../controllers/booking.controller');
const {authenticateJWT} = require("../middlewares/auth");

router.post('/', authenticateJWT, bookingController.create);

module.exports = router;
