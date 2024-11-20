const router = require('express').Router();
const articleController = require('../controllers/article.controller');

router.get('/', articleController.findAll);
router.get('/:id', articleController.findByPk);
router.post('/', articleController.create);
router.patch('/:id', articleController.update);
router.delete('/:id', articleController.destroy);

module.exports = router;
