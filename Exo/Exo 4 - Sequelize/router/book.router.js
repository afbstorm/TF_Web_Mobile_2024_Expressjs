const router = require('express').Router();
const bookController = require('../controllers/book.controller');


router.get('/', bookController.findAll);
router.get('/author/:authorId', bookController.findByAuthor);
router.post('/', bookController.create);
router.patch('/:id', () => {});
router.delete('/:id', () => {});

module.exports = router;
