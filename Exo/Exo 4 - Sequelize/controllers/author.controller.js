const { Author, Book } = require('../models');
const { Op } = require("sequelize");

const authorController = {
    findAll: async (req, res) => {
        try {
            // http://localhost:3000/api/authors/?search=bobby
            // Destructuring du query param
            const { search } = req.query;

            // Initialisation d'un object vide qui contiendra mes clauses de recherche
            const where = {};

            // Vérification de présence de contenu pour le query param
            if (search) {
                // S'il y a quelque chose, on injecte dans l'object where la clause de recherche avec or et like
                where[Op.or] = [
                    {firstname: {
                            [Op.like]: `%${search}%`
                        }},
                    {lastname: {
                            [Op.like]: `%${search}%`
                        }}
                ]
            }

            const result = await Author.findAll({
                where
            })

            res.status(200).json({
                data: result
            })
        } catch (err) {
            console.error('Error in findAll:', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    findByPk: async (req, res) => {},
    create: async (req, res) => {
        try {
            const authorDatas = req.body;
            const author = await Author.create(authorDatas);

            res.status(201).json(author);
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
            console.error('Error in findAll:', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    update: async (req, res) => {},
    destroy: async (req, res) => {}
}

module.exports = authorController;
