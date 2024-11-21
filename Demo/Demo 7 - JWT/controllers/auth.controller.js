const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    create: async (req, res) => {
        try {
            const password = req.body.password;

            // Le 10 représente le saltRound, c'est le temps que prendra le hashing
            // Plus le chiffre est grand, plus la complexité du hash sera grande
            const hashedPassword = await bcrypt.hash(password, 10)

            // Enregistrement de l'utilisateur dans la DB
            const user = await User.create({
                ...req.body,
                password: hashedPassword
            });

            // Génération du token (jwt)
            // La méthode sign va prendre trois paramètres
            // 1 - Un object contenant les informations utilisateur que l'on veut faire suivre au client
            // 2 - Le secret pour décoder et encoder les informations
            // 3 - Un object d'options
            const token = jwt.sign(
                {
                   id: user.id,
                   email: user.email,
                   role: user.role
                },
                JWT_SECRET,
                {
                    expiresIn: "24h"
                }
            );

            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.status(201).json({
                user: userWithoutPassword,
                token
            })

            console.log(token)

        } catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Vérification de l'existence d'un utilisateur
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                return res.status(401).json({
                    error: "Mot de passe ou email incorrect"
                })
            }

            // Vérification du mot de passe en comparant le mot de passe entré par l'utilisateur
            // au mot de passe dans la DB
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({
                    error: "Mot de passe ou email incorrect"
                })
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                JWT_SECRET,
                {
                    expiresIn: '24h'
                }
            );

            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.status(200).json({
                user: userWithoutPassword,
                token
            })
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    }
}

module.exports = authController;
