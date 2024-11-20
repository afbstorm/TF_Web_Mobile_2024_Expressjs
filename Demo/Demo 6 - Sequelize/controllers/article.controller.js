const { Article, User } = require('../models');

const allowedUserFields = ['name', 'email']

const articleController = {
    findAll: async (req, res) => {
        try {
            const articles = await Article.findAll({
                include: [
                    {
                        model: User,
                        as: "author",
                        // Limitation des colonnes ressorties par la jointure
                        attributes: allowedUserFields
                    }
                ],
                order: [
                    // order by
                    ['createdAt', 'DESC']
                ]
            });
            res.status(200).json(articles);
        } catch (err) {
            console.error('Error in findAll');
            res.status(500).json({
                error: "Erreur serveur"
            })
        }
    },
    findByPk: async (req, res) => {
        try {
            const id = req.params.id;

            if (isNaN(id)) {
                return res.status(400).json({
                    error: "L'id de l'article doit être un nombre"
                })
            }

            const article = await Article.findByPk(id);

            if (!article) {
                return res.status(404).json({
                    error: "Article introuvable"
                })
            }
            res.status(200).json(article);

        } catch (err) {
            console.error('Error in findByPk');
            res.status(500).json({
                error: "Erreur serveur"
            })
        }
    },
    create: async (req, res) => {
        try {
            const articleDatas = req.body;

            const article = await Article.create(articleDatas);

            res.status(201).json(article);
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: 'Données invalides',
                    details: err.errors.map(error => ({
                        field: error.path,
                        message: error.message
                    }))
                })
            }

            console.error('Error in create', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;

            if (isNaN(id)) {
                return res.status(400).json({
                    error: "L'id de l'article doit être un nombre"
                })
            }

            const article = await Article.findOne({
                where: {
                    id,
                }
            })

            if (!article) {
                return res.status(404).json({
                    error: "Article introuvable"
                })
            }

            const updateDatas = req.body;
            await article.update(updateDatas);

            res.status(200).json(article);


        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: 'Données invalides',
                    details: err.errors.map(error => ({
                        field: error.path,
                        message: error.message
                    }))
                })
            }

            console.error('Error in update', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    destroy: async (req, res) => {
        try {
            const id = req.params.id;

            if (isNaN(id)) {
                return res.status(400).json({
                    error: "L'id de l'article doit être un nombre"
                })
            }

            const deleted = await Article.destroy({
                where: {
                    id
                }
            })

            if (!deleted) {
                return res.status(404).json({
                    error: "Article introuvable"
                })
            }

            res.status(204).send();

        } catch (err) {
            console.error('Error in destroy', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    }
}

module.exports = articleController;
