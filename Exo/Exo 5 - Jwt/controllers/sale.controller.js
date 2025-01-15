const { Sale, Garage } = require("../models");

const saleController = {
  create: async (req, res) => {
    try {} catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: "Données invalides",
          details: err.errors.map((error) => ({
            field: error.path,
            message: error.message,
          })),
        });
      }
      console.error("Error in create", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  findAll: async (req, res) => {
    try {} catch (err) {
      console.error("Error in findAll", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = saleController;
