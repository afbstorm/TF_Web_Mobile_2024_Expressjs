const { Booking, Property } = require('../models');
const { Op } = require('sequelize');

const bookingController = {
    create: async (req, res) => {
        try {
            const { propertyId, checkIn, checkOut } = req.body;

            // Vérification de la disponibilité
            // On vérifie le statut, il ne faut pas que le statut soit confirmed
            // On vérifie les dates checkIn et checkOut
            const existingBooking = await Booking.findOne({
                where: {
                    propertyId,
                    status: "confirmed",
                    [Op.or]: [
                        {
                            checkIn: {
                                [Op.between]: [checkIn, checkOut]
                            }
                        },
                        {
                            checkOut: {
                                [Op.between]: [checkIn, checkOut]
                            }
                        }
                    ]
                }
            });

            if (existingBooking) {
                return res.status(400).json({
                    error: "Propriété indisponible pour les dates demandées"
                })
            }

            // Calculer le prix total du séjour
            const property = await Property.findByPk(propertyId);

            // (new Date(checkOut) - new Date(checkIn)) -> va return la durée en millisecondes
            // (1000*60*60*24) -> va return la durée en jours
            const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
            const totalPrice = days * property.pricePerNight;

            const booking = await Booking.create({
                ...req.body,
                tenantId: req.user.id,
                totalPrice
            });

            res.status(201).json(booking);
        } catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    }
}

module.exports = bookingController;
