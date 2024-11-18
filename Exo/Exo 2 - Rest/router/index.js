const router = require('express').Router();
const articleRouter = require('./article.router');
const authorRouter = require('./author.router');

// Utilisation des routers
router.use('/authors', authorRouter);
router.use('/articles', articleRouter);

router.get('*', (req, res) => {
    res.status(404).json({message: 'Cette route n\'existe pas'});
})

module.exports = router;
