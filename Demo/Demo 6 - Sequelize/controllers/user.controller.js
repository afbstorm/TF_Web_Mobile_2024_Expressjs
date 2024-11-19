const { User } = require('../models');
const { Op } = require('sequelize');

const userController = {
    findAll: async (req, res) => {
        try {
            const users = await User.findAll();

            res.status(200).json(users);

        } catch (err) {
            console.error('Error in findAll:', err);
            res.status(500).json({
                error: 'Erreur serveur'
            })
        }
    },
    create: async (req, res) => {
        try {
            // Récupération des informations de l'utilisateur
            const userData = req.body;

            // Effectuer la création de l'utilisateur
            const user = await User.create(userData);

            // Mise en forme d'une réponse à envoyer au client contenant les informations de l'utilisateur
            const { password, ...userWithoutPassword } = user.toJSON();

            res.status(201).json(userWithoutPassword);

        } catch (err) {
            // Gestion erreurs de validation
            if (err.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: "Données invalides",
                    details: err.errors.map(error => ({
                        field: error.path,
                        message: error.message
                    }))
                })
            }
            // Gestion spécifique des erreurs d'unicité
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    error: "Contrainte d'unicité non-respectée",
                    details: "Cet email est déjà utilisé"
                })
            }
            console.error("Error in create:", err);
            res.status(500).json({
                error: "Erreur serveur"
            })
        }
    },
    findByPk: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    error: "L'id utilisateur est invalide"
                })
            }

            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ["password"]
                }
            });

            if (!user) {
                return res.status(404).json({
                    error: "Utilisateur introuvable"
                })
            }

            res.status(200).json(user);

        } catch (err) {
            console.error("Error in findByPk:", err);
            res.status(500).json({
                error: "Erreur serveur"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updateDatas = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({
                    error: "Utilisateur introuvable"
                })
            }

            await user.update(updateDatas);

            const { password, ...userWithoutPassword } = user.toJSON();
            return res.status(200).json(userWithoutPassword);

        } catch (err) {
            // Gestion erreurs de validation
            if (err.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: "Données invalides",
                    details: err.errors.map(error => ({
                        field: error.path,
                        message: error.message
                    }))
                })
            }
            // Gestion spécifique des erreurs d'unicité
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    error: "Contrainte d'unicité non-respectée",
                    details: "Cet email est déjà utilisé"
                })
            }
            console.error("Error in create:", err);
            res.status(500).json({
                error: "Erreur serveur"
            })
        }
    }
}

module.exports = userController;
