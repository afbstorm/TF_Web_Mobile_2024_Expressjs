const router = require('express').Router();
// const fs = require('fs');

const authors = require('../datas/authors.json');
const articles = require('../datas/articles.json');

router.get('/', (req, res) => {
    res.status(200).json(authors)
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(author => author.id === id);

    if (!author) {
        return res.status(404).json({message: "Pas d'auteur avec cet id"});
    }

    const authorArticles = articles.filter(article => article.authorId === author.id)

    if (authorArticles.length === 0) {
        return res.status(200).json({message: "L'auteur n'a pas encore publié d'article"});
    }

    res.status(200).json({
        author,
        articles: authorArticles
    })
})

module.exports = router;
