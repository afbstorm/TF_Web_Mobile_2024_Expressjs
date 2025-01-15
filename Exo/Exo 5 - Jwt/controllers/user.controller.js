const { User } = require("../models");

const userController = {
  findAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password"]
        }
      })
      res.status(200).json(users);
    } catch (err) {
      console.error("Error in findAll", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  findByPk: async (req, res) => {
    try {
      const id = req.params.id;

      const user = await User.findByPk(id, {
        attributes: {
          exclude: ['password']
        }
      })

      if (!user) {
        return res.status(404).json({
          error: "L'utilisateur n'existe pas."
        })
      }

      res.status(200).json(user);
    } catch (err) {
      console.error("Error in findByPk", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateDatas = req.body;

      const user = await User.findOne({
        where: {
          id
        }
      })

      if (!user) {
        return res.status(404).json({
          error: "Pas d'utilisateur"
        })
      }

      await user.update(updateDatas);

      const { password, ...userWithoutPassword } = user.toJSON();

      res.status(200).json({user: userWithoutPassword});

    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          error: "Données invalides",
          details: err.errors.map((error) => ({
            field: error.path,
            message: error.message,
          })),
        });
      }
      console.error("Error in update", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },

  destroy: async (req, res) => {
    try {
        await User.destroy({where: {id: req.params.id}})
        res.status(204).send();
    } catch (err) {
      console.error("Error in destroy", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  },
};

module.exports = userController;
