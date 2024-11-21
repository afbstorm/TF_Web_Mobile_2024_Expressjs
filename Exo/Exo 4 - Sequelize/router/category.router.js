const router = require('express').Router();
const categoryController = require('../controllers/category.controller');


router.get('/', () => {});
router.get('/:id', () => {});
router.post('/', categoryController.create);
router.patch('/:id', () => {});
router.delete('/:id', () => {});

module.exports = router;
