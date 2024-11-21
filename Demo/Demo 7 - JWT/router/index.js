const router = require('express').Router();
const authRouter = require('./auth.router');
const propertyRouter = require('./property.router');
const bookingRouter = require('./booking.router');

router.use('/auth', authRouter);
router.use('/properties', propertyRouter);
router.use('/bookings', bookingRouter);


module.exports = router;
