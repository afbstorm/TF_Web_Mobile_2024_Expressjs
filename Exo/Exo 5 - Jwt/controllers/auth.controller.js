const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    create: async (req, res) => {
        try {
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                ...req.body,
                password: hashedPassword
            })

            const token = jwt.sign({
                id: user.id,
                email: user.email
            },
                JWT_SECRET,
                {
                    expiresIn: "24h"
                })

            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.status(201).json({
                user: userWithoutPassword,
                token
            });
        } catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { password, email } = req.body;

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                return res.status(404).json({
                    error: 'Utilisateur introuvable ou inexistant'
                })
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(403).json({
                    error: 'Email ou password incorrect'
                })
            }

            const token = jwt.sign({
                    id: user.id,
                    email: user.email
                },
                JWT_SECRET,
                {
                    expiresIn: "24h"
                })

            const { password: _, ...userWithoutPassword } = user.toJSON();
            res.status(201).json({
                user: userWithoutPassword,
                token
            });

        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }
    }
}

module.exports = authController;
