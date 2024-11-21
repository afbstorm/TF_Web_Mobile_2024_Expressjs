const { Category, Book } = require('../models');
const { Op } = require('express');

const categoryController = {
    findAll: async (req, res) => {},
    findOne: async (req, res) => {},
    create: async (req, res) => {
        try {
            const categoryDatas = req.body;
            const category = await Category.create(categoryDatas);

            res.status(201).json(category)
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
    }
}

module.exports = categoryController;
