const { Book, Author, Category } = require('../models');
const { Op } = require('sequelize');

const bookController = {
    findAll: async (req, res) => {
        try {
            // Destructuring des querys params pour récupérer le title et l'available possiblement inclus dedans
            const { title, available } = req.query;
            // Initialisation de l'object qui contiendra les clauses de recherche
            const where = {};
            if (title) {
                where.title = {
                    [Op.like]: `%${title}%`
                }
            }
            if (available !== undefined) {
                where.available = available === "true";
            }

            const result = await Book.findAll({
                where,
                include: [
                    {
                        model: Author,
                        as: 'author',
                        attributes: ['id', 'firstname', 'lastname']
                    },
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                ],
                order: [['title', 'ASC']]
            });

            res.status(200).json({
                data: result
            });

        } catch (err) {
            console.error('Error in findAll:', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    findByAuthor: async (req, res) => {
        try {
            const { authorId } = req.params;
            if (isNaN(authorId)) {
                return res.status(400).json({
                    error: "L'id renseigné est invalide"
                })
            }

            const books = await Book.findAll({
                where: { authorId },
                include: [
                    {
                        model: Category,
                        as: "category",
                        attributes: ['id', 'name']
                    }
                ]
            });

            res.status(200).json(books)

        } catch (err) {
            console.error('Error in findByAuthor:', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    create: async (req, res) => {
        try {
            const bookDatas = req.body;

            const authorExists = await Author.findByPk(bookDatas.authorId);
            if (!authorExists) {
                return res.status(404).json({error: "Auteur non trouvé"})
            }

            const categoryExists = await Category.findByPk(bookDatas.categoryId);
            if (!categoryExists) {
                return res.status(404).json({error: "Catégorie non trouvée"})
            }

            const book = await Book.create(bookDatas);
            const bookInfos = await Book.findByPk(book.id, {
                include: [
                    {
                        model: Author,
                        as: 'author',
                        attributes: ['id', 'firstname', 'lastname']
                    },
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }
                ]
            });

            res.status(201).json(bookInfos);


        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    error: "Données invalides",
                    details: err.errors.map(error => ({
                        field: error.path,
                        message: error.message
                    }))
                })
            }
            console.error('Error in create:', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
}

module.exports = bookController;
