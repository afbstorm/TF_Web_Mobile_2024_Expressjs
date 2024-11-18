const router = require('express').Router();
const validateArticles = require('../middlewares/validateArticles');
const fs = require('fs');

const authors = require('../datas/authors.json');
const articles = require('../datas/articles.json');

router.get('/', (req, res) => {
    res.status(200).json({
        data: articles
    })
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const article = articles.find(article => article.id === id);

    if (!article) {
        return res.status(404).json({message: "Article introuvable ou inexistant"});
    }

    const articleAuthor = authors.find(author => author.id === article.authorId);

    if (!articleAuthor) {
        return res.status(200).json({
            error: "Article anonyme"
        });
    }

    res.status(200).json({
        article,
        author: articleAuthor
    })
})

router.post('/', validateArticles, (req, res) => {
    const { title, content, authorId } = req.body;
    const createdAt = new Date();

    const newArticle = {
        id: articles[articles.length -1].id + 1,
        title,
        content,
        authorId,
        createdAt
    };

    const createArticle = async () => {
        try {
            articles.push(newArticle);
            await fs.promises.writeFile("./datas/articles.json", JSON.stringify(articles, null, 2), 'utf-8');

            res.status(201).json({
                message: "Article crée avec succès"
            })

        } catch (err) {
            console.error(err)
        }
    }

    createArticle()
})

module.exports = router;
