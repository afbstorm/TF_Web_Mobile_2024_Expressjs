const router = require('express').Router();
const authorController = require('../controllers/author.controller');

router.get('/', authorController.findAll);
router.post('/', authorController.create);

module.exports = router;
