module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: [1,50]
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: [1,50]
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear() + 1
      }
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 200000
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 200000
      }
    },
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    })

    Sale.belongsTo(models.Garage, {
      foreignKey: "garageId",
      as: "garage"
    })
  };

  return Sale;
};
