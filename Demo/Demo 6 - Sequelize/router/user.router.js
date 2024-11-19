const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.findAll)
router.post('/', userController.create)
router.get('/:id', userController.findByPk)
router.patch('/:id', userController.update)


module.exports = router;
