const router = require('express').Router();
const userRouter = require('./user.router');


router.use('/users', userRouter)

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        welcome: 'Welcome on this fabulous website created for the Web Mobile'
    })
})


module.exports = router;
