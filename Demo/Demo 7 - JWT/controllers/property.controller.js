const { Property, User } = require('../models');

const propertyController = {
    create: async (req, res) => {
        try {
            const propertyDatas = req.body;

            const property = await Property.create({
                ...propertyDatas,
                ownerId: req.user.id
            });

            res.status(201).json(property);

        } catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    },
    findAll: async (req, res) => {}
}

module.exports = propertyController;
