const express = require('express');
const router = express.Router();
const bookRouter = require('./book.router');
const authorRouter = require('./author.router');
const categoryRouter = require('./category.router');

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.use('/categories', categoryRouter);

module.exports = router;
